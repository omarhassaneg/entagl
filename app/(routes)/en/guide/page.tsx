'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Globe2, ShieldCheck, PhoneCall, Instagram } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from '@/lib/hooks/use-translations';

const SECTION_CONFIG = [
  { key: 'website', icon: Globe2 },
  { key: 'meta', icon: ShieldCheck },
  { key: 'whatsapp', icon: PhoneCall },
  { key: 'instagram', icon: Instagram },
  { key: 'support', icon: CheckCircle2 },
] as const;

const POINT_KEYS: Record<string, string[]> = {
  website: ['1', '2', '3'],
  meta: ['1', '2', '3'],
  whatsapp: ['1', '2', '3'],
  instagram: ['1', '2', '3'],
};

export default function GuidePage() {
  const { t } = useTranslations();

  return (
    <div className="min-h-screen py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium text-primary">
            {t('guide.hero.badge')}
          </span>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            {t('guide.hero.title')}
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            {t('guide.hero.subtitle')}
          </p>
        </motion.div>

        <div className="grid gap-6">
          {SECTION_CONFIG.map(({ key, icon: Icon }, index) => {
            const hasPoints = key in POINT_KEYS;
            const points = hasPoints ? POINT_KEYS[key] : [];
            const descriptionKey = `guide.sections.${key}.description`;
            const ctaKey = `guide.sections.${key}.cta`;
            const description = t(descriptionKey);
            const hasDescription = description !== descriptionKey;
            const cta = t(ctaKey);
            const hasCta = cta !== ctaKey;
            const showDescriptionInHeader = hasPoints && hasDescription;
            const showDescriptionInContent = !hasPoints && hasDescription;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="border-primary/10">
                  <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{t(`guide.sections.${key}.title`)}</CardTitle>
                        {showDescriptionInHeader ? (
                          <CardDescription>{description}</CardDescription>
                        ) : null}
                      </div>
                    </div>
                    {hasCta ? (
                      <div className="shrink-0 text-sm font-medium text-primary">
                        {cta}
                      </div>
                    ) : null}
                  </CardHeader>
                  {hasPoints ? (
                    <CardContent>
                      <ul className="space-y-3 text-sm text-muted-foreground">
                        {points.map((pointKey) => (
                          <li key={pointKey} className="flex items-start gap-3">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                            <span>{t(`guide.sections.${key}.points.${pointKey}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  ) : showDescriptionInContent ? (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </CardContent>
                  ) : null}
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
