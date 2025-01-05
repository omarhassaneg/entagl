'use client';

import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { ArrowRight, CalendarClock, Calculator } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from '../../lib/hooks/use-translations';

export function FeaturesCTA() {
  const { t } = useTranslations();

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            {t('pricing.cta.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('pricing.cta.subtitle')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition" />
              <Link href="/demo" className="relative block">
                <div className="bg-card border rounded-lg p-8 h-full">
                  <CalendarClock className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">{t('common.scheduleDemo')}</h3>
                  <p className="text-muted-foreground mb-6">
                    {t('landing.solutions.description')}
                  </p>
                  <Button className="w-full group">
                    {t('common.scheduleDemo')}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition" />
              <Link href="/free-quote" className="relative block">
                <div className="bg-card border rounded-lg p-8 h-full">
                  <Calculator className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">{t('landing.solutions.cta')}</h3>
                  <p className="text-muted-foreground mb-6">
                    {t('landing.solutions.subtitle')}
                  </p>
                  <Button className="w-full group">
                    {t('common.contactQuote')}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}