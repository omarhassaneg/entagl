import { HeroSection } from '@/components/home/hero-section';
import { BenefitsSection } from '@/components/home/benefits-section';
import { FeaturesGrid } from '@/components/home/features-grid';
import { SocialProof } from '@/components/home/social-proof';
import { Testimonials } from '@/components/home/testimonials';
import { CTASection } from '@/components/home/cta-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <Testimonials />
      <SocialProof />
      <BenefitsSection />
      <FeaturesGrid />
      <CTASection />
    </>
  );
}