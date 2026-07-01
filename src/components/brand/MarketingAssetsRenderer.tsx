import React, { useState } from 'react';
import type { MarketingAssets } from '../../types';
import { CopyButton } from '../ui/CopyButton';

interface MarketingAssetsRendererProps {
  assets: MarketingAssets;
  onCopyNotification: (message: string) => void;
}

export const MarketingAssetsRenderer: React.FC<MarketingAssetsRendererProps> = ({
  assets,
  onCopyNotification,
}) => {
  const [activeTab, setActiveTab] = useState<'imageAd' | 'ugc' | 'shortVideo' | 'longVideo'>('imageAd');

  const tabs = [
    { id: 'imageAd', label: '🖼️ Image Ad', ariaLabel: 'Image Ad asset details' },
    { id: 'ugc', label: '🎥 UGC Video', ariaLabel: 'User Generated Content Video details' },
    { id: 'shortVideo', label: '⚡ Short Video', ariaLabel: 'Short-form video details' },
    { id: 'longVideo', label: '📺 Long Video', ariaLabel: 'Long-form video details' },
  ] as const;

  const activeAsset = assets[activeTab];

  // Text representation of the active asset for copy functionality
  const getActiveAssetCopyText = () => {
    if (!activeAsset) return 'Not Available';
    const label = tabs.find((t) => t.id === activeTab)?.label || activeTab;
    const hooksText = activeAsset.hookTitles && activeAsset.hookTitles.length > 0
      ? activeAsset.hookTitles.map((t) => `- "${t}"`).join('\n')
      : '- Not Available';
    const hashtagsText = activeAsset.hashtags && activeAsset.hashtags.length > 0
      ? activeAsset.hashtags.join(' ')
      : 'Not Available';

    return `[${label.toUpperCase()}]
Hook Titles:
${hooksText}

Hook Explanation:
${activeAsset.hookExplanation || 'Not Available'}

Main Script Copy:
${activeAsset.script || 'Not Available'}

Visual Direction:
- Camera shot/angle: ${activeAsset.visualDirection?.cameraAngle || 'Not Available'}
- Lighting: ${activeAsset.visualDirection?.lighting || 'Not Available'}
- Background: ${activeAsset.visualDirection?.background || 'Not Available'}
- Color Palette: ${activeAsset.visualDirection?.colorPalette || 'Not Available'}
- Scene Flow: ${activeAsset.visualDirection?.sceneFlow || 'Not Available'}

Voice Direction:
- Speaking style: ${activeAsset.voiceDirection?.speakingStyle || 'Not Available'}
- Energy level: ${activeAsset.voiceDirection?.energy || 'Not Available'}
- Emotion: ${activeAsset.voiceDirection?.emotion || 'Not Available'}
- Pacing: ${activeAsset.voiceDirection?.pace || 'Not Available'}
- Evoked Feeling: ${activeAsset.voiceDirection?.targetFeeling || 'Not Available'}

CTA:
${activeAsset.cta || 'Not Available'}

Hashtags:
${hashtagsText}`;
  };

  return (
    <div className="space-y-5">
      {/* Tabs List */}
      <div
        role="tablist"
        aria-label="Marketing asset distribution options"
        className="flex flex-wrap bg-slate-100/70 p-1.5 rounded-2xl gap-1.5"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              aria-label={tab.ariaLabel}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[100px] text-center px-4 py-2.5 rounded-xl text-[11px] font-bold tracking-wide uppercase transition-all duration-300 cursor-pointer focus:outline-none whitespace-nowrap active:scale-[0.98] ${
                isActive
                  ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/40'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panel Content */}
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        tabIndex={0}
        className="p-4 bg-slate-50/50 rounded-xl border border-slate-100/60 space-y-4.5 relative group focus:ring-2 focus:ring-indigo-100 focus:outline-none"
      >
        <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
          <CopyButton
            text={getActiveAssetCopyText()}
            onCopy={() => onCopyNotification('Copied asset copy to clipboard.')}
          />
        </div>

        <div className="pr-12 space-y-4">
          {/* 1. Hook Titles */}
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Hook Titles</span>
            <ul className="mt-1 list-disc pl-5 text-sm text-slate-900 font-semibold space-y-1">
              {activeAsset?.hookTitles && activeAsset.hookTitles.length > 0 ? (
                activeAsset.hookTitles.map((t, idx) => <li key={idx}>"{t}"</li>)
              ) : (
                <li>Not Available</li>
              )}
            </ul>
          </div>
          
          {/* 2. Hook Explanation */}
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Hook Explanation</span>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed font-normal">
              {activeAsset?.hookExplanation || 'Not Available'}
            </p>
          </div>
          
          {/* 3. Main Script */}
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Main Script</span>
            <div className="mt-1 text-xs text-slate-700 font-mono whitespace-pre-wrap leading-relaxed bg-white border border-slate-100 p-3.5 rounded-lg shadow-inner max-h-[180px] overflow-y-auto">
              {activeAsset?.script || 'Not Available'}
            </div>
          </div>
          
          {/* 4. Visual Direction */}
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">Suggested Visual Direction</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-100/50 p-3 rounded-lg border border-slate-100/40">
              <div>
                <span className="font-semibold text-slate-600 block">📹 Camera shot/angle:</span>
                <span className="text-slate-800 font-normal">{activeAsset?.visualDirection?.cameraAngle || 'Not Available'}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-600 block">💡 Lighting setup:</span>
                <span className="text-slate-800 font-normal">{activeAsset?.visualDirection?.lighting || 'Not Available'}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-600 block">🏢 Background setting:</span>
                <span className="text-slate-800 font-normal">{activeAsset?.visualDirection?.background || 'Not Available'}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-600 block">🎨 Color palette:</span>
                <span className="text-slate-800 font-normal">{activeAsset?.visualDirection?.colorPalette || 'Not Available'}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="font-semibold text-slate-600 block">🎬 Sequence flow & placement:</span>
                <span className="text-slate-800 font-normal">{activeAsset?.visualDirection?.sceneFlow || 'Not Available'}</span>
              </div>
            </div>
          </div>
          
          {/* 5. Voice Direction */}
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">Voice Direction</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-100/50 p-3 rounded-lg border border-slate-100/40">
              <div>
                <span className="font-semibold text-slate-600 block">🗣️ Speaking style:</span>
                <span className="text-slate-800 font-normal">{activeAsset?.voiceDirection?.speakingStyle || 'Not Available'}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-600 block">⚡ Energy level:</span>
                <span className="text-slate-800 font-normal">{activeAsset?.voiceDirection?.energy || 'Not Available'}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-600 block">🎭 Emotion mode:</span>
                <span className="text-slate-800 font-normal">{activeAsset?.voiceDirection?.emotion || 'Not Available'}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-600 block">⏱️ Delivery pacing:</span>
                <span className="text-slate-800 font-normal">{activeAsset?.voiceDirection?.pace || 'Not Available'}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="font-semibold text-slate-600 block">❤️ Evoked feeling target:</span>
                <span className="text-slate-800 font-normal">{activeAsset?.voiceDirection?.targetFeeling || 'Not Available'}</span>
              </div>
            </div>
          </div>
          
          {/* 6. CTA */}
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Call to Action (CTA)</span>
            <p className="mt-1 text-xs text-slate-850 font-semibold">{activeAsset?.cta || 'Not Available'}</p>
          </div>
          
          {/* 7. Suggested Hashtags */}
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Suggested Hashtags</span>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {activeAsset?.hashtags && activeAsset.hashtags.length > 0 ? (
                activeAsset.hashtags.map((h, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-[11px] font-semibold text-indigo-700">
                    {h}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-450 italic">Not Available</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Social Captions section beneath */}
      <div className="border-t border-slate-50 pt-4">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">Suggested Social Captions</span>
        <div className="space-y-2.5">
          {assets?.captions && assets.captions.length > 0 ? (
            assets.captions.map((caption, idx) => (
              <div key={idx} className="p-3 bg-indigo-50/10 border border-indigo-100/20 rounded-xl relative group">
                <span className="absolute top-2 right-3.5 text-[10px] font-bold text-indigo-305">#{idx + 1}</span>
                <p className="text-xs text-slate-700 leading-relaxed font-normal pr-8">{caption}</p>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 italic">Not Available</p>
          )}
        </div>
      </div>
    </div>
  );
};
