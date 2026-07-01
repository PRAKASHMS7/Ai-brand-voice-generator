import type { ModelConfig } from '../types';

export const MODELS_CONFIG: ModelConfig[] = [
  {
    id: 'claude',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    description: ' nuance, creative copywriting, and deep voice analysis.',
    details: 'Best for complex editorial tones, storytelling, and high-fidelity brand personas.',
  },
  {
    id: 'gpt',
    name: 'GPT-4o',
    provider: 'OpenAI',
    description: 'High versatility, structured outputs, and analytical writing.',
    details: 'Best for standard marketing channels, ads, and consistent rule-based copy.',
  },
  {
    id: 'gemini',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    description: 'Deep context reasoning, speed, and real-time data integration.',
    details: 'Best for tech copywriting, product guides, and research-infused brand tone.',
  },
];

// OpenRouter model mapping
export const OPENROUTER_MODEL_IDS: Record<'claude' | 'gpt' | 'gemini', string> = {
  claude: 'anthropic/claude-sonnet-4',
  gpt: 'openai/gpt-4o',
  gemini: 'google/gemini-2.5-pro',
};
