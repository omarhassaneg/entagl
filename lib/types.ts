export interface Service {
  id: string;
  title: string;
  description: string;
  setupFee: number;
  monthlyFee: number;
  features: string[];
  additionalChannelSetup?: number;
  additionalChannelMonthly?: number;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface NavItem {
  title: string;
  href: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  language: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readingTime: number;
  coverImage: string;
  content: string;
}

export interface BlogCategory {
  name: string;
  slug: string;
}

export interface FooterSection {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}