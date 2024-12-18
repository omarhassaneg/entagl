'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from './logo';
import { useTranslations } from '@/lib/hooks/use-translations';
import Link from 'next/link';

export function Footer() {
  const { t } = useTranslations();

  const footerSections = [
    {
      title: t('footer.product'),
      links: [
        { label: t('nav.features'), href: '/features' },
        { label: t('nav.pricing'), href: '/pricing' },
        { label: t('nav.compare'), href: '/compare' },
        { label: t('footer.demo'), href: '/demo' },
      ],
    },
    {
      title: t('footer.company'),
      links: [
        { label: t('footer.about'), href: '/about' },
        { label: t('nav.blog'), href: '/blog' },
        { label: t('footer.contact'), href: '/contact' },
      ],
    },
    {
      title: t('footer.legal'),
      links: [
        { label: t('footer.privacy'), href: '/privacy' },
        { label: t('footer.terms'), href: '/terms' },
      ],
    },
  ];

  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-muted-foreground">
              {t('footer.description')}
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold">{t('footer.newsletter')}</h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder={t('common.emailPlaceholder')}
                  className="max-w-xs"
                />
                <Button>{t('common.subscribe')}</Button>
              </div>
            </div>
            <div className="text-right text-muted-foreground">
              © {new Date().getFullYear()} Entagl. {t('footer.rights')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}