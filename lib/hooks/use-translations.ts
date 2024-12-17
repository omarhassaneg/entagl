'use client';

import { useCallback } from 'react';
import { useLanguage } from '../../components/providers/language-provider';
import en from '../i18n/en.json';
import tr from '../i18n/tr.json';

type TranslationType = typeof en;
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

const translations = {
  en,
  tr,
} as const;

export function useTranslations() {
  const { language } = useLanguage();

  const t = useCallback((key: NestedKeyOf<TranslationType>) => {
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
