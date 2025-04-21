import { Metadata } from 'next';
import { getClient } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import MetadataVerifier from '../components/MetadataVerifier';

interface LayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

async function getSettings(lang: string) {
  console.log('[Server] getSettings called with lang:', lang);
  try {
    const client = getClient();
    console.log('[Server] Sanity client initialized');
    
    // Direct field access using the language code
    const query = groq`*[_type == "siteSettings" && _id == "siteSettings"][0] {
      _id,
      _type,
      "siteTitle": siteTitle.${lang},
      "seoDescription": seoDescription.${lang}
    }`;
    
    console.log('[Server] Generated query:', query);
    
    const settings = await client.fetch(query);
    console.log('[Server] Fetched settings:', settings);
    
    if (!settings || !settings.siteTitle) {
      console.log('[Server] No settings found or missing title, creating default settings');
      // Return default settings if none found
      return {
        siteTitle: 'Entagl',
        seoDescription: 'AI-Powered Solutions'
      };
    }
    
    return settings;
  } catch (error) {
    console.error('[Server] Error in getSettings:', error);
    // Return default settings on error
    return {
      siteTitle: 'Entagl',
      seoDescription: 'AI-Powered Solutions'
    };
  }
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  console.log('[Server] generateMetadata called with params:', params);
  
  try {
    const settings = await getSettings(params.lang);
    console.log('[Server] Retrieved settings:', settings);
    
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://entagl.com';
    
    const title = settings?.siteTitle || 'Entagl';
    const description = settings?.seoDescription || 'AI-Powered Solutions';
    
    console.log('[Server] Using title:', title);
    console.log('[Server] Using description:', description);
    
    return {
      metadataBase: new URL(baseUrl),
      title: {
        template: `%s | ${title}`,
        default: title,
      },
      description,
      keywords: settings?.keywords || '',
      authors: [{ name: 'Entagl' }],
      openGraph: {
        type: 'website',
        siteName: 'Entagl',
        title,
        description,
        locale: params.lang === 'tr' ? 'tr_TR' : params.lang === 'ru' ? 'ru_RU' : 'en_US',
        images: [
          {
            url: '/og-image.jpg',
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ['/og-image.jpg'],
        creator: '@entagl',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      icons: {
        icon: [
          { url: '/favicon.ico', sizes: 'any' },
          { url: '/icon.svg', type: 'image/svg+xml' }
        ],
        apple: [
          { url: '/apple-touch-icon.png', sizes: '180x180' },
          { url: '/apple-touch-icon-precomposed.png', sizes: '180x180' }
        ]
      },
      manifest: '/site.webmanifest',
      alternates: {
        canonical: `/${params.lang}`,
        languages: {
          'en': '/en',
          'tr': '/tr',
          'ru': '/ru',
        },
      },
    };
  } catch (error) {
    console.error('[Server] Error in generateMetadata:', error);
    // Return default metadata on error
    return {
      title: 'Entagl',
      description: 'AI-Powered Solutions',
    };
  }
}

export default function Layout({ children, params }: LayoutProps) {
  console.log('[Client] Layout rendered with params:', params);
  return (
    <>
      <MetadataVerifier />
      {children}
    </>
  );
} 