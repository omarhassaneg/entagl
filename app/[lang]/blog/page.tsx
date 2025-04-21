import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/utils/blog';
import { BlogListing } from '@/components/blog/listing';

const translations = {
  en: {
    title: 'Blog | Entagl',
    description: 'Discover the latest insights and updates about AI-powered social media management'
  },
  tr: {
    title: 'Blog | Entagl',
    description: 'Yapay zeka destekli sosyal medya yönetimi hakkında en son bilgileri ve güncellemeleri keşfedin'
  },
  ru: {
    title: 'Блог | Entagl',
    description: 'Узнайте последние новости и обновления об управлении социальными сетями с помощью ИИ'
  }
};

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const t = translations[params.lang as keyof typeof translations] || translations.en;
  
  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: '/blog',
    },
    openGraph: {
      title: t.title,
      description: t.description,
      locale: params.lang === 'tr' ? 'tr_TR' : params.lang === 'ru' ? 'ru_RU' : 'en_US',
    },
  };
}

interface BlogPageProps {
  params: {
    lang: string;
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const posts = await getBlogPosts(params.lang);
  return <BlogListing posts={posts} />;
}