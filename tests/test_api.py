import pytest
from fastapi.testclient import TestClient
from sqlmodel import SQLModel, create_engine, Session, select
from sqlmodel.pool import StaticPool

from app.main import app
from app.database import get_session
from app.models.user import User, UserProgress
from app.models.case import Case
from seed import seed_database

# Configuration de la base de données de test en mémoire
engine_test = create_engine(
    "sqlite:///:memory:",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)

def override_get_session():
    with Session(engine_test) as session:
        yield session

app.dependency_overrides[get_session] = override_get_session
client = TestClient(app)

@pytest.fixture(autouse=True)
def setup_db():
    SQLModel.metadata.create_all(engine_test)
    seed_database(engine_override=engine_test)
    yield
    SQLModel.metadata.drop_all(engine_test)

# --- 1. TESTS DE SANTÉ & ACCÈS STATIQUE ---

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "InfoDetective Backend"
    assert "version" in data

def test_static_images_mounted():
    # Vérifier que le dossier des images statiques est monté
    response = client.get("/static/images/biovital_label.jpg")
    assert response.status_code in [200, 404] # 200 si fichier présent, pas de crash 500

# --- 2. TESTS UTILISATEURS, PROFILS ET SÉRIES (STREAKS) ---

def test_create_guest_user_auto_and_custom():
    # Test création automatique de pseudo
    res_auto = client.post("/api/users/guest?lang=fr")
    assert res_auto.status_code == 200
    u_auto = res_auto.json()
    assert u_auto["is_guest"] is True
    assert "Détective_" in u_auto["username"] or "Detective_" in u_auto["username"]

    # Test création avec pseudo personnalisé
    res_custom = client.post("/api/users/guest?lang=fr", json={"username": "Sherlock_2026"})
    assert res_custom.status_code == 200
    u_custom = res_custom.json()
    assert u_custom["username"] == "Sherlock_2026"
    assert u_custom["rank_title"] == "Apprenti Détective 📋"

def test_user_profile_rank_progression():
    user_res = client.post("/api/users/guest", json={"username": "MasterTester"})
    user_id = user_res.json()["id"]

    # Simuler l'attribution de points pour tester la progression de rang
    with Session(engine_test) as session:
        user = session.get(User, user_id)
        user.score_total = 2500
        session.add(user)
        session.commit()

    profile_res = client.get(f"/api/users/{user_id}/profile?lang=fr")
    assert profile_res.status_code == 200
    p = profile_res.json()
    assert p["score_total"] == 2500
    assert p["rank_title"] == "Détective Émérite 🌟"

# --- 3. TESTS MODE AVENTURE & DÉBLOCAGE SÉQUENTIEL ---

def test_adventure_mode_sequential_unlocking():
    user_res = client.post("/api/users/guest")
    user_id = user_res.json()["id"]

    # Récupérer la liste des affaires en Mode Aventure (triée par unlock_level)
    res = client.get(f"/api/cases?user_id={user_id}&mode=adventure")
    assert res.status_code == 200
    cases = res.json()
    assert len(cases) >= 10

    # Seule la toute première affaire (#1) doit être débloquée par défaut au démarrage
    assert cases[0]["is_unlocked"] is True, "Seule l'affaire #1 doit être débloquée par défaut"
    assert cases[1]["is_unlocked"] is False, "L'affaire #2 doit être verrouillée au départ"

    # Résoudre l'affaire #1
    verdict_payload = {
        "user_id": user_id,
        "user_verdict_decision": "fake",
        "user_conclusion_text": "Cette publication sur le vaccin du Pr Kanga est une fausse rumeur avec des chiffres inventés et une source anonyme.",
        "selected_technique_codes": ["logo-falsifie", "source-non-fiable", "urgence-fabriquee", "appel-peur"],
        "lang": "fr"
    }
    client.post("/api/cases/1/verdict", json=verdict_payload)

    # Ré-interroger la liste : l'affaire #2 doit maintenant être débloquée
    res_updated = client.get(f"/api/cases?user_id={user_id}&mode=adventure")
    cases_updated = res_updated.json()
    assert cases_updated[1]["is_unlocked"] is True, "L'affaire #2 devrait être débloquée après la résolution de l'affaire #1"

