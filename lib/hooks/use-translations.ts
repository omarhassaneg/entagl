'use client';

import { useCallback, useMemo } from 'react';
import { useLanguage } from '@/components/providers/language-provider';
import translations from '../i18n';

export function useTranslations() {
  const { language, isLoading } = useLanguage();

  const currentTranslations = useMemo(() => {
    return translations[language as keyof typeof translations] || translations.en;
  }, [language]);

  const t = useCallback((key: string) => {
    if (isLoading) return '';

    const keys = key.split('.');
    let value: any = currentTranslations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Try English fallback
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            console.warn(`Missing translation for key: ${key} in language: ${language}`);
            return key;
          }
        }
      }
    }

    return value as string;
  }, [language, currentTranslations, isLoading]);

  return { t };
}