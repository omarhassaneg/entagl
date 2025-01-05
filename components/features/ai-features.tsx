'use client';

import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Bot, Brain, Zap, BarChart } from 'lucide-react';
import { useTranslations } from '../../lib/hooks/use-translations';

export function AIFeatures() {
  const { t } = useTranslations();

  const features = [
    {
      icon: Bot,
      title: t('features.comprehensive.sections.aiCommunication.features.0'),
      description: t('features.comprehensive.sections.aiCommunication.description')
    },
    {
      icon: Brain,
      title: t('features.comprehensive.sections.aiCommunication.features.2'),
      description: t('features.comprehensive.sections.aiCommunication.features.3')
    },
    {
      icon: Zap,
      title: t('features.comprehensive.sections.aiCommunication.features.3'),
      description: t('features.comprehensive.sections.aiCommunication.features.4')
    },
    {
      icon: BarChart,
      title: t('features.comprehensive.sections.aiCommunication.features.4'),
      description: t('features.comprehensive.sections.aiCommunication.description')
    }
  ];

  const useCases = [
    {
      title: t('features.cases.retail.title'),
      description: t('features.cases.retail.description')
    },
    {
      title: t('features.cases.cafe.title'),
      description: t('features.cases.cafe.description')
    },
    {
      title: t('features.cases.salon.title'),
      description: t('features.cases.salon.description')
    },
    {
      title: t('features.cases.restaurant.title'),
      description: t('features.cases.restaurant.description')
    }
  ];

  const benefits = [
    t('features.benefits.time.solution'),
    t('features.benefits.money.solution'),
    t('features.benefits.stress.solution')
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('features.comprehensive.sections.aiCommunication.title')}</h2>
          <p className="text-xl text-muted-foreground">{t('features.comprehensive.sections.aiCommunication.description')}</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6">{t('features.cases.title')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {useCases.map((useCase, index) => (
                <Card key={useCase.title} className="p-6">
                  <h4 className="font-semibold mb-2">{useCase.title}</h4>
                  <p className="text-sm text-muted-foreground">{useCase.description}</p>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6">{t('features.benefits.title')}</h3>
            <Card className="p-6">
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}