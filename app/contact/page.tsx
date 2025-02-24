'use client';

import { ConversationalForm } from '@/components/contact/conversational-form';
import { motion } from 'framer-motion';
import { useTranslations } from '@/lib/hooks/use-translations';
import { Phone } from 'lucide-react';

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-lg p-6 mb-8 border shadow-sm"
          >
            <h2 className="text-2xl font-semibold mb-4">{t('contact.phones.title')}</h2>
            <p className="text-muted-foreground mb-6">{t('contact.phones.description')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <a 
                  href="tel:+905462073902"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {t('contact.phones.turkey')}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <a 
                  href="tel:+16478304916"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {t('contact.phones.canada')}
                </a>
              </div>
            </div>
          </motion.div>

          <ConversationalForm />
        </div>
      </div>
    </div>
  );
}