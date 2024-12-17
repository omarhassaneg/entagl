'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from '@/lib/hooks/use-translations';

export function PricingCTA() {
  const { t } = useTranslations();

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('pricing.cta.title')}
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            {t('pricing.cta.subtitle')}
          </p>
          <div className="flex justify-center">
            <Button size="lg" className="group" asChild>
              <Link href="/demo">
              {t('common.getStarted')}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}