'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from './logo';
import { useTranslations } from "@/lib/hooks/use-translations";
import Link from 'next/link';
import { Instagram, Phone } from "lucide-react";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Footer() {
  const { t } = useTranslations();
  const pathname = usePathname();
  const isOnboarding = pathname?.includes('/onboarding');

  const footerSections = [
    {
      title: t('footer.product'),
      links: [
        { label: t('nav.features'), href: '/features' },
        { label: t('footer.socialMediaAutomation'), href: '/social-media-automation' },
        { label: t('footer.demo'), href: '/demo' },
        { label: t('footer.onboarding'), href: '/onboarding' },
        { label: t('footer.guide'), href: '/guide' },
        { label: t('landing.solutions.cta'), href: '/free-quote' },
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
    <footer className={cn('bg-background border-t', isOnboarding && 'hidden md:block')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-muted-foreground">
              {t('footer.description')}
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold">{t('footer.phones.title')}</h4>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href="tel:+905462073902" className="hover:text-foreground transition-colors">
                  {t('footer.phones.turkey')}
                </a>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href="tel:+16478304916" className="hover:text-foreground transition-colors">
                  {t('footer.phones.canada')}
                </a>
              </div>
            </div>
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
            <div className="flex items-center justify-end space-x-6">
              <Link 
                href="https://www.instagram.com/entagl_ai/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <div className="text-muted-foreground">
                © {new Date().getFullYear()} Entagl. {t('footer.rights')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
