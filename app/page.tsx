import { HeroSection } from '@/components/landing/hero-section';
import { ProblemSection } from '@/components/landing/problem-section';
import { SolutionSection } from '@/components/landing/solution-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { ProcessSection } from '@/components/landing/process-section';
import { CustomSolutions } from '@/components/landing/custom-solutions';
import { FinalCTA } from '@/components/landing/final-cta';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <ProcessSection />
      <CustomSolutions />
      <FinalCTA />
    </>
  );
}