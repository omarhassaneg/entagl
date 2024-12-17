'use client';

import Link from 'next/link';
import { NAV_ITEMS } from '@/lib/constants';
import { useTranslations } from '@/lib/hooks/use-translations';

export function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const { t } = useTranslations();

  return (
    <>
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={
            mobile
              ? 'block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground'
              : 'text-muted-foreground hover:text-foreground transition-colors'
          }
        >
          {t(`nav.${item.title}`)}
        </Link>
      ))}
    </>
  );
}