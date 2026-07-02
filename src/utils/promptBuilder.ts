import type { BrandVoiceFormState } from '../types';

/**
 * Builds a comprehensive prompt from the brand voice form parameters.
 * Instructs the AI model to act as a senior Brand Strategist, return a single
 * valid JSON object matching a strict predefined schema, and mark every property as mandatory.
 */
export const buildBrandVoicePrompt = (form: BrandVoiceFormState): string => {
  const brandTypeDescription =
    form.brandType === 'known'
      ? 'an existing established brand with a public footprint'
      : 'a completely new brand identity starting from scratch';

  const generateForDescription = {
    brand_only: 'Core brand style guide and overall tone rules.',
    brand_products: 'Core brand voice style guide plus guidelines for applying it to a product catalog.',
    single_product: 'Core brand voice style guide optimized for a single key product launch.',
  }[form.generateFor];

  return `You are an elite, senior Brand Strategist. Analyze the following brand details and generate a highly professional, consistent, and actionable Brand Voice guide.

### BRAND INFORMATION:
- Brand Name: ${form.brandName}
- Brand Type: ${form.brandType} (${brandTypeDescription})
- Industry: ${form.industry === 'other' ? (form.customIndustry || 'Other') : form.industry}
- Generate For: ${form.generateFor} (${generateForDescription})
${form.websiteUrl ? `- Website URL: ${form.websiteUrl}\n` : ''}${form.tagline ? `- Brand Tagline: ${form.tagline}\n` : ''}${form.targetAudience ? `- Target Audience: ${form.targetAudience}\n` : ''}
### VOICE & STYLE PARAMETERS:
- Desired Tone: ${form.tone}
- Writing Style: ${form.writingStyle}
${form.writingSamples && form.writingSamples.trim() !== '' ? `\n### REFERENCE WRITING SAMPLES:\n"""\n${form.writingSamples.trim()}\n"""\n` : ''}
### STRICT OUTPUT FORMAT INSTRUCTIONS:
- You must return the output ONLY as a single valid JSON object following the schema below.
- Do not wrap the JSON response inside markdown code blocks (do not use \`\`\`json or \`\`\`).
- Do not include any conversational preambles, explanations, intros, or post-commentary.
- Do not return any additional text other than the JSON object itself.
- **CRITICAL REQUIREMENT**: Every single property/key in the JSON schema below is **MANDATORY**. Do not omit any keys.
- If a value or list cannot be determined or is not supplied, use "Not Available" for strings, and [] for arrays. Never use null, undefined, or omit the key.

The JSON response must exactly match this structure:
{
  "brandOverview": {
    "brandName": "Exact name of the brand",
    "summary": "Detailed summary of the brand's voice and marketplace placement",
    "mission": "Clear brand mission statement reflecting its core purpose",
    "tagline": "A compelling brand tagline"
  },
  "brandIdentity": {
    "tone": ["adjectives representing tone", "e.g., bold", "e.g., educational"],
    "writingStyle": ["guidelines for writing style", "e.g., active voice", "e.g., short paragraphs"],
    "personality": ["brand personality attributes"],
    "communicationStyle": ["brand communication style descriptors"],
    "coreValues": ["core values the brand stands for"],
    "targetAudience": "Detailed demographic and psychographic description of the target audience"
  },
  "contentGuide": {
    "preferredWords": ["specific words or phrases the brand should use to reinforce identity"],
    "avoidWords": ["words, jargon, or phrases the brand must strictly avoid"],
    "writingRules": ["grammatical or structural writing rules (e.g., no emoji in headings)"],
    "ctaStyle": "Instructions on writing and formatting calls to action",
    "readingLevel": "Target reading/comprehension level (e.g., Grade 8, Conversational)"
  },
  "marketingAssets": {
    "imageAd": {
      "hook": "A general summary of the hook angle (string)",
      "hookTitles": ["Compelling headline option 1", "Compelling headline option 2", "Compelling headline option 3"],
      "hookExplanation": "Detailed explanation of why these hooks capture attention and appeal to the target audience",
      "script": "A detailed, conversational, benefit-focused static ad body copy of approximately 60-100 words",
      "cta": "One strong, clear Call to Action",
      "visualDirection": {
        "cameraAngle": "Camera angles, shots, and positioning description",
        "lighting": "Lighting style and mood setup",
        "background": "Setting, environment, or background details",
        "colorPalette": "Dominant color scheme and visual palette",
        "sceneFlow": "Sequential visual storyboard layout and product placement directions"
      },
      "voiceDirection": {
        "speakingStyle": "Voiceover speaking style or personality tone",
        "energy": "Voice energy level (e.g., calm, high-energy)",
        "emotion": "Emotion to convey through delivery",
        "pace": "Pacing of delivery (e.g., measured, fast-paced)",
        "targetFeeling": "Specific feeling to evoke in the viewer/listener"
      },
      "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"]
    },
    "ugc": {
      "hook": "A general summary of the UGC hook angle (string)",
      "hookTitles": ["UGC hook option 1", "UGC hook option 2", "UGC hook option 3"],
      "hookExplanation": "Detailed explanation of why these UGC hooks resonate with consumers",
      "script": "A detailed, natural, relatable User Generated Content script of approximately 120-180 words, benefit-focused and conversational",
      "cta": "One strong, organic Call to Action",
      "visualDirection": {
        "cameraAngle": "Camera angles, shots, and positioning description for the creator",
        "lighting": "Lighting style and mood setup",
        "background": "Setting, environment, or background details (e.g., home office, kitchen)",
        "colorPalette": "Dominant color scheme and visual palette",
        "sceneFlow": "Sequential visual storyboard layout and product placement directions for UGC"
      },
      "voiceDirection": {
        "speakingStyle": "Voiceover speaking style or personality tone",
        "energy": "Voice energy level",
        "emotion": "Emotion to convey through delivery",
        "pace": "Pacing of delivery",
        "targetFeeling": "Specific feeling to evoke in the viewer/listener"
      },
      "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"]
    },
    "shortVideo": {
      "hook": "A general summary of the short video hook angle (string)",
      "hookTitles": ["TikTok/Reels hook option 1", "TikTok/Reels hook option 2", "TikTok/Reels hook option 3"],
      "hookExplanation": "Detailed explanation of why these short video hooks capture instant scrolling attention",
      "script": "A fast-paced, high-impact short-form video script of approximately 80-120 words focusing on benefits",
      "cta": "One strong, action-oriented Call to Action",
      "visualDirection": {
        "cameraAngle": "Camera angles, shots, and positioning description for quick cuts",
        "lighting": "Lighting style and mood setup",
        "background": "Setting, environment, or background details",
        "colorPalette": "Dominant color scheme and visual palette",
        "sceneFlow": "Sequential visual storyboard layout and product placement directions for short-form video"
      },
      "voiceDirection": {
        "speakingStyle": "Voiceover speaking style or personality tone",
        "energy": "Voice energy level",
        "emotion": "Emotion to convey through delivery",
        "pace": "Pacing of delivery",
        "targetFeeling": "Specific feeling to evoke in the viewer/listener"
      },
      "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"]
    },
    "longVideo": {
      "hook": "A general summary of the long video hook/intro angle (string)",
      "hookTitles": ["YouTube/Webinar hook option 1", "YouTube/Webinar hook option 2", "YouTube/Webinar hook option 3"],
      "hookExplanation": "Detailed explanation of why this hook sustains viewer retention over longer periods",
      "script": "A detailed, structured narrative script of approximately 200-350 words, conversational, benefit-focused, and highly brand-specific",
      "cta": "One strong, value-based Call to Action",
      "visualDirection": {
        "cameraAngle": "Camera angles, shots, and positioning description for multiple angles/slides",
        "lighting": "Lighting style and mood setup",
        "background": "Setting, environment, or background details",
        "colorPalette": "Dominant color scheme and visual palette",
        "sceneFlow": "Sequential visual storyboard layout and product placement directions for long-form video"
      },
      "voiceDirection": {
        "speakingStyle": "Voiceover speaking style or personality tone",
        "energy": "Voice energy level",
        "emotion": "Emotion to convey through delivery",
        "pace": "Pacing of delivery",
        "targetFeeling": "Specific feeling to evoke in the viewer/listener"
      },
      "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"]
    },
    "captions": ["social media caption option 1", "social media caption option 2", "social media caption option 3"]
  },
  "customerInsights": {
    "painPoints": ["key problems or challenges faced by the target audience"],
    "desiredOutcomes": ["primary goals or outcomes the target audience seeks to achieve"],
    "buyingMotivations": ["underlying motivations that drive purchase decisions"],
    "objections": ["common objections the audience might have, and how the brand voice resolves them"],
    "emotionalTriggers": ["emotional feelings or triggers to invoke in the copy"]
  },
  "brandVoiceAnalysis": {
    "executiveSummary": "A qualitative executive summary of the brand's voice strategy and how it matches the mission and tagline",
    "voiceStrength": "Qualitative strength of the brand voice: must be exactly one of 'Excellent', 'Strong', or 'Developing'",
    "personalitySummary": "Qualitative summary of the brand voice persona traits",
    "keyDifferentiators": ["Brand-specific differentiator 1 - explain why this aligns with the voice", "Brand-specific differentiator 2 - explain why this aligns with the voice"],
    "recommendedMessaging": ["Recommended messaging theme 1 - explain why this aligns with the voice", "Recommended messaging theme 2 - explain why this aligns with the voice"],
    "avoidMessaging": ["Messaging theme to avoid 1 - explain why this violates the voice", "Messaging theme to avoid 2 - explain why this violates the voice"],
    "emotionalPositioning": "How the brand positions itself emotionally to build trust and resonate with the target audience",
    "competitivePosition": "The brand's unique qualitative positioning compared to competitors within its industry",
    "recommendedNextSteps": [
      "Practical next step 1 (actionable guideline for marketing teams to maintain consistency)",
      "Practical next step 2",
      "Practical next step 3",
      "Practical next step 4"
    ]
  }
}

### CRITICAL QUALITY & ALIGNMENT DIRECTIVES:
1. Think like a Senior Brand Strategist and Creative Director.
2. Every recommendation in keyDifferentiators, recommendedMessaging, avoidMessaging, and emotionalPositioning must be highly brand-specific and directly refer to the supplied brandName, industry, audience, tone, writing style, mission, and tagline. Do not return generic marketing advice or boilerplate slogans.
3. For every recommendation in recommendedMessaging and avoidMessaging, explicitly explain why it aligns with or violates the generated Brand Voice.
4. The recommendedNextSteps array must contain exactly 4 to 6 highly practical, actionable guidelines the brand should implement to sustain this voice across future content channels.
5. Ensure the generated scripts for Image Ad, UGC, Short Video, and Long Video are completely unique. Do not repeat the same text, hooks, or CTAs. They must sound conversational, benefit-driven, and match the specified lengths (Image Ad: 60-100 words, UGC: 120-180 words, Short Video: 80-120 words, Long Video: 200-350 words).`;
}
