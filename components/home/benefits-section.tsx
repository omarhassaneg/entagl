'use client';

import { Card } from '@/components/ui/card';
import { Clock, DollarSign, Users, TrendingUp } from 'lucide-react';
import { useTranslations } from '@/lib/hooks/use-translations';

export function BenefitsSection() {
  const { t } = useTranslations();

  const benefits = [
    {
      icon: Clock,
      title: t('home.benefits.items.time.title'),
      description: t('home.benefits.items.time.description'),
      color: 'text-teal-500',
    },
    {
      icon: DollarSign,
      title: t('home.benefits.items.cost.title'),
      description: t('home.benefits.items.cost.description'),
      color: 'text-blue-500',
    },
    {
      icon: Users,
      title: t('home.benefits.items.engagement.title'),
      description: t('home.benefits.items.engagement.description'),
      color: 'text-purple-500',
    },
    {
      icon: TrendingUp,
      title: t('home.benefits.items.leads.title'),
      description: t('home.benefits.items.leads.description'),
      color: 'text-orange-500',
    },
  ];

  return (
    <section className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('home.benefits.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('home.benefits.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="p-6">
              <benefit.icon className={`h-12 w-12 ${benefit.color} mb-4`} />
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}