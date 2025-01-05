'use client';

import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { MessageSquare, Instagram, Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from '../../lib/hooks/use-translations';

export function MultiChannelFeatures() {
  const { t } = useTranslations();

  const platforms = [
    {
      icon: Instagram,
      name: t('features.comprehensive.sections.multichannel.features.0'),
      description: t('features.comprehensive.sections.multichannel.description')
    },
    {
      icon: MessageSquare,
      name: t('features.comprehensive.sections.multichannel.features.2'),
      description: t('features.comprehensive.sections.multichannel.description')
    },
    {
      icon: Mail,
      name: t('features.comprehensive.sections.multichannel.features.5'),
      description: t('features.comprehensive.sections.multichannel.description')
    },
    {
      icon: Phone,
      name: t('features.comprehensive.sections.multichannel.features.4'),
      description: t('features.comprehensive.sections.multichannel.description')
    }
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold">{t('features.comprehensive.sections.multichannel.title')}</h2>
            <p className="text-xl text-muted-foreground">
              {t('features.comprehensive.sections.multichannel.description')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {platforms.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6">
                    <platform.icon className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold mb-2">{platform.name}</h3>
                    <p className="text-sm text-muted-foreground">{platform.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="p-6 bg-muted">
              <h3 className="text-xl font-semibold mb-4">{t('features.benefits.title')}</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span>{t('features.benefits.time.solution')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span>{t('features.benefits.money.solution')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span>{t('features.benefits.stress.solution')}</span>
                </li>
              </ul>
            </Card>
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
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984"
                alt={t('features.comprehensive.sections.multichannel.title')}
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