import React from 'react';
import { motion } from 'framer-motion';
import { SectionEyebrow } from '../common/SectionEyebrow';
import { Button } from '../common/Button';
import { HeroProgressionWidget } from './HeroProgressionWidget';
import { LiveTestimonialsStream } from './LiveTestimonialsStream';
import { HeroStats } from './HeroStats';

const ease = [0.2, 0.7, 0.2, 1];
const fadeAnim = (delay: number) => ({
  initial: { opacity: 0, y: 18, filter: 'blur(10px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.9, delay, ease },
});

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-grid mask-radial opacity-70" />
        <div className="absolute left-1/2 top-[-20%] h-[640px] w-[900px] -translate-x-1/2 rounded-full bg-brand/10 blur-[120px]" />
      </motion.div>

      <div className="relative mx-auto grid max-w-[1320px] gap-14 px-5 pb-20 lg:px-8 xl:grid-cols-[0.82fr_1.18fr] xl:gap-10">
        <div className="xl:pt-10">
          <motion.div {...fadeAnim(0.2)}>
            <SectionEyebrow>AcceleratorX Skill Certificates</SectionEyebrow>
          </motion.div>

          <motion.h1
            {...fadeAnim(0.32)}
            className="mt-6 text-balance font-heading text-[44px] font-semibold leading-[0.95] tracking-[-0.045em] sm:text-7xl xl:text-[76px]"
          >
            Get certified.{' '}
            <span className="block font-display text-[1.06em] font-normal italic tracking-[-0.02em] text-muted-foreground">
              Without taking
            </span>{' '}
            <span className="block">another course.</span>
          </motion.h1>

          <motion.p
            {...fadeAnim(0.46)}
            className="mt-7 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            Already know the skill? Get assessed, scored, and certified in just a
            few hours — without sitting through another course.
          </motion.p>

          <motion.div
            {...fadeAnim(0.58)}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button to="/skills/product-discovery" size="lg">
              Get Certified
            </Button>
            <Button to="/programs" size="lg" variant="outline" arrow={false}>
              Explore certification paths
            </Button>
          </motion.div>

          <motion.p
            {...fadeAnim(0.68)}
            className="mt-6 font-mono text-xs text-muted-foreground"
          >
            ₹499 + GST <span className="mx-2 opacity-40">·</span> No course
            required <span className="mx-2 opacity-40">·</span> Skill-based
            assessment
          </motion.p>
        </div>

        <div className="grid gap-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <motion.div {...fadeAnim(0.8)}>
            <HeroProgressionWidget />
          </motion.div>

          <div className="flex flex-col gap-5">
            <motion.div {...fadeAnim(1.25)} className="order-2 md:order-1">
              <LiveTestimonialsStream />
            </motion.div>
            <motion.div {...fadeAnim(1.45)} className="order-1 md:order-2">
              <HeroStats />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
