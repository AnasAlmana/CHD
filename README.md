# 🫀 AI-Based Early Detection of Congenital Heart Defects (CHDs)

This project presents a complete AI-based system for the **early detection of Congenital Heart Defects (CHDs)** from medical images. It leverages deep learning to support clinicians, especially in low-resource settings, by providing fast, interpretable, and scalable diagnostic tools.

---

## 📌 Motivation

Congenital Heart Defects are the most common type of birth defect globally. However:

- Early detection is challenging, especially in infants
- There's a shortage of experienced pediatric cardiologists
- Conventional diagnostic tools (e.g., MRI, echocardiograms) are expensive and expert-dependent

This system offers an affordable, AI-assisted diagnostic pipeline deployable in rural clinics, mobile screening units, or telemedicine platforms.

---

## 🧠 System Components

### 1. Image Preprocessing
Standardizes medical images (e.g., X-rays, echo frames):
- Converts to grayscale
- Applies normalization and resizing
- Optimized for CNN input

### 2. Transfer Learning–Based Classifier
- Fine-tuned **ResNet50** architecture
- Classifies 4 categories:  
  `Normal`, `Atrial Septal Defect (ASD)`, `Ventricular Septal Defect (VSD)`, `Patent Ductus Arteriosus (PDA)`

### 3. GAN-Augmented Dataset
- Addresses class imbalance for rare CHD types
- Uses **Generative Adversarial Networks (GANs)** to create synthetic examples

### 4. Explainability with Grad-CAM
- Visual explanations highlight important image regions
- Supports transparency and clinician trust in AI predictions

### 5. Web-Based Interface (Prototype)
- Upload → Predict → Visual Explanation
- Simulates integration into clinical workflow

---

## 🗂 Project Structure

```
CHD/
├── backend/           # FastAPI-based model serving backend
│   └── ...            # (See backend/README for API details)
├── frontend/          # Streamlit prototype for user interaction
│   └── ...
├── models/            # Pretrained model weights (e.g., model.pth)
├── data/              # Example datasets (excluded from repo)
└── Technical Summary.pdf   # Concept and architecture overview
```

---

## 🚀 Running the Project

### 🐳 Using Docker Compose (Recommended)

The easiest way to run the entire project is using Docker Compose:

```bash
# Clone the repository
git clone https://github.com/AnasAlmana/CHD.git
cd CHD

# Build and start all services
docker-compose up --build
```

This will start both the frontend and backend services. The frontend will be available at `http://localhost:3000` and the backend API at `http://localhost:8000`.

### ⚙️ Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

or via Docker:

```bash
docker build -t chd-backend .
docker run -p 8000:8000 chd-backend
```

### 🖥 Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🌍 Use Cases

- **Rural and mobile clinics:** Early CHD screening without cardiologists
- **Refugee camps:** Low-cost, scalable diagnostics
- **Telemedicine platforms:** AI-powered second opinion
- **Medical training:** Educate junior doctors with visual explanations

---

## 🏆 Key Innovations

- Combines **transfer learning**, **GAN data augmentation**, and **Grad-CAM explainability**
- Designed for environments with **limited medical infrastructure**
- Focused on interpretability and usability in real-world settings


---


> ✨ *"Early detection saves lives — let AI lend a hand where it's needed most."*
