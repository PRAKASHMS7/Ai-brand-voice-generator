import React from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { CustomSelect } from '../ui/CustomSelect';
import { RadioGroup } from '../ui/RadioGroup';
import { Button } from '../ui/Button';
import type { BrandVoiceFormState, BrandType, GenerateType } from '../../types';

interface BrandFormProps {
  formState: BrandVoiceFormState;
  onChange: <K extends keyof BrandVoiceFormState>(field: K, value: BrandVoiceFormState[K]) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const INDUSTRY_OPTIONS = [
  { value: '', label: 'Select Industry...', disabled: true },
  { value: 'technology', label: 'Technology & SaaS' },
  { value: 'ecommerce', label: 'E-commerce & Retail' },
  { value: 'healthcare', label: 'Healthcare & Wellness' },
  { value: 'finance', label: 'Finance & Fintech' },
  { value: 'education', label: 'Education & EdTech' },
  { value: 'creative', label: 'Creative Agency & Design' },
  { value: 'hospitality', label: 'Hospitality & Travel' },
  { value: 'entertainment', label: 'Entertainment & Media' },
  { value: 'manufacturing', label: 'Manufacturing & Logistics' },
  { value: 'other', label: 'Other' },
];

export const BrandForm: React.FC<BrandFormProps> = ({
  formState,
  onChange,
  onSubmit,
  isLoading,
}) => {
  // Required fields validation helper
  const isFormValid =
    formState.brandName.trim() !== '' &&
    formState.industry !== '' &&
    (formState.industry !== 'other' || (formState.customIndustry && formState.customIndustry.trim() !== '')) &&
    formState.tone.trim() !== '' &&
    formState.writingStyle.trim() !== '';

  return (
    <form onSubmit={onSubmit}>
      <Card
        title="Brand Profile Details"
        description="Provide specifications about your brand and writing style preferences."
        className="flex flex-col gap-6"
      >
        <div className="space-y-6">
          {/* Brand Type */}
          <RadioGroup<BrandType>
            label="Brand Type"
            description="Is this a globally recognized voice or a brand new identity?"
            options={[
              {
                value: 'known',
                label: 'Known Brand',
                description: 'Existing brand with public presence',
              },
              {
                value: 'new',
                label: 'New Brand',
                description: 'A completely new identity from scratch',
              },
            ]}
            value={formState.brandType}
            onChange={(val) => onChange('brandType', val)}
            layout="horizontal"
          />

          {/* Generate For */}
          <RadioGroup<GenerateType>
            label="Generate For"
            description="What assets are we aligning the brand voice for?"
            options={[
              {
                value: 'brand_only',
                label: 'Brand Only',
                description: 'General core style guide',
              },
              {
                value: 'brand_products',
                label: 'Brand + Products',
                description: 'Core voice and product catalog specs',
              },
              {
                value: 'single_product',
                label: 'Single Product',
                description: 'Tailored for one key product release',
              },
            ]}
            value={formState.generateFor}
            onChange={(val) => onChange('generateFor', val)}
            layout="grid"
            columns={3}
          />

          <hr className="border-slate-100 my-1" />

          {/* Brand Name & Website */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Brand Name"
              required
              placeholder="e.g., Acme Corp"
              value={formState.brandName}
              onChange={(e) => onChange('brandName', e.target.value)}
            />
            <Input
              label="Website URL"
              placeholder="e.g., https://acme.com"
              value={formState.websiteUrl}
              onChange={(e) => onChange('websiteUrl', e.target.value)}
            />
          </div>

          {/* Industry Selection */}
          <CustomSelect
            label="Industry"
            required
            options={INDUSTRY_OPTIONS}
            selectedValue={formState.industry}
            customValue={formState.customIndustry}
            onSelectChange={(e) => {
              const val = e.target.value;
              onChange('industry', val);
              if (val !== 'other') {
                onChange('customIndustry', '');
              }
            }}
            onCustomValueChange={(e) => onChange('customIndustry', e.target.value)}
            customInputLabel="Please Specify Industry"
            customInputPlaceholder="Enter your industry (Example: Real Estate, Construction, Logistics, Agriculture, Automobile)"
          />

          {/* Tone & Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Tone"
              required
              placeholder="e.g., Empathetic, Professional, Playful"
              value={formState.tone}
              onChange={(e) => onChange('tone', e.target.value)}
              description="Core emotion descriptors"
            />
            <Input
              label="Writing Style"
              required
              placeholder="e.g., Concise, Conversational, Academic"
              value={formState.writingStyle}
              onChange={(e) => onChange('writingStyle', e.target.value)}
              description="Structural rule preference"
            />
          </div>

          {/* Target Audience & Tagline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Target Audience"
              placeholder="e.g., Tech Savvy Developers, Busy Parents"
              value={formState.targetAudience}
              onChange={(e) => onChange('targetAudience', e.target.value)}
            />
            <Input
              label="Tagline"
              placeholder="e.g., Empowering the future of workflows"
              value={formState.tagline}
              onChange={(e) => onChange('tagline', e.target.value)}
            />
          </div>

          {/* Writing Samples */}
          <Input
            multiline
            label="Writing Samples (Optional)"
            placeholder="Paste existing marketing copy, blog posts, or emails that demonstrate your desired brand voice..."
            value={formState.writingSamples}
            onChange={(e) => onChange('writingSamples', e.target.value)}
            rows={5}
            description="Highly recommended for more accurate model synthesis"
          />
        </div>

        {/* Form Action Button */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <Button
            type="submit"
            disabled={!isFormValid || isLoading}
            isLoading={isLoading}
            className="w-full sm:w-auto px-8"
          >
            Generate Brand Voice
          </Button>
        </div>
      </Card>
    </form>
  );
};
