'use client';

import { useCallback, useMemo } from 'react';
import { useLanguage } from '@/components/providers/language-provider';
import translations from '../i18n';

type TranslationValue = string | Record<string, any>;

export function useTranslations() {
  const { language, isLoading, languageKey } = useLanguage();

  const currentTranslations = useMemo(() => {
    // Make sure we have valid translations for this language, fallback to English if not
    return translations[language as keyof typeof translations] || translations.en;
  }, [language, languageKey]); // Add languageKey dependency to ensure this updates

  const t = useCallback((key: string) => {
    if (isLoading) return '';

    const keys = key.split('.');
    let value: TranslationValue = currentTranslations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k as keyof typeof value];
      } else {
        // Try English fallback
        let fallbackValue: TranslationValue = translations.en;
        let fallbackFound = true;
        
        for (const fallbackKey of keys) {
          if (fallbackValue && typeof fallbackValue === 'object' && fallbackKey in fallbackValue) {
            fallbackValue = fallbackValue[fallbackKey as keyof typeof fallbackValue];
          } else {
            fallbackFound = false;
            console.warn(`Missing translation for key: ${key} in language: ${language}`);
            return key;
          }
        }
        
        if (fallbackFound) {
          return typeof fallbackValue === 'string' ? fallbackValue : key;
        }
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  }, [language, currentTranslations, isLoading, languageKey]); // Add languageKey dependency

  return { t, language, languageKey }; // Expose language and key for components
}