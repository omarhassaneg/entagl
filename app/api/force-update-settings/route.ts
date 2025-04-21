import { NextResponse } from 'next/server';
import { getClient } from '@/lib/sanity.client';
import { groq } from 'next-sanity';

export async function GET(request: Request) {
  try {
    const client = getClient(true); // Get the authenticated client
    
    // Force create/update the settings document with the correct structure
    const updatedSettings = await client.createOrReplace({
      _id: 'siteSettings',
      _type: 'siteSettings',
      siteTitle: {
        en: 'Entagl - AI-Powered Solutions',
        tr: 'Entagl - Yapay Zeka Destekli Çözümler',
        ru: 'Entagl - Решения на основе искусственного интеллекта'
      },
      seoDescription: {
        en: 'Discover Entagl\'s AI-powered solutions that transform business operations with cutting-edge technology.',
        tr: 'Entagl\'ın yapay zeka destekli çözümleriyle iş süreçlerinizi dönüştürün.',
        ru: 'Откройте для себя решения Entagl на основе искусственного интеллекта для оптимизации бизнес-процессов.'
      }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Force updated site settings document',
      document: updatedSettings
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
} 