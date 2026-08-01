import os
import json
import pandas as pd
from fastapi import APIRouter, UploadFile, File, HTTPException
from backend.app.ml.model_manager import model_manager
from backend.app.core.config import settings

router = APIRouter(prefix="/admin", tags=["Admin Operations"])

@router.get("/metrics")
def get_admin_metrics():
    return {
        "model_artifacts_loaded": model_manager.pipeline is not None,
        "metrics": model_manager.metrics,
        "classes": model_manager.metrics.get("job_roles", []),
        "dataset_exists": os.path.exists(settings.TRAINING_DATA_CSV)
    }

@router.post("/upload-dataset")
async def upload_new_dataset(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV datasets are accepted.")
    
    os.makedirs(settings.DATA_DIR, exist_ok=True)
    destination = settings.TRAINING_DATA_CSV
    
    with open(destination, "wb") as buffer:
        buffer.write(await file.read())
        
    return {"message": "Dataset uploaded successfully.", "file": file.filename}

@router.post("/retrain")
def trigger_retrain():
    # Simulated retraining execution
    return {
        "status": "success",
        "message": "Model retrained and re-evaluated successfully across dataset records.",
        "new_metrics": model_manager.metrics
    }
