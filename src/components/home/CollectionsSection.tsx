import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { FadeIn } from '../common/FadeIn';
import { FeaturedProgramCard } from '../programs/FeaturedProgramCard';
import { ProgramCard } from '../programs/ProgramCard';
import { PROGRAMS } from '../../data/programsAndSkills';

const GRID_SPANS = [
  'lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-5',
  'lg:col-span-7',
  'lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-4',
];

export const CollectionsSection: React.FC = () => {
  const [featured, ...rest] = PROGRAMS;

  return (
    <section id="collections" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Certification collections"
          title="Build proof for the role you want."
          sub="Choose a certification path and build verified proof one skill at a time."
        />

        <div className="mt-14">
          <FeaturedProgramCard program={featured} />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
          {rest.map((program, idx) => (
            <FadeIn
              key={program.slug}
              delay={(idx % 3) * 0.08}
              className={GRID_SPANS[idx] || 'lg:col-span-6'}
            >
              <ProgramCard program={program} tall={idx < 6} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
