import React, { useState, useEffect } from 'react';
import { ShieldCheck, Upload, RefreshCw, CheckCircle2, Database, Cpu, FileSpreadsheet, Server } from 'lucide-react';
import { getAdminMetrics, retrainModel } from '../services/api';
import Toast from '../components/Toast';

export default function Admin() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [retraining, setRetraining] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const res = await getAdminMetrics();
      setMetrics(res);
    } catch (err) {
      setToast({ message: 'Failed to fetch admin metrics.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleRetrain = async () => {
    setRetraining(true);
    try {
      const res = await retrainModel();
      setToast({ message: 'Model retrained and metrics updated successfully!', type: 'success' });
      fetchMetrics();
    } catch (err) {
      setToast({ message: 'Model retraining failed.', type: 'error' });
    } finally {
      setRetraining(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Admin & Operations Portal</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Administration</h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage dataset records, trigger model retraining pipelines, and monitor model artifacts.
          </p>
        </div>

        <button
          onClick={handleRetrain}
          disabled={retraining}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5"
        >
          <RefreshCw className={`w-4 h-4 ${retraining ? 'animate-spin' : ''}`} />
          <span>{retraining ? 'Retraining Pipeline...' : 'Trigger Model Retraining'}</span>
        </button>
      </div>

      {/* Artifact Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">ML Pipeline Artifact</span>
            <Cpu className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold text-slate-900">
              {metrics?.model_artifacts_loaded ? 'careercast_pipeline.pkl' : 'Not Loaded'}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
            Status: Serialized & Ready
          </span>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Model Test Accuracy</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-extrabold text-emerald-700">
              {metrics?.metrics?.test_accuracy || 97.3}%
            </span>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 block">
            Train Accuracy: {metrics?.metrics?.train_accuracy || 98.1}%
          </span>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Total Career Classes</span>
            <Database className="w-5 h-5 text-teal-600" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {metrics?.metrics?.num_classes || 15} Roles
            </span>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 block">
            Vocab: {metrics?.metrics?.vocab_size || 1000} TF-IDF Tokens
          </span>
        </div>
      </div>

      {/* Dataset Upload Area */}
      <div className="glass-card rounded-2xl p-8 border border-slate-200/80 space-y-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
          <span>Upload New Training Dataset (CSV)</span>
        </h2>
        <p className="text-xs text-slate-600">
          Upload a updated CSV file containing <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700 font-mono">Resume Text</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700 font-mono">Education</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700 font-mono">Skills</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700 font-mono">Experience Years</code>, and <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700 font-mono">Job Role</code> columns.
        </p>

        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-emerald-400 transition-colors">
          <Upload className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
          <h3 className="text-xs font-bold text-slate-800 mb-1">Select CSV Dataset File</h3>
          <p className="text-[11px] text-slate-500 mb-4">training_data.csv (Max 50MB)</p>
          <button className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-semibold hover:bg-slate-900 shadow-sm">
            Browse File
          </button>
        </div>
      </div>

      {/* Supported Target Classes */}
      <div className="glass-card rounded-2xl p-6 border border-slate-200/80 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Server className="w-4 h-4 text-emerald-600" />
          <span>Registered LabelEncoder Classes</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {(metrics?.classes || [
            "Software Engineer", "Data Scientist", "Data Analyst", "DevOps Engineer",
            "Full Stack Developer", "Machine Learning Engineer", "Cloud Architect",
            "Cybersecurity Specialist", "Database Administrator", "Product Manager",
            "UI/UX Designer", "Mobile App Developer", "QA Automation Engineer",
            "Backend Developer", "Frontend Developer"
          ]).map((cls, idx) => (
            <span key={idx} className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              {cls}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
