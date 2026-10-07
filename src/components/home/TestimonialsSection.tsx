import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { FadeIn } from '../common/FadeIn';
import { TESTIMONIALS } from '../../data/programsAndSkills';
import { Testimonial } from '../../types';

const TestimonialItem: React.FC<{ t: Testimonial; large?: boolean }> = ({
  t,
  large,
}) => (
  <div className="mt-6 flex items-center gap-3">
    <img
      src={t.avatar}
      alt={`${t.name}, demo profile`}
      loading="lazy"
      className={`${
        large ? 'h-12 w-12' : 'h-9 w-9'
      } rounded-full object-cover`}
    />
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-1 text-sm font-medium">
        {t.name}
        {t.verified && <ShieldCheck className="h-3.5 w-3.5 text-brand" />}
      </div>
      <div className="text-xs text-muted-foreground">
        {t.role} · Certified in {t.skill}
      </div>
    </div>
    <div className="text-right">
      {t.result && (
        <div className="font-mono text-[11px] text-foreground">{t.result}</div>
      )}
      <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
        Demo profile
      </div>
    </div>
  </div>
);

export const TestimonialsSection: React.FC = () => {
  const primary = TESTIMONIALS[0];
  const sideTestimonials = [TESTIMONIALS[1], TESTIMONIALS[5], TESTIMONIALS[3]];

  return (
    <section className="border-y border-border bg-surface/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Testimonials · demo profiles"
          title="Proof, in their words."
          sub="Illustrative demo profiles shown until verified candidate testimonials are published."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          <FadeIn className="flex flex-col justify-between rounded-[26px] border border-border bg-surface p-8 sm:p-10">
            <p className="font-display text-3xl leading-[1.15] tracking-[-0.01em] sm:text-4xl">
              “{primary.quote}”
            </p>
            <TestimonialItem t={primary} large />
          </FadeIn>

          <div className="grid gap-5">
            {sideTestimonials.map((item, idx) => (
              <FadeIn
                key={item.id}
                delay={idx * 0.08}
                className="rounded-[22px] border border-border bg-surface p-6 transition-colors hover:border-brand/40"
              >
                <p className="text-[15px] leading-relaxed">“{item.quote}”</p>
                <TestimonialItem t={item} />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
