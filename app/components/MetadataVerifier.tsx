'use client';

import { useEffect } from 'react';

export default function MetadataVerifier() {
  useEffect(() => {
    // Log metadata values from document
    console.log('[Client] Document title:', document.title);
    console.log('[Client] Meta description:', document.querySelector('meta[name="description"]')?.getAttribute('content'));
    
    // Log all meta tags for debugging
    console.log('[Client] All meta tags:', Array.from(document.getElementsByTagName('meta')).map(meta => ({
      name: meta.getAttribute('name'),
      content: meta.getAttribute('content')
    })));
  }, []);

  return null; // This component doesn't render anything
} 