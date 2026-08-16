import random
from typing import List, Optional, Union
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from app.config import settings
from app.database import get_session
from app.models.user import User, UserProgress
from app.models.badge import Badge, UserBadge
from app.schemas.user import UserCreate, UserProfileRead, UserBadgeRead, LeaderboardEntry

router = APIRouter(prefix="/api/users", tags=["Users & Gamification"])

@router.post("/guest", response_model=UserProfileRead)
def create_guest_user(
    user_in: Optional[UserCreate] = None,
    lang: str = Query("fr"),
    session: Session = Depends(get_session)
):
    """
    Crée instantanément une session joueur invité sans mot de passe.
    """
    if user_in and user_in.username.strip():
        username = user_in.username.strip()
    else:
        number = random.randint(100, 999)
        username = f"Détective_{number}" if lang.startswith("fr") else f"Detective_{number}"

    new_user = User(username=username, is_guest=True, score_total=0, cases_completed_count=0)
    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    return get_user_profile(user_id=new_user.id, lang=lang, session=session)

@router.get("/leaderboard", response_model=List[LeaderboardEntry])
def get_leaderboard(
    limit: int = Query(10, ge=1, le=50),
    session: Session = Depends(get_session)
):
    users = session.exec(
        select(User).order_by(User.score_total.desc()).limit(limit)
    ).all()

    leaderboard: List[LeaderboardEntry] = []
    for idx, u in enumerate(users, start=1):
        badges_count = len(u.badges)
        leaderboard.append(
            LeaderboardEntry(
                rank=idx,
                username=u.username,
                score_total=u.score_total,
                cases_completed_count=u.cases_completed_count,
                badges_count=badges_count
            )
        )
    return leaderboard

@router.get("/{user_id}/profile", response_model=UserProfileRead)
@router.get("/{user_id}", response_model=UserProfileRead)
def get_user_profile(
    user_id: Union[int, str],
    lang: str = Query("fr"),
    session: Session = Depends(get_session)
):
    user = None
    if isinstance(user_id, int):
        user = session.get(User, user_id)
    elif isinstance(user_id, str):
        if user_id.isdigit():
            user = session.get(User, int(user_id))
        else:
            user = session.exec(select(User).order_by(User.id.desc())).first()

    if not user:
        user = session.exec(select(User).order_by(User.id.desc())).first()

    if not user:
        user = User(username="Détective", is_guest=True, score_total=0, cases_completed_count=0)
        session.add(user)
        session.commit()
        session.refresh(user)

    # Calcul du rang
    if user.score_total >= 2000:
        rank_title = "Détective Émérite 🌟" if lang.startswith("fr") else "Senior Detective 🌟"
    elif user.score_total >= 1000:
        rank_title = "Enquêteur Confirmé 🔍" if lang.startswith("fr") else "Experienced Investigator 🔍"
    elif user.score_total >= 500:
        rank_title = "Détective Novice 🔎" if lang.startswith("fr") else "Junior Detective 🔎"
    else:
        rank_title = "Apprenti Détective 📋" if lang.startswith("fr") else "Rookie Detective 📋"

    # Récupération des badges
    badges_read: List[UserBadgeRead] = []
    for ub in user.badges:
        badge = session.get(Badge, ub.badge_id)
        if badge:
            badges_read.append(
                UserBadgeRead(
                    code=badge.code,
                    name=badge.name_fr if lang.startswith("fr") else badge.name_en,
                    description=badge.description_fr if lang.startswith("fr") else badge.description_en,
                    icon_name=badge.icon_name,
                    unlocked_at=ub.unlocked_at
                )
            )

    # Calcul du multiplicateur de série (ex: 1.0 + 0.1 par victoire d'affilée, max 2.0x)
    multiplier = round(1.0 + min(0.5, user.current_streak * 0.1), 1)

    # Calcul de la précision moyenne à partir des progressions
    progresses = session.exec(select(UserProgress).where(UserProgress.user_id == user.id, UserProgress.completed == True)).all()
    if progresses:
        avg_score = sum(p.score_obtained for p in progresses) / len(progresses)
        accuracy_pct = int(round(min(100, (avg_score / 1000.0) * 100)))
    else:
        accuracy_pct = 100 if user.cases_completed_count > 0 else 0

    return UserProfileRead(
        id=user.id,
        username=user.username,
        is_guest=user.is_guest,
        score_total=user.score_total,
        cases_completed_count=user.cases_completed_count,
        current_streak=user.current_streak,
        best_streak=user.best_streak,
        streak_multiplier=multiplier,
        average_accuracy_percentage=accuracy_pct,
        is_search_mode_unlocked=(user.cases_completed_count >= settings.UNLOCK_SEARCH_MODE_THRESHOLD),
        rank_title=rank_title,
        badges=badges_read
    )
