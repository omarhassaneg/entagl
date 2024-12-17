'use client';

import { SERVICES } from '@/lib/constants';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { useTranslations } from '@/lib/hooks/use-translations';

export function ServicesOverview() {
  const { t } = useTranslations();

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('home.services.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('home.services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <Card key={service.id} className="relative overflow-hidden">
              <CardHeader>
                <CardTitle>{t(`services.${service.id}.title`)}</CardTitle>
                <CardDescription>{t(`services.${service.id}.description`)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="text-2xl font-bold">
                    ${service.monthlyFee}
                    <span className="text-base font-normal text-muted-foreground">
                      {t('common.month')}
                    </span>
                  </p>
                  <p className="text-muted-foreground">
                    ${service.setupFee} {t('common.setupFee')}
                  </p>
                </div>
                <ul className="space-y-3">
                  {service.features.map((featureKey) => (
                    <li key={featureKey} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-teal-500 flex-shrink-0" />
                      <span>{t(`services.${service.id}.features.${featureKey}`)}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}