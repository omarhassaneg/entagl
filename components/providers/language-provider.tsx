'use client';

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { LANGUAGES } from '@/lib/constants';
import { detectUserLanguage } from '@/lib/utils/location';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<string>('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initLanguage = async () => {
      try {
        const detectedLanguage = await detectUserLanguage();
        setLanguage(detectedLanguage);
      } finally {
        setIsLoading(false);
      }
    };
    initLanguage();
  }, []);

  const setLanguage = useCallback((lang: string) => {
    if (LANGUAGES.some((l) => l.code === lang)) {
      setLanguageState(lang);
      document.documentElement.lang = lang;
    }
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);