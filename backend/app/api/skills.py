from fastapi import APIRouter
from backend.app.schemas.models import SkillGapRequest, SkillGapResponse
from backend.app.services.skill_service import analyze_skill_gap

router = APIRouter(prefix="/skill-gap", tags=["Skill Gap Analysis"])

@router.post("", response_model=SkillGapResponse)
def get_skill_gap(req: SkillGapRequest):
    result = analyze_skill_gap(req.user_skills, req.target_role)
    return result
