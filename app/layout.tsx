import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/components/providers/language-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer'; 

const inter = Inter({ subsets: ['latin'] });

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://entagl.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Entagl - AI-Powered Solutions',
  description: 'AI and automation solutions for businesses',
  keywords: 'social media automation, AI marketing, social media management, automated posting, content creation, small business marketing',
  authors: [{ name: 'Entagl' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Entagl',
    title: 'Entagl - AI-Powered Solutions',
    description: 'AI and automation solutions for businesses',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Entagl - AI-Powered Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Entagl - AI-Powered Solutions',
    description: 'AI and automation solutions for businesses',
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
  verification: {
    google: 'your-google-site-verification',
  },
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang || 'tr'} suppressHydrationWarning>
      <head>
        <script src="/cal-embed.js" defer></script>
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow pt-16">{children}</main>
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}