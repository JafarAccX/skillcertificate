import React from 'react';
import { FadeIn } from '../common/FadeIn';
import { Button } from '../common/Button';

export const CtaSection: React.FC = () => {
  return (
    <section className="px-5 pb-24 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[34px] border border-border bg-surface px-6 py-20 text-center sm:py-28">
        <div
          className="pointer-events-none absolute inset-0 bg-grid mask-radial opacity-60"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-1/2 top-full h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-[100px]"
          aria-hidden="true"
        />

        <FadeIn className="relative">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Already know the skill?
          </p>
          <h2 className="mx-auto mt-6 max-w-4xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-7xl">
            Don't take another course.{' '}
            <span className="block font-display font-normal italic text-muted-foreground">
              Get certified.
            </span>
          </h2>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/skills" size="lg">
              Get Certified
            </Button>
            <Button to="/programs" size="lg" variant="outline" arrow={false}>
              Explore certification paths
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
