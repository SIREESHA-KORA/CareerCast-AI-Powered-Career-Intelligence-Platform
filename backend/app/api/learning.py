from fastapi import APIRouter
from app.schemas.models import LearningResponse
from app.services.learning_service import get_learning_resources

router = APIRouter(prefix="/learning-resources", tags=["Learning Recommendations"])

@router.get("/{target_role}", response_model=LearningResponse)
def get_learning_for_role(target_role: str):
    res = get_learning_resources(target_role)
    return res
