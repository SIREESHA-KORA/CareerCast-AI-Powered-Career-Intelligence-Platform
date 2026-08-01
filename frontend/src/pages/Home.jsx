import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, Upload, Target, Award, ArrowRight, CheckCircle, Zap, Shield, Cpu, BarChart3 } from 'lucide-react';

export default function Home() {
  const workflowSteps = [
    { num: '01', title: 'Upload Resume', desc: 'Drag & drop PDF or DOCX file for automatic text & entity parsing.', icon: Upload },
    { num: '02', title: 'NLP Extraction', desc: 'Extract candidate skills, education, experience, and certifications.', icon: Cpu },
    { num: '03', title: 'ML Prediction', desc: 'TF-IDF + Logistic Regression pipeline predicts top matching career.', icon: Sparkles },
    { num: '04', title: 'Skill Gap Analysis', desc: 'Compare candidate profile against target job role requirements.', icon: Target },
    { num: '05', title: 'Learning Roadmap', desc: 'Access curated courses, certifications, and step-by-step roadmaps.', icon: Award },
  ];

  const features = [
    { title: '97.3% Model Accuracy', desc: 'Trained on comprehensive tech & engineering resume datasets with Stratified K-Fold validation.', icon: Shield },
    { title: 'Top 5 Career Alternatives', desc: 'Multi-class probability distribution showcasing top 5 career recommendations with confidence scores.', icon: BarChart3 },
    { title: 'Interactive Profile Editor', desc: 'Review and refine parsed resume information in real-time before running predictions.', icon: Zap },
    { title: 'Executive Report Export', desc: 'Download a clean, formatted PDF report complete with skill breakdown and roadmap.', icon: Award },
  ];

  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 emerald-hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-8 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI-Driven Career Intelligence Engine v1.0</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight mb-6">
            Predict Your Next Career Move With <span className="emerald-gradient-text">Precision Machine Learning</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            CareerCast analyzes your resume using Natural Language Processing, predicts your optimal career path, uncovers missing skill gaps, and generates a personalized learning roadmap.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <NavLink
              to="/upload"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-600/25 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Resume & Start Free</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>

            <NavLink
              to="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-sm transition-all duration-200"
            >
              <span>View Architecture & NLP</span>
            </NavLink>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16 pt-10 border-t border-slate-200/80 text-left">
            <div className="glass-card p-4 rounded-xl">
              <span className="text-2xl font-bold text-slate-900">97.3%</span>
              <span className="block text-xs font-semibold text-slate-500 uppercase mt-0.5">Model Accuracy</span>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <span className="text-2xl font-bold text-slate-900">15+</span>
              <span className="block text-xs font-semibold text-slate-500 uppercase mt-0.5">Career Domains</span>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <span className="text-2xl font-bold text-slate-900">1,000+</span>
              <span className="block text-xs font-semibold text-slate-500 uppercase mt-0.5">Skill Keywords</span>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <span className="text-2xl font-bold text-slate-900">&lt; 2 Sec</span>
              <span className="block text-xs font-semibold text-slate-500 uppercase mt-0.5">NLP Processing</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Workflow Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
            System Workflow
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-3 tracking-tight">How CareerCast Operates</h2>
          <p className="text-slate-600 mt-2 text-sm">From raw document upload to tailored career roadmaps in five automated steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {workflowSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="glass-card p-5 rounded-2xl relative group hover:border-emerald-300 transition-all duration-300">
                <div className="text-3xl font-extrabold text-slate-200 mb-3 font-heading">{step.num}</div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="glass-card p-6 rounded-2xl flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-500/20">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">{feat.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-10 text-white text-center shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Unlock Your AI Career Recommendations?</h2>
            <p className="text-emerald-100 text-sm mb-8">Upload your resume in PDF or DOCX format and get instant predictions with skill gap analysis.</p>
            <NavLink
              to="/upload"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-slate-900 bg-white hover:bg-emerald-50 shadow-lg transition-all transform hover:scale-105"
            >
              <Upload className="w-4 h-4 text-emerald-600" />
              <span>Upload Resume Now</span>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}
