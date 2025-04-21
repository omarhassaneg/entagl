import { notFound } from 'next/navigation';
import { getClient } from '@/lib/sanity.client';
import { pageBySlugQuery, settingsQuery, pagePathsQuery } from '@/lib/sanity.queries';
import SanityPageRenderer from '@/components/SanityPageRenderer'; // We will create this component next

// Interface for page props
interface PageProps {
  params: { lang: string; slug: string };
}

// Fetch data for the page
async function loadPageData(lang: string, slug: string) {
  const client = getClient(); // Use the default client (no preview initially)
  
  // Fetch page and settings concurrently
  const [page, settings] = await Promise.all([
    client.fetch<any>(pageBySlugQuery(lang), { slug }),
    client.fetch<any>(settingsQuery(lang)),
  ]);

  return { page, settings };
}

// Define the Page component (Server Component)
export default async function Page({ params }: PageProps) {
  const { lang, slug } = params;
  console.log(`>>> Fetching page for lang: ${lang}, slug: ${slug}`);
  const { page, settings } = await loadPageData(lang, slug);

  if (!page) {
    // If the page is not found, return 404
    notFound();
  }

  // Pass data to the client component for rendering
  return <SanityPageRenderer page={page} settings={settings} />;
}

// Optional: Generate static paths for SSG
// export async function generateStaticParams() {
//   const client = getClient();
//   const slugs = await client.fetch<string[]>(pagePathsQuery);

//   // Get supported languages (assuming you have a way to access them, e.g., from middleware)
//   const locales = ['en', 'tr', 'ru']; 

//   return locales.flatMap(lang => 
//     slugs.map(slug => ({ lang, slug }))
//   );
// }

// Optional: Set metadata (e.g., title)
export async function generateMetadata({ params }: PageProps) {
  const { lang, slug } = params;
  console.log(`>>> Generating metadata for lang: ${lang}, slug: ${slug}`); // Log entry point
  const { page, settings } = await loadPageData(lang, slug);

  const title = page?.title || settings?.siteTitle || 'Page';
  const description = page?.seoDescription || settings?.seoDescription || '';

  // Log the fetched data and the final values
  console.log(`>>> Page data for metadata:`, page);
  console.log(`>>> Settings data for metadata:`, settings);
  console.log(`>>> Determined title: ${title}`);
  console.log(`>>> Determined description: ${description}`);

  return {
    title: title,
    description: description,
  };
} 