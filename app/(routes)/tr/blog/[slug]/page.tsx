'use client';

import { useLanguage } from '@/components/providers/language-provider';
import { BlogPost } from '@/components/blog/post';
import { blogPosts } from '@/lib/data/blog-posts';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { language } = useLanguage();
  const posts = blogPosts[language as keyof typeof blogPosts] || [];
  const post = posts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPost post={post} />;
}