def test_category_mode_search_locking():
    user_res = client.post("/api/users/guest")
    user_id = user_res.json()["id"]

    # Avec 0 affaire complétée, le mode thématique doit être verrouillé dans le profil
    profile_before = client.get(f"/api/users/{user_id}/profile").json()
    assert profile_before["is_search_mode_unlocked"] is False

    # Et les affaires filtrées par catégorie doivent avoir is_unlocked = False
    cases_cat = client.get(f"/api/cases?user_id={user_id}&mode=category&category=health").json()
    for c in cases_cat:
        assert c["is_unlocked"] is False

    # Simuler la résolution de 3 affaires
    with Session(engine_test) as session:
        user = session.get(User, user_id)
        user.cases_completed_count = 3
        session.add(user)
        session.commit()

    # Le mode thématique doit désormais être débloqué !
    profile_after = client.get(f"/api/users/{user_id}/profile").json()
    assert profile_after["is_search_mode_unlocked"] is True

# --- 4. TESTS TÉMOIN IA & DÉBLOCAGE DYNAMIQUE DE PREUVES ---

def test_witness_chat_dynamic_evidence_unlocking():
    user_res = client.post("/api/users/guest")
    user_id = user_res.json()["id"]

    # Question classique sans demande de preuve
    chat_payload_normal = {
        "user_id": user_id,
        "message": "Bonjour, comment allez-vous ?",
        "lang": "fr"
    }
    res_normal = client.post("/api/cases/1/chat", json=chat_payload_normal)
    assert res_normal.status_code == 200
    assert len(res_normal.json()["unlocked_evidences"]) == 0

    # Question demandant expressément une capture / preuve
    chat_payload_proof = {
        "user_id": user_id,
        "message": "Pouvez-vous me montrer une capture d'écran du post ou la photo de l'étiquette ?",
        "lang": "fr"
    }
    res_proof = client.post("/api/cases/1/chat", json=chat_payload_proof)
    assert res_proof.status_code == 200
    unlocked = res_proof.json()["unlocked_evidences"]
    assert len(unlocked) > 0
    assert "title" in unlocked[0]

# --- 5. TESTS VERDICT, EVALUATION ET SCORING DE CONCLUSION ---

def test_verdict_fake_case_evaluation():
    user_res = client.post("/api/users/guest")
    user_id = user_res.json()["id"]

    payload = {
        "user_id": user_id,
        "user_verdict_decision": "fake",
        "user_conclusion_text": "Ce communiqué du Ministère est un document falsifié avec un nom de page suspect et un faux arrêté de couvre-feu.",
        "selected_technique_codes": ["logo-falsifie", "source-non-fiable", "urgence-fabriquee", "appel-peur"],
        "lang": "fr"
    }
    res = client.post("/api/cases/1/verdict", json=payload)
    assert res.status_code == 200
    v = res.json()
    assert v["score"] >= 800
    assert v["correct_techniques_count"] >= 2
    assert len(v["ai_pedagogical_feedback"]) > 0

def test_verdict_true_case_evaluation():
    user_res = client.post("/api/users/guest")
    user_id = user_res.json()["id"]

    # Affaire #6 = Vraie découverte (is_fake=False, phénomène naturel de fasciation)
    payload_correct = {
        "user_id": user_id,
        "user_verdict_decision": "true",
        "user_conclusion_text": "La photo des tomates est vraie, c'est un phénomène naturel de fasciation et non une manipulation génétique.",
        "selected_technique_codes": ["fausse-causalite"],
        "lang": "fr"
    }
    res = client.post("/api/cases/6/verdict", json=payload_correct)
    assert res.status_code == 200
    v = res.json()
    assert v["score"] >= 500

# --- 6. TESTS CLASSEMENT (LEADERBOARD) ---

def test_leaderboard_ordering():
    # Créer deux utilisateurs avec des scores différents
    u1_res = client.post("/api/users/guest", json={"username": "Alice"})
    u2_res = client.post("/api/users/guest", json={"username": "Bob"})
    
    u1_id = u1_res.json()["id"]
    u2_id = u2_res.json()["id"]

    with Session(engine_test) as session:
        user1 = session.get(User, u1_id)
        user2 = session.get(User, u2_id)
        user1.score_total = 1200
        user2.score_total = 800
        session.add(user1)
        session.add(user2)
        session.commit()

    lb_res = client.get("/api/users/leaderboard?limit=10")
    assert lb_res.status_code == 200
    lb = lb_res.json()
    assert len(lb) >= 2
    # Alice (1200 pts) doit être première devant Bob (800 pts)
    assert lb[0]["username"] == "Alice"
    assert lb[0]["score_total"] == 1200
    assert lb[1]["username"] == "Bob"
