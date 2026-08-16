from datetime import datetime, timezone
from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship

class Badge(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    code: str = Field(unique=True, index=True) # ex: first_case, source_master, perfect_score
    name_fr: str
    name_en: str
    description_fr: str
    description_en: str
    icon_name: str = Field(default="shield-check")
    category: str = Field(default="achievement")
    
    user_badges: List["UserBadge"] = Relationship(back_populates="badge")

class UserBadge(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    badge_id: int = Field(foreign_key="badge.id")
    unlocked_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    
    user: Optional["User"] = Relationship(back_populates="badges")
    badge: Optional[Badge] = Relationship(back_populates="user_badges")
