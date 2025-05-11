# 🫀 CHD Image Classification - Backend

This is the backend API for the **Congenital Heart Disease (CHD) Image Classification** project.  
It provides a RESTful interface to serve a PyTorch-based deep learning model that classifies medical images related to congenital heart disease.

---

## 📦 Features

- Loads a pre-trained `.pth` PyTorch model for image classification  
- Accepts image uploads via REST API  
- Returns predictions in JSON format  
- Built with **FastAPI** for fast and easy development  
- Dockerized for deployment consistency  

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AnasAlmana/CHD.git
cd CHD/backend
```

### 2. Install Dependencies

> Recommended to use a virtual environment

```bash
pip install -r requirements.txt
```

### 3. Run the Server

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

---

## 🐳 Docker Support

### Build the image

```bash
docker build -t chd-backend .
```

### Run the container

```bash
docker run -p 8000:8000 chd-backend
```

---

## 📂 Project Structure

```
backend/
├── app/
│   ├── main.py             # FastAPI app entrypoint
│   ├── model.py            # Model loading and prediction logic
│   └── utils.py            # Preprocessing helpers
├── models/
│   └── model.pth           # Trained PyTorch model
├── requirements.txt        # Python dependencies
└── Dockerfile              # For containerized deployment
```

---

## 🔗 API Endpoints

### `POST /predict`

Uploads an image and returns prediction results.

#### Request

- Content-Type: `multipart/form-data`
- Form field: `file` (image file)

#### Response

```json
{
  "class": "Normal",
  "confidence": 0.987
}
```

---

## 🧪 Testing

Use tools like **cURL** or **Postman**:

```bash
curl -X POST http://localhost:8000/predict \
  -F "file=@/path/to/image.png"
```

---

## 🧠 Model Info

- Format: PyTorch `.pth`
- Expected input: 2D grayscale medical image (e.g., X-ray or scan)
- Output: Class probabilities and predicted label

> Make sure the model file `model.pth` is placed in the `models/` directory.

---

## 👨‍⚕️ About

This backend supports a research-focused application to assist in early diagnosis of congenital heart diseases from medical imagery.
