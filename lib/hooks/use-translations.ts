'use client';

import { useCallback } from 'react';
import { useLanguage } from '@/components/providers/language-provider';
import en from '@/lib/i18n/en.json';
import tr from '@/lib/i18n/tr.json';

const translations = {
  en,
  tr,
};

export function useTranslations() {
  const { language } = useLanguage();

  const t = useCallback((key: string) => {
    const keys = key.split('.');
    let value = translations[language as keyof typeof translations];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k as keyof typeof value];
      } else {
        return key;
      }
    }

    return value as string;
  }, [language]);

  return { t };
}