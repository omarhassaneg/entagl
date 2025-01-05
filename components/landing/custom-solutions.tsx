'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, Bot, Zap, BarChart3, Link2 } from 'lucide-react';
import { useTranslations } from '@/lib/hooks/use-translations';
import Image from 'next/image';
import Link from 'next/link';

export function CustomSolutions() {
  const { t } = useTranslations();

  const features = [
    {
      icon: Bot,
      title: t('landing.solutions.features.automation'),
      description: t('landing.solutions.features.automationDesc'),
    },
    {
      icon: Globe,
      title: t('landing.solutions.features.multilingual'),
      description: t('landing.solutions.features.multilingualDesc'),
    },
    {
      icon: Zap,
      title: t('landing.solutions.features.scalable'),
      description: t('landing.solutions.features.scalableDesc'),
    },
    {
      icon: Link2,
      title: t('landing.solutions.features.integration'),
      description: t('landing.solutions.features.integrationDesc'),
    },
    {
      icon: BarChart3,
      title: t('landing.solutions.features.insights'),
      description: t('landing.solutions.features.insightsDesc'),
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background to-muted/50">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold tracking-tight">
              {t('landing.solutions.title')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('landing.solutions.subtitle')}
            </p>
            <div className="prose dark:prose-invert">
              <p>{t('landing.solutions.description')}</p>
            </div>
            
            <ul className="space-y-6">
              {features.map((feature, index) => (
                <motion.li
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
            <Button size="lg" variant="default" className="group" asChild>
              <Link href="/free-quote">
              {t('landing.solutions.cta')}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1551434678-e076c223a692"
                alt="AI Dashboard"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/50 to-transparent" />
            </div>
            
            <div className="absolute -bottom-8 -right-8 bg-card p-8 rounded-2xl shadow-xl border max-w-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="font-medium">{t('landing.solutions.aiActive')}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {t('landing.solutions.aiActiveDesc')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}