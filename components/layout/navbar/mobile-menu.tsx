'use client';

import { Button } from '@/components/ui/button';
import { LanguageSelector } from '../language-selector';
import { ThemeToggle } from './theme-toggle';
import { NavLinks } from './nav-links';
import { useTranslations } from '@/lib/hooks/use-translations';

export function MobileMenu() {
  const { t } = useTranslations();

  return (
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      <NavLinks mobile />
      <div className="flex items-center justify-between px-3 py-2">
        <LanguageSelector />
        <ThemeToggle />
      </div>
      <Button className="w-full mt-4">{t('common.getStarted')}</Button>
    </div>
  );
}