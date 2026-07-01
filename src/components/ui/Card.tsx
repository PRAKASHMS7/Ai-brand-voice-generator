import React from 'react';

interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  description?: string;
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  description,
  headerAction,
  footer,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-[0_10px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_60px_rgba(79,70,229,0.15)] hover:-translate-y-[3px] transition-all duration-300 ${className}`}
      {...props}
    >
      {(title || description || headerAction) && (
        <div className="px-8 py-6 border-b border-slate-50 flex items-start justify-between gap-4">
          <div className="space-y-1">
            {title && (
              <h3 className="text-base font-bold text-slate-800 tracking-tight flex items-center gap-2">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-[11px] text-slate-400 font-light leading-tight">
                {description}
              </p>
            )}
          </div>
          {headerAction && <div className="flex-shrink-0">{headerAction}</div>}
        </div>
      )}
      <div className="p-8">{children}</div>
      {footer && (
        <div className="px-8 py-5 bg-slate-50/50 rounded-b-3xl border-t border-slate-100/80 flex items-center justify-end">
          {footer}
        </div>
      )}
    </div>
  );
};
