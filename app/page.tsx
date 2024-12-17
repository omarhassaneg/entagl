import { HeroSection } from '@/components/home/hero-section';
import { BenefitsSection } from '@/components/home/benefits-section';
import { FeaturesGrid } from '@/components/home/features-grid';
import { SocialProof } from '@/components/home/social-proof';
import { CTASection } from '@/components/home/cta-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <SocialProof />
      <BenefitsSection />
      <FeaturesGrid />
      <CTASection />
    </>
  );
}