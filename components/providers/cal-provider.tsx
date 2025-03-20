'use client';

import { createContext, useContext, useEffect, useState } from 'react';

// Extend the Window interface to add Cal property
declare global {
  interface Window {
    Cal?: any;
  }
}

// Create a context to track when Cal is ready
type CalContextType = {
  calLoaded: boolean;
};

const CalContext = createContext<CalContextType>({ calLoaded: false });

// Hook to access Cal context
export const useCalendar = () => useContext(CalContext);

export function CalProvider({ children }: { children: React.ReactNode }) {
  const [calLoaded, setCalLoaded] = useState(false);

  useEffect(() => {
    // Only load the script if it's not already loaded
    if (!document.getElementById('cal-script') && !window.Cal) {
      // Create script element
      const script = document.createElement('script');
      script.id = 'cal-script';
      script.src = 'https://app.cal.com/embed/embed.js';
      script.async = true;
      script.onload = () => {
        // Initialize Cal after script loads
        window.Cal?.('init', '45min-online', { origin: 'https://cal.com' });
        window.Cal?.ns?.['45min-online']?.('ui', {
          hideEventTypeDetails: false,
          layout: 'month_view',
        });
        setCalLoaded(true);
      };
      
      document.head.appendChild(script);
    } else if (window.Cal) {
      // Cal already exists
      setCalLoaded(true);
    }

    // Clean up
    return () => {
      const script = document.getElementById('cal-script');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <CalContext.Provider value={{ calLoaded }}>
      {children}
    </CalContext.Provider>
  );
}