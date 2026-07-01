import type {
  BrandOverview,
  BrandIdentity,
  ContentGuide,
  MarketingAssets,
  CustomerInsights,
  BrandVoiceResponse,
  BrandVoiceAnalysis,
} from '../types';

export function formatOverviewCopy(overview: BrandOverview): string {
  return `[BRAND OVERVIEW]
Brand Name: ${overview.brandName}
Tagline: ${overview.tagline}
Summary: ${overview.summary}
Mission: ${overview.mission}`;
}

export function formatIdentityCopy(identity: BrandIdentity): string {
  return `[BRAND IDENTITY]
Tone of Voice: ${identity.tone.join(', ')}
Writing Style: ${identity.writingStyle.join(', ')}
Personality Traits: ${identity.personality.join(', ')}
Communication Style: ${identity.communicationStyle.join(', ')}
Core Values: ${identity.coreValues.join(', ')}
Target Audience: ${identity.targetAudience}`;
}

export function formatContentGuideCopy(guide: ContentGuide): string {
  const rules = guide.writingRules.map((r, i) => `${i + 1}. ${r}`).join('\n');
  return `[CONTENT GUIDE]
Preferred Vocabulary: ${guide.preferredWords.join(', ')}
Words to Avoid: ${guide.avoidWords.join(', ')}
Writing Rules:
${rules}
CTA Style: ${guide.ctaStyle}
Reading Level: ${guide.readingLevel}`;
}

export function formatMarketingAssetsCopy(assets: MarketingAssets): string {
  const captions = assets.captions.map((c, i) => `${i + 1}. ${c}`).join('\n');
  return `[MARKETING ASSETS & COPY]

IMAGE AD:
- Hook Angle: ${assets.imageAd.hook}
- Body Script: ${assets.imageAd.script}
- CTA: ${assets.imageAd.cta}

UGC VIDEO:
- Hook Angle: ${assets.ugc.hook}
- Body Script: ${assets.ugc.script}
- CTA: ${assets.ugc.cta}

SHORT VIDEO (Reels/Shorts/TikTok):
- Hook Angle: ${assets.shortVideo.hook}
- Body Script: ${assets.shortVideo.script}
- CTA: ${assets.shortVideo.cta}

LONG VIDEO (YouTube/Vlog):
- Hook Angle: ${assets.longVideo.hook}
- Body Script: ${assets.longVideo.script}
- CTA: ${assets.longVideo.cta}

SOCIAL MEDIA CAPTIONS:
${captions}`;
}

export function formatCustomerInsightsCopy(insights: CustomerInsights): string {
  const painPoints = insights.painPoints.map((p) => `- ${p}`).join('\n');
  const outcomes = insights.desiredOutcomes.map((o) => `- ${o}`).join('\n');
  const objections = insights.objections.map((obj) => `- ${obj}`).join('\n');
  const triggers = insights.emotionalTriggers.map((t) => `- ${t}`).join('\n');

  return `[CUSTOMER INSIGHTS]
Customer Pain Points:
${painPoints}

Desired Outcomes:
${outcomes}

Buying Motivations: ${insights.buyingMotivations.join(', ')}

Objections to Overcome:
${objections}

Emotional Triggers:
${triggers}`;
}

export function formatAnalysisCopy(analysis: BrandVoiceAnalysis): string {
  const diffs = analysis.keyDifferentiators.map((d: string) => `- ${d}`).join('\n');
  const recommended = analysis.recommendedMessaging.map((m: string) => `- ${m}`).join('\n');
  const avoid = analysis.avoidMessaging.map((m: string) => `- ${m}`).join('\n');
  const nextSteps = analysis.recommendedNextSteps.map((s: string, i: number) => `${i + 1}. ${s}`).join('\n');

  return `[STRATEGIC BRAND VOICE ANALYSIS]
Executive Summary: ${analysis.executiveSummary}
Brand Voice Strength: ${analysis.voiceStrength}
Brand Personality Summary: ${analysis.personalitySummary}
Emotional Positioning: ${analysis.emotionalPositioning}
Competitive Position: ${analysis.competitivePosition}

Key Differentiators:
${diffs}

Recommended Messaging:
${recommended}

Messaging to Avoid:
${avoid}

Recommended Next Steps:
${nextSteps}`;
}

export function formatAllCopy(data: BrandVoiceResponse): string {
  return `# BRAND VOICE STYLE GUIDE: ${data.brandOverview.brandName}

==================================================

${formatOverviewCopy(data.brandOverview)}

==================================================

${formatIdentityCopy(data.brandIdentity)}

==================================================

${formatContentGuideCopy(data.contentGuide)}

==================================================

${formatMarketingAssetsCopy(data.marketingAssets)}

==================================================

${formatCustomerInsightsCopy(data.customerInsights)}

==================================================

${formatAnalysisCopy(data.brandVoiceAnalysis)}`;
}
