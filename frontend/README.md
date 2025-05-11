# 🫀 CHD Image Classifier – Frontend

This is the frontend of the **CHD (Congenital Heart Disease) Image Classification System**, providing an interactive dashboard to upload medical images and visualize classification results. It connects to a FastAPI backend for inference.

---

## 🚀 Features

- 🖼️ Drag & drop image upload (PNG, JPG, DICOM)
- 🔍 Live image preview before submission
- ⚡ Backend integration via `/predict` endpoint
- 📊 Classification result with confidence score and timestamp
- 🎨 Modern UI using Tailwind CSS + shadcn/ui
- ⚙️ Built with Vite + React + TypeScript
- 🐳 Docker-ready for production

---

## 📂 Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   └── Upload.tsx          # Main upload page
│   ├── components/             # UI components
│   ├── App.tsx                 # App entry point
│   ├── main.tsx                # Mount React app
│   └── ...
├── public/                     # Static assets
├── Dockerfile                  # Docker build config
├── package.json                # Project dependencies
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite config
└── README.md                   # You're here
```

---

## ⚙️ Local Development

1. Install dependencies

   ```bash
   npm install
   ```

2. Create a `.env` file to configure the backend API URL

   ```env
   VITE_API_URL=http://localhost:8000
   ```

3. Start the development server

   ```bash
   npm run dev
   ```

   Access the app at [http://localhost:5173](http://localhost:5173)

---

## 🐳 Docker Deployment

To build and run the frontend using Docker:

```bash
docker build -t chd-frontend .
docker run -p 8080:80 chd-frontend
```

Or with Docker Compose:

```bash
docker-compose up --build
```

The app will be available at [http://localhost:8080](http://localhost:8080)

---

## 🔌 Backend API Expectations

The frontend expects the backend to expose the following:

```
POST /predict
Content-Type: multipart/form-data
```

Sample response:

```json
{
  "prediction": "ASD",
  "confidence": 97.2
}
```