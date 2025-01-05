import { MetadataRoute } from 'next'
import { NAV_ITEMS } from '@/lib/constants'
import { blogPosts } from '@/lib/data/blog-posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://entagl.com'

  // Static pages from navigation
  const staticPages = NAV_ITEMS.map((item) => ({
    url: `${baseUrl}${item.href}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: item.href === '/' ? 1 : 0.8,
  }))

  // Blog posts
  const blogPages = Object.values(blogPosts)
    .flat()
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  return [...staticPages, ...blogPages]
}