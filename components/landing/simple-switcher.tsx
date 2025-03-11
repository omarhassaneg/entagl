'use client';

import { useState, useEffect } from 'react';
import { ChatVisualization } from './chat-visualization';
import { MinimalCrmVisualization } from './minimal-crm';
import { useLanguage } from '@/components/providers/language-provider';

// Animation constants
const SWITCH_INTERVAL = 15000; // ms between visualization switches

export function SimpleSwitcher() {
  const [activeVisualization, setActiveVisualization] = useState<'chat' | 'crm'>('chat');
  const { language } = useLanguage();

  // Reset visualization state when language changes
  useEffect(() => {
    setActiveVisualization('chat');
  }, [language]);

  // Set up the switching interval
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    let timerId: NodeJS.Timeout | null = null;
    
    // First switch after SWITCH_INTERVAL
    timerId = setTimeout(() => {
      setActiveVisualization('crm');
      
      // Then set up an interval to switch back and forth
      intervalId = setInterval(() => {
        setActiveVisualization(prev => prev === 'chat' ? 'crm' : 'chat');
      }, SWITCH_INTERVAL);
    }, SWITCH_INTERVAL);
    
    // Clean up both timers when component unmounts or language changes
    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timerId) clearTimeout(timerId);
    };
  }, [language]); // Re-initialize the timer when language changes

  return (
    <div className="relative w-full h-[500px]">
      {/* Use key prop to ensure complete unmount/remount when visualization or language changes */}
      {activeVisualization === 'chat' ? (
        <div key={`chat-${language}`} className="h-full">
          <ChatVisualization key={`chat-viz-${language}`} />
        </div>
      ) : (
        <div key={`crm-${language}`} className="h-full">
          <MinimalCrmVisualization key={`crm-viz-${language}`} />
        </div>
      )}
    </div>
  );
}