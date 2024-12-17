'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FormInput } from './form-input';
import { useTranslations } from '@/lib/hooks/use-translations';
import { useDemoForm } from '@/hooks/use-demo-form';

export function DemoForm() {
  const { t } = useTranslations();
  const [step, setStep] = useState(0);
  const { formData, handleInputChange, handleSubmit, isSubmitting, isSubmitted } = useDemoForm();
  const [canProceed, setCanProceed] = useState(false);

  const steps = [
    {
      field: 'firstName',
      title: 'Are you interested in a Demo?',
      type: 'text',
      placeholder: 'Enter your first name',
      validation: (value: string) => value.length > 0,
    },
    {
      field: 'lastName',
      title: 'And your last name?',
      type: 'text',
      placeholder: 'Enter your last name',
      validation: (value: string) => value.length > 0,
    },
    {
      field: 'email',
      title: 'What\'s your work email?',
      type: 'email',
      placeholder: 'name@company.com',
      validation: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    },
    {
      field: 'phone',
      title: 'And your phone number?',
      type: 'tel',
      placeholder: 'Enter your phone number',
      validation: (value: string) => value.length >= 10,
    },
    {
      field: 'message',
      title: 'How can Entagl help you today?',
      type: 'textarea',
      placeholder: 'Tell us about your needs...',
      validation: () => true,
    },
  ];

  useEffect(() => {
    const currentStep = steps[step];
    const value = formData[currentStep.field as keyof typeof formData];
    setCanProceed(currentStep.validation(value));
  }, [step, formData, steps]);

  const handleNext = useCallback(() => {
    if (canProceed) {
      setStep((prev) => prev + 1);
    }
  }, [canProceed]);

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <h2 className="text-3xl font-bold mb-4">Thank You! 🎉</h2>
        <p className="text-xl text-muted-foreground">
          We'll be in touch shortly to schedule your personalized demo.
        </p>
      </motion.div>
    );
  }

  const currentStep = steps[step];

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.form
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            if (step === steps.length - 1) {
              handleSubmit();
            } else {
              handleNext();
            }
          }}
        >
          <div className="text-4xl font-bold mb-8">{currentStep.title}</div>

          <FormInput
            step={currentStep}
            value={formData[currentStep.field as keyof typeof formData]}
            onChange={handleInputChange}
            onEnter={handleNext}
          />

          <div className="flex justify-between pt-8">
            {step > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep((prev) => prev - 1)}
              >
                Back
              </Button>
            )}
            <div className="flex-1" />
            <Button
              type="submit"
              disabled={isSubmitting || !canProceed}
            >
              {isSubmitting ? '...' : step === steps.length - 1 ? 'Submit' : 'Continue'}
            </Button>
          </div>
        </motion.form>
      </AnimatePresence>
    </div>
  );
}