'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { 
  MessageSquare, 
  Map, 
  ArrowUp, 
  HeadphonesIcon 
} from 'lucide-react';
import { useTranslations } from '@/lib/hooks/use-translations';

export function ProcessSection() {
  const { t } = useTranslations();

  const steps = [
    {
      icon: MessageSquare,
      title: t('landing.process.steps.consultation.title'),
      description: t('landing.process.steps.consultation.description'),
      color: 'text-teal-500',
    },
    {
      icon: Map,
      title: t('landing.process.steps.roadmap.title'),
      description: t('landing.process.steps.roadmap.description'),
      color: 'text-blue-500',
    },
    {
      icon: ArrowUp,
      title: t('landing.process.steps.enhancements.title'),
      description: t('landing.process.steps.enhancements.description'),
      color: 'text-purple-500',
    },
    {
      icon: HeadphonesIcon,
      title: t('landing.process.steps.support.title'),
      description: t('landing.process.steps.support.description'),
      color: 'text-pink-500',
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('landing.process.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('landing.process.subtitle')}</p>
        </motion.div>

        <div className="relative">
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-border hidden lg:block" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full relative bg-background">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div className="pt-4">
                    <step.icon className={`h-12 w-12 ${step.color} mb-4`} />
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}