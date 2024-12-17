'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Zap, RefreshCw } from 'lucide-react';
import { useTranslations } from '@/lib/hooks/use-translations';

export function HeroSection() {
  const { t } = useTranslations();

  const features = [
    {
      icon: Bot,
      title: t('home.hero.features.aiAssistance.title'),
      description: t('home.hero.features.aiAssistance.description'),
    },
    {
      icon: Zap,
      title: t('home.hero.features.contentCreation.title'),
      description: t('home.hero.features.contentCreation.description'),
    },
    {
      icon: RefreshCw,
      title: t('home.hero.features.workflows.title'),
      description: t('home.hero.features.workflows.description'),
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-r from-background to-background/50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {t('home.hero.title')}{' '}
            <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
              {t('home.hero.titleHighlight')}
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group">
              {t('common.getStarted')}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              {t('common.viewDemo')}
            </Button>
          </div>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card p-6 rounded-lg border"
            >
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}