import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CollectionsSection } from '../components/home/CollectionsSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { InteractivePathScroll } from '../components/home/InteractivePathScroll';
import { AssessmentPreviewSection } from '../components/home/AssessmentPreviewSection';
import { AudienceCards } from '../components/home/AudienceCards';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { PricingBox } from '../components/home/PricingBox';
import { HomeFaqAccordion } from '../components/home/HomeFaqAccordion';
import { CtaSection } from '../components/home/CtaSection';

export const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <CollectionsSection />
      <HowItWorksSection />
      <InteractivePathScroll />
      <AssessmentPreviewSection />
      <AudienceCards />
      <TestimonialsSection />
      <PricingBox />
      <HomeFaqAccordion />
      <CtaSection />
    </>
  );
};
