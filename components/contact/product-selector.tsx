'use client';

import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslations } from '@/lib/hooks/use-translations';
import { SERVICES } from '@/lib/constants';
import { Bot, Zap, MessageSquare, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

const icons = {
  'basic-automation': Bot,
  'advanced-automation': Zap,
  'basic-agent': MessageSquare,
  'advanced-agent': BrainCircuit,
};

interface ProductSelectorProps {
  selectedProducts: string[];
  onProductToggle: (productId: string) => void;
}

export function ProductSelector({ selectedProducts, onProductToggle }: ProductSelectorProps) {
  const { t } = useTranslations();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {SERVICES.map((service) => {
        const Icon = icons[service.id as keyof typeof icons];
        return (
          <Card
            key={service.id}
            className={cn(
              'group p-6 cursor-pointer transition-all hover:shadow-lg',
              selectedProducts.includes(service.id) && 'ring-2 ring-primary'
            )}
            onClick={() => onProductToggle(service.id)}
          >
            <div className="flex items-start space-x-4">
              <Checkbox
                checked={selectedProducts.includes(service.id)}
                className="translate-y-1"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold">
                    {t(`services.${service.id}.title`)}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {t(`services.${service.id}.description`)}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}