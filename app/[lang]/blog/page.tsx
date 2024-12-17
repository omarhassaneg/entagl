import { getBlogPosts } from '@/lib/utils/blog';
import { BlogListing } from '@/components/blog/listing';

interface BlogPageProps {
  params: {
    lang: string;
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const posts = await getBlogPosts(params.lang);
  return <BlogListing posts={posts} />;
}