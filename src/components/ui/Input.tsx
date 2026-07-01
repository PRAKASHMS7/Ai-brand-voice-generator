import React, { forwardRef } from 'react';

interface InputBaseProps {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputBaseProps {
  multiline?: false;
}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    InputBaseProps {
  multiline: true;
  rows?: number;
}

type FormElementProps = InputProps | TextareaProps;

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormElementProps>(
  ({ label, description, error, required, className = '', ...props }, ref) => {
    const isTextarea = props.multiline === true;

    const baseInputStyle =
      'w-full rounded-xl border px-4 py-3 text-sm transition-all duration-300 outline-none shadow-sm ' +
      (error
        ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 bg-red-50/10 text-red-900'
        : 'border-slate-200 bg-slate-50 hover:bg-slate-100/30 hover:border-slate-300 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 text-slate-805');

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
      <div className="w-full">
        {labelElement}
        {isTextarea ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={`${baseInputStyle} resize-y min-h-[100px] ${className}`}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            className={`${baseInputStyle} ${className}`}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {errorElement || descriptionElement}
      </div>
    );
  }
);

Input.displayName = 'Input';
