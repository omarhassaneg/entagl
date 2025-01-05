'use client';

import { HeroFeatures } from '@/components/features/hero-features';
import { AIFeatures } from '@/components/features/ai-features';
import { MultiChannelFeatures } from '@/components/features/multichannel-features';
import { SmartFeatures } from '@/components/features/smart-features';
import { TeamFeatures } from '@/components/features/team-features';
import { BusinessFeatures } from '@/components/features/business-features';
import { FeaturesCTA } from '@/components/features/features-cta';
import { JourneyVisualization } from '@/components/features/journey-visualization';

export default function Features() {
  return (
    <>
      <HeroFeatures />
      <AIFeatures />
      <JourneyVisualization />
      <MultiChannelFeatures />
      <SmartFeatures />
      <TeamFeatures />
      <BusinessFeatures />
      <FeaturesCTA />
    </>
  );
}