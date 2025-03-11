'use client';

import { createContext, useContext, useState, useCallback, ReactNode, useEffect, useMemo } from 'react';
import { LANGUAGES } from '@/lib/constants';
import { detectUserLanguage } from '@/lib/utils/location';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'tr',
  setLanguage: () => {},
  isLoading: true,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<string>('tr');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initLanguage = async () => {
      try {
        const detectedLanguage = await detectUserLanguage();
        if (LANGUAGES.some((l) => l.code === detectedLanguage)) {
          setLanguageState(detectedLanguage);
          document.documentElement.lang = detectedLanguage;
        }
      } finally {
        setIsLoading(false);
      }
    };
    initLanguage();
  }, []);

  const contextValue = useMemo(() => ({
    language,
    setLanguage: (lang: string) => {
      if (LANGUAGES.some((l) => l.code === lang)) {
        setLanguageState(lang);
        document.documentElement.lang = lang;
      }
    },
    isLoading
  }), [language, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);