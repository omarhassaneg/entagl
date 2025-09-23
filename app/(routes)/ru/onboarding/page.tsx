'use client';

import { motion } from 'framer-motion';

import { OnboardingForm } from '@/components/onboarding/onboarding-form';
import { useTranslations } from '@/lib/hooks/use-translations';

export default function OnboardingPage() {
  const { t } = useTranslations();

  return (
    <div className="min-h-screen py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium text-primary">
            {t('onboarding.hero.badge')}
          </span>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            {t('onboarding.hero.title')}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('onboarding.hero.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <OnboardingForm />
        </motion.div>
      </div>
    </div>
  );
}
