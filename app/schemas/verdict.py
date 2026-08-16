from typing import List, Optional, Union
from pydantic import BaseModel

class VerdictSubmit(BaseModel):
    user_id: Union[int, str]
    user_verdict_decision: Optional[str] = "fake"
    decision: Optional[str] = None
    user_conclusion_text: Optional[str] = None
    conclusion: Optional[str] = None
    selected_technique_codes: Optional[List[str]] = []
    lang: Optional[str] = "fr"

class TechniqueFeedback(BaseModel):
    code: str
    name: str
    status: str
    explanation: str

class BadgeUnlocked(BaseModel):
    code: str
    name: str
    description: str
    icon_name: str

class VerdictResult(BaseModel):
    case_id: int
    case_title: Optional[str] = ""
    user_verdict_decision: Optional[str] = "fake"
    is_case_fake: Optional[bool] = True
    is_verdict_correct: Optional[bool] = True
    score: int
    stars: int = 3
    correct_techniques_count: int = 0
    total_expected_techniques_count: int = 1
    ai_pedagogical_feedback: str = ""
    rank_title: Optional[str] = "Détective"
    score_total: Optional[int] = 0
    unlocked_badges: List[BadgeUnlocked] = []
    techniques_feedback: List[TechniqueFeedback] = []
