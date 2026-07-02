import React from 'react';

interface RadioOption<T> {
  value: T;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface RadioGroupProps<T> {
  label?: string;
  description?: string;
  options: RadioOption<T>[];
  value: T;
  onChange: (value: T) => void;
  layout?: 'horizontal' | 'vertical' | 'grid';
  columns?: 2 | 3 | 4;
}

export const RadioGroup = <T extends string>({
  label,
  description,
  options,
  value,
  onChange,
  layout = 'horizontal',
  columns = 2,
}: RadioGroupProps<T>) => {
  const getLayoutClass = () => {
    if (layout === 'vertical') return 'flex flex-col gap-3';
    if (layout === 'grid') {
      const colMap = {
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4',
      };
      return `grid gap-3.5 ${colMap[columns]}`;
    }
    return 'flex flex-col sm:flex-row gap-3';
  };

  return (
    <div className="w-full">
      {(label || description) && (
        <div className="mb-2.5">
          {label && (
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              {label}
            </label>
          )}
          {description && (
            <p className="text-xs text-slate-400 font-normal leading-relaxed mt-0.5">
              {description}
            </p>
          )}
        </div>
      )}
      <div className={getLayoutClass()}>
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`flex items-start text-left p-5 rounded-[var(--radius-card)] border-2 transition-[var(--transition-premium)] cursor-pointer hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 ${
                isSelected
                  ? 'border-l-4 border-l-[var(--color-primary-accent)] border-y-[var(--color-primary-accent)]/10 border-r-[var(--color-primary-accent)]/10 bg-[var(--color-primary-accent)]/[0.02] shadow-premium-md'
                  : 'border-[var(--color-neutral-border)] bg-white hover:border-[var(--color-neutral-border-hover)] hover:shadow-premium-md shadow-premium-sm'
              }`}
            >
              {option.icon && (
                <div className={`mr-3 mt-0.5 flex-shrink-0 ${
                  isSelected ? 'text-[var(--color-primary-accent)]' : 'text-slate-400'
                }`}>
                  {option.icon}
                </div>
              )}
              <div className="flex-grow">
                <span className={`block text-sm font-bold transition-colors duration-250 ${
                  isSelected ? 'text-indigo-950' : 'text-slate-700'
                }`}>
                  {option.label}
                </span>
                {option.description && (
                  <span className="block text-xs text-slate-400 font-light mt-1 leading-normal">
                    {option.description}
                  </span>
                )}
              </div>
              <div className="flex-shrink-0 ml-2 mt-0.5">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-[var(--transition-premium)] ${
                  isSelected
                    ? 'border-[var(--color-primary-accent)] bg-[var(--color-primary-accent)] shadow-sm'
                    : 'border-slate-300 bg-white'
                }`}>
                  {isSelected && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
