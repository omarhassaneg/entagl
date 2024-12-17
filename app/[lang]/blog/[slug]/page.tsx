import { getBlogPost } from '@/lib/utils/blog';
import { BlogPost } from '@/components/blog/post';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/data/blog-posts';

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