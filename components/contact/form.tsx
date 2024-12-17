'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ProductSelector } from './product-selector';
import { FormInput } from './form-input';
import { useTranslations } from '@/lib/hooks/use-translations';
import { useContactForm } from '@/hooks/use-contact-form';

export function ContactForm() {
  const { t } = useTranslations();
  const [step, setStep] = useState(0);
  const { formData, handleInputChange, handleSubmit, isSubmitting, isSubmitted } = useContactForm();
  const [canProceed, setCanProceed] = useState(false);
  const [hasInitializedProducts, setHasInitializedProducts] = useState(false);

  const steps = [
    {
      field: 'firstName',
      title: t('home.contact.form.firstName') + ' *',
      type: 'text',
      placeholder: t('home.contact.form.firstNamePlaceholder'),
      validation: (value: string) => value.length > 0,
    },
    {
      field: 'lastName',
      title: t('home.contact.form.lastName') + ' *',
      type: 'text',
      placeholder: t('home.contact.form.lastNamePlaceholder'),
      validation: (value: string) => value.length > 0,
    },
    {
      field: 'email',
      title: t('home.contact.form.email') + ' *',
      type: 'email',
      placeholder: t('home.contact.form.emailPlaceholder'),
      validation: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    },
    {
      field: 'phone',
      title: t('home.contact.form.phone') + ' *',
      type: 'tel',
      placeholder: t('home.contact.form.phonePlaceholder'),
      validation: (value: string) => value.length >= 10,
    },
    {
      field: 'businessName',
      title: t('home.contact.form.businessName'),
      type: 'text',
      placeholder: t('home.contact.form.businessNamePlaceholder'),
      validation: () => true,
    },
    {
      field: 'website',
      title: t('home.contact.form.website'),
      type: 'url',
      placeholder: t('home.contact.form.websitePlaceholder'),
      validation: (value: string) => true,
    },
    {
      field: 'additionalInfo',
      title: t('home.contact.form.additionalInfo'),
      type: 'textarea',
      placeholder: t('home.contact.form.additionalInfoPlaceholder'),
      validation: (value: string) => true,
    },
  ];

  useEffect(() => {
    const currentStep = steps[step];
    const value = formData[currentStep.field as keyof typeof formData];
    
    // Initialize products selection when reaching that step
    if (currentStep.field === 'interestedProducts' && !hasInitializedProducts) {
      handleInputChange('interestedProducts', [SERVICES[0].id]);
      setHasInitializedProducts(true);
    }
    
    setCanProceed(currentStep.validation(value));
  }, [step, formData, steps, hasInitializedProducts, handleInputChange]);

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
        <h2 className="text-3xl font-bold mb-4">{t('home.contact.success.title')}</h2>
        <p className="text-xl text-muted-foreground">
          {t('home.contact.success.message')}
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
                size="lg"
                onClick={() => setStep((prev) => prev - 1)}
              >
                {t('common.back')}
              </Button>
            )}
            <div className="flex-1" />
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting || !canProceed}
            >
              {isSubmitting ? '...' : step === steps.length - 1
                ? t('common.submit')
                : t('common.continue')}
            </Button>
          </div>
        </motion.form>
      </AnimatePresence>
    </div>
  );
}