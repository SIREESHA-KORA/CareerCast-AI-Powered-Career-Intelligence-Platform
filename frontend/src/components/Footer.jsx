import React from 'react';
import { Sparkles, Github, Globe, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Career<span className="text-emerald-400">Cast</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm mb-4 leading-relaxed">
              AI-Powered Career Intelligence Platform analyzing resumes with Natural Language Processing and Machine Learning to predict suitable careers, identify skill gaps, and provide custom learning roadmaps.
            </p>
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} CareerCast AI. All rights reserved. Built with React & FastAPI.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-4 tracking-wider uppercase">Platform Modules</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/upload" className="hover:text-emerald-400 transition-colors">Resume Upload & NLP</a></li>
              <li><a href="/predict" className="hover:text-emerald-400 transition-colors">ML Career Prediction</a></li>
              <li><a href="/skills" className="hover:text-emerald-400 transition-colors">Skill Gap Matrix</a></li>
              <li><a href="/learning" className="hover:text-emerald-400 transition-colors">Learning Resources</a></li>
              <li><a href="/dashboard" className="hover:text-emerald-400 transition-colors">Executive Dashboard</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-4 tracking-wider uppercase">Technology Stack</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> React 19 & Vite</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-teal-400"></span> FastAPI & Python</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Scikit-Learn (TF-IDF)</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-teal-400"></span> SpaCy & PDFPlumber</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Tailwind CSS & Framer Motion</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" /> for job seekers & career enthusiasts.
          </p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 transition-colors">Production Grade SaaS Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
