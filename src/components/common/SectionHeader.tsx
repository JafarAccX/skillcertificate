import React from 'react';
import { SectionEyebrow } from './SectionEyebrow';
import { FadeIn } from './FadeIn';

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  sub,
  align = 'left',
  className = '',
}) => {
  const isCenter = align === 'center';
  return (
    <div
      className={`${isCenter ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}
    >
      {eyebrow && (
        <FadeIn>
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
        </FadeIn>
      )}
      <FadeIn delay={0.05}>
        <h2 className="mt-5 text-balance font-heading text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </FadeIn>
      {sub && (
        <FadeIn delay={0.12}>
          <p
            className={`mt-5 text-pretty text-lg leading-relaxed text-muted-foreground ${
              isCenter ? 'mx-auto' : ''
            } max-w-xl`}
          >
            {sub}
          </p>
        </FadeIn>
      )}
    </div>
  );
};
