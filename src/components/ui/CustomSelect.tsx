import React from 'react';
import { Select } from './Select';
import { Input } from './Input';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface CustomSelectProps {
  label?: string;
  required?: boolean;
  options: Option[];
  selectedValue: string;
  customValue?: string;
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onCustomValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customInputLabel?: string;
  customInputPlaceholder?: string;
  error?: string;
  description?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  required,
  options,
  selectedValue,
  customValue = '',
  onSelectChange,
  onCustomValueChange,
  customInputLabel = 'Please Specify',
  customInputPlaceholder = 'Enter your custom details...',
  error,
  description,
}) => {
  const showCustomInput = selectedValue === 'other';

  return (
    <div className="w-full space-y-1">
      <Select
        label={label}
        required={required}
        options={options}
        value={selectedValue}
        onChange={onSelectChange}
        error={!showCustomInput ? error : undefined}
        description={!showCustomInput ? description : undefined}
      />
      {showCustomInput && (
        <div className="animate-slide-down-fade overflow-hidden">
          <Input
            label={customInputLabel}
            placeholder={customInputPlaceholder}
            required={required}
            value={customValue}
            onChange={onCustomValueChange}
            error={error}
            description={description}
          />
        </div>
      )}
    </div>
  );
};
