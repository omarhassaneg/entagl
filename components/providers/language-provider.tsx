'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useMemo, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LANGUAGES } from '@/lib/constants';
import { detectUserLanguage } from '@/lib/utils/location';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  isLoading: boolean;
  languageKey: number;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'tr',
  setLanguage: () => {},
  isLoading: true,
  languageKey: 0,
});

let globalLanguageKey = 0;

export function LanguageProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [language, setLanguageState] = useState<string>('tr');
  const [isLoading, setIsLoading] = useState(true);
  const [languageKey, setLanguageKey] = useState(0);
  const isInitialRender = useRef(true);
  const previousLanguage = useRef<string | null>(null);

  // Initial language detection from URL
  useEffect(() => {
    if (isInitialRender.current) {
      const urlLang = pathname.split('/')[1];
      if (LANGUAGES.some((l) => l.code === urlLang)) {
        setLanguageState(urlLang);
        document.documentElement.lang = urlLang;
        previousLanguage.current = urlLang;
        document.cookie = `NEXT_LOCALE=${urlLang}; path=/; max-age=31536000`;
      }
      setIsLoading(false);
      isInitialRender.current = false;
    }
  }, [pathname]);

  // Handle language changes from URL
  useEffect(() => {
    if (!isInitialRender.current) {
      const urlLang = pathname.split('/')[1];
      if (LANGUAGES.some((l) => l.code === urlLang) && urlLang !== language) {
        setLanguageState(urlLang);
        document.documentElement.lang = urlLang;
        previousLanguage.current = urlLang;
        document.cookie = `NEXT_LOCALE=${urlLang}; path=/; max-age=31536000`;
      }
    }
  }, [pathname, language]);

  // Create a function to safely update language with URL change
  const safeSetLanguage = useMemo(() => (lang: string) => {
    if (LANGUAGES.some((l) => l.code === lang) && lang !== language) {
      try {
        globalLanguageKey++;
        setLanguageKey(globalLanguageKey);
        
        // Set language state and cookie
        setLanguageState(lang);
        document.documentElement.lang = lang;
        document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`;
        previousLanguage.current = lang;
        
        // Update URL to reflect language change
        const currentPathParts = pathname.split('/').filter(Boolean);
        if (currentPathParts[0] && LANGUAGES.some((l) => l.code === currentPathParts[0])) {
          currentPathParts[0] = lang;
        } else {
          currentPathParts.unshift(lang);
        }
        const newPath = `/${currentPathParts.join('/')}`;
        router.push(newPath);
      } catch (error) {
        console.error("Error changing language:", error);
        if (previousLanguage.current) {
          setLanguageState(previousLanguage.current);
          document.documentElement.lang = previousLanguage.current;
        }
      }
    }
  }, [language, pathname, router]);

  const contextValue = useMemo(() => ({
    language,
    setLanguage: safeSetLanguage,
    isLoading,
    languageKey
  }), [language, safeSetLanguage, isLoading, languageKey]);

  if (isLoading && isInitialRender.current) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      <div key={`language-root-${languageKey}`}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);