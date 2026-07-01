import React, { useState } from 'react';
import { Clipboard, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  onCopy: () => void;
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text, onCopy, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopy();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy section to clipboard"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50 text-[11px] font-bold text-slate-600 transition-all duration-300 cursor-pointer active:scale-95 focus:ring-2 focus:ring-indigo-100 focus:outline-none ${className}`}
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-emerald-500 transition-transform duration-200 scale-110" />
      ) : (
        <Clipboard className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
      )}
      <span>{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
};
