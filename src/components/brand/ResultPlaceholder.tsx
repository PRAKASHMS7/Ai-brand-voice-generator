import React from 'react';
import { 
  Building2, 
  Fingerprint, 
  PenTool, 
  Users, 
  Megaphone, 
  TrendingUp, 
  Sparkles, 
  RefreshCw, 
  AlertTriangle,
  Award
} from 'lucide-react';
import { Card } from '../ui/Card';
import type { BrandVoiceResponse } from '../../types';
import { MarketingAssetsRenderer } from './MarketingAssetsRenderer';
import { LoadingSkeleton } from '../ui/LoadingSkeleton';
import { CopyButton } from '../ui/CopyButton';
import { ExportMenu } from '../ui/ExportMenu';
import {
  formatOverviewCopy,
  formatIdentityCopy,
  formatContentGuideCopy,
  formatMarketingAssetsCopy,
  formatCustomerInsightsCopy,
  formatAnalysisCopy,
  formatAllCopy,
} from '../../utils/copy';

interface ResultPlaceholderProps {
  isLoading?: boolean;
  loadingMessage?: string;
  response?: BrandVoiceResponse;
  notice?: string;
  error?: string;
  modelUsed?: string;
  onCopyNotification: (message: string) => void;
  onRegenerate?: () => void;
}

