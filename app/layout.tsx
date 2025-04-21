import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/components/providers/language-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer'; 
import HeadUpdater from '@/components/layout/HeadUpdater';

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  // Set default values for title and description
  const defaultTitle = "Entagl - AI-Powered Solutions";
  const defaultDescription = "Discover Entagl's AI-powered solutions that transform business operations with cutting-edge technology.";
  
  return (
    <html lang={params.lang || 'tr'} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            {/* Add the HeadUpdater component with default values */}
            <HeadUpdater title={defaultTitle} description={defaultDescription} />
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}