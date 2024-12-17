'use client';

import { BlogPost as BlogPostType } from '@/lib/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Share2, Clock } from 'lucide-react';
import { useTranslations } from '@/lib/hooks/use-translations';

interface BlogPostProps {
  post: BlogPostType;
}

export function BlogPost({ post }: { post: BlogPostType }) {
  const { t } = useTranslations();
  
  const sharePost = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <article className="min-h-screen">
      <div className="bg-background/80 backdrop-blur-lg border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-sm text-muted-foreground">
              {t(`blog.categories.${post.category}`)}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              {post.title}
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{post.author.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {post.date}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">{post.readingTime} min read</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={sharePost}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative aspect-[21/9] mb-12 rounded-lg overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
        <div 
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}