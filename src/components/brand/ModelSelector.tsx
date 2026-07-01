import React from 'react';
import { Card } from '../ui/Card';
import type { AIModel } from '../../types';
import { MODELS_CONFIG } from '../../config/models';

interface ModelSelectorProps {
  selectedModel: AIModel;
  onChange: (model: AIModel) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  onChange,
}) => {
  return (
    <Card
      title="AI Generation Model"
      description="Select the foundation model to analyze and formulate your brand voice."
    >
      <div className="flex flex-col gap-3.5">
        {MODELS_CONFIG.map((model) => {
          const isSelected = selectedModel === model.id;
          
          return (
            <button
              key={model.id}
              type="button"
              onClick={() => onChange(model.id)}
              className={`w-full text-left p-5.5 rounded-2xl border-2 transition-all duration-300 cursor-pointer hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-100/40 ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-500/[0.03] shadow-[0_8px_30px_rgba(79,70,229,0.12)] scale-[1.01]'
                  : 'border-slate-100/70 bg-white hover:border-slate-300 hover:shadow-premium-md shadow-premium-sm'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  {/* Visual icon marker */}
                  <div className={`w-8.5 h-8.5 rounded-xl flex items-center justify-center font-extrabold text-xs shadow-sm transition-all duration-300 ${
                    isSelected 
                      ? 'bg-gradient-to-br from-indigo-500 to-indigo-650 text-white shadow-indigo-200' 
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    {model.id === 'claude' && 'Cl'}
                    {model.id === 'gpt' && 'GP'}
                    {model.id === 'gemini' && 'Ge'}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className={`text-sm font-bold transition-colors duration-250 ${
                        isSelected ? 'text-indigo-950' : 'text-slate-700'
                      }`}>
                        {model.name}
                      </h4>
                      {isSelected && (
                        <span className="px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 text-[8px] font-extrabold uppercase tracking-wider">
                          Active
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] uppercase font-extrabold tracking-wider text-slate-400 block mt-0.5">
                      {model.provider}
                    </span>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  isSelected ? 'border-indigo-650 bg-indigo-650 shadow-sm shadow-indigo-100' : 'border-slate-300'
                }`}>
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </div>
              <div className="mt-3.5 text-xs text-slate-500 leading-relaxed font-normal">
                <span className="font-semibold text-slate-700">Strength: </span>{model.description}
                <p className="mt-1.5 text-[11px] text-slate-400 italic font-light leading-normal">{model.details}</p>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
};
