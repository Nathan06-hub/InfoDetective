from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from app.database import get_session
from app.models.case import Case
from app.models.user import User
from app.schemas.verdict import VerdictSubmit, VerdictResult
from app.services.scoring_service import ScoringService
from app.services.gemini_service import GeminiService

router = APIRouter(prefix="/api/cases", tags=["Verdict & Evaluation"])

@router.post("/{case_id}/verdict", response_model=VerdictResult)
def submit_verdict(
    case_id: int,
    body: VerdictSubmit,
    session: Session = Depends(get_session)
):
    case = session.get(Case, case_id)
    if not case:
        raise HTTPException(status_code=404, detail="Affaire non trouvée")

    user = None
    if isinstance(body.user_id, int) or (isinstance(body.user_id, str) and str(body.user_id).isdigit()):
        user = session.get(User, int(body.user_id))
    if not user and isinstance(body.user_id, str):
        user = session.exec(select(User).where(User.username == body.user_id)).first()
        if not user:
            user = User(username=body.user_id, is_guest=True)
            session.add(user)
            session.commit()
            session.refresh(user)

    if not user:
        user = User(username="Guest Detective", is_guest=True)
        session.add(user)
        session.commit()
        session.refresh(user)

    lang = body.lang or "fr"

    verdict_decision = body.decision or body.user_verdict_decision or "fake"
    conclusion_text = body.conclusion or body.user_conclusion_text or ""

    # Calculer le score et les retours détaillés par technique
    score, feedback_list, unlocked_badges = ScoringService.evaluate_verdict(
        session=session,
        user=user,
        case=case,
        selected_codes=body.selected_technique_codes or [],
        user_verdict_decision=verdict_decision,
        user_conclusion_text=conclusion_text,
        lang=lang
    )

    # Récupérer les codes de techniques attendues pour le bilan
    expected_codes = [t.code for t in case.techniques]
    total_expected = len(expected_codes) if expected_codes else 1

    # Formatage du feedback pour Gemini
    feedback_payload = [
        {"technique": f.name, "status": f.status, "explanation": f.explanation}
        for f in feedback_list
    ]

    # Générer le retour pédagogique sur-mesure via Gemini IA (ou Mock) en analysant la conclusion rédigée du joueur
    case_title = case.title_fr if lang.startswith("fr") else case.title_en
    ai_feedback, is_mock = GeminiService.generate_verdict_feedback(
        case_title=case_title,
        score=score,
        feedback_details=feedback_payload,
        user_conclusion_text=body.user_conclusion_text,
        user_verdict_decision=body.user_verdict_decision,
        is_case_fake=case.is_fake,
        lang=lang
    )

    # Pourcentage de précision
    correct_count = sum(1 for f in feedback_list if f.status == "correct")
    accuracy_pct = int(round((correct_count / total_expected) * 100))

    return VerdictResult(
        case_id=case.id,
        score=score,
        max_score=1000,
        accuracy_percentage=min(100, accuracy_pct),
        selected_techniques_count=len(body.selected_technique_codes),
        correct_techniques_count=correct_count,
        total_expected_techniques_count=total_expected,
        techniques_feedback=feedback_list,
        ai_pedagogical_feedback=ai_feedback,
        unlocked_badges=unlocked_badges,
        is_mock_feedback=is_mock
    )
