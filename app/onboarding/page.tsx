'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { OnboardingForm } from '@/components/onboarding/onboarding-form';
import { cn } from '@/lib/utils';

export default function OnboardingPage() {
  const [isMobile, setIsMobile] = useState(false);

  const containerClasses = cn(
    'mx-auto w-full',
    isMobile ? 'px-2 py-2' : 'px-4 sm:px-6 lg:px-8 py-4 md:py-12 lg:py-16'
  );

  const contentClasses = cn(
    'mx-auto flex w-full flex-col md:max-w-5xl min-h-[100dvh] md:min-h-0'
  );

  // Detect mobile device on mount
  useEffect(() => {
    const checkIsMobile = () => {
      if (typeof window !== 'undefined') {
        const isMobileDevice = window.innerWidth < 768; // md breakpoint
        setIsMobile(isMobileDevice);
      }
    };

    checkIsMobile();
    
    // Listen for resize events
    const handleResize = () => {
      checkIsMobile();
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div className={containerClasses}>
      <div className={contentClasses}>
        <motion.div
          className="flex-1 pb-4 sm:pb-10 md:pb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <OnboardingForm />
        </motion.div>
      </div>
    </div>
  );
}
