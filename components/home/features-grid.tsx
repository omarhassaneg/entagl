'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { useTranslations } from '@/lib/hooks/use-translations';
import { 
  ContentCreationVisual,
  AnalyticsVisual,
  TimingVisual
} from '@/components/home/feature-visualizations';

export function FeaturesGrid() {
  const { t } = useTranslations();

  const features = [
    {
      key: "smartContent",
      Visual: ContentCreationVisual
    },
    {
      key: "analytics",
      Visual: AnalyticsVisual
    },
    {
      key: "scheduling",
      Visual: TimingVisual
    }
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.features.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('home.features.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full">
                <feature.Visual />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{t(`home.features.items.${feature.key}.title`)}</h3>
                  <p className="text-muted-foreground">{t(`home.features.items.${feature.key}.description`)}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
