import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-850 text-white text-xs font-semibold shadow-2xl animate-fade-in-up"
    >
      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
      <span>{message}</span>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close notification"
        className="ml-2.5 text-slate-400 hover:text-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded cursor-pointer p-0.5"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
