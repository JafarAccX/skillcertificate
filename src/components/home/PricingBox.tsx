import React from 'react';
import { Check } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { FadeIn } from '../common/FadeIn';
import { Button } from '../common/Button';

const PRICING_INCLUSIONS = [
  'MCQs',
  'Descriptive assessment',
  'AI interview',
  'Practical assignment',
  'Evaluation',
  'Skill certificate if the required standard is met',
];

export const PricingBox: React.FC = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <SectionHeader
          eyebrow="Pricing"
          title="Certify one skill."
          sub="Pricing is per individual skill certification attempt. The role-level credential unlocks when you complete all the required skill certifications in a path."
        />

        <FadeIn
          delay={0.1}
          className="light-sweep relative rounded-[30px] border border-border bg-surface p-8 shadow-lift sm:p-10"
        >
          <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            One skill certification attempt
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-heading text-7xl font-semibold tracking-[-0.05em]">
              ₹499
            </span>
            <span className="text-muted-foreground">+ GST</span>
          </div>

          <ul className="mt-8 space-y-3">
            {PRICING_INCLUSIONS.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[15px]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/15 text-success">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <Button to="/skills" size="lg" className="mt-9 w-full">
            Get Certified
          </Button>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            An assessment and certification attempt — not a course.
          </p>
        </FadeIn>
      </div>
    </section>
  );
};
