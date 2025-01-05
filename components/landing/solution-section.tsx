'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { MessageSquare, Clock, Globe, DollarSign } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from '@/lib/hooks/use-translations';

export function SolutionSection() {
  const { t } = useTranslations();

  const features = [
    {
      icon: MessageSquare,
      title: t('landing.solution.features.chat.title'),
      description: t('landing.solution.features.chat.description'),
      color: 'text-teal-500',
    },
    {
      icon: Clock,
      title: t('landing.solution.features.availability.title'),
      description: t('landing.solution.features.availability.description'),
      color: 'text-blue-500',
    },
    {
      icon: Globe,
      title: t('landing.solution.features.multilingual.title'),
      description: t('landing.solution.features.multilingual.description'),
      color: 'text-purple-500',
    },
    {
      icon: DollarSign,
      title: t('landing.solution.features.cost.title'),
      description: t('landing.solution.features.cost.description'),
      color: 'text-green-500',
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('landing.solution.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('landing.solution.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1551434678-e076c223a692"
              alt="Entagl Dashboard"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/50 to-transparent" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full">
                  <feature.icon className={`h-8 w-8 ${feature.color} mb-4`} />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-muted rounded-lg p-8 text-center"
        >
          <h3 className="text-2xl font-semibold mb-4">{t('landing.solution.comparison.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-destructive">{t('landing.solution.comparison.traditional.title')}</h4>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>{t('landing.solution.comparison.traditional.items.0')}</li>
                <li>{t('landing.solution.comparison.traditional.items.1')}</li>
                <li>{t('landing.solution.comparison.traditional.items.2')}</li>
                <li>{t('landing.solution.comparison.traditional.items.3')}</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-teal-500">{t('landing.solution.comparison.entagl.title')}</h4>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>{t('landing.solution.comparison.entagl.items.0')}</li>
                <li>{t('landing.solution.comparison.entagl.items.1')}</li>
                <li>{t('landing.solution.comparison.entagl.items.2')}</li>
                <li>{t('landing.solution.comparison.entagl.items.3')}</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}