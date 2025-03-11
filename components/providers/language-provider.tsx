'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useMemo, useLayoutEffect, useRef } from 'react';
import { LANGUAGES } from '@/lib/constants';
import { detectUserLanguage } from '@/lib/utils/location';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  isLoading: boolean;
  languageKey: number; // Added to force re-renders when language changes
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en', // Default to English to avoid flash of Turkish content
  setLanguage: () => {},
  isLoading: true,
  languageKey: 0,
});

// Use a key to ensure complete remount of all components
let globalLanguageKey = 0;

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<string>('en');
  const [isLoading, setIsLoading] = useState(true);
  const [languageKey, setLanguageKey] = useState(0);
  const isInitialRender = useRef(true);
  const previousLanguage = useRef<string | null>(null);

  // Initial language detection
  useEffect(() => {
    const initLanguage = async () => {
      try {
        const detectedLanguage = await detectUserLanguage();
        if (LANGUAGES.some((l) => l.code === detectedLanguage)) {
          setLanguageState(detectedLanguage);
          document.documentElement.lang = detectedLanguage;
          previousLanguage.current = detectedLanguage;
        }
      } finally {
        setIsLoading(false);
        isInitialRender.current = false;
      }
    };
    initLanguage();
  }, []);

  // Create a function to safely update language
  const safeSetLanguage = useMemo(() => (lang: string) => {
    if (LANGUAGES.some((l) => l.code === lang) && lang !== language) {
      try {
        // Increment the global key to force complete remount
        globalLanguageKey++;
        setLanguageKey(globalLanguageKey);
        
        // Update state and document
        setLanguageState(lang);
        document.documentElement.lang = lang;
        
        // Track previous language for reference
        previousLanguage.current = lang;
        
        // Clear any lingering timers by storing their IDs in window
        if (typeof window !== 'undefined') {
          // A safer approach to clear lingering timers
          const highestTimeoutId = window.setTimeout(() => {}, 0);
          for (let i = 1; i < highestTimeoutId; i++) {
            window.clearTimeout(i);
          }
        }
      } catch (error) {
        console.error("Error changing language:", error);
        // Fallback to previous language if there's an error
        if (previousLanguage.current) {
          setLanguageState(previousLanguage.current);
          document.documentElement.lang = previousLanguage.current;
        }
      }
    }
  }, [language]);

  // Create context value with memoization to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    language,
    setLanguage: safeSetLanguage,
    isLoading,
    languageKey
  }), [language, safeSetLanguage, isLoading, languageKey]);

  // Show loading state only on initial load
  if (isLoading && isInitialRender.current) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Use the key prop to force complete remount when language changes
  return (
    <LanguageContext.Provider value={contextValue}>
      <div key={`language-root-${languageKey}`}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);