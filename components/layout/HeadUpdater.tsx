'use client';

import { useEffect } from 'react';
import Head from 'next/head';

interface HeadUpdaterProps {
  title: string;
  description: string;
}

export default function HeadUpdater({ title, description }: HeadUpdaterProps) {
  useEffect(() => {
    // Directly update title and meta description at runtime
    document.title = title;
    
    // Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);
    
    console.log('[HeadUpdater] Updated document title to:', title);
    console.log('[HeadUpdater] Updated meta description to:', description);
  }, [title, description]);

  return null;
} 