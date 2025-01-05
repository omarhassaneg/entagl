'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Clock, Globe, Grid } from 'lucide-react';
import { useTranslations } from '@/lib/hooks/use-translations';

export function ProblemSection() {
  const { t } = useTranslations();

  const problems = [
    {
      icon: Clock,
      title: t('landing.problems.items.opportunities.title'),
      description: t('landing.problems.items.opportunities.description'),
      color: 'text-red-500',
    },
    {
      icon: Globe,
      title: t('landing.problems.items.language.title'),
      description: t('landing.problems.items.language.description'),
      color: 'text-amber-500',
    },
    {
      icon: Grid,
      title: t('landing.problems.items.systems.title'),
      description: t('landing.problems.items.systems.description'),
      color: 'text-blue-500',
    },
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('landing.problems.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('landing.problems.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full">
                <problem.icon className={`h-12 w-12 ${problem.color} mb-4`} />
                <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
                <p className="text-muted-foreground">{problem.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}