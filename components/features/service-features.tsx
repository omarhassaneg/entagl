'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Bot, Zap, MessageSquare, BrainCircuit } from 'lucide-react';
import { useTranslations } from '@/lib/hooks/use-translations';

export function ServiceFeatures() {
  const { t } = useTranslations();

  const services = [
    {
      icon: Bot,
      title: t('features.services.basic.title'),
      description: t('features.services.basic.description'),
      features: ['captions', 'templates', 'images', 'scheduling'],
    },
    {
      icon: Zap,
      title: t('features.services.advanced.title'),
      description: t('features.services.advanced.description'),
      features: ['whatsapp', 'voice', 'scripts', 'voiceover'],
    },
    {
      icon: MessageSquare,
      title: t('features.services.basicAgent.title'),
      description: t('features.services.basicAgent.description'),
      features: ['comments', 'dm', 'platforms', 'availability'],
    },
    {
      icon: BrainCircuit,
      title: t('features.services.advancedAgent.title'),
      description: t('features.services.advancedAgent.description'),
      features: ['qualification', 'conversion', 'crm', 'analytics'],
    },
  ];

  return (
    <section className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('features.services.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('features.services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full">
                <service.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <span>{t(`features.services.features.${feature}`)}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}