'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { 
  Zap, 
  TrendingUp, 
  BarChart3, 
  Users,
  Clock,
  BrainCircuit
} from 'lucide-react';
import { useTranslations } from '@/lib/hooks/use-translations';

export function BenefitsSection() {
  const { t } = useTranslations();

  const benefits = {
    aiContent: { icon: Zap, color: "text-teal-500" },
    engagement: { icon: TrendingUp, color: "text-blue-500" },
    analytics: { icon: BarChart3, color: "text-purple-500" },
    audience: { icon: Users, color: "text-pink-500" },
    timeSaving: { icon: Clock, color: "text-orange-500" },
    automation: { icon: BrainCircuit, color: "text-emerald-500" }
  };

  return (
    <section className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.benefits.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('home.benefits.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(benefits).map(([key, benefit], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <benefit.icon className={`h-12 w-12 ${benefit.color} mb-4`} />
                <h3 className="text-xl font-semibold mb-2">{t(`home.benefits.items.${key}.title`)}</h3>
                <p className="text-muted-foreground">{t(`home.benefits.items.${key}.description`)}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}