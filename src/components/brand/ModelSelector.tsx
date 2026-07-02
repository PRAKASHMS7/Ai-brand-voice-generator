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
              className={`w-full text-left p-5.5 rounded-[var(--radius-card)] border-2 transition-[var(--transition-premium)] cursor-pointer hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 ${
                isSelected
                  ? 'border-[var(--color-primary-accent)] bg-[var(--color-primary-accent)]/[0.02] shadow-premium-md scale-[1.01]'
                  : 'border-[var(--color-neutral-border)] bg-white hover:border-[var(--color-neutral-border-hover)] hover:shadow-premium-md shadow-premium-sm'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  {/* Visual icon marker */}
                  <div className={`w-8.5 h-8.5 rounded-xl flex items-center justify-center font-extrabold text-xs shadow-sm transition-[var(--transition-premium)] ${
                    isSelected 
                      ? 'bg-gradient-to-br from-[var(--color-primary-accent)] to-[var(--color-secondary-accent)] text-white shadow-indigo-100' 
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
                        <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-[var(--color-primary-accent)] text-[8px] font-extrabold uppercase tracking-wider">
                          Active
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] uppercase font-extrabold tracking-wider text-slate-400 block mt-0.5">
                      {model.provider}
                    </span>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-[var(--transition-premium)] ${
                  isSelected ? 'border-[var(--color-primary-accent)] bg-[var(--color-primary-accent)] shadow-sm' : 'border-slate-300'
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
