'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Bot, Zap, MessageSquare, BrainCircuit } from 'lucide-react';
import { useTranslations } from '@/lib/hooks/use-translations';
import { SERVICES } from '@/lib/constants';

export function PricingTables() {
  const { t } = useTranslations();

  const icons = {
    'basic-automation': Bot,
    'advanced-automation': Zap,
    'basic-agent': MessageSquare,
    'advanced-agent': BrainCircuit,
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, index) => {
            const Icon = icons[service.id as keyof typeof icons];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-full blur-3xl" />
                  <Icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">
                    {t(`services.${service.id}.title`)}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {t(`services.${service.id}.description`)}
                  </p>
                  <div className="mb-6">
                    <p className="text-3xl font-bold">
                      ${service.monthlyFee}
                      <span className="text-base font-normal text-muted-foreground">
                        {t('common.month')}
                      </span>
                    </p>
                    <p className="text-muted-foreground">
                      ${service.setupFee} {t('common.setupFee')}
                    </p>
                    {service.additionalChannelSetup && (
                      <p className="text-sm text-muted-foreground mt-2">
                        +${service.additionalChannelMonthly}/month per additional channel
                      </p>
                    )}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((featureKey) => (
                      <li key={featureKey} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-teal-500 flex-shrink-0" />
                        <span>{t(`services.${service.id}.features.${featureKey}`)}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">{t('common.getStarted')}</Button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}