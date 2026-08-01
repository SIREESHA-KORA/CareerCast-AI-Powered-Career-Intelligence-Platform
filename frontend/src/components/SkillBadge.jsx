import React from 'react';
import { CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export default function SkillBadge({ name, type = 'matched', size = 'normal' }) {
  const styles = {
    matched: 'bg-emerald-50 text-emerald-800 border-emerald-200/80 hover:bg-emerald-100',
    missing: 'bg-amber-50 text-amber-800 border-amber-200/80 hover:bg-amber-100',
    suggested: 'bg-teal-50 text-teal-800 border-teal-200/80 hover:bg-teal-100',
    default: 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200',
  };

  const icons = {
    matched: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline mr-1" />,
    missing: <AlertCircle className="w-3.5 h-3.5 text-amber-600 inline mr-1" />,
    suggested: <Sparkles className="w-3.5 h-3.5 text-teal-600 inline mr-1" />,
    default: null,
  };

  const sizeClasses = size === 'small' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1.5 text-xs font-semibold';

  return (
    <span
      className={`inline-flex items-center rounded-lg border transition-colors duration-150 ${sizeClasses} ${
        styles[type] || styles.default
      }`}
    >
      {icons[type]}
      {name}
    </span>
  );
}
