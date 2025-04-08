'use client';

import { BlogListing } from '@/components/blog/listing';
import { blogPosts } from '@/lib/data/blog-posts';
import { useLanguage } from '@/components/providers/language-provider';

export default function BlogPage() {
  const { language } = useLanguage();
  const posts = blogPosts[language as keyof typeof blogPosts] || [];
  
  return <BlogListing posts={posts} />;
}