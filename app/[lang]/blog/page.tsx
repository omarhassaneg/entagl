import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/utils/blog';
import { BlogListing } from '@/components/blog/listing';

export const metadata: Metadata = {
  title: 'Blog | Entagl',
  description: 'Discover the latest insights and updates about AI-powered social media management',
  alternates: {
    canonical: '/blog',
  },
};

interface BlogPageProps {
  params: {
    lang: string;
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const posts = await getBlogPosts(params.lang);
  return <BlogListing posts={posts} />;
}