import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Award, CheckCircle2, ArrowRight, RefreshCw, BarChart2, Layers } from 'lucide-react';
import { predictCareer } from '../services/api';
import Toast from '../components/Toast';

export default function CareerPrediction({ parsedData, setPredictionResult }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const navigate = useNavigate();

  useEffect(() => {
    runPrediction();
  }, [parsedData]);

  const runPrediction = async () => {
    setLoading(true);
    try {
      const payload = {
        resume_text: parsedData?.raw_text || '',
        education: (parsedData?.education || []).join(' '),
        experience_years: parsedData?.experience_years || '2+ years',
        skills: (parsedData?.skills || ['Python', 'SQL', 'React', 'FastAPI']).join(' '),
        top_n: 5,
      };

      const res = await predictCareer(payload);
      setResult(res);
      setPredictionResult(res);
      setToast({ message: 'Career prediction computed successfully!', type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to run prediction model.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToSkills = (targetRole) => {
    navigate('/skills', { state: { selectedRole: targetRole } });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Modules 4 & 5 – Machine Learning Inference</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Career Prediction & Top 5 Recommendations</h1>
          <p className="text-sm text-slate-600 mt-1">
            TF-IDF Vectorization & Logistic Regression probability distribution results.
          </p>
        </div>

        <button
          onClick={runPrediction}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-sm transition-all"
        >
          <RefreshCw className={`w-4 h-4 text-emerald-600 ${loading ? 'animate-spin' : ''}`} />
          <span>Re-run Prediction</span>
        </button>
      </div>

      {loading && (
        <div className="glass-card rounded-2xl p-12 text-center border border-slate-200">
          <RefreshCw className="w-10 h-10 text-emerald-600 animate-spin mx-auto mb-4" />
          <h3 className="text-base font-bold text-slate-900">Running Machine Learning Pipeline...</h3>
          <p className="text-xs text-slate-500 mt-1">Transforming resume text with TF-IDF vectorizer and evaluating multi-class Logistic Regression probabilities.</p>
        </div>
      )}

      {result && !loading && (
        <>
          {/* Primary Predicted Career Card */}
          <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-800/80 pb-6">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                    #1 Primary Suitable Career Match
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    {result.primary_career.role}
                  </h2>
                </div>

                <div className="bg-emerald-800/60 backdrop-blur-md border border-emerald-500/40 rounded-2xl p-4 text-center min-w-[140px]">
                  <span className="text-3xl font-black text-emerald-300 block">
                    {result.primary_career.probability}%
                  </span>
                  <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-wider block mt-0.5">
                    Match Confidence
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                {result.primary_career.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Core Required Skills
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {result.primary_career.required_skills?.map((sk, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-700/60">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Target Industries
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {result.primary_career.suitable_industries?.map((ind, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => handleNavigateToSkills(result.primary_career.role)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-slate-900 bg-white hover:bg-emerald-50 shadow-md transition-all"
                >
                  <span>Analyze Skill Gap For {result.primary_career.role}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Top 5 Recommendations Grid */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-emerald-600" />
                <span>Top 5 Alternative Career Recommendations</span>
              </h3>
              <span className="text-xs font-semibold text-slate-500">Sorted by Model Probability</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {result.top_recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                        Rank #{index + 1}
                      </span>
                      <span className="text-sm font-extrabold text-slate-900">{rec.probability}%</span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 mb-2">{rec.role}</h4>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">{rec.description}</p>

                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Required Skills</span>
                      <div className="flex flex-wrap gap-1.5">
                        {rec.required_skills?.slice(0, 4).map((skill, sIdx) => (
                          <span key={sIdx} className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleNavigateToSkills(rec.role)}
                    className="w-full text-center py-2.5 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors inline-flex items-center justify-center gap-1"
                  >
                    <span>Analyze Skill Gap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
