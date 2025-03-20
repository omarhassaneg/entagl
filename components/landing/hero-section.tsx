'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Globe, MessageSquare } from 'lucide-react';
import { useTranslations } from '@/lib/hooks/use-translations';
import { useLanguage } from '@/components/providers/language-provider';
import { SimpleSwitcher } from './simple-switcher';

export function HeroSection() {
  const { t } = useTranslations();
  const { language } = useLanguage();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background to-muted/50">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-r from-background to-background/50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span>{t('landing.hero.title')}</span>{' '}
              <div className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent inline-block">
                {t('landing.hero.titleHighlight')}
              </div>
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('landing.hero.subtitle')}
            </p>
            <div className="max-w-sm">
              <Button 
                size="lg" 
                className="group"
                data-cal-link="entagl/45min-online"
                data-cal-namespace="45min-online"
                data-cal-config='{"layout":"month_view","theme":"light"}'
              >
                {t('common.scheduleDemo')}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="flex flex-col gap-4 mt-8">
              <div className="flex items-center gap-3 bg-muted/60 px-4 py-2 rounded-md border border-border/30 max-w-xs">
                <Clock className="h-5 w-5 flex-shrink-0 text-teal-500" />
                <span className="font-medium">{t('landing.hero.features.support')}</span>
              </div>
              <div className="flex items-center gap-3 bg-muted/60 px-4 py-2 rounded-md border border-border/30 max-w-xs">
                <Globe className="h-5 w-5 flex-shrink-0 text-blue-500" />
                <span className="font-medium">{t('landing.hero.features.multilingual')}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full"
          >
            <SimpleSwitcher />
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