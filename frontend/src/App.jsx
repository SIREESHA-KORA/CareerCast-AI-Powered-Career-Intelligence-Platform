import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ResumeUpload from './pages/ResumeUpload';
import CareerPrediction from './pages/CareerPrediction';
import SkillGap from './pages/SkillGap';
import LearningResources from './pages/LearningResources';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Admin from './pages/Admin';

export default function App() {
  const [parsedData, setParsedData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 234-5678',
    skills: ['Python', 'SQL', 'React', 'FastAPI', 'Machine Learning', 'Git', 'Data Analysis'],
    education: ['Bachelor of Science in Computer Science'],
    experience: ['Software Engineer Intern at TechCorp (2025 - Present)'],
    experience_years: '2+ years',
    projects: ['AI-Powered Career Intelligence Platform', 'Full Stack E-Commerce Web App'],
    certifications: ['AWS Certified Cloud Practitioner', 'Google Data Analytics Certificate'],
    raw_text: 'Software Engineer skilled in Python, SQL, React, FastAPI, Machine Learning, Git, and Data Analysis.'
  });

  const [predictionResult, setPredictionResult] = useState(null);
  const [skillAnalysisResult, setSkillAnalysisResult] = useState(null);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900">
        <Navbar />
        <main className="flex-grow pt-8 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/upload"
              element={<ResumeUpload parsedData={parsedData} setParsedData={setParsedData} />}
            />
            <Route
              path="/predict"
              element={<CareerPrediction parsedData={parsedData} setPredictionResult={setPredictionResult} />}
            />
            <Route
              path="/skills"
              element={<SkillGap parsedData={parsedData} setSkillAnalysisResult={setSkillAnalysisResult} />}
            />
            <Route path="/learning" element={<LearningResources />} />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  parsedData={parsedData}
                  predictionResult={predictionResult}
                  skillAnalysisResult={skillAnalysisResult}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
