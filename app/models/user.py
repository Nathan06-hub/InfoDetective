from datetime import datetime, timezone
from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True)
    is_guest: bool = Field(default=True)
    score_total: int = Field(default=0)
    cases_completed_count: int = Field(default=0)
    current_streak: int = Field(default=0) # Séries d'enquêtes réussies
    best_streak: int = Field(default=0) # Meilleure série de victoires
    last_active_date: Optional[str] = None # Date de dernière activité YYYY-MM-DD
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    
    progress_records: List["UserProgress"] = Relationship(back_populates="user")
    badges: List["UserBadge"] = Relationship(back_populates="user")

class UserProgress(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    case_id: int = Field(foreign_key="case.id")
    completed: bool = Field(default=False)
    score_obtained: int = Field(default=0)
    verdict_json: str = Field(default="{}") # JSON string holding submitted techniques & details
    completed_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    
    user: Optional[User] = Relationship(back_populates="progress_records")
