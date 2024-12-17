import { blogPosts } from '@/lib/data/blog-posts';
import { BlogPost } from '@/lib/types';

export function getBlogPosts(lang?: string): BlogPost[] {
  if (lang) {
    return blogPosts[lang as keyof typeof blogPosts] || [];
  }
  // If no language specified, return all posts
  return Object.values(blogPosts).flat();
}

export function getBlogPost(slug: string, lang?: string): BlogPost | null {
  const posts = getBlogPosts(lang);
  return posts.find(post => post.slug === slug) || null;
}