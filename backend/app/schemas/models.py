from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any

class ResumeParsedData(BaseModel):
    name: Optional[str] = "Candidate"
    email: Optional[str] = ""
    phone: Optional[str] = ""
    skills: List[str] = []
    education: List[str] = []
    experience: List[str] = []
    experience_years: Optional[str] = "2+ years"
    projects: List[str] = []
    certifications: List[str] = []
    raw_text: Optional[str] = ""

class PredictRequest(BaseModel):
    resume_text: Optional[str] = ""
    education: Optional[str] = ""
    experience_years: Optional[str] = ""
    skills: Optional[str] = ""
    top_n: int = 5

class CareerRecommendationItem(BaseModel):
    role: str
    probability: float
    confidence_ratio: float
    description: Optional[str] = ""
    required_skills: List[str] = []
    suitable_industries: List[str] = []

class PredictionResponse(BaseModel):
    primary_career: CareerRecommendationItem
    top_recommendations: List[CareerRecommendationItem]

class SkillGapRequest(BaseModel):
    user_skills: List[str]
    target_role: str

class SkillGapResponse(BaseModel):
    target_role: str
    matched_skills: List[str]
    missing_skills: List[str]
    total_required: int
    match_score: float
    suggested_skills: List[str]

class CourseItem(BaseModel):
    title: str
    provider: str
    level: str
    rating: float
    link: str

class CertificationItem(BaseModel):
    name: str
    issuer: str
    difficulty: str
    estimated_time: str

class RoadmapPhase(BaseModel):
    phase: str
    duration: str
    goals: List[str]
    recommended_topics: List[str]

class LearningResponse(BaseModel):
    target_role: str
    certifications: List[CertificationItem]
    courses: List[CourseItem]
    roadmap: List[RoadmapPhase]

class DashboardStatsResponse(BaseModel):
    total_resumes_analyzed: int
    top_predicted_roles: List[Dict[str, Any]]
    skill_distribution: Dict[str, int]
    accuracy_metrics: Dict[str, Any]
