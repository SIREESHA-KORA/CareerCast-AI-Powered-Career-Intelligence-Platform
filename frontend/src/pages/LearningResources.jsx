import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Award, BookOpen, ExternalLink, Star, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { getLearningResources } from '../services/api';
import Toast from '../components/Toast';

export default function LearningResources() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedRole = location.state?.selectedRole || 'Software Engineer';

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  useEffect(() => {
    fetchResources();
  }, [selectedRole]);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const res = await getLearningResources(selectedRole);
      setData(res);
    } catch (err) {
      setToast({ message: 'Failed to load learning resources.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2 border border-emerald-200">
          <Award className="w-3.5 h-3.5 text-emerald-600" />
          <span>Module 7 – Learning & Certification Recommendations</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Learning Roadmap for {selectedRole}</h1>
        <p className="text-sm text-slate-600 mt-1">
          Tailored certifications, online courses, and a 4-phase step-by-step learning roadmap.
        </p>
      </div>

      {data && (
        <div className="space-y-12">
          {/* Certifications Grid */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <span>Recommended Industry Certifications</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.certifications?.map((cert, idx) => (
                <div key={idx} className="glass-card rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-300 transition-all flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {cert.issuer}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-3 mb-2">{cert.name}</h3>
                  </div>

                  <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-emerald-600" /> {cert.estimated_time}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold">{cert.difficulty}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Online Courses Grid */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <span>Top Online Courses</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.courses?.map((course, idx) => (
                <div key={idx} className="glass-card rounded-2xl p-6 border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold text-slate-500">{course.provider}</span>
                      <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                        <Star className="w-3 h-3 fill-amber-500" /> {course.rating}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">{course.title}</h3>
                    <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded inline-block mb-4">{course.level}</span>
                  </div>

                  <a
                    href={course.link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full text-center py-2.5 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors inline-flex items-center justify-center gap-1"
                  >
                    <span>View Course</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* 4-Phase Roadmap Timeline */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" />
              <span>4-Phase Career Growth Roadmap Timeline</span>
            </h2>

            <div className="space-y-6">
              {data.roadmap?.map((phase, idx) => (
                <div key={idx} className="glass-card rounded-2xl p-6 border border-slate-200/80 relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3 mb-4">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                        P{idx + 1}
                      </span>
                      <span>{phase.phase}</span>
                    </h3>
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
                      {phase.duration}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="font-bold text-slate-700 uppercase tracking-wider block mb-2">Milestone Goals</span>
                      <ul className="space-y-1.5">
                        {phase.goals?.map((g, gIdx) => (
                          <li key={gIdx} className="flex items-start gap-2 text-slate-600">
                            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{g}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="font-bold text-slate-700 uppercase tracking-wider block mb-2">Recommended Topics</span>
                      <div className="flex flex-wrap gap-1.5">
                        {phase.recommended_topics?.map((top, tIdx) => (
                          <span key={tIdx} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold">
                            {top}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTA to Dashboard */}
          <div className="flex justify-end pt-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5"
            >
              <span>Go to Executive Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
