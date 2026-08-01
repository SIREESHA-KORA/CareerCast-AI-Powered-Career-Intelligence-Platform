import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, CheckCircle2, Loader2, Sparkles, User, Mail, Phone, GraduationCap, Briefcase, Plus, Trash2, ArrowRight } from 'lucide-react';
import { uploadAndParseResume } from '../services/api';
import Toast from '../components/Toast';

export default function ResumeUpload({ parsedData, setParsedData }) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [newSkill, setNewSkill] = useState('');

  const navigate = useNavigate();

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    const ext = selectedFile.name.split('.').pop().toLowerCase();
    if (!['pdf', 'docx', 'doc'].includes(ext)) {
      setToast({ message: 'Only PDF and DOCX files are supported.', type: 'error' });
      return;
    }
    setFile(selectedFile);
    processFileUpload(selectedFile);
  };

  const processFileUpload = async (uploadFile) => {
    setLoading(true);
    setProgress(30);
    try {
      setTimeout(() => setProgress(70), 500);
      const data = await uploadAndParseResume(uploadFile);
      setProgress(100);
      setParsedData(data);
      setToast({ message: 'Resume uploaded and parsed successfully!', type: 'success' });
    } catch (err) {
      setToast({ message: err.response?.data?.detail || 'Failed to parse resume.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    setParsedData({
      ...parsedData,
      skills: [...(parsedData?.skills || []), newSkill.trim()]
    });
    setNewSkill('');
  };

  const handleRemoveSkill = (index) => {
    const updated = [...parsedData.skills];
    updated.splice(index, 1);
    setParsedData({ ...parsedData, skills: updated });
  };

  const handleProceedToPrediction = () => {
    if (!parsedData || !parsedData.skills.length) {
      setToast({ message: 'Please upload a resume or provide candidate skills.', type: 'warning' });
      return;
    }
    navigate('/predict');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3 border border-emerald-200">
          <Upload className="w-3.5 h-3.5 text-emerald-600" />
          <span>Module 3 – Resume Parsing & NLP</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Upload & Analyze Resume</h1>
        <p className="text-sm text-slate-600 mt-2">
          Upload your resume in PDF or DOCX format. Our NLP parser will automatically extract your contact info, skills, education, and experience.
        </p>
      </div>

      {/* Upload Drag & Drop Area */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleFileDrop}
        className={`glass-card rounded-2xl p-10 text-center border-2 border-dashed transition-all duration-200 cursor-pointer ${
          isDragging ? 'border-emerald-500 bg-emerald-50/50 scale-[1.01]' : 'border-slate-300 hover:border-emerald-400'
        }`}
      >
        <input
          type="file"
          id="resume-file-input"
          accept=".pdf,.docx,.doc"
          onChange={handleFileSelect}
          className="hidden"
        />

        <label htmlFor="resume-file-input" className="cursor-pointer block">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-sm">
            {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : <FileText className="w-8 h-8" />}
          </div>

          <h3 className="text-base font-bold text-slate-900 mb-1">
            {file ? file.name : 'Click to upload or drag & drop resume file'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            Supports PDF, DOCX formats (Up to 10MB). Text and key entities will be extracted automatically.
          </p>

          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition-all">
            <Upload className="w-4 h-4" />
            <span>Select File</span>
          </span>
        </label>

        {loading && (
          <div className="mt-6 max-w-md mx-auto">
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-xs font-semibold text-slate-500 mt-2 block">Extracting NLP Entities... {progress}%</span>
          </div>
        )}
      </div>

      {/* Parsed Resume Live Editor Card */}
      {parsedData && (
        <div className="glass-card rounded-2xl p-8 border border-slate-200/80 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>Extracted Candidate Profile</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Review and edit parsed information before running career prediction.</p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Parsed & Editable
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-600 uppercase flex items-center gap-1.5 mb-1.5">
                <User className="w-3.5 h-3.5 text-emerald-600" /> Full Name
              </label>
              <input
                type="text"
                value={parsedData.name || ''}
                onChange={(e) => setParsedData({ ...parsedData, name: e.target.value })}
                className="w-full text-xs font-medium bg-white border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase flex items-center gap-1.5 mb-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-600" /> Email Address
              </label>
              <input
                type="text"
                value={parsedData.email || ''}
                onChange={(e) => setParsedData({ ...parsedData, email: e.target.value })}
                className="w-full text-xs font-medium bg-white border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase flex items-center gap-1.5 mb-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" /> Experience Level
              </label>
              <input
                type="text"
                value={parsedData.experience_years || ''}
                onChange={(e) => setParsedData({ ...parsedData, experience_years: e.target.value })}
                className="w-full text-xs font-medium bg-white border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Education & Experience Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs font-bold text-slate-600 uppercase flex items-center gap-1.5 mb-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-600" /> Education Background
              </label>
              <textarea
                rows="2"
                value={parsedData.education?.join('\n') || ''}
                onChange={(e) => setParsedData({ ...parsedData, education: e.target.value.split('\n') })}
                className="w-full text-xs font-medium bg-white border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase flex items-center gap-1.5 mb-1.5">
                <Briefcase className="w-3.5 h-3.5 text-emerald-600" /> Experience Highlights
              </label>
              <textarea
                rows="2"
                value={parsedData.experience?.join('\n') || ''}
                onChange={(e) => setParsedData({ ...parsedData, experience: e.target.value.split('\n') })}
                className="w-full text-xs font-medium bg-white border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Extracted Skills Matrix */}
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase block mb-2">
              Extracted Skills ({parsedData.skills?.length || 0})
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {parsedData.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200"
                >
                  <span>{skill}</span>
                  <button onClick={() => handleRemoveSkill(index)} className="hover:text-rose-600">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 max-w-sm">
              <input
                type="text"
                placeholder="Add additional skill..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                className="text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 flex-grow outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={handleAddSkill}
                className="px-3 py-2 bg-slate-800 text-white rounded-xl text-xs font-semibold hover:bg-slate-900 inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          </div>

          {/* Proceed Button */}
          <div className="pt-4 border-t border-slate-200/80 flex justify-end">
            <button
              onClick={handleProceedToPrediction}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5"
            >
              <span>Predict Career & Recommendations</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
