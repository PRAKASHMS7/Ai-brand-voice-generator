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
      className={`bg-[var(--color-glass-bg)] backdrop-blur-xl rounded-[var(--radius-card)] border border-[var(--color-neutral-border)] shadow-premium-lg hover:shadow-premium-hover hover:-translate-y-[3px] transition-[var(--transition-premium)] ${className}`}
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
