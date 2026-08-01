import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose, duration = 4000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const typeConfig = {
    success: {
      bg: 'bg-emerald-900/90 text-white border-emerald-700',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    },
    warning: {
      bg: 'bg-amber-900/90 text-white border-amber-700',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
    },
    error: {
      bg: 'bg-rose-900/90 text-white border-rose-700',
      icon: <XCircle className="w-5 h-5 text-rose-400" />,
    },
  };

  const current = typeConfig[type] || typeConfig.success;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md ${current.bg}`}>
        {current.icon}
        <span className="text-xs font-semibold">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-white/70 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
