import React from 'react';

interface LoadingSkeletonProps {
  message?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ message = 'Preparing brand profile...' }) => {
  return (
    <div className="space-y-8 animate-pulse" aria-hidden="true">
      {/* Loading Status Indicator */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-100/80 p-8 flex flex-col items-center justify-center text-center shadow-premium-md space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-650 shadow-inner">
          <svg className="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-800 tracking-tight transition-all duration-300">{message}</h4>
          <p className="text-[11px] text-slate-400 font-light leading-relaxed max-w-sm">Generating custom guidelines, assets, and strategic report briefs.</p>
        </div>
      </div>

      {/* Brand Overview Card Skeleton */}
      <div className="bg-white/80 rounded-3xl border border-slate-100/80 p-8 space-y-5 shadow-premium-md">
        <div className="flex items-center justify-between border-b border-slate-50 pb-5">
          <div className="space-y-2">
            <div className="h-5 bg-slate-200 rounded w-44" />
            <div className="h-3.5 bg-slate-150 rounded w-72" />
          </div>
          <div className="h-6 bg-slate-150 rounded w-20" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
          <div className="space-y-3.5 md:border-r md:border-slate-100 md:pr-6">
            <div>
              <div className="h-2.5 bg-slate-200 rounded w-16 mb-2" />
              <div className="h-6 bg-slate-200 rounded w-3/4" />
            </div>
            <div className="mt-4 p-3 bg-slate-50/50 rounded-xl space-y-1.5">
              <div className="h-2 bg-slate-200 rounded w-10" />
              <div className="h-3.5 bg-slate-200 rounded w-5/6" />
            </div>
          </div>
          <div className="md:col-span-2 space-y-4 md:pl-2">
            <div>
              <div className="h-2.5 bg-slate-200 rounded w-16 mb-2" />
              <div className="h-3.5 bg-slate-200 rounded w-full" />
              <div className="h-3.5 bg-slate-200 rounded w-11/12 mt-1.5" />
            </div>
            <div>
              <div className="h-2.5 bg-slate-200 rounded w-16 mb-2" />
              <div className="h-3.5 bg-slate-200 rounded w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Brand Identity Card Skeleton */}
      <div className="bg-white/80 rounded-3xl border border-slate-100/80 p-8 space-y-5 shadow-premium-md">
        <div className="border-b border-slate-50 pb-5">
          <div className="h-5 bg-slate-200 rounded w-36" />
          <div className="h-3.5 bg-slate-150 rounded w-64 mt-1.5" />
        </div>
        <div>
          <div className="h-2.5 bg-slate-200 rounded w-20 mb-2.5" />
          <div className="flex gap-2">
            <div className="h-6 bg-slate-200 rounded-lg w-16" />
            <div className="h-6 bg-slate-200 rounded-lg w-20" />
            <div className="h-6 bg-slate-200 rounded-lg w-24" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="h-2.5 bg-slate-200 rounded w-28 mb-2.5" />
            <div className="flex flex-wrap gap-1.5">
              <div className="h-5 bg-slate-150 rounded w-12" />
              <div className="h-5 bg-slate-150 rounded w-14" />
            </div>
          </div>
          <div>
            <div className="h-2.5 bg-slate-200 rounded w-32 mb-2.5" />
            <div className="flex flex-wrap gap-1.5">
              <div className="h-5 bg-slate-150 rounded w-16" />
              <div className="h-5 bg-slate-150 rounded w-12" />
            </div>
          </div>
        </div>
        <div className="border-t border-slate-50 pt-4">
          <div className="h-2.5 bg-slate-200 rounded w-24 mb-2" />
          <div className="h-3.5 bg-slate-200 rounded w-full" />
        </div>
      </div>

      {/* Content Guide Card Skeleton */}
      <div className="bg-white/80 rounded-3xl border border-slate-100/80 p-8 space-y-5 shadow-premium-md">
        <div className="border-b border-slate-50 pb-5">
          <div className="h-5 bg-slate-200 rounded w-32" />
          <div className="h-3.5 bg-slate-150 rounded w-60 mt-1.5" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="h-2.5 bg-slate-200 rounded w-24 mb-2" />
            <div className="h-5 bg-slate-200 rounded w-16" />
          </div>
          <div>
            <div className="h-2.5 bg-slate-200 rounded w-20 mb-2" />
            <div className="h-5 bg-slate-200 rounded w-20" />
          </div>
        </div>
        <div className="space-y-2.5">
          <div className="h-2.5 bg-slate-200 rounded w-24" />
          <div className="h-3.5 bg-slate-200 rounded w-11/12" />
        </div>
      </div>

      {/* Customer Insights Card Skeleton */}
      <div className="bg-white/80 rounded-3xl border border-slate-100/80 p-8 space-y-5 shadow-premium-md">
        <div className="border-b border-slate-50 pb-5">
          <div className="h-5 bg-slate-200 rounded w-40" />
          <div className="h-3.5 bg-slate-150 rounded w-56 mt-1.5" />
        </div>
        <div className="space-y-2">
          <div className="h-2.5 bg-slate-200 rounded w-32 mb-2.5" />
          <div className="h-3.5 bg-slate-200 rounded w-11/12" />
        </div>
        <div className="space-y-2">
          <div className="h-2.5 bg-slate-200 rounded w-28 mb-2.5" />
          <div className="h-3.5 bg-slate-200 rounded w-full" />
        </div>
      </div>
    </div>
  );
};
