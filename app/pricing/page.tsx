'use client';

import { PricingHero } from '@/components/pricing/hero';
import { PricingTables } from '@/components/pricing/tables';
import { PricingFAQ } from '@/components/pricing/faq';
import { PricingCTA } from '@/components/pricing/cta';

export default function Pricing() {
  return (
    <>
      <PricingHero />
      <PricingTables />
      <PricingFAQ />
      <PricingCTA />
    </>
  );
}