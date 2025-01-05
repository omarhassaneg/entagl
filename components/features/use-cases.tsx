'use client';

import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Store, Coffee, Scissors, Utensils } from 'lucide-react';
import { useTranslations } from '../../lib/hooks/use-translations';

export function UseCases() {
  const { t } = useTranslations();

  const cases = [
    {
      icon: Store,
      type: 'retail',
      title: t('features.cases.retail.title'),
      description: t('features.cases.retail.description'),
      benefits: ['retail1', 'retail2', 'retail3'],
    },
    {
      icon: Coffee,
      type: 'cafe',
      title: t('features.cases.cafe.title'),
      description: t('features.cases.cafe.description'),
      benefits: ['cafe1', 'cafe2', 'cafe3'],
    },
    {
      icon: Scissors,
      type: 'salon',
      title: t('features.cases.salon.title'),
      description: t('features.cases.salon.description'),
      benefits: ['salon1', 'salon2', 'salon3'],
    },
    {
      icon: Utensils,
      type: 'restaurant',
      title: t('features.cases.restaurant.title'),
      description: t('features.cases.restaurant.description'),
      benefits: ['restaurant1', 'restaurant2', 'restaurant3'],
    },
  ];

  return (
    <section className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('features.cases.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('features.cases.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full">
                <useCase.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-semibold mb-4">{useCase.title}</h3>
                <p className="text-muted-foreground mb-6">{useCase.description}</p>
                <ul className="space-y-3">
                  {useCase.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <span>{t(`features.cases.${useCase.type}.benefits.${benefit}`)}</span>
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