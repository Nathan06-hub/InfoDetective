from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str

class UserBadgeRead(BaseModel):
    code: str
    name: str
    description: str
    icon_name: str
    unlocked_at: datetime

class UserProfileRead(BaseModel):
    id: int
    username: str
    is_guest: bool
    score_total: int
    cases_completed_count: int
    current_streak: int = 0
    best_streak: int = 0
    streak_multiplier: float = 1.0 # Multiplicateur de score (ex: 1.2x)
    average_accuracy_percentage: int = 100 # Précision moyenne (0-100%)
    is_search_mode_unlocked: bool = False # True dès que cases_completed_count >= 3
    rank_title: str
    badges: List[UserBadgeRead] = []

class LeaderboardEntry(BaseModel):
    rank: int
    username: str
    score_total: int
    cases_completed_count: int
    badges_count: int
