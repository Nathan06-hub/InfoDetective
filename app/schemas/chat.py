from datetime import datetime
from typing import List, Optional, Union
from pydantic import BaseModel
from app.schemas.case import EvidenceRead

class ChatMessageCreate(BaseModel):
    user_id: Union[int, str]
    message: str
    lang: Optional[str] = "fr"

class ChatMessageRead(BaseModel):
    id: int
    sender: str
    content: str
    timestamp: datetime

class ChatResponse(BaseModel):
    reply: str = ""
    witness_reply: str = ""
    witness_name: str = ""
    typing_delay_ms: int = 1200
    is_mock: bool = False
    unlocked_evidences: List[EvidenceRead] = []
    evidence_unlocked: List[int] = []
    messages_history: List[ChatMessageRead] = []
