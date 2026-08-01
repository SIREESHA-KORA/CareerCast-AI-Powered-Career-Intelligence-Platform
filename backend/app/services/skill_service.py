from typing import List, Dict, Set
from app.ml.model_manager import model_manager

def normalize_skill(skill: str) -> str:
    return skill.strip().lower()

def analyze_skill_gap(user_skills: List[str], target_role: str) -> Dict:
    """
    Compares candidate's skills against required skills for target job role.
    """
    role_info = model_manager.get_job_role_info(target_role)
    required_skills = role_info.get("required_skills", ["Problem Solving", "Communication"])

    user_set = {normalize_skill(s) for s in user_skills if s.strip()}
    req_set = {normalize_skill(s) for s in required_skills if s.strip()}

    matched = []
    missing = []

    for req in req_set:
        # Check exact or partial substring match
        is_matched = any(req in u or u in req for u in user_set)
        if is_matched:
            # Find original formatting
            matched.append(req.title())
        else:
            missing.append(req.title())

    total_required = len(req_set) if req_set else 1
    match_score = round((len(matched) / total_required) * 100, 1)

    # Suggested additional high-value skills for the domain
    suggested = [m for m in missing]
    if len(suggested) < 3:
        domain_extras = ["Cloud Computing", "CI/CD Pipelines", "System Design", "Agile Methodologies"]
        for extra in domain_extras:
            if normalize_skill(extra) not in user_set and extra not in suggested:
                suggested.append(extra)

    return {
        "target_role": target_role,
        "matched_skills": sorted(list(set(matched))),
        "missing_skills": sorted(list(set(missing))),
        "total_required": total_required,
        "match_score": match_score,
        "suggested_skills": sorted(list(set(suggested)))[:6]
    }
