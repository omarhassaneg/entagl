'use client';

import { useEffect, useRef } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ProductSelector } from './product-selector'; 

interface FormInputProps {
  step: {
    type: string;
    field: string;
    placeholder?: string;
  };
  value: any;
  onChange: (field: string, value: any) => void;
  onEnter: () => void;
}

export function FormInput({ step, value, onChange, onEnter }: FormInputProps) {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current && step.type !== 'products' && step.type !== 'tel') {
      inputRef.current.focus();
    }
  }, [step]);

  if (step.type === 'tel') {
    return (
      <PhoneInput
        country={'us'}
        value={value}
        onlyCountries={['us', 'gb', 'ca', 'au', 'fr', 'de', 'it', 'es', 'br', 'mx', 'jp', 'kr', 'cn', 'in']}
        disableDropdown={false}
        enableSearch={true}
        enableAreaCodes={false}
        countryCodeEditable={false}
        searchPlaceholder="Search country..."
        disableSearchIcon={false}
        onChange={(phone) => onChange(step.field, phone)}
        containerClass="!w-full"
        inputClass="!w-full !text-lg !h-16 !bg-transparent !border-b !border-t-0 !border-x-0 !border-input focus:!border-primary !transition-all !outline-none !rounded-none !pl-[4.5rem]"
        buttonClass="!border-none !bg-transparent"
        dropdownClass="!bg-background !border-border !shadow-lg !max-h-[240px]"
        searchClass="!border-b !border-border"
        preferredCountries={['us', 'gb', 'ca', 'au']}
        autoFormat={false}
      />
    );
  }

  if (step.type === 'products') {
    return (
      <ProductSelector
        selectedProducts={value}
        onProductToggle={(productId) => {
          const products = value.includes(productId)
            ? value.filter((id: string) => id !== productId)
            : [...value, productId];
          onChange(step.field, products);
        }}
      />
    );
  }

  if (step.type === 'textarea') {
    return (
      <textarea
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        value={value}
        onChange={(e) => onChange(step.field, e.target.value)}
        placeholder={step.placeholder}
        className="w-full text-lg p-4 bg-transparent border-b border-input focus:border-primary transition-all outline-none resize-none"
        rows={6}
      />
    );
  }

  return (
    <input
      ref={inputRef as React.RefObject<HTMLInputElement>}
      type={step.type}
      value={value}
      onChange={(e) => onChange(step.field, e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onEnter();
        }
      }}
      placeholder={step.placeholder}
      className="w-full text-lg h-16 bg-transparent border-b border-input focus:border-primary transition-all outline-none"
    />
  );
}
