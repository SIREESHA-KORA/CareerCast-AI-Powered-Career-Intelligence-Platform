import React from 'react';
import { Info, Sparkles, CheckCircle2, Cpu, Code2, Database, Shield, Terminal, User } from 'lucide-react';

export default function About() {
  const modules = [
    { num: 'Module 1', name: 'Dataset Processing', desc: 'Loading raw CSV datasets, handling missing values, text cleaning, feature engineering, and combined text tokenization.' },
    { num: 'Module 2', name: 'Machine Learning', desc: 'TF-IDF vectorizer, Logistic Regression multi-class classifier, Label Encoder, model serialization (joblib).' },
    { num: 'Module 3', name: 'Resume Parsing', desc: 'PDF & DOCX file extraction with PDFPlumber and python-docx, spaCy NLP entity extraction (Name, Email, Phone, Skills, Education, Experience).' },
    { num: 'Module 4', name: 'Career Prediction', desc: 'Predicting primary optimal career role with confidence percentage and detailed role overview.' },
    { num: 'Module 5', name: 'Career Recommendation', desc: 'Multi-class probability ranking generating Top 5 career recommendations with required skill sets.' },
    { num: 'Module 6', name: 'Skill Gap Analysis', desc: 'Candidate vs target role comparison matrix categorizing existing skills, missing skills, and recommended additions.' },
    { num: 'Module 7', name: 'Learning Recommendations', desc: 'Curated industry certifications, online course links, and 4-phase career growth roadmap timeline.' },
    { num: 'Module 8', name: 'Executive Dashboard', desc: 'SaaS analytics platform with Chart.js visualizations, metric summary widgets, and PDF report generation.' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3 border border-emerald-200">
          <Info className="w-3.5 h-3.5 text-emerald-600" />
          <span>System Architecture & Overview</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">About CareerCast AI Platform</h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          CareerCast is an AI-powered career recommendation platform designed to analyze resumes using Machine Learning and Natural Language Processing, predict optimal career matches, identify skill gaps, and guide professional growth.
        </p>
      </div>

      {/* Problem Statement & Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card rounded-2xl p-6 border border-slate-200/80 space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span> Problem Statement
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Students and job seekers often struggle to identify the most suitable career path based on their resume, education, skills, and experience. They usually apply for job positions without understanding which roles match their profile or which skills they need to improve for long-term career growth.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-200/80 space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-600"></span> Primary Objectives
          </h2>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Parse uploaded PDF & DOCX resumes cleanly into structured data entities.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Predict top career role with confidence score using TF-IDF + Logistic Regression.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Provide Top 5 recommendations and evaluate candidate skill gaps.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Technology Stack Grid */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-emerald-600" />
          <span>Full-Stack Technology Architecture</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-xs">
          <div className="glass-card rounded-2xl p-5 border border-slate-200/80">
            <Code2 className="w-6 h-6 text-emerald-600 mb-3" />
            <h3 className="font-bold text-slate-900 text-sm mb-1">Frontend Layer</h3>
            <p className="text-slate-500 leading-relaxed">React 19, Vite, Tailwind CSS, Framer Motion, Lucide Icons, Chart.js.</p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-200/80">
            <Terminal className="w-6 h-6 text-teal-600 mb-3" />
            <h3 className="font-bold text-slate-900 text-sm mb-1">Backend REST API</h3>
            <p className="text-slate-500 leading-relaxed">FastAPI, Python 3.13, Pydantic, Uvicorn, ReportLab PDF Generator.</p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-200/80">
            <Cpu className="w-6 h-6 text-emerald-600 mb-3" />
            <h3 className="font-bold text-slate-900 text-sm mb-1">Machine Learning</h3>
            <p className="text-slate-500 leading-relaxed">Scikit-Learn, TF-IDF Vectorizer, Logistic Regression, Label Encoder, Joblib.</p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-200/80">
            <Database className="w-6 h-6 text-teal-600 mb-3" />
            <h3 className="font-bold text-slate-900 text-sm mb-1">NLP & Parsing</h3>
            <p className="text-slate-500 leading-relaxed">SpaCy (en_core_web_sm), PDFPlumber, Python-Docx, Regex parsing.</p>
          </div>
        </div>
      </div>

      {/* 8 Required Modules Breakdown */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <span>Core Modules Implementation</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((m, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-5 border border-slate-200/80 flex items-start gap-4">
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex-shrink-0">
                {m.num}
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{m.name}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Developer Card */}
      <div className="glass-card rounded-2xl p-8 border border-slate-200/80 text-center max-w-xl mx-auto space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20">
          <User className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-slate-900">CareerCast AI Development Team</h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Engineered as a full-stack, portfolio-grade SaaS application demonstrating machine learning model serialization, NLP parsing pipelines, and responsive web design.
        </p>
      </div>
    </div>
  );
}
