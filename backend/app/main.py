from fastapi import FastAPI, UploadFile, File
from PIL import Image
from app.inference import CHDModel
from app.config import settings
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

app = FastAPI()

origins = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:5173",  # optional: if using Vite
    "http://127.0.0.1:5173",
    "https://chd-aomr6htf3-anas-projects-335f1227.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["*"] to allow all (for testing only)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
model = CHDModel(settings.model_path)

# In-memory history storage
prediction_history = []

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = Image.open(file.file).convert("L")
    result = model.predict(image)
    # Add timestamp and store in history (exclude gradcam for history, or keep as needed)
    record = {
        "result": result["prediction"],
        "confidence": result["confidence"],
        "timestamp": datetime.utcnow().isoformat() + "Z",
        # Optionally: "gradcam": result["gradcam"]
    }
    prediction_history.append(record)
    print(result)
    return result

@app.get("/history")
def get_history():
    return prediction_history  
