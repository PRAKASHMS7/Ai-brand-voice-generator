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
    <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-50 via-slate-100/40 to-slate-50 py-10 px-8 lg:px-12 xl:px-16 overflow-hidden">
      {/* SaaS mesh backgrounds - Low Opacity */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-[0.025] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-500/[0.04] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-[1700px] mx-auto space-y-8 relative z-10">
        
        {/* Top Hero Section */}
        <header className="relative flex flex-col items-center text-center max-w-3xl mx-auto pb-4 space-y-2.5">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display relative z-10">
            Brand Voice <span className="text-[#4F46E5]">Generator</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-2xl leading-relaxed relative z-10">
            Generate professional brand voice guidelines, messaging frameworks, and marketing assets powered by AI.
          </p>
          <p className="text-[11px] text-slate-400 font-normal max-w-lg leading-relaxed relative z-10">
            Create agency-quality brand documentation in minutes.
          </p>
        </header>

        {/* Main Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Brand Form (Span 2) */}
          <div className="lg:col-span-2">
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
