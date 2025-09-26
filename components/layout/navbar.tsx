'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Logo } from './logo';
import { Button } from '@/components/ui/button';
import { NAV_ITEMS } from '@/lib/constants';
import { LanguageSelector } from '@/components/layout/language-selector';
import { useTranslations } from '@/lib/hooks/use-translations';
import { useLanguage } from '@/components/providers/language-provider';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t } = useTranslations();
  const { language } = useLanguage();
  const pathname = usePathname();
  const isOnboarding = pathname?.includes('/onboarding');

  useEffect(() => {
    setMounted(true);
  }, []);

  const getLocalizedHref = (href: string) => {
    if (href === '/') {
      return `/${language}`;
    }
    if (href.startsWith('/')) {
      return `/${language}${href}`;
    }
    return href;
  };

  if (!mounted) return null;

  return (
    <nav
      className={cn(
        'fixed top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b',
        isOnboarding && 'hidden md:block'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href={getLocalizedHref('/')}>
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={getLocalizedHref(item.href)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t(`nav.${item.title.toLowerCase()}`)}
              </Link>
            ))}

            <LanguageSelector />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Button variant="default">{t('common.getStarted')}</Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={getLocalizedHref(item.href)}
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {t(`nav.${item.title.toLowerCase()}`)}
              </Link>
            ))}
            <div className="flex items-center justify-between px-3 py-2">
              <LanguageSelector />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>
            <Button className="w-full mt-4">{t('common.getStarted')}</Button>
          </div>
        </div>
      )}
    </nav>
  );
}
