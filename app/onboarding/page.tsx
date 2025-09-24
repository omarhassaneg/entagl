'use client';

import { motion } from 'framer-motion';

import { OnboardingForm } from '@/components/onboarding/onboarding-form';
import { useTranslations } from '@/lib/hooks/use-translations';

export default function OnboardingPage() {
  const { t } = useTranslations();

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="mb-3 sm:mb-4 inline-flex items-center rounded-full border px-3 py-1 text-xs sm:text-sm font-medium text-primary">
            {t('onboarding.hero.badge')}
          </span>
          <h1 className="mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
            {t('onboarding.hero.title')}
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t('onboarding.hero.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <OnboardingForm />
        </motion.div>
      </div>
    </div>
  );
}