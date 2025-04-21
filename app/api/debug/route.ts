import { NextResponse } from 'next/server';
import { getClient } from '@/lib/sanity.client';
import { settingsQuery } from '@/lib/sanity.queries';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'en';
    
    // Get the Sanity client
    const client = getClient();
    
    // Get configuration info
    const configInfo = {
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
      hasToken: !!process.env.SANITY_API_READ_TOKEN,
    };
    
    // Get the query
    const query = settingsQuery(lang);
    
    // Fetch the settings
    const settings = await client.fetch(query);
    
    // Return all debug info
    return NextResponse.json({
      success: true,
      language: lang,
      config: configInfo,
      query,
      settings,
      raw: await client.fetch(`*[_type == "siteSettings"][0]`),
    });
  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 });
  }
} 