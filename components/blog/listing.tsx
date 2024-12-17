'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BlogPost as BlogPostType } from '@/lib/types';
import { BLOG_CATEGORIES } from '@/lib/constants';
import { useTranslations } from '@/lib/hooks/use-translations';
import { useLanguage } from '@/components/providers/language-provider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogListingProps {
  posts: BlogPostType[];
}

export function BlogListing({ posts }: BlogListingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { t } = useTranslations();
  const { language } = useLanguage();

  // Then apply search and category filters
  const languageFilteredPosts = posts.filter(post => post.language === language);
  const filteredPosts = languageFilteredPosts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || post.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('blog.header.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('blog.header.subtitle')}
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('blog.search.placeholder')}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={!selectedCategory ? 'secondary' : 'ghost'}
                onClick={() => setSelectedCategory(null)}
              >
                {t('blog.categories.all')}
              </Button>
              {BLOG_CATEGORIES.map((category) => (
                <Button
                  key={category.slug}
                  variant={selectedCategory === category.slug ? 'secondary' : 'ghost'}
                  onClick={() => setSelectedCategory(category.slug)}
                >
                  {t(`blog.categories.${category.slug}`)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="group relative bg-card rounded-lg overflow-hidden border transition-all hover:shadow-lg">
                  <div className="aspect-[16/9] relative">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-muted-foreground mb-2">
                      {t(`blog.categories.${post.category}`)} · {post.readingTime} min read
                    </div>
                    <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}