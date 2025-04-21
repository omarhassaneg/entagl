'use client';

import { PortableText, type PortableTextReactComponents, type PortableTextMarkComponentProps } from '@portabletext/react';
import type { TypedObject } from '@portabletext/types';
import Image from 'next/image'; // Assuming usage of next/image

// Define a simple interface for the component props
interface SanityPageRendererProps {
  page: any; // Replace 'any' with a more specific type if available
  settings: any; // Replace 'any' with a more specific type if available
}

// Define the shape of the link mark value from Sanity
interface LinkMarkValue extends TypedObject { 
  _type: 'link';
  href?: string;
  blank?: boolean;
}

// Define custom components for Portable Text
const portableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?.url) {
        return null;
      }
      // Basic image rendering - enhance as needed
      return (
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
          <Image 
            src={value.asset.url}
            alt={value.alt || ' '}
            fill
            style={{ objectFit: 'contain' }} // Adjust objectFit as needed
          />
        </div>
      );
    },
    // Add custom components for other types (e.g., code blocks, custom embeds)
  },
  marks: {
    link: ({ children, value }: PortableTextMarkComponentProps<LinkMarkValue>) => {
      const href = value?.href;
      if (!href) {
        return <>{children}</>; // Return children directly if no href
      }
      const rel = !href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={href} rel={rel} target={value?.blank ? '_blank' : '_self'}>
          {children}
        </a>
      );
    },
    // Add custom components for other marks (e.g., internal links)
  },
  // Customize block rendering if needed
  // block: {
  //   h1: ({children}) => <h1 className="text-4xl font-bold mb-4">{children}</h1>,
  //   h2: ({children}) => <h2 className="text-3xl font-semibold mb-3">{children}</h2>,
  //   blockquote: ({children}) => <blockquote className="border-l-4 pl-4 italic my-4">{children}</blockquote>,
  // }
};

export default function SanityPageRenderer({ page, settings }: SanityPageRendererProps) {
  // Basic rendering structure - adapt this to your site's layout/styling
  return (
    <article>
      {/* Optional: Use settings for things like global header/footer data */}
      {/* <header>Site Title: {settings?.siteTitle}</header> */}

      <h1>{page.title}</h1>

      {page.hero?.image && (
        <div style={{ position: 'relative', width: '100%', height: '300px' /* Adjust height */ }}>
          <Image 
            src={page.hero.image} 
            alt={page.hero.title || 'Hero Image'} 
            fill 
            style={{ objectFit: 'cover' }} 
          />
          <h2>{page.hero.title}</h2>
          {page.hero.cta && <p>{page.hero.cta}</p>}
        </div>
      )}

      {page.bodyRaw && (
        <div className="prose lg:prose-xl max-w-none">
          <PortableText 
            value={page.bodyRaw} // Pass the raw body data
            components={portableTextComponents} // Pass custom components
          />
        </div>
      )}

      {/* Add more sections/components based on your page schema */}
    </article>
  );
} 