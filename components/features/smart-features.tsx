'use client';

import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Globe, Clock, Bot, Database } from 'lucide-react';
import { useTranslations } from '../../lib/hooks/use-translations';

export function SmartFeatures() {
  const { t } = useTranslations();

  const features = [
    {
      icon: Globe,
      title: t('features.comprehensive.sections.smartFeatures.features.0'),
      description: t('features.comprehensive.sections.smartFeatures.description')
    },
    {
      icon: Database,
      title: t('features.comprehensive.sections.smartFeatures.features.1'),
      description: t('features.comprehensive.sections.smartFeatures.description')
    },
    {
      icon: Clock,
      title: t('features.comprehensive.sections.smartFeatures.features.2'),
      description: t('features.comprehensive.sections.smartFeatures.description')
    },
    {
      icon: Bot,
      title: t('features.comprehensive.sections.smartFeatures.features.4'),
      description: t('features.comprehensive.sections.smartFeatures.description')
    }
  ];

  const useCases = [
    {
      title: t('features.cases.retail.title'),
      description: t('features.cases.retail.description'),
      benefits: [
        t('features.cases.retail.benefits.retail1'),
        t('features.cases.retail.benefits.retail2'),
        t('features.cases.retail.benefits.retail3')
      ]
    },
    {
      title: t('features.cases.cafe.title'),
      description: t('features.cases.cafe.description'),
      benefits: [
        t('features.cases.cafe.benefits.cafe1'),
        t('features.cases.cafe.benefits.cafe2'),
        t('features.cases.cafe.benefits.cafe3')
      ]
    },
    {
      title: t('features.cases.salon.title'),
      description: t('features.cases.salon.description'),
      benefits: [
        t('features.cases.salon.benefits.salon1'),
        t('features.cases.salon.benefits.salon2'),
        t('features.cases.salon.benefits.salon3')
      ]
    }
  ];

  return (
    <section className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('features.comprehensive.sections.smartFeatures.title')}</h2>
          <p className="text-xl text-muted-foreground">
            {t('features.comprehensive.sections.smartFeatures.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full">
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full">
                <h3 className="text-xl font-semibold mb-4">{useCase.title}</h3>
                <p className="text-muted-foreground">{useCase.description}</p>
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-2">{t('features.benefits.title')}:</h4>
                  <ul className="space-y-2">
                    {useCase.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}