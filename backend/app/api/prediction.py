from fastapi import APIRouter, HTTPException
from backend.app.schemas.models import PredictRequest, PredictionResponse
from backend.app.ml.model_manager import model_manager

router = APIRouter(prefix="/predict", tags=["Career Prediction"])

@router.post("", response_model=PredictionResponse)
def predict_career(req: PredictRequest):
    combined_input = f"{req.resume_text} {req.education} {req.experience_years} {req.skills}".strip()
    if not combined_input:
        combined_input = "Software developer proficient in Python, React, SQL, and data analysis"

    try:
        recommendations = model_manager.predict(combined_input, top_n=req.top_n)
        primary = recommendations[0]
        return {
            "primary_career": primary,
            "top_recommendations": recommendations
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")
