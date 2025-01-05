'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '@/lib/hooks/use-translations';

export function HeroFeatures() {
  const { t } = useTranslations();

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-r from-background to-background/50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Revolutionize Your{' '}
            <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
              Customer Engagement
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how our AI-powered solutions streamline operations and transform customer interactions across industries
          </p>
        </motion.div>
      </div>
    </div>
  );
}