import React from 'react';
import { SectionEyebrow } from '../components/common/SectionEyebrow';
import { FadeIn } from '../components/common/FadeIn';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { InteractivePathScroll } from '../components/home/InteractivePathScroll';
import { CtaSection } from '../components/home/CtaSection';
import { STAGES } from '../data/programsAndSkills';

export const HowItWorksPage: React.FC = () => {
  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-32 lg:px-8 lg:pt-40">
        <FadeIn>
          <SectionEyebrow>How it works</SectionEyebrow>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-7xl">
            From one skill{' '}
            <span className="block font-display font-normal italic text-muted-foreground">
              to a role credential.
            </span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            No course. No lectures. You're assessed on what you already know —
            then each certificate moves you closer to a role-level credential.
          </p>
        </FadeIn>
      </div>

      <HowItWorksSection />

      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <FadeIn>
          <SectionEyebrow>Every skill assessment</SectionEyebrow>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
            Know. Think. Defend. Build.
          </h2>
        </FadeIn>

        <div className="mt-8 max-w-4xl">
          <ol className="grid gap-3 sm:grid-cols-2">
            {STAGES.map((st, idx) => (
              <FadeIn
                key={st.id}
                delay={idx * 0.08}
                className="group rounded-[22px] border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {st.duration}
                  </span>
                </div>
                <div className="mt-6 font-heading text-3xl font-semibold tracking-[-0.03em]">
                  {st.type}
                </div>
                <div className="mt-1 text-sm font-medium text-brand">
                  {st.title}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {st.description}
                </p>
              </FadeIn>
            ))}
          </ol>
        </div>
      </div>

      <InteractivePathScroll />
      <CtaSection />
    </>
  );
};
