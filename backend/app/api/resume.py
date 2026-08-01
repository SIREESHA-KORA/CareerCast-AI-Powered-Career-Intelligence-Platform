import os
import shutil
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.parser_service import parse_resume_file
from app.schemas.models import ResumeParsedData
from app.core.config import settings

router = APIRouter(prefix="/resume", tags=["Resume Parsing"])

@router.post("/upload", response_model=ResumeParsedData)
async def upload_and_parse_resume(file: UploadFile = File(...)):
    filename = file.filename
    ext = os.path.splitext(filename)[1].lower()
    
    if ext not in [".pdf", ".docx", ".doc"]:
        raise HTTPException(status_code=400, detail="Unsupported file format. Please upload PDF or DOCX.")

    os.makedirs(settings.UPLOADS_DIR, exist_ok=True)
    saved_filepath = os.path.join(settings.UPLOADS_DIR, filename)

    with open(saved_filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        parsed_result = parse_resume_file(saved_filepath)
        return parsed_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse resume: {str(e)}")
