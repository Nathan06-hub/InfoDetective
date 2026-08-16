from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship

class CaseTechniqueLink(SQLModel, table=True):
    case_id: Optional[int] = Field(default=None, foreign_key="case.id", primary_key=True)
    technique_id: Optional[int] = Field(default=None, foreign_key="manipulationtechnique.id", primary_key=True)

class Case(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title_fr: str
    title_en: str
    summary_fr: str
    summary_en: str
    brief_fr: str
    brief_en: str
    
    # Information Témoin
    witness_name: str
    witness_role_fr: str
    witness_role_en: str
    witness_avatar: str
    witness_system_prompt_fr: str
    witness_system_prompt_en: str
    
    # Questions prédéfinies suggérées pour le joueur
    suggested_questions_fr: str = Field(default="[]") # JSON List of string questions
    suggested_questions_en: str = Field(default="[]")
    
    difficulty: str = Field(default="medium") # easy, medium, hard
    estimated_time_minutes: int = Field(default=5)
    category: str = Field(default="general") # health, environment, tech, science, society
    unlock_level: int = Field(default=1) # Niveau/ordre de déblocage en Mode Aventure
    is_active: bool = Field(default=True)
    is_demo: bool = Field(default=False)
    is_fake: bool = Field(default=True) # True = Rumeur fausse / manipulée, False = Information authentique / vérifiée
    
    evidences: List["Evidence"] = Relationship(back_populates="case")
    techniques: List["ManipulationTechnique"] = Relationship(
        back_populates="cases", link_model=CaseTechniqueLink
    )

class Evidence(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    case_id: int = Field(foreign_key="case.id")
    title_fr: str
    title_en: str
    evidence_type: str # screenshot, graphic, document, image, social_post
    content_fr: str # description ou texte contenu dans la preuve
    content_en: str
    image_url: Optional[str] = None
    clue_hint_fr: Optional[str] = None
    clue_hint_en: Optional[str] = None
    order_index: int = Field(default=1)
    
    case: Optional[Case] = Relationship(back_populates="evidences")

class ManipulationTechnique(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    code: str = Field(unique=True, index=True) # ex: source_absente, stat_trompeuse, appel_emotion, image_hors_contexte
    name_fr: str
    name_en: str
    description_fr: str
    description_en: str
    icon: str = Field(default="alert-circle")
    category: str = Field(default="manipulation") # emotion, source, visual, logic
    
    cases: List[Case] = Relationship(
        back_populates="techniques", link_model=CaseTechniqueLink
    )
