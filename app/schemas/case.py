from typing import List, Optional
from pydantic import BaseModel

class TechniqueRead(BaseModel):
    id: int
    code: str
    name: str
    description: str
    icon: str
    category: str

class EvidenceRead(BaseModel):
    id: int
    title: str
    evidence_type: str
    content: str
    image_url: Optional[str] = None
    clue_hint: Optional[str] = None
    order_index: int

class WitnessRead(BaseModel):
    name: str
    role: str
    avatar: str
    intro: Optional[str] = None

class CaseListRead(BaseModel):
    id: int
    title: str
    summary: str
    witness: WitnessRead
    difficulty: str
    estimated_time_minutes: int
    category: str
    unlock_level: int
    is_demo: bool
    is_fake: bool
    is_unlocked: bool = True # Indique si l'affaire est débloquée pour ce joueur
    completed: bool = False
    best_score: Optional[int] = None

class CaseDetailRead(BaseModel):
    id: int
    title: str
    summary: str
    brief: str
    witness: WitnessRead
    suggested_questions: List[str] = []
    evidences: List[EvidenceRead]
    available_techniques: List[TechniqueRead]
    difficulty: str
    estimated_time_minutes: int
    category: str
    unlock_level: int
    is_demo: bool
    is_fake: bool
    is_unlocked: bool = True
