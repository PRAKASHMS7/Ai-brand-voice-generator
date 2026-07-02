export type BrandType = 'known' | 'new';

export type GenerateType = 'brand_only' | 'brand_products' | 'single_product';

export type AIModel = 'claude' | 'gpt' | 'gemini';

export interface BrandVoiceFormState {
  brandType: BrandType;
  generateFor: GenerateType;
  brandName: string;
  websiteUrl: string;
  industry: string;
  customIndustry?: string;
  tone: string;
  writingStyle: string;
  targetAudience: string;
  tagline: string;
  writingSamples: string;
}

export interface ModelConfig {
  id: AIModel;
  name: string;
  provider: string;
  description: string;
  details: string;
}

export interface BrandOverview {
  brandName: string;
  summary: string;
  mission: string;
  tagline: string;
}

export interface BrandIdentity {
  tone: string[];
  writingStyle: string[];
  personality: string[];
  communicationStyle: string[];
  coreValues: string[];
  targetAudience: string;
}

export interface ContentGuide {
  preferredWords: string[];
  avoidWords: string[];
  writingRules: string[];
  ctaStyle: string;
  readingLevel: string;
}

export interface VisualDirectionDetails {
  cameraAngle: string;
  lighting: string;
  background: string;
  colorPalette: string;
  sceneFlow: string;
}

export interface VoiceDirectionDetails {
  speakingStyle: string;
  energy: string;
  emotion: string;
  pace: string;
  targetFeeling: string;
}

export interface MarketingAssetDetails {
  hook: string;
  script: string;
  cta: string;
  hookTitles: string[];
  hookExplanation: string;
  visualDirection: VisualDirectionDetails;
  voiceDirection: VoiceDirectionDetails;
  hashtags: string[];
}

export interface MarketingAssets {
  imageAd: MarketingAssetDetails;
  ugc: MarketingAssetDetails;
  shortVideo: MarketingAssetDetails;
  longVideo: MarketingAssetDetails;
  captions: string[];
}

export interface CustomerInsights {
  painPoints: string[];
  desiredOutcomes: string[];
  buyingMotivations: string[];
  objections: string[];
  emotionalTriggers: string[];
}

export interface BrandVoiceAnalysis {
  executiveSummary: string;
  voiceStrength: 'Excellent' | 'Strong' | 'Developing';
  personalitySummary: string;
  keyDifferentiators: string[];
  recommendedMessaging: string[];
  avoidMessaging: string[];
  emotionalPositioning: string;
  competitivePosition: string;
  recommendedNextSteps: string[];
}

export interface BrandVoiceResponse {
  brandOverview: BrandOverview;
  brandIdentity: BrandIdentity;
  contentGuide: ContentGuide;
  marketingAssets: MarketingAssets;
  customerInsights: CustomerInsights;
  brandVoiceAnalysis: BrandVoiceAnalysis;
}
