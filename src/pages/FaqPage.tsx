import React from 'react';
import { SectionEyebrow } from '../components/common/SectionEyebrow';
import { FadeIn } from '../components/common/FadeIn';
import { HomeFaqAccordion } from '../components/home/HomeFaqAccordion';
import { CtaSection } from '../components/home/CtaSection';

export const FaqPage: React.FC = () => {
  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pt-32 lg:px-8 lg:pt-40">
        <FadeIn>
          <SectionEyebrow>FAQ</SectionEyebrow>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.045em] sm:text-7xl">
            Questions, answered.
          </h1>
        </FadeIn>
      </div>

      <HomeFaqAccordion showHeading={false} />
      <CtaSection />
    </>
  );
};
