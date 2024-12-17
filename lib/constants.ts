import { NavItem, Language } from './types';

export const LANGUAGES: Language[] = [
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
  },
  {
    code: 'tr',
    name: 'Türkçe',
    flag: '🇹🇷',
  },
];

export const NAV_ITEMS: NavItem[] = [
  {
    title: 'home',
    href: '/',
  },
  {
    title: 'features',
    href: '/features',
  },
  {
    title: 'pricing',
    href: '/pricing',
  },
  {
    title: 'blog',
    href: '/blog',
  },
  {
    title: 'compare',
    href: '/compare',
  },
];

export const SERVICES = [
  {
    id: 'basic-automation',
    setupFee: 300,
    monthlyFee: 100,
    features: ['captions', 'templates', 'images', 'scheduling', 'delivery'],
  },
  {
    id: 'advanced-automation',
    setupFee: 500,
    monthlyFee: 159,
    features: ['basic', 'whatsapp', 'voice', 'scripts', 'voiceover'],
  },
  {
    id: 'basic-agent',
    setupFee: 300,
    monthlyFee: 100,
    additionalChannelSetup: 100,
    additionalChannelMonthly: 50,
    features: ['comments', 'dm', 'platforms', 'availability', 'conversations'],
  },
  {
    id: 'advanced-agent',
    setupFee: 500,
    monthlyFee: 169,
    additionalChannelSetup: 100,
    additionalChannelMonthly: 50,
    features: ['basic', 'qualification', 'conversion', 'crm', 'analytics'],
  },
];

export const BLOG_CATEGORIES: BlogCategory[] = [
  { name: 'AI Technology', slug: 'ai-technology' },
  { name: 'Business', slug: 'business' },
  { name: 'Case Studies', slug: 'case-studies' },
  { name: 'Industry News', slug: 'industry-news' },
];