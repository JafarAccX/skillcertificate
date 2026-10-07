import React from 'react';
import { SectionEyebrow } from '../components/common/SectionEyebrow';
import { FadeIn } from '../components/common/FadeIn';
import { FeaturedProgramCard } from '../components/programs/FeaturedProgramCard';
import { ProgramCard } from '../components/programs/ProgramCard';
import { PROGRAMS } from '../data/programsAndSkills';

export const ProgramsPage: React.FC = () => {
  const [featured, ...rest] = PROGRAMS;

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 lg:px-8 lg:pt-40">
      <FadeIn>
        <SectionEyebrow>Certification paths</SectionEyebrow>
      </FadeIn>

      <FadeIn delay={0.05}>
        <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-7xl">
          Choose the role.{' '}
          <span className="block font-display font-normal italic text-muted-foreground">
            Certify the skills behind it.
          </span>
        </h1>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Every path is 12 skill certifications that unlock one role-level
          credential. Start anywhere — your progress carries across paths that
          share skills.
        </p>
      </FadeIn>

      <div className="mt-16">
        <FeaturedProgramCard program={featured} />
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((program, idx) => (
          <FadeIn key={program.slug} delay={(idx % 3) * 0.08}>
            <ProgramCard program={program} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
};
