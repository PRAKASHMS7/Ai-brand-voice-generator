import React from 'react';
import { FileText } from 'lucide-react';
import type { BrandVoiceResponse } from '../../types';
import { exportPDF } from '../../utils/export';

interface ExportMenuProps {
  data: BrandVoiceResponse;
  modelUsed: string;
  onExport: (message: string) => void;
}

export const ExportMenu: React.FC<ExportMenuProps> = ({ data, modelUsed, onExport }) => {
  const handleExportPDF = () => {
    try {
      exportPDF(data, modelUsed);
      onExport('PDF report downloaded successfully.');
    } catch (err) {
      console.error(err);
      onExport('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <button
      type="button"
      onClick={handleExportPDF}
      aria-label="Export Brand Voice style guide as PDF"
      className="h-10 inline-flex items-center gap-1.5 px-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50 text-xs font-semibold text-slate-600 shadow-sm hover:shadow transition-all duration-300 cursor-pointer active:scale-95 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
    >
      <FileText className="w-3.5 h-3.5 text-slate-400" />
      <span>Export PDF</span>
    </button>
  );
};
