import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function SkillDistributionChart({ skillsData }) {
  const labels = Object.keys(skillsData || {});
  const values = Object.values(skillsData || {});

  const data = {
    labels,
    datasets: [
      {
        label: 'Candidate Frequency',
        data: values,
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderColor: '#059669',
        borderWidth: 1.5,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0f172a',
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#f1f5f9' },
        ticks: { color: '#64748b', font: { size: 11 } }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#64748b', font: { size: 11 } }
      }
    }
  };

  return <Bar data={data} options={options} />;
}

export function ConfidenceChart({ recommendations }) {
  const labels = (recommendations || []).map(r => r.role);
  const dataValues = (recommendations || []).map(r => r.probability);

  const data = {
    labels,
    datasets: [
      {
        label: 'Match Confidence %',
        data: dataValues,
        backgroundColor: [
          '#059669',
          '#10b981',
          '#14b8a6',
          '#34d399',
          '#6ee7b7'
        ],
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { boxWidth: 12, padding: 15, font: { size: 11 } }
      }
    }
  };

  return <Doughnut data={data} options={options} />;
}

export function DemandTrendChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        fill: true,
        label: 'AI & Data Science Roles',
        data: [65, 72, 78, 85, 89, 94, 98],
        borderColor: '#059669',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4
      },
      {
        fill: true,
        label: 'Software Engineering Roles',
        data: [70, 74, 76, 82, 88, 91, 95],
        borderColor: '#0d9488',
        backgroundColor: 'rgba(13, 148, 136, 0.1)',
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { font: { size: 11 } } }
    },
    scales: {
      y: { grid: { color: '#f1f5f9' }, ticks: { color: '#64748b' } },
      x: { grid: { display: false }, ticks: { color: '#64748b' } }
    }
  };

  return <Line data={data} options={options} />;
}
