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

  // Initial language detection from URL or user preference
  useEffect(() => {
    const initLanguage = async () => {
      try {
        // First check URL for language
        const urlLang = pathname.split('/')[1];
        if (LANGUAGES.some((l) => l.code === urlLang)) {
          setLanguageState(urlLang);
          document.documentElement.lang = urlLang;
          previousLanguage.current = urlLang;
        } else {
          // If no valid language in URL, detect user language
          const detectedLanguage = await detectUserLanguage();
          if (LANGUAGES.some((l) => l.code === detectedLanguage)) {
            setLanguageState(detectedLanguage);
            document.documentElement.lang = detectedLanguage;
            previousLanguage.current = detectedLanguage;
            // Redirect to the detected language path
            const newPath = pathname === '/' ? `/${detectedLanguage}` : `/${detectedLanguage}${pathname}`;
            router.replace(newPath);
          }
        }
      } finally {
        setIsLoading(false);
        isInitialRender.current = false;
      }
    };
    initLanguage();
  }, [pathname, router]);

  // Create a function to safely update language with URL change
  const safeSetLanguage = useMemo(() => (lang: string) => {
    if (LANGUAGES.some((l) => l.code === lang) && lang !== language) {
      try {
        globalLanguageKey++;
        setLanguageKey(globalLanguageKey);
        
        setLanguageState(lang);
        document.documentElement.lang = lang;
        previousLanguage.current = lang;
        
        // Update URL to reflect language change
        const currentPathParts = pathname.split('/');
        if (currentPathParts[1] && LANGUAGES.some((l) => l.code === currentPathParts[1])) {
          currentPathParts[1] = lang;
        } else {
          currentPathParts.splice(1, 0, lang);
        }
        const newPath = currentPathParts.join('/') || `/${lang}`;
        router.push(newPath);

        if (typeof window !== 'undefined') {
          const highestTimeoutId = window.setTimeout(() => {}, 0);
          for (let i = 1; i < highestTimeoutId; i++) {
            window.clearTimeout(i);
          }
        }
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