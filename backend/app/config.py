from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    model_path: str = "models/resnet50_chd_model.pth"

settings = Settings()
