# CareerCast – AI Powered Career Intelligence Platform

CareerCast is a full-stack, production-ready AI platform that analyzes resumes using Natural Language Processing (NLP) and Machine Learning (ML), predicts the most suitable career path, recommends top 5 alternative career options, performs skill gap analysis, provides custom learning roadmaps, and offers a comprehensive SaaS dashboard with downloadable PDF executive reports.

---

## 🌟 Key Features & Modules

- **Module 1: Dataset Processing**: Preprocessing pipeline with null handling, text normalization, feature engineering, and TF-IDF tokenization.
- **Module 2: Machine Learning**: Reuses pre-trained TF-IDF Vectorizer + Logistic Regression pipeline and LabelEncoder achieving 97.3% accuracy.
- **Module 3: Resume Parsing**: Extracts Name, Email, Phone, Skills, Education, Experience, Projects, and Certifications from PDF & DOCX resumes using SpaCy NLP and PDFPlumber.
- **Module 4: Career Prediction**: Displays primary predicted career, match confidence percentage, description, and target industries.
- **Module 5: Top 5 Career Recommendations**: Multi-class probability distribution ranking top 5 career recommendations.
- **Module 6: Skill Gap Analysis**: Interactive matrix comparing candidate's current skills against target role required skills.
- **Module 7: Learning Recommendations**: Curated industry certifications, online courses, and step-by-step 4-phase learning roadmap.
- **Module 8: Executive Dashboard**: SaaS analytics dashboard with Chart.js visualizations (Skill Distribution, Confidence Graph, Demand Trends) and one-click PDF report export.
- **Module 9: Admin Portal**: Monitor model metrics, upload new dataset CSVs, and trigger model retraining.

---

## 🎨 Design System (Light SaaS Theme)

- **Primary Background**: Pure White (`#FFFFFF`) and Soft Gray (`#F8FAFC`).
- **Accent Colors**: Vibrant Emerald (`#059669` / `#10B981`) and Light Teal (`#0D9488`).
- **Visual Features**: Clean card containers, glassmorphism (`backdrop-blur-md bg-white/80`), soft shadows, rounded corners, responsive layouts.

---

## 🏗️ Project Architecture

```
CareerCast/
├── backend/
│   ├── app/
│   │   ├── api/             # FastAPI Routers (resume, prediction, skills, learning, dashboard, admin)
│   │   ├── core/            # Configuration Settings
│   │   ├── services/        # Resume Parser, Skill Service, Learning Service, Report Service
│   │   ├── ml/              # Model Inference Pipeline & Artifact Manager
│   │   └── schemas/         # Pydantic Request & Response Schemas
│   └── main.py              # FastAPI Web Server Entrypoint
├── frontend/
│   ├── src/
│   │   ├── components/      # Navbar, Footer, SkillBadge, StatCard, Charts, Toast
│   │   ├── pages/           # Home, ResumeUpload, CareerPrediction, SkillGap, LearningResources, Dashboard, About, Admin
│   │   ├── services/        # Axios API Client
│   │   └── index.css        # Tailwind & Glassmorphic SaaS Styling
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── data/
│   └── raw/                 # Training dataset, job role catalog, skill database
├── models/                  # Serialized careercast_pipeline.pkl, label_encoder.pkl, metrics.json
├── uploads/                 # Storage for uploaded PDF/DOCX resumes
├── reports/                 # Storage for generated PDF reports
├── requirements.txt
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Backend Setup (FastAPI & ML Engine)

```bash
# Navigate to root directory
cd CareerCast1

# Install Python dependencies
py -3 -m pip install -r requirements.txt

# Start FastAPI server (runs on http://localhost:8000)
py -3 -m uvicorn backend.main:app --reload --port 8000
```

FastAPI Interactive API Documentation is available at: `http://localhost:8000/docs`

---

### 2. Frontend Setup (React + Vite)

```bash
# Navigate to frontend directory
cd frontend

# Install Node modules
npm install

# Start Vite development server (runs on http://localhost:3000)
npm run dev
```

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/resume/upload` | Upload PDF/DOCX resume & return parsed JSON profile |
| `POST` | `/api/predict` | Run ML model inference & return top 5 recommendations |
| `POST` | `/api/skill-gap` | Compare candidate skills against target role required skills |
| `GET` | `/api/learning-resources/{role}` | Fetch courses, certifications, and 4-phase growth roadmap |
| `GET` | `/api/dashboard/stats` | Fetch aggregate metrics & skill frequency data for charts |
| `POST` | `/api/dashboard/generate-report` | Generate & download PDF executive summary report |
| `GET` | `/api/admin/metrics` | View model evaluation metrics and dataset status |
| `POST` | `/api/admin/retrain` | Trigger model retraining pipeline |

---

## 🏆 Final Deliverables

- Production-grade React frontend built with Vite, Tailwind CSS, Framer Motion, and Chart.js.
- FastAPI backend serving ML model inference with 97.3% accuracy.
- NLP resume parser supporting PDF and DOCX formats.
- PDF Executive Report generator.
