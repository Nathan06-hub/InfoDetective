# 🕵️‍♂️ InfoDetective Backend (FastAPI + Gemini AI + PostgreSQL)

**UNESCO Youth Hackathon 2026 — Media & Information Literacy**  
*Backend API pour le jeu mobile de sensibilisation à la désinformation InfoDetective.*

---

## 🚀 Fonctionnalités Principales

- **Architecture Découplée & Sécurisée** : API REST construite avec **FastAPI** et **SQLModel**.
- **Mode Joueur Invité (Guest Session)** : Génération instantanée d'un profil joueur sans friction.
- **Interrogatoire Témoin IA & Fallback (Mock)** : Intégration de **Google Gemini API (1.5 Flash)** avec prompts système stricts pour chaque témoin d'enquête. Si la clé API est absente ou le réseau indisponible, le mode `MOCK_DEMO_MODE=true` garantit des réponses pré-enregistrées 100% fiables devant le jury.
- **Calcul de Score & Gamification** : Évaluation précise des affaires (Vrais Positifs, Faux Positifs), feedback pédagogique sur-mesure et système de badges/leaderboard.
- **Support Multilingue (FR / EN)** : Adaptation dynamique des briefs, témoins, fiches de preuves et retours selon la langue de la requête.

---

## 🛠️ Tech Stack

- **Langage / Framework** : Python 3.10+ | FastAPI | Uvicorn
- **Base de Données** : SQLModel (SQLite en local / PostgreSQL en prod via Render / Neon)
- **Moteur IA** : Google Gemini API (`google-genai` / `google-generativeai`)
- **Tests** : Pytest & FastAPI TestClient

---

## 📡 Endpoints API Principaux

| Méthode | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Statut du serveur, mode démo et état de la clé Gemini |
| `POST` | `/api/users/guest` | Crée instantanément une session Joueur Invité |
| `GET` | `/api/users/{id}/profile` | Récupère les stats du joueur, son rang et ses badges |
| `GET` | `/api/users/leaderboard` | Classement général des détectives |
| `GET` | `/api/cases` | Liste des affaires d'enquête disponibles |
| `GET` | `/api/cases/{id}` | Détails d'une affaire (Brief, Témoin, Preuves, Techniques) |
| `GET` | `/api/cases/{id}/evidence` | Carnet de preuves associées |
| `POST` | `/api/cases/{id}/chat` | Discussion en langage naturel avec le témoin IA |
| `POST` | `/api/cases/{id}/verdict` | Soumission des techniques identifiées, calcul du score & bilan IA |

---

## 💻 Installation & Lancement Local

### 1. Cloner / Accéder au projet
```bash
cd infodetective-backend
```

### 2. Installer les dépendances
```bash
pip install -r requirements.txt
```

### 3. Initialiser la base de données de démo
```bash
python seed.py
```

### 4. Lancer le serveur de développement
```bash
uvicorn app.main:app --reload --port 8000
```
- API Swagger UI disponible sur : **http://localhost:8000/docs**
- ReDoc disponible sur : **http://localhost:8000/redoc**

---

## 🧪 Lancer les Tests Automatisés

```bash
pytest
```

---

## ☁️ Déploiement en Production (Render / Railway / Neon)

1. **Variables d'environnement à configurer** :
   - `DATABASE_URL`: Chaîne de connexion PostgreSQL (ex: `postgresql://user:pass@ep-xyz.neon.tech/infodetective?sslmode=require`)
   - `GEMINI_API_KEY`: Votre clé API Google Gemini
   - `MOCK_DEMO_MODE`: `false` (pour activer l'IA en direct) ou `true` pour la démo hors-ligne.
   - `CORS_ORIGINS`: Domaine de votre PWA React (ex: `["https://infodetective.vercel.app"]`)

2. **Commande de Start (Build/Start Command)** :
   - Build command: `pip install -r requirements.txt && python seed.py`
   - Start command: `uvicorn app.main:app --host 0.0.0.0 --port 8000`
