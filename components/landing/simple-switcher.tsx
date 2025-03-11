'use client';

import { useState, useEffect } from 'react';
import { ChatVisualization } from './chat-visualization';
import { MinimalCrmVisualization } from './minimal-crm';

// Animation constants
const SWITCH_INTERVAL = 15000; // ms between visualization switches

export function SimpleSwitcher() {
  const [activeVisualization, setActiveVisualization] = useState<'chat' | 'crm'>('chat');

  // Set up the switching interval
  useEffect(() => {
    // First switch after SWITCH_INTERVAL
    const timer = setTimeout(() => {
      setActiveVisualization('crm');
      
      // Then set up an interval to switch back and forth
      const interval = setInterval(() => {
        setActiveVisualization(prev => prev === 'chat' ? 'crm' : 'chat');
      }, SWITCH_INTERVAL);
      
      // Clean up the interval when component unmounts
      return () => clearInterval(interval);
    }, SWITCH_INTERVAL);
    
    // Clean up the initial timer if component unmounts before it fires
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-[500px]">
      {/* Simple display without animations */}
      <div style={{ display: activeVisualization === 'chat' ? 'block' : 'none' }} className="h-full">
        <ChatVisualization />
      </div>
      
      <div style={{ display: activeVisualization === 'crm' ? 'block' : 'none' }} className="h-full">
        <MinimalCrmVisualization />
      </div>
    </div>
  );
}