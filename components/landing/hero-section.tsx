'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Globe, MessageSquare } from 'lucide-react';
import { useTranslations } from '@/lib/hooks/use-translations';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/language-provider';
import { ChatVisualization } from './chat-visualization';

export function HeroSection() {
  const { t } = useTranslations();
  const { language } = useLanguage();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background to-muted/50">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-r from-background to-background/50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8">
            {language === 'en' ? (
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Turn Conversations into{' '}
                <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">Conversions</span>
                {' '}with Entagl AI
              </h1>
            ) : (
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                {t('landing.hero.title')}
              </h1>
            )}
            <p className="text-xl text-muted-foreground">
              {t('landing.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group" asChild>
                <Link href="/demo">
                  {t('common.scheduleDemo')}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                {t('common.learnMore')}
              </Button>
            </div>
            <div className="flex gap-8">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-teal-500" />
                <span className="text-sm">{t('landing.hero.features.support')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-500" />
                <span className="text-sm">{t('landing.hero.features.multilingual')}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-500" />
                <span className="text-sm">{t('landing.hero.features.aiPowered')}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full"
          >
            <ChatVisualization />
            <div className="absolute -bottom-4 -right-4 bg-card p-4 rounded-lg shadow-lg border">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium">{t('common.aiAssistantActive')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}