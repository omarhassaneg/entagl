import type { Metadata } from 'next';
import { getBlogPost } from '@/lib/utils/blog';
import { BlogPost } from '@/components/blog/post';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/data/blog-posts';

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug, params.lang);
  if (!post) return {};

  return {
    title: `${post.title} | Entagl Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

interface BlogPostPageProps {
  params: {
    lang: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  const params = [];
  for (const [lang, posts] of Object.entries(blogPosts)) {
    for (const post of posts) {
      params.push({
        lang,
        slug: post.slug,
      });
    }
  }
  return params;
}
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug, params.lang);
  
  if (!post) {
    notFound();
  }
  return <BlogPost post={post} />;
}