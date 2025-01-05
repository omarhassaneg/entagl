import { HeroSection } from '@/components/home/hero-section';
import { BenefitsSection } from '@/components/home/benefits-section';
import { FeaturesGrid } from '@/components/home/features-grid';
import { Testimonials } from '@/components/home/testimonials';
import { CTASection } from '@/components/home/cta-section';

export default function SocialMediaAutomation() {
  return (
    <>
      <HeroSection />
      <Testimonials />
      <BenefitsSection />
      <FeaturesGrid />
      <CTASection />
    </>
  );
}