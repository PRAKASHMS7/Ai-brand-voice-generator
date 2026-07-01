import React, { forwardRef } from 'react';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  description?: string;
  error?: string;
  options: Option[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, description, error, required, options, className = '', ...props }, ref) => {
    const baseSelectStyle =
      'w-full rounded-xl border px-4 py-3 text-sm transition-all duration-300 outline-none appearance-none bg-no-repeat bg-[right_0.875rem_center] bg-[length:1.25rem] cursor-pointer shadow-sm ' +
      (error
        ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 bg-red-50/10 text-red-900'
        : 'border-slate-200 bg-slate-50 hover:bg-slate-100/30 hover:border-slate-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 text-slate-800');

    const labelElement = label && (
      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2 flex items-center justify-between">
        <span>
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </span>
      </label>
    );

    const descriptionElement = description && (
      <p className="mt-1 text-xs text-slate-400 font-normal leading-relaxed">{description}</p>
    );

    const errorElement = error && (
      <p className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-3.5 h-3.5"
        >
          <path
            fillRule="evenodd"
            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 6a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"
            clipRule="evenodd"
          />
        </svg>
        {error}
      </p>
    );

    return (
      <div className="w-full relative">
        {labelElement}
        <div className="relative">
          <select
            ref={ref}
            className={`${baseSelectStyle} ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          {/* Custom dropdown arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
            <svg
              className="h-4.5 w-4.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {errorElement || descriptionElement}
      </div>
    );
  }
);

Select.displayName = 'Select';
