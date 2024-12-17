'use client';

import { HeroFeatures } from '@/components/features/hero-features';
import { ServiceFeatures } from '@/components/features/service-features';
import { UseCases } from '@/components/features/use-cases';
import { EmotionalBenefits } from '@/components/features/emotional-benefits';
import { FeaturesCTA } from '@/components/features/features-cta';

export default function Features() {
  return (
    <>
      <HeroFeatures />
      <ServiceFeatures />
      <EmotionalBenefits />
      <UseCases />
      <FeaturesCTA />
    </>
  );
}