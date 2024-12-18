'use client';

import { useCallback } from 'react';
import { useLanguage } from '../../components/providers/language-provider';
import en from '../i18n/en.json';
import tr from '../i18n/tr.json';
import ru from '../i18n/ru.json';

type TranslationType = typeof en;

// Helper type to extract valid category slugs
type CategorySlugs = 'ai-technology' | 'business' | 'case-studies' | 'industry-news';

// Modified to handle both static paths and dynamic category paths
type TranslationKey = {
  [K in keyof TranslationType]: TranslationType[K] extends object
    ? K extends 'blog' 
      ? `${K}.categories.${CategorySlugs}` | `${K}.${keyof TranslationType[K] & string}`
      : `${K}.${keyof TranslationType[K] & string}`
    : K;
}[keyof TranslationType];

const translations = {
  en,
  tr,
  ru,
} as const;

export function useTranslations() {
  const { language } = useLanguage();

  const t = useCallback((key: TranslationKey | string) => {
    const keys = key.split('.');
    let value: any = translations[language as keyof typeof translations];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    return value as string;
  }, [language]);

  return { t };
}