export const ResultPlaceholder: React.FC<ResultPlaceholderProps> = ({
  isLoading = false,
  loadingMessage,
  response,
  notice,
  error,
  modelUsed,
  onCopyNotification,
  onRegenerate,
}) => {
  // 1. Error State
  if (error) {
    return (
      <Card className="border-red-200 bg-red-50/5 min-h-[220px] flex items-center justify-center shadow-md animate-fade-in-up">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4.5 p-6 max-w-2xl text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-red-100/80 flex items-center justify-center text-red-600 flex-shrink-0 shadow-inner">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-red-900 tracking-tight">
              Generation Failure
            </h3>
            <p className="text-sm text-red-700 leading-relaxed font-normal">
              {error}
            </p>
            <p className="text-xs text-red-500 font-light italic pt-1.5">
              Please double check your API configuration or network parameters and try again.
            </p>
            {onRegenerate && (
              <div className="pt-3">
                <button
                  type="button"
                  onClick={onRegenerate}
                  aria-label="Retry generation"
                  className="h-10 inline-flex items-center gap-1.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow transition-all duration-305 focus:ring-2 focus:ring-red-200 focus:outline-none cursor-pointer active:scale-95"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry Generation</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  }

  // 2. Loading State
  if (isLoading) {
    return <LoadingSkeleton message={loadingMessage} />;
  }

  // 3. Success / Response State
  if (response) {
    return (
      <div className="space-y-8 animate-fade-in-up">
        {/* Notice Alert Box for Fallback */}
        {notice && (
          <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/40 flex items-start gap-3 shadow-sm">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-amber-900 leading-tight">Fallback Model Active</h4>
              <p className="mt-1 text-xs text-amber-800 leading-relaxed font-normal">{notice}</p>
            </div>
          </div>
        )}

        {/* Guide Controls Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/70 backdrop-blur-md border border-slate-100 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 tracking-tight">Style Guide Management</h3>
              <p className="text-[11px] text-slate-400 font-light">Copy, export, or refresh guidelines</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <CopyButton
              text={formatAllCopy(response)}
              onCopy={() => onCopyNotification('Copied complete Brand Voice guide to clipboard.')}
              className="h-10 px-4 !rounded-xl !bg-indigo-600 hover:!bg-indigo-700 !text-white !border-transparent shadow-md hover:shadow-lg active:scale-95 transition-all duration-300"
            />
            {onRegenerate && (
              <button
                type="button"
                onClick={onRegenerate}
                aria-label="Regenerate Brand Voice guidelines"
                className="h-10 inline-flex items-center gap-1.5 px-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50 text-xs font-semibold text-slate-600 shadow-sm hover:shadow transition-all duration-300 cursor-pointer active:scale-95 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                <span>Regenerate</span>
              </button>
            )}
            <ExportMenu data={response} modelUsed={modelUsed || 'OpenRouter Model'} onExport={onCopyNotification} />
          </div>
        </div>

        {/* Vertical stacked categories for Notion/SaaS dashboard feel */}
        <div className="space-y-8">
          
          {/* Brand Overview Card */}
          <Card className="border-t-4 border-t-indigo-500"
            title={
              <span className="flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-indigo-500" />
                <span>Brand Overview</span>
              </span>
            } 
            description="Core definition, mission, and tagline."
            headerAction={
              <CopyButton
                text={formatOverviewCopy(response.brandOverview)}
                onCopy={() => onCopyNotification('Copied Brand Overview to clipboard.')}
              />
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 border-r border-slate-100 pr-6">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1.5">Brand Name</span>
                <h4 className="text-xl font-extrabold text-indigo-950">{response.brandOverview.brandName}</h4>
                
                {response.brandOverview.tagline && response.brandOverview.tagline !== 'Not Available' && (
                  <div className="mt-4 p-4 bg-indigo-50/15 border border-indigo-100/50 rounded-2xl">
                    <span className="text-[9px] font-extrabold uppercase tracking-wide text-indigo-500 block">Tagline</span>
                    <p className="mt-1 text-xs font-semibold text-indigo-900 italic font-display">
                      "{response.brandOverview.tagline}"
                    </p>
                  </div>
                )}
              </div>
              <div className="md:col-span-2 space-y-5 pl-0 md:pl-2">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1.5">Summary</span>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">{response.brandOverview.summary}</p>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1.5">Mission</span>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">{response.brandOverview.mission}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Brand Identity Card */}
          <Card className="border-t-4 border-t-violet-500"
            title={
              <span className="flex items-center gap-2.5">
                <Fingerprint className="w-5 h-5 text-indigo-500" />
                <span>Brand Identity</span>
              </span>
            } 
            description="Core values, voice tones, and brand persona traits."
            headerAction={
              <CopyButton
                text={formatIdentityCopy(response.brandIdentity)}
                onCopy={() => onCopyNotification('Copied Brand Identity to clipboard.')}
              />
            }
          >
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2.5">Tone of Voice</span>
                <div className="flex flex-wrap gap-2">
                  {response.brandIdentity.tone && response.brandIdentity.tone.length > 0 ? (
                    response.brandIdentity.tone.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-xl bg-indigo-50 border border-indigo-100/60 text-xs font-semibold text-indigo-700">
                        {t}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">Not Available</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2.5">Personality Traits</span>
                  <div className="flex flex-wrap gap-1.5">
                    {response.brandIdentity.personality && response.brandIdentity.personality.length > 0 ? (
                      response.brandIdentity.personality.map((p, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/60 text-xs text-slate-600 font-medium">
                          {p}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">Not Available</span>
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2.5">Communication Style</span>
                  <div className="flex flex-wrap gap-1.5">
                    {response.brandIdentity.communicationStyle && response.brandIdentity.communicationStyle.length > 0 ? (
                      response.brandIdentity.communicationStyle.map((c, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/60 text-xs text-slate-600 font-medium">
                          {c}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">Not Available</span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2.5">Core Values</span>
                <div className="flex flex-wrap gap-2">
                  {response.brandIdentity.coreValues && response.brandIdentity.coreValues.length > 0 ? (
                    response.brandIdentity.coreValues.map((v, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-100/60 text-xs font-semibold text-emerald-700">
                        {v}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">Not Available</span>
                  )}
                </div>
              </div>

              <div className="border-t border-slate-50 pt-5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1.5">Target Audience</span>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">{response.brandIdentity.targetAudience}</p>
              </div>
            </div>
          </Card>

          {/* Content Guide Card */}
          <Card className="border-t-4 border-t-blue-500" title={
              <span className="flex items-center gap-2.5">
                <PenTool className="w-5 h-5 text-indigo-500" />
                <span>Content Guide</span>
              </span>
            } 
            description="Concrete writing rules and vocabulary controls."
            headerAction={
              <CopyButton
                text={formatContentGuideCopy(response.contentGuide)}
                onCopy={() => onCopyNotification('Copied Content Guide to clipboard.')}
              />
            }
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 block mb-2.5">Preferred Vocabulary</span>
                  <div className="flex flex-wrap gap-1.5">
                    {response.contentGuide.preferredWords && response.contentGuide.preferredWords.length > 0 ? (
                      response.contentGuide.preferredWords.map((w, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-700 font-semibold">
                          ✓ {w}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">Not Available</span>
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-500 block mb-2.5">Words to Avoid</span>
                  <div className="flex flex-wrap gap-1.5">
                    {response.contentGuide.avoidWords && response.contentGuide.avoidWords.length > 0 ? (
                      response.contentGuide.avoidWords.map((w, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-xl bg-red-50 border border-red-100 text-xs text-red-750 font-semibold">
                          ✗ {w}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">Not Available</span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2.5">Writing Rules</span>
                <ul className="list-decimal pl-5 text-xs text-slate-700 space-y-2 font-normal leading-relaxed">
                  {response.contentGuide.writingRules && response.contentGuide.writingRules.length > 0 ? (
                    response.contentGuide.writingRules.map((r, idx) => <li key={idx}>{r}</li>)
                  ) : (
                    <li className="text-slate-400 italic">Not Available</li>
                  )}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-5">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">CTA Style</span>
                  <p className="text-sm text-slate-800 font-semibold">{response.contentGuide.ctaStyle}</p>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">Reading Level</span>
                  <p className="text-sm text-slate-800 font-semibold">{response.contentGuide.readingLevel}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Customer Insights Card */}
          <Card className="border-t-4 border-t-pink-500"
            title={
              <span className="flex items-center gap-2.5">
                <Users className="w-5 h-5 text-indigo-500" />
                <span>Customer Insights</span>
              </span>
            } 
            description="Psychographics, objections, and triggers."
            headerAction={
              <CopyButton
                text={formatCustomerInsightsCopy(response.customerInsights)}
                onCopy={() => onCopyNotification('Copied Customer Insights to clipboard.')}
              />
            }
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-500 block mb-2.5">Customer Pain Points</span>
                  <ul className="list-disc pl-5 text-xs text-slate-700 space-y-1.5 font-normal leading-relaxed">
                    {response.customerInsights.painPoints && response.customerInsights.painPoints.length > 0 ? (
                      response.customerInsights.painPoints.map((item, idx) => <li key={idx}>{item}</li>)
                    ) : (
                      <li className="text-slate-400 italic">Not Available</li>
                    )}
                  </ul>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 block mb-2.5">Desired Outcomes</span>
                  <ul className="list-disc pl-5 text-xs text-slate-700 space-y-1.5 font-normal leading-relaxed">
                    {response.customerInsights.desiredOutcomes && response.customerInsights.desiredOutcomes.length > 0 ? (
                      response.customerInsights.desiredOutcomes.map((item, idx) => <li key={idx}>{item}</li>)
                    ) : (
                      <li className="text-slate-400 italic">Not Available</li>
                    )}
                  </ul>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-500 block mb-2.5">Buying Motivations</span>
                <div className="flex flex-wrap gap-2">
                  {response.customerInsights.buyingMotivations && response.customerInsights.buyingMotivations.length > 0 ? (
                    response.customerInsights.buyingMotivations.map((item, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-xl bg-indigo-50 border border-indigo-100 text-xs text-indigo-700 font-semibold">
                        {item}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">Not Available</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-slate-50 pt-5">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 block mb-2.5">Objections</span>
                  <ul className="list-disc pl-5 text-[11px] text-slate-600 space-y-1.5 font-light leading-relaxed">
                    {response.customerInsights.objections && response.customerInsights.objections.length > 0 ? (
                      response.customerInsights.objections.map((item, idx) => <li key={idx}>{item}</li>)
                    ) : (
                      <li className="text-slate-400 italic">Not Available</li>
                    )}
                  </ul>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-650 block mb-2.5">Emotional Triggers</span>
                  <ul className="list-disc pl-5 text-[11px] text-slate-600 space-y-1.5 font-light leading-relaxed">
                    {response.customerInsights.emotionalTriggers && response.customerInsights.emotionalTriggers.length > 0 ? (
                      response.customerInsights.emotionalTriggers.map((item, idx) => <li key={idx}>{item}</li>)
                    ) : (
                      <li className="text-slate-400 italic">Not Available</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Marketing Assets Card */}
          <Card className="border-t-4 border-t-purple-500" title={
              <span className="flex items-center gap-2.5">
                <Megaphone className="w-5 h-5 text-indigo-500" />
                <span>Marketing Assets & Copy</span>
              </span>
            } 
            description="High-converting templates with ad scripts."
            headerAction={
              <CopyButton
                text={formatMarketingAssetsCopy(response.marketingAssets)}
                onCopy={() => onCopyNotification('Copied Marketing Assets to clipboard.')}
              />
            }
          >
            <MarketingAssetsRenderer 
              assets={response.marketingAssets} 
              onCopyNotification={onCopyNotification} 
            />
          </Card>
        </div>

        {/* Dedicated Full-Width Brand Voice Analysis Card */}
        <div className="pt-2">
          <Card className="border-t-4 border-t-emerald-500"
            title={
              <span className="flex items-center gap-2.5">
                <TrendingUp className="w-5 h-5 text-indigo-500" />
                <span>Strategic Brand Voice Analysis Report</span>
              </span>
            }
            description="Executive strategic evaluation and messaging guidelines."
            headerAction={
              <CopyButton
                text={formatAnalysisCopy(response.brandVoiceAnalysis)}
                onCopy={() => onCopyNotification('Copied Brand Voice Analysis to clipboard.')}
              />
            }
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-4 border-b border-slate-100">
                <div className="md:col-span-3 space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">Executive Summary</span>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    {response.brandVoiceAnalysis.executiveSummary}
                  </p>
                </div>
                <div className="md:col-span-1 md:border-l md:border-slate-100 md:pl-6 flex flex-col justify-center">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">Voice Strength</span>
                  <div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                      response.brandVoiceAnalysis.voiceStrength === 'Excellent'
                        ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shadow-emerald-50'
                        : response.brandVoiceAnalysis.voiceStrength === 'Strong'
                        ? 'bg-indigo-500/10 text-indigo-600 border border-indigo-500/20 shadow-indigo-50'
                        : 'bg-amber-500/10 text-amber-600 border border-amber-500/20 shadow-amber-50'
                    }`}>
                      <Award className="w-3.5 h-3.5" /> {response.brandVoiceAnalysis.voiceStrength}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 block mb-3.5">Recommended Messaging Themes</span>
                  <div className="space-y-3">
                    {response.brandVoiceAnalysis.recommendedMessaging.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-normal leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 block mb-3.5">Messaging Themes to Avoid</span>
                  <div className="space-y-3">
                    {response.brandVoiceAnalysis.avoidMessaging.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-normal leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-50 pt-6">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-3">Key Brand Differentiators</span>
                  <div className="space-y-2.5">
                    {response.brandVoiceAnalysis.keyDifferentiators.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-600 font-light leading-relaxed">
                        <span className="text-indigo-400 font-bold mt-0.5">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-5">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1.5">Brand Personality Summary</span>
                    <p className="text-xs text-slate-700 font-normal leading-relaxed">{response.brandVoiceAnalysis.personalitySummary}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-650 block mb-1.5">Emotional Positioning</span>
                    <p className="text-xs text-slate-700 font-normal leading-relaxed">{response.brandVoiceAnalysis.emotionalPositioning}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1.5">Competitive Position</span>
                    <p className="text-xs text-slate-700 font-normal leading-relaxed">{response.brandVoiceAnalysis.competitivePosition}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-50 pt-6 space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-450 block">Recommended Next Steps (Consistency Directives)</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {response.brandVoiceAnalysis.recommendedNextSteps.map((step, idx) => (
                    <div key={idx} className="p-4.5 bg-white/40 hover:bg-white/90 border border-slate-100 hover:border-slate-200 rounded-2xl flex gap-3.5 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-0.5">
                      <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-650">
                        {idx + 1}
                      </span>
                      <p className="text-xs text-slate-655 leading-relaxed font-normal">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Professional Minimal Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-200/60 pb-8 text-center text-xs text-slate-450 font-normal space-y-1">
          <p>Generated using AI-powered Brand Voice Style Guide.</p>
          <p className="text-[10px] text-slate-350 uppercase tracking-widest font-extrabold">Ready for Copy • Regenerate • Export</p>
        </footer>
      </div>
    );
  }

  // 4. Default / Ready State
  return (
    <Card className="overflow-hidden min-h-[300px] flex flex-col items-center justify-center border-dashed border-2 border-slate-200 bg-slate-50/20">
      <div className="flex flex-col items-center justify-center p-8 max-w-2xl text-center">
        <div className="w-14 h-14 rounded-2xl bg-indigo-50/60 flex items-center justify-center text-2xl text-indigo-650 mb-5 shadow-inner border border-indigo-100/30 animate-pulse">
          <Sparkles className="w-6 h-6 text-indigo-600 animate-spin-hover" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 tracking-tight">
          Ready to Generate
        </h3>
        <p className="mt-2.5 text-sm text-slate-500 leading-relaxed font-normal max-w-lg">
          Fill in your brand credentials in the form and click <span className="font-semibold text-slate-700">"Generate Brand Voice"</span> to formulate a complete AI-powered style profile including:
        </p>
        
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3 w-full">
          <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm text-center hover:border-indigo-150 hover:shadow-md transition-all duration-200">
            <span className="text-lg block mb-1">🏢</span>
            <span className="block text-xs font-semibold text-slate-700">Overview</span>
            <span className="text-[10px] text-slate-400 block mt-0.5 font-light leading-tight">Mission & Tagline</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm text-center hover:border-indigo-155 hover:shadow-md transition-all duration-200">
            <span className="text-lg block mb-1">🎨</span>
            <span className="block text-xs font-semibold text-slate-700">Identity</span>
            <span className="text-[10px] text-slate-400 block mt-0.5 font-light leading-tight">Tone & Values</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm text-center hover:border-indigo-160 hover:shadow-md transition-all duration-200">
            <span className="text-lg block mb-1">📝</span>
            <span className="block text-xs font-semibold text-slate-700">Content Guide</span>
            <span className="text-[10px] text-slate-400 block mt-0.5 font-light leading-tight">Rules & Vocabulary</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm text-center hover:border-indigo-165 hover:shadow-md transition-all duration-200">
            <span className="text-lg block mb-1">📢</span>
            <span className="block text-xs font-semibold text-slate-700">Assets</span>
            <span className="text-[10px] text-slate-400 block mt-0.5 font-light leading-tight">Ad Copy & Scripts</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm text-center hover:border-indigo-170 hover:shadow-md transition-all duration-200 col-span-2 md:col-span-1">
            <span className="text-lg block mb-1">🎯</span>
            <span className="block text-xs font-semibold text-slate-700">Insights</span>
            <span className="text-[10px] text-slate-400 block mt-0.5 font-light leading-tight">Triggers & objections</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
