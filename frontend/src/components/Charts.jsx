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

export function ClassificationModelComparisonChart({ evalData }) {
  const lr = evalData?.classification_models?.logistic_regression || 97.3;
  const xgbTest = evalData?.classification_models?.xgboost_test || 85.36;
  const xgbCV = evalData?.classification_models?.xgboost_cv || 84.71;
  const rfTest = evalData?.classification_models?.random_forest_test || 80.96;

  const data = {
    labels: [
      'Logistic Regression (Baseline)',
      'XGBoost (Test)',
      'XGBoost (3-Fold CV)',
      'Random Forest (Test)'
    ],
    datasets: [
      {
        label: 'Accuracy (%)',
        data: [lr, xgbTest, xgbCV, rfTest],
        backgroundColor: [
          'rgba(5, 150, 105, 0.85)',  // Emerald for LR
          'rgba(13, 148, 136, 0.85)',  // Teal for XGB Test
          'rgba(20, 184, 166, 0.65)',  // Light Teal for XGB CV
          'rgba(71, 85, 105, 0.75)'   // Slate for RF
        ],
        borderColor: [
          '#059669',
          '#0d9488',
          '#14b8a6',
          '#334155'
        ],
        borderWidth: 1.5,
        borderRadius: 8,
      }
    ]
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
        callbacks: {
          label: (context) => ` ${context.raw}% Accuracy`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 60,
        max: 100,
        grid: { color: '#f1f5f9' },
        ticks: {
          color: '#64748b',
          font: { size: 11 },
          callback: (value) => `${value}%`
        }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#475569', font: { size: 11, weight: '600' } }
      }
    }
  };

  return <Bar data={data} options={options} />;
}

export function SBertRankingChart({ rankingData }) {
  const top1 = rankingData?.top1_accuracy || 64.77;
  const top3 = rankingData?.top3_accuracy || 81.50;
  const top5 = rankingData?.top5_accuracy || 87.12;

  const data = {
    labels: ['Top-1 Accuracy', 'Top-3 Accuracy', 'Top-5 Accuracy'],
    datasets: [
      {
        label: 'SBERT Top-K Accuracy (%)',
        data: [top1, top3, top5],
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        borderColor: '#059669',
        borderWidth: 3,
        pointBackgroundColor: '#059669',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: true,
        tension: 0.3
      }
    ]
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
        callbacks: {
          label: (context) => ` Accuracy: ${context.raw}%`
        }
      }
    },
    scales: {
      y: {
        min: 50,
        max: 100,
        grid: { color: '#f1f5f9' },
        ticks: {
          color: '#64748b',
          font: { size: 11 },
          callback: (value) => `${value}%`
        }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#475569', font: { size: 11, weight: '600' } }
      }
    }
  };

  return <Line data={data} options={options} />;
}

export function SemanticSkillAlignmentChart({ alignmentValue }) {
  const val = alignmentValue || 44.32;
  const remaining = (100 - val).toFixed(2);

  const data = {
    labels: ['Average Skill Alignment', 'Unmapped Gap'],
    datasets: [
      {
        data: [val, remaining],
        backgroundColor: ['#059669', '#e2e8f0'],
        borderColor: ['#047857', '#cbd5e1'],
        borderWidth: 1.5,
        cutout: '75%',
        circumference: 180,
        rotation: 270
      }
    ]
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
        callbacks: {
          label: (context) => ` ${context.label}: ${context.raw}%`
        }
      }
    }
  };

  return (
    <div className="relative h-44 flex items-center justify-center">
      <Doughnut data={data} options={options} />
      <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <span className="text-2xl font-extrabold text-emerald-700 block tracking-tight">{val}%</span>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Avg Alignment</span>
      </div>
    </div>
  );
}

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
