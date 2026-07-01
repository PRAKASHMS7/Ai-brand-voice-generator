import type { BrandVoiceResponse } from '../types';

export interface ParsedResult {
  data: BrandVoiceResponse;
  notice?: string;
}

/**
 * Validates and normalizes the parsed object to match the BrandVoiceResponse schema.
 * Throws an error if required high-level categories are missing.
 */
function validateAndNormalize(obj: any): BrandVoiceResponse {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Invalid JSON structure');
  }

  // Verify high-level categories are present
  const requiredCategories = [
    'brandOverview',
    'brandIdentity',
    'contentGuide',
    'marketingAssets',
    'customerInsights',
    'brandVoiceAnalysis',
  ];
  for (const cat of requiredCategories) {
    if (!obj[cat] || typeof obj[cat] !== 'object') {
      throw new Error(`Missing required category: ${cat}`);
    }
  }

  const safeStr = (val: any): string =>
    typeof val === 'string' && val.trim() !== '' ? val.trim() : 'Not Available';
  
  const safeArr = (val: any): string[] =>
    Array.isArray(val)
      ? val.filter((item) => item !== null && item !== undefined).map((item) => String(item).trim())
      : [];

  const brandOverview = obj.brandOverview;
  const brandIdentity = obj.brandIdentity;
  const contentGuide = obj.contentGuide;
  const marketingAssets = obj.marketingAssets;
  const customerInsights = obj.customerInsights;
  const brandVoiceAnalysis = obj.brandVoiceAnalysis;

  // Validation of Voice Strength value
  const parseVoiceStrength = (val: any): 'Excellent' | 'Strong' | 'Developing' => {
    const s = String(val).trim();
    if (s === 'Excellent' || s === 'Strong' || s === 'Developing') {
      return s;
    }
    return 'Strong'; // default qualitative fallback
  };

  const parseVisual = (v: any) => {
    if (typeof v === 'string') {
      return {
        cameraAngle: 'Not Available',
        lighting: 'Not Available',
        background: 'Not Available',
        colorPalette: 'Not Available',
        sceneFlow: v.trim() !== '' ? v.trim() : 'Not Available',
      };
    }
    return {
      cameraAngle: safeStr(v?.cameraAngle),
      lighting: safeStr(v?.lighting),
      background: safeStr(v?.background),
      colorPalette: safeStr(v?.colorPalette),
      sceneFlow: safeStr(v?.sceneFlow),
    };
  };

  const parseVoice = (v: any) => {
    if (typeof v === 'string') {
      return {
        speakingStyle: 'Not Available',
        energy: 'Not Available',
        emotion: 'Not Available',
        pace: 'Not Available',
        targetFeeling: v.trim() !== '' ? v.trim() : 'Not Available',
      };
    }
    return {
      speakingStyle: safeStr(v?.speakingStyle),
      energy: safeStr(v?.energy),
      emotion: safeStr(v?.emotion),
      pace: safeStr(v?.pace),
      targetFeeling: safeStr(v?.targetFeeling),
    };
  };

  // Validation of sub-assets
  const getAsset = (asset: any) => ({
    hook: safeStr(asset?.hook),
    script: safeStr(asset?.script),
    cta: safeStr(asset?.cta),
    hookTitles: safeArr(asset?.hookTitles),
    hookExplanation: safeStr(asset?.hookExplanation),
    visualDirection: parseVisual(asset?.visualDirection),
    voiceDirection: parseVoice(asset?.voiceDirection),
    hashtags: safeArr(asset?.hashtags),
  });

  return {
    brandOverview: {
      brandName: safeStr(brandOverview.brandName),
      summary: safeStr(brandOverview.summary),
      mission: safeStr(brandOverview.mission),
      tagline: safeStr(brandOverview.tagline),
    },
    brandIdentity: {
      tone: safeArr(brandIdentity.tone),
      writingStyle: safeArr(brandIdentity.writingStyle),
      personality: safeArr(brandIdentity.personality),
      communicationStyle: safeArr(brandIdentity.communicationStyle),
      coreValues: safeArr(brandIdentity.coreValues),
      targetAudience: safeStr(brandIdentity.targetAudience),
    },
    contentGuide: {
      preferredWords: safeArr(contentGuide.preferredWords),
      avoidWords: safeArr(contentGuide.avoidWords),
      writingRules: safeArr(contentGuide.writingRules),
      ctaStyle: safeStr(contentGuide.ctaStyle),
      readingLevel: safeStr(contentGuide.readingLevel),
    },
    marketingAssets: {
      imageAd: getAsset(marketingAssets.imageAd),
      ugc: getAsset(marketingAssets.ugc),
      shortVideo: getAsset(marketingAssets.shortVideo),
      longVideo: getAsset(marketingAssets.longVideo),
      captions: safeArr(marketingAssets.captions),
    },
    customerInsights: {
      painPoints: safeArr(customerInsights.painPoints),
      desiredOutcomes: safeArr(customerInsights.desiredOutcomes),
      buyingMotivations: safeArr(customerInsights.buyingMotivations),
      objections: safeArr(customerInsights.objections),
      emotionalTriggers: safeArr(customerInsights.emotionalTriggers),
    },
    brandVoiceAnalysis: {
      executiveSummary: safeStr(brandVoiceAnalysis?.executiveSummary),
      voiceStrength: parseVoiceStrength(brandVoiceAnalysis?.voiceStrength),
      personalitySummary: safeStr(brandVoiceAnalysis?.personalitySummary),
      keyDifferentiators: safeArr(brandVoiceAnalysis?.keyDifferentiators),
      recommendedMessaging: safeArr(brandVoiceAnalysis?.recommendedMessaging),
      avoidMessaging: safeArr(brandVoiceAnalysis?.avoidMessaging),
      emotionalPositioning: safeStr(brandVoiceAnalysis?.emotionalPositioning),
      competitivePosition: safeStr(brandVoiceAnalysis?.competitivePosition),
      recommendedNextSteps: safeArr(brandVoiceAnalysis?.recommendedNextSteps),
    },
  };
}

/**
 * Cleans the raw text response, extracts potential notices, parses the JSON,
 * validates it, and returns the structured result.
 */
export function parseBrandVoiceResponse(raw: string): ParsedResult {
  let cleaned = raw.trim();
  let notice: string | undefined = undefined;

  // Detect and split fallback notice if it is prepended
  const noticeMarker = '==================================================';
  if (cleaned.includes(noticeMarker)) {
    const parts = cleaned.split(noticeMarker);
    notice = parts[0].trim();
    cleaned = parts.slice(1).join(noticeMarker).trim();
  }

  // Remove markdown code blocks if any (e.g., ```json or ```)
  if (cleaned.startsWith('```')) {
    const firstNewline = cleaned.indexOf('\n');
    if (firstNewline !== -1) {
      cleaned = cleaned.substring(firstNewline).trim();
    }
    if (cleaned.endsWith('```')) {
      cleaned = cleaned.substring(0, cleaned.length - 3).trim();
    }
  }

  try {
    const parsed = JSON.parse(cleaned);
    const validated = validateAndNormalize(parsed);
    return {
      data: validated,
      notice,
    };
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Failed to parse or validate AI response:', error);
      console.log('Raw content was:', raw);
    }
    throw new Error('The AI returned an invalid response. Please try again.');
  }
}
