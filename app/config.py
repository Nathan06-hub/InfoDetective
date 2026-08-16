import json
from typing import List, Union
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    ENVIRONMENT: str = "development"
    DATABASE_URL: str = "sqlite:///./infodetective.db"
    GEMINI_API_KEY: str = ""
    MOCK_DEMO_MODE: bool = False
    CORS_ORIGINS: Union[List[str], str] = ["*"]
    SECRET_KEY: str = "infodetective-hackathon-2026-secret-key"
    UNLOCK_SEARCH_MODE_THRESHOLD: int = 3 # Nombre d'affaires requises (3 pour démo hackathon, 10 pour prod)

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str):
            if v.startswith("[") and v.endswith("]"):
                try:
                    return json.loads(v)
                except Exception:
                    pass
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        return v

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
