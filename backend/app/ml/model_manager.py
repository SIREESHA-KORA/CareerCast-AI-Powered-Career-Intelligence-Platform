import os
import joblib
import json
import numpy as np
import pandas as pd
from typing import List, Dict, Any
from app.core.config import settings

class MLModelManager:
    _instance = None

    def __init__(self):
        self.pipeline = None
        self.label_encoder = None
        self.metrics = {}
        self.job_roles_df = pd.DataFrame()
        self.skills_db = {}
        self.load_artifacts()

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = MLModelManager()
        return cls._instance

    def load_artifacts(self):
        """Loads machine learning pipeline and dataset metadata."""
        if os.path.exists(settings.PIPELINE_PATH):
            self.pipeline = joblib.load(settings.PIPELINE_PATH)
        else:
            print(f"[Warning] Pipeline model not found at {settings.PIPELINE_PATH}")

        if os.path.exists(settings.LABEL_ENCODER_PATH):
            self.label_encoder = joblib.load(settings.LABEL_ENCODER_PATH)
        else:
            print(f"[Warning] LabelEncoder not found at {settings.LABEL_ENCODER_PATH}")

        if os.path.exists(settings.METRICS_PATH):
            with open(settings.METRICS_PATH, "r", encoding="utf-8") as f:
                self.metrics = json.load(f)

        if os.path.exists(settings.JOB_ROLES_CSV):
            self.job_roles_df = pd.read_csv(settings.JOB_ROLES_CSV)

        if os.path.exists(settings.SKILLS_DATABASE_JSON):
            with open(settings.SKILLS_DATABASE_JSON, "r", encoding="utf-8") as f:
                self.skills_db = json.load(f)

    def get_job_role_info(self, role_name: str) -> Dict[str, Any]:
        """Retrieves detailed description, required skills, and industries for a role."""
        if self.job_roles_df.empty or "Job Role" not in self.job_roles_df.columns:
            return {
                "description": f"Professional position in {role_name}.",
                "required_skills": ["Problem Solving", "Communication", "Technical Skill"],
                "suitable_industries": ["Technology", "Enterprise", "Consulting"]
            }

        matched = self.job_roles_df[self.job_roles_df["Job Role"].str.lower() == role_name.lower()]
        if not matched.empty:
            row = matched.iloc[0]
            desc = row.get("Description", f"Key responsibility area for {role_name}.")
            req_skills = [s.strip() for s in str(row.get("Required Skills", "")).split("|") if s.strip()]
            industries = [i.strip() for i in str(row.get("Industries", "Technology, SaaS, Enterprise")).split(",") if i.strip()]
            return {
                "description": desc,
                "required_skills": req_skills if req_skills else ["Domain Knowledge", "Technical Expertise"],
                "suitable_industries": industries
            }
        
        return {
            "description": f"Specialized role focusing on key engineering & domain capabilities in {role_name}.",
            "required_skills": ["Problem Solving", "Analytics", "Domain Knowledge"],
            "suitable_industries": ["Technology", "Analytics", "Operations"]
        }

    def predict(self, input_text: str, top_n: int = 5) -> List[Dict[str, Any]]:
        """
        Runs TF-IDF vectorization and Logistic Regression inference.
        Returns top_n predicted roles with probabilities and detailed role descriptions.
        """
        if self.pipeline is None or self.label_encoder is None:
            # Fallback if model files missing
            return [
                {
                    "role": "Software Engineer",
                    "probability": 85.0,
                    "confidence_ratio": 0.85,
                    "description": "Develops, tests, and maintains scalable software applications.",
                    "required_skills": ["Python", "JavaScript", "SQL", "Git", "REST API"],
                    "suitable_industries": ["Software", "FinTech", "E-commerce"]
                }
            ]

        # Calculate class probabilities
        probs = self.pipeline.predict_proba([input_text])[0]
        top_indices = np.argsort(probs)[::-1][:top_n]

        results = []
        for idx in top_indices:
            role_name = self.label_encoder.inverse_transform([idx])[0]
            prob_pct = round(float(probs[idx] * 100), 2)
            info = self.get_job_role_info(role_name)
            
            results.append({
                "role": role_name,
                "probability": prob_pct,
                "confidence_ratio": round(float(probs[idx]), 4),
                "description": info["description"],
                "required_skills": info["required_skills"],
                "suitable_industries": info["suitable_industries"]
            })

        return results

model_manager = MLModelManager.get_instance()
