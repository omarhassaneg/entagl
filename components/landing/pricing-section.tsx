'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import { useTranslations } from '@/lib/hooks/use-translations';
import Link from 'next/link';

export function PricingSection() {
  const { t } = useTranslations();

  const tiers = [
    {
      name: t('pricing.tiers.starter.name'),
      description: t('pricing.tiers.starter.description'),
      setupFee: '300',
      monthlyFee: '100',
      features: [
        t('pricing.tiers.starter.features.0'),
        t('pricing.tiers.starter.features.1'),
        t('pricing.tiers.starter.features.2'),
        t('pricing.tiers.starter.features.3')
      ],
    },
    {
      name: t('pricing.tiers.small.name'),
      description: t('pricing.tiers.small.description'),
      setupFee: '500',
      monthlyFee: '159',
      features: [
        t('pricing.tiers.small.features.0'),
        t('pricing.tiers.small.features.1'),
        t('pricing.tiers.small.features.2'),
        t('pricing.tiers.small.features.3'),
        t('pricing.tiers.small.features.4')
      ],
    },
    {
      name: t('pricing.tiers.medium.name'),
      description: t('pricing.tiers.medium.description'),
      setupFee: '1000',
      monthlyFee: '299',
      features: [
        t('pricing.tiers.medium.features.0'),
        t('pricing.tiers.medium.features.1'),
        t('pricing.tiers.medium.features.2'),
        t('pricing.tiers.medium.features.3'),
        t('pricing.tiers.medium.features.4'),
        t('pricing.tiers.medium.features.5')
      ],
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('pricing.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('pricing.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <Card className="p-6 h-full flex flex-col border-2 hover:border-primary/50 transition-colors duration-300">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-muted-foreground">{tier.description}</p>
                </div>
                <div className="mb-6">
                  <p className="text-3xl font-bold">
                    ${tier.monthlyFee}
                    <span className="text-base font-normal text-muted-foreground">{t('common.month')}</span>
                  </p>
                  <p className="text-muted-foreground">
                    ${tier.setupFee} {t('common.setupFee')}
                  </p>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-500 flex-shrink-0" />
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full group">
                  <Link href="/demo">
                    {t('common.contactQuote')}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}