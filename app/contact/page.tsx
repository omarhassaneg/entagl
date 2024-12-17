'use client';

import { ContactForm } from '@/components/contact/form';
import { motion } from 'framer-motion';
import { useTranslations } from '@/lib/hooks/use-translations';

export default function ContactPage() {
  const { t } = useTranslations();

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('home.contact.title')}{' '}
            <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
              {t('home.contact.titleHighlight')}
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('home.contact.subtitle')}
          </p>
        </motion.div>

        <ContactForm />
      </div>
    </div>
  );
}