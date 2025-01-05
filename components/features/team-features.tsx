'use client';

import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Users, MessageSquare, UserPlus, ArrowLeftRight } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from '../../lib/hooks/use-translations';

export function TeamFeatures() {
  const { t } = useTranslations();

  const features = [
    {
      icon: MessageSquare,
      title: t('features.comprehensive.sections.teamCollaboration.features.0'),
      description: t('features.comprehensive.sections.teamCollaboration.description')
    },
    {
      icon: Users,
      title: t('features.comprehensive.sections.teamCollaboration.features.2'),
      description: t('features.comprehensive.sections.teamCollaboration.description')
    },
    {
      icon: ArrowLeftRight,
      title: t('features.comprehensive.sections.teamCollaboration.features.3'),
      description: t('features.comprehensive.sections.teamCollaboration.description')
    },
    {
      icon: UserPlus,
      title: t('features.comprehensive.sections.teamCollaboration.features.4'),
      description: t('features.comprehensive.sections.teamCollaboration.description')
    }
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
                alt={t('features.comprehensive.sections.teamCollaboration.title')}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/50 to-transparent" />
            </div>
            
            <div className="absolute -bottom-8 -left-8 bg-card p-8 rounded-2xl shadow-xl border max-w-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="font-medium">{t('landing.solutions.aiActive')}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {t('landing.solutions.aiActiveDesc')}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8 order-1 lg:order-2"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('features.comprehensive.sections.teamCollaboration.title')}</h2>
              <p className="text-xl text-muted-foreground">
                {t('features.comprehensive.sections.teamCollaboration.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6">
                    <feature.icon className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">{t('features.cases.title')}</h3>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">{t('features.cases.retail.title')}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t('features.cases.retail.description')}
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">{t('features.cases.cafe.title')}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t('features.cases.cafe.description')}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}