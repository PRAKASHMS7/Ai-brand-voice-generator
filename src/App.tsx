import { useState, useCallback, memo } from 'react';
import { BrandForm } from './components/brand/BrandForm';
import { ModelSelector } from './components/brand/ModelSelector';
import { ResultPlaceholder } from './components/brand/ResultPlaceholder';
import type { BrandVoiceFormState, AIModel, BrandVoiceResponse } from './types';
import { OpenRouterService } from './services/openrouter';
import { buildBrandVoicePrompt } from './utils/promptBuilder';
import { OPENROUTER_MODEL_IDS } from './config/models';
import { parseBrandVoiceResponse } from './utils/jsonParser';
import { Toast } from './components/ui/Toast';

const MemoizedBrandForm = memo(BrandForm);
const MemoizedModelSelector = memo(ModelSelector);

const INITIAL_FORM_STATE: BrandVoiceFormState = {
  brandType: 'known',
  generateFor: 'brand_only',
  brandName: '',
  websiteUrl: '',
  industry: '',
  customIndustry: '',
  tone: '',
  writingStyle: '',
  targetAudience: '',
  tagline: '',
  writingSamples: '',
};

const LOADING_STEPS = [
  "Preparing brand profile...",
  "Building AI prompt...",
  "Generating brand strategy...",
  "Structuring response...",
  "Finalizing report..."
];

function App() {
  const [formState, setFormState] = useState<BrandVoiceFormState>(INITIAL_FORM_STATE);
  const [selectedModel, setSelectedModel] = useState<AIModel>('claude');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(LOADING_STEPS[0]);
  const [generatedResponse, setGeneratedResponse] = useState<BrandVoiceResponse | undefined>(undefined);
  const [fallbackNotice, setFallbackNotice] = useState<string | undefined>(undefined);
  const [apiError, setApiError] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | undefined>(undefined);

  const handleFieldChange = useCallback(<K extends keyof BrandVoiceFormState>(
    field: K,
    value: BrandVoiceFormState[K]
  ) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setLoadingMessage(LOADING_STEPS[0]);
    setApiError(undefined);
    setGeneratedResponse(undefined);
    setFallbackNotice(undefined);

    // Defensive validation
    const isFormValid =
      formState.brandName.trim() !== '' &&
      formState.industry !== '' &&
      (formState.industry !== 'other' || (formState.customIndustry && formState.customIndustry.trim() !== '')) &&
      formState.tone.trim() !== '' &&
      formState.writingStyle.trim() !== '';

    if (!isFormValid) {
      setApiError('Required fields are missing. Please complete Brand Name, Industry, Tone, and Writing Style.');
      setIsLoading(false);
      return;
    }

    let stepIdx = 0;
    const stepInterval = setInterval(() => {
      if (stepIdx < LOADING_STEPS.length - 1) {
        stepIdx++;
        setLoadingMessage(LOADING_STEPS[stepIdx]);
      }
    }, 2800);

    try {
      const prompt = buildBrandVoicePrompt(formState);
      const modelId = OPENROUTER_MODEL_IDS[selectedModel];
      
      const response = await OpenRouterService.generateBrandVoice(modelId, prompt);
      const parsed = parseBrandVoiceResponse(response);
      
      setGeneratedResponse(parsed.data);
      setFallbackNotice(parsed.notice);
      setToastMessage('Brand Voice generated successfully!');
    } catch (err: any) {
      setApiError(err.message || 'An unexpected error occurred while communicating with OpenRouter.');
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-slate-900 py-10 px-6 sm:px-8 lg:px-12 xl:px-16 overflow-hidden">
      {/* SaaS mesh backgrounds - Low Opacity */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.4] pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[50%] bg-gradient-to-br from-indigo-200/20 to-transparent rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[60%] bg-gradient-to-bl from-violet-200/15 to-transparent rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[40%] bg-gradient-to-tr from-blue-200/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1700px] mx-auto space-y-8 relative z-10">
        
        {/* Top Hero Section */}
        <header className="relative flex flex-col items-center text-center max-w-3xl mx-auto py-8 mb-4 space-y-3">
          {/* Subtle glow behind title */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
          
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/60 text-[10px] font-extrabold text-indigo-650 uppercase tracking-widest relative z-10 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            Strategic AI Studio
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display relative z-10">
            Brand Voice <span className="text-indigo-600 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Generator</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-2xl leading-relaxed relative z-10">
            Generate professional brand voice guidelines, messaging frameworks, and marketing assets powered by AI.
          </p>
          <p className="text-[11px] text-slate-400 font-normal max-w-lg leading-relaxed relative z-10">
            Create agency-quality brand documentation in minutes.
          </p>
        </header>

        {/* Main Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Left Column: Brand Form (Span 3) */}
          <div className="lg:col-span-3">
            <MemoizedBrandForm
              formState={formState}
              onChange={handleFieldChange}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>

          {/* Right Column: Model Selector (Span 1) */}
          <div className="lg:col-span-1">
            <MemoizedModelSelector
              selectedModel={selectedModel}
              onChange={setSelectedModel}
            />
          </div>
          
        </main>

        {/* Bottom Section: Result Card */}
        <footer className="pt-4">
          <ResultPlaceholder 
            isLoading={isLoading} 
            loadingMessage={loadingMessage}
            response={generatedResponse}
            notice={fallbackNotice}
            error={apiError}
            modelUsed={OPENROUTER_MODEL_IDS[selectedModel]}
            onCopyNotification={(msg) => setToastMessage(msg)}
            onRegenerate={() => handleSubmit()}
          />
        </footer>

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(undefined)} />
      )}
        
      </div>
    </div>
  );
}

export default App;
