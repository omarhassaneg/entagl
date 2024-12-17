'use client';

import { ConversationalForm } from '@/components/contact/conversational-form';
import { motion } from 'framer-motion';
import { useTranslations } from '@/lib/hooks/use-translations';

export default function Contact() {
  const { t } = useTranslations();

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <ConversationalForm />
        </div>
      </div>
    </div>
  );
}