'use client';

import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Clock, DollarSign, HeartHandshake, Brain } from 'lucide-react';
import { useTranslations } from '../../lib/hooks/use-translations';

export function EmotionalBenefits() {
  const { t } = useTranslations();

  const benefits = [
    {
      icon: Clock,
      title: t('features.benefits.time.title'),
      pain: t('features.benefits.time.pain'),
      solution: t('features.benefits.time.solution'),
      color: 'text-teal-500',
    },
    {
      icon: DollarSign,
      title: t('features.benefits.money.title'),
      pain: t('features.benefits.money.pain'),
      solution: t('features.benefits.money.solution'),
      color: 'text-blue-500',
    },
    {
      icon: HeartHandshake,
      title: t('features.benefits.stress.title'),
      pain: t('features.benefits.stress.pain'),
      solution: t('features.benefits.stress.solution'),
      color: 'text-purple-500',
    },
    {
      icon: Brain,
      title: t('features.benefits.growth.title'),
      pain: t('features.benefits.growth.pain'),
      solution: t('features.benefits.growth.solution'),
      color: 'text-orange-500',
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('features.benefits.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('features.benefits.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full">
                <benefit.icon className={`h-12 w-12 ${benefit.color} mb-4`} />
                <h3 className="text-2xl font-semibold mb-4">{benefit.title}</h3>
                <div className="space-y-4">
                  <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
                    <p>{benefit.pain}</p>
                  </div>
                  <div className="bg-primary/10 text-primary p-4 rounded-lg">
                    <p>{benefit.solution}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}