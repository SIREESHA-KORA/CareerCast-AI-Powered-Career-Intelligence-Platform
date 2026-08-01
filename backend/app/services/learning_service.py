from typing import List, Dict, Any

LEARNING_DATABASE = {
    "Data Scientist": {
        "certifications": [
            {"name": "IBM Data Science Professional Certificate", "issuer": "Coursera / IBM", "difficulty": "Intermediate", "estimated_time": "3 Months"},
            {"name": "AWS Certified Machine Learning - Specialty", "issuer": "Amazon Web Services", "difficulty": "Advanced", "estimated_time": "4 Months"},
            {"name": "TensorFlow Developer Certificate", "issuer": "Google", "difficulty": "Intermediate", "estimated_time": "2 Months"}
        ],
        "courses": [
            {"title": "Machine Learning Specialization", "provider": "Coursera (Andrew Ng)", "level": "Beginner to Intermediate", "rating": 4.9, "link": "https://www.coursera.org/specializations/machine-learning-introduction"},
            {"title": "Deep Learning Specialization", "provider": "DeepLearning.AI", "level": "Advanced", "rating": 4.9, "link": "https://www.coursera.org/specializations/deep-learning"},
            {"title": "Python for Data Science and Machine Learning Bootcamp", "provider": "Udemy", "level": "All Levels", "rating": 4.7, "link": "https://www.udemy.com/"}
        ],
        "roadmap": [
            {"phase": "Phase 1: Foundations & Python Mastery", "duration": "Weeks 1 - 4", "goals": ["Master Python data structures", "Learn NumPy & Pandas data manipulation", "Understand vectorization & linear algebra"], "recommended_topics": ["Python 3.12", "Pandas DataFrames", "EDA & Matplotlib"]},
            {"phase": "Phase 2: Core Machine Learning", "duration": "Weeks 5 - 10", "goals": ["Supervised learning (Regression, Classification)", "Unsupervised learning (K-Means, PCA)", "Feature engineering & Scikit-Learn pipelines"], "recommended_topics": ["Logistic Regression", "Random Forests", "Gradient Boosting (XGBoost)"]},
            {"phase": "Phase 3: Deep Learning & NLP", "duration": "Weeks 11 - 16", "goals": ["Neural networks & PyTorch/TensorFlow", "Text processing & TF-IDF/Embeddings", "Model evaluation & hyperparameter tuning"], "recommended_topics": ["Transformer Architecture", "SpaCy & HuggingFace", "Cross-Validation"]},
            {"phase": "Phase 4: MLOps & Production Deployment", "duration": "Weeks 17 - 20", "goals": ["FastAPI model serving", "Containerization with Docker", "Monitoring & CI/CD deployment"], "recommended_topics": ["FastAPI", "Docker", "MLflow / BentoML"]}
        ]
    },
    "Software Engineer": {
        "certifications": [
            {"name": "AWS Certified Solutions Architect - Associate", "issuer": "Amazon Web Services", "difficulty": "Intermediate", "estimated_time": "3 Months"},
            {"name": "Oracle Certified Professional: Java SE Developer", "issuer": "Oracle", "difficulty": "Intermediate", "estimated_time": "3 Months"},
            {"name": "Meta Front-End & Back-End Developer Certificates", "issuer": "Meta", "difficulty": "Beginner", "estimated_time": "4 Months"}
        ],
        "courses": [
            {"title": "Data Structures and Algorithms Specialization", "provider": "UC San Diego / Coursera", "level": "Intermediate", "rating": 4.8, "link": "https://www.coursera.org/specializations/data-structures-algorithms"},
            {"title": "Full Stack Web Development with React & Node.js", "provider": "Udemy", "level": "All Levels", "rating": 4.7, "link": "https://www.udemy.com/"},
            {"title": "Building Scalable Microservices with FastAPI & Docker", "provider": "Pluralsight", "level": "Advanced", "rating": 4.8, "link": "https://www.pluralsight.com/"}
        ],
        "roadmap": [
            {"phase": "Phase 1: Programming & Data Structures", "duration": "Weeks 1 - 4", "goals": ["Master Object-Oriented Programming (OOP)", "Practice Big-O Time & Space Complexity", "Solve LeetCode Medium DSA problems"], "recommended_topics": ["Arrays, Linked Lists, Trees", "Sorting & Searching Algorithms", "Git & GitHub Workflow"]},
            {"phase": "Phase 2: Web Frameworks & System Design", "duration": "Weeks 5 - 10", "goals": ["Build RESTful APIs with FastAPI / Node.js", "Design SQL & NoSQL relational schemas", "Implement Authentication & JWT tokens"], "recommended_topics": ["FastAPI & Pydantic", "PostgreSQL & ORMs", "React / Vite Frontend"]},
            {"phase": "Phase 3: Cloud & Microservices Architecture", "duration": "Weeks 11 - 16", "goals": ["Docker containerization", "AWS EC2, S3, & Lambda serverless deployment", "Microservices communication with gRPC/REST"], "recommended_topics": ["Docker & Docker Compose", "AWS Basics", "Caching with Redis"]},
            {"phase": "Phase 4: System Scaling & CI/CD", "duration": "Weeks 17 - 20", "goals": ["GitHub Actions automated pipelines", "Load balancing & database replication", "Performance profiling & security auditing"], "recommended_topics": ["GitHub Actions", "Nginx Load Balancing", "Unit & Integration Testing"]}
        ]
    }
}

def get_learning_resources(target_role: str) -> Dict[str, Any]:
    # Match role or provide default comprehensive roadmap
    for role_key in LEARNING_DATABASE:
        if role_key.lower() in target_role.lower() or target_role.lower() in role_key.lower():
            res = LEARNING_DATABASE[role_key]
            res["target_role"] = target_role
            return res

    # Generic high quality software & tech roadmap
    return {
        "target_role": target_role,
        "certifications": [
            {"name": f"Professional Certification in {target_role}", "issuer": "Industry Leader", "difficulty": "Intermediate", "estimated_time": "3 Months"},
            {"name": "AWS Certified Cloud Practitioner", "issuer": "Amazon Web Services", "difficulty": "Beginner", "estimated_time": "1 Month"},
            {"name": "Google Professional Tech Leader", "issuer": "Google", "difficulty": "Advanced", "estimated_time": "4 Months"}
        ],
        "courses": [
            {"title": f"Mastering {target_role} - Full Specialization", "provider": "Coursera", "level": "All Levels", "rating": 4.8, "link": f"https://www.coursera.org/search?query={target_role.replace(' ', '%20')}"},
            {"title": f"Complete {target_role} Bootcamp", "provider": "Udemy", "level": "Beginner to Advanced", "rating": 4.7, "link": f"https://www.udemy.com/courses/search/?q={target_role.replace(' ', '%20')}"},
            {"title": "Modern Cloud Architecture & Agile Systems", "provider": "edX", "level": "Intermediate", "rating": 4.9, "link": "https://www.edx.org/"}
        ],
        "roadmap": [
            {"phase": "Phase 1: Core Fundamentals", "duration": "Weeks 1 - 4", "goals": ["Master core domain terminology", "Learn primary tooling & languages", "Complete foundational projects"], "recommended_topics": ["Domain Concepts", "Core Tools", "Best Practices"]},
            {"phase": "Phase 2: Applied Skills & Projects", "duration": "Weeks 5 - 10", "goals": ["Build 2 production-grade projects", "Integrate modern APIs & databases", "Collaborate via Git"], "recommended_topics": ["Project Building", "API Integration", "Database Management"]},
            {"phase": "Phase 3: Advanced Optimization & Scaling", "duration": "Weeks 11 - 16", "goals": ["Optimize performance bottlenecks", "Implement security standards", "Deploy to cloud infrastructure"], "recommended_topics": ["Performance Audit", "Cloud Infra", "Security"]},
            {"phase": "Phase 4: Interview Prep & Portfolio", "duration": "Weeks 17 - 20", "goals": ["Polishing GitHub portfolio", "Mock interviews & system design", "Resume optimization & networking"], "recommended_topics": ["System Design", "Behavioral Prep", "Portfolio Deployment"]}
        ]
    }
