import os

class Settings:
    PROJECT_NAME: str = "CareerCast AI - Career Intelligence Platform"
    API_V1_STR: str = "/api"
    
    # Root directory of CareerCast1 project (4 levels up from config.py)
    CORE_DIR: str = os.path.dirname(os.path.abspath(__file__))
    APP_DIR: str = os.path.dirname(CORE_DIR)
    BACKEND_DIR: str = os.path.dirname(APP_DIR)
    BASE_DIR: str = os.path.dirname(BACKEND_DIR)
    
    MODELS_DIR: str = os.path.join(BASE_DIR, "models")
    DATA_DIR: str = os.path.join(BASE_DIR, "data", "raw")
    UPLOADS_DIR: str = os.path.join(BASE_DIR, "uploads")
    REPORTS_DIR: str = os.path.join(BASE_DIR, "reports")
    
    PIPELINE_PATH: str = os.path.join(MODELS_DIR, "careercast_pipeline.pkl")
    LABEL_ENCODER_PATH: str = os.path.join(MODELS_DIR, "label_encoder.pkl")
    METRICS_PATH: str = os.path.join(MODELS_DIR, "metrics.json")
    
    JOB_ROLES_CSV: str = os.path.join(DATA_DIR, "job_roles.csv")
    SKILLS_DATABASE_JSON: str = os.path.join(DATA_DIR, "skills_database.json")
    SKILLS_LIST_CSV: str = os.path.join(DATA_DIR, "skills_list.csv")
    TEST_RESUMES_JSON: str = os.path.join(DATA_DIR, "test_resumes.json")
    TRAINING_DATA_CSV: str = os.path.join(DATA_DIR, "training_data.csv")

settings = Settings()
