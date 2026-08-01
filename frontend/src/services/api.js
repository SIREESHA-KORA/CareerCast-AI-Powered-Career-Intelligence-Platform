import axios from 'axios';

const API_BASE_URL = 'https://careercast-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadAndParseResume = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${API_BASE_URL}/resume/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const predictCareer = async (data) => {
  const response = await api.post('/predict', data);
  return response.data;
};

export const analyzeSkillGap = async (userSkills, targetRole) => {
  const response = await api.post('/skill-gap', {
    user_skills: userSkills,
    target_role: targetRole,
  });
  return response.data;
};

export const getLearningResources = async (targetRole) => {
  const response = await api.get(`/learning-resources/${encodeURIComponent(targetRole)}`);
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await api.get('/dashboard/stats');
  return response.data;
};

export const downloadPDFReport = async (reportData) => {
  const response = await api.post('/dashboard/generate-report', reportData, {
    responseType: 'blob',
  });
  
  // Trigger browser download
  const blob = new Blob([response.data], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `CareerCast_${reportData.candidate_name.replace(/\s+/g, '_')}_Report.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

export const getAdminMetrics = async () => {
  const response = await api.get('/admin/metrics');
  return response.data;
};

export const retrainModel = async () => {
  const response = await api.post('/admin/retrain');
  return response.data;
};

export default api;
