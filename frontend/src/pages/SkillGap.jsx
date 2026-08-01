import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Target, CheckCircle2, AlertCircle, Sparkles, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { analyzeSkillGap } from '../services/api';
import SkillBadge from '../components/SkillBadge';
import Toast from '../components/Toast';

export default function SkillGap({ parsedData, setSkillAnalysisResult }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState(location.state?.selectedRole || 'Software Engineer');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const candidateSkills = parsedData?.skills || ['Python', 'SQL', 'React', 'FastAPI', 'Git'];

  useEffect(() => {
    runSkillAnalysis();
  }, [selectedRole]);

  const runSkillAnalysis = async () => {
    setLoading(true);
    try {
      const data = await analyzeSkillGap(candidateSkills, selectedRole);
      setAnalysis(data);
      setSkillAnalysisResult(data);
    } catch (err) {
      setToast({ message: 'Failed to compute skill gap analysis.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleProceedToLearning = () => {
    navigate('/learning', { state: { selectedRole } });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2 border border-emerald-200">
            <Target className="w-3.5 h-3.5 text-emerald-600" />
            <span>Module 6 – Skill Gap Analysis Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Candidate vs Required Skill Matrix</h1>
          <p className="text-sm text-slate-600 mt-1">
            Compare candidate skills against industry standards to identify missing competency gaps.
          </p>
        </div>

        {/* Role Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-600 uppercase">Target Role:</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="text-xs font-semibold bg-white border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          >
            <option value="Software Engineer">Software Engineer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="Machine Learning Engineer">Machine Learning Engineer</option>
            <option value="Cloud Architect">Cloud Architect</option>
          </select>
        </div>
      </div>

      {analysis && (
        <>
          {/* Match Overview Banner */}
          <div className="glass-card rounded-2xl p-8 border border-slate-200/80 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200 uppercase">
                  Role: {analysis.target_role}
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-3">Skill Readiness Overview</h2>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Candidate demonstrates match in {analysis.matched_skills.length} out of {analysis.total_required} required core competencies.
                </p>
              </div>

              {/* Match Score Meter */}
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-6 text-center">
                <span className="text-4xl font-extrabold text-emerald-700 block">{analysis.match_score}%</span>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mt-1">Skill Match Score</span>
                <div className="w-full bg-emerald-200 rounded-full h-2 mt-3 overflow-hidden">
                  <div className="bg-emerald-600 h-2 rounded-full transition-all duration-500" style={{ width: `${analysis.match_score}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* 3-Column Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Current Candidate Skills */}
            <div className="glass-card rounded-2xl p-6 border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Current Candidate Skills</h3>
                  <span className="text-[11px] text-slate-500">{candidateSkills.length} Verified Skills</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {candidateSkills.map((sk, idx) => (
                  <SkillBadge key={idx} name={sk} type="matched" />
                ))}
              </div>
            </div>

            {/* Missing Required Skills */}
            <div className="glass-card rounded-2xl p-6 border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Missing Core Skills</h3>
                  <span className="text-[11px] text-slate-500">{analysis.missing_skills.length} Gaps Identified</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {analysis.missing_skills.length > 0 ? (
                  analysis.missing_skills.map((sk, idx) => (
                    <SkillBadge key={idx} name={sk} type="missing" />
                  ))
                ) : (
                  <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200 block w-full text-center">
                    All core skills present!
                  </span>
                )}
              </div>
            </div>

            {/* Recommended Skills to Learn */}
            <div className="glass-card rounded-2xl p-6 border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                <Sparkles className="w-5 h-5 text-teal-600" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Suggested High-Value Skills</h3>
                  <span className="text-[11px] text-slate-500">Domain Expansion</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {analysis.suggested_skills.map((sk, idx) => (
                  <SkillBadge key={idx} name={sk} type="suggested" />
                ))}
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="flex justify-end pt-4">
            <button
              onClick={handleProceedToLearning}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>View Learning Roadmap & Courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
