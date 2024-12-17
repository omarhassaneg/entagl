import { HeroSection } from '@/components/home/hero-section';
import { BenefitsSection } from '@/components/home/benefits-section';
import { ServicesOverview } from '@/components/home/services-overview';
import { CTASection } from '@/components/home/cta-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <ServicesOverview />
      <CTASection />
    </>
  );
}