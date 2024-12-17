'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from '@/lib/hooks/use-translations';

export function FeaturesCTA() {
  const { t } = useTranslations();

  return (
    <section className="py-24 bg-gradient-to-r from-teal-500 to-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          {t('pricing.cta.title')}
        </h2>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          {t('pricing.cta.subtitle')}
        </p>
        <Link href="/demo">
          <Button
            size="lg"
            variant="secondary"
            className="group bg-white text-teal-500 hover:bg-white/90"
          >
            {t('common.getStartedNow')}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </section>
  );
}