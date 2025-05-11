from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    model_path: str = "models/chd_model_weights.pth"

settings = Settings()
