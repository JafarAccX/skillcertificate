import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';

const STEPS = [
  {
    n: '01',
    title: 'Choose a path',
    body: 'Choose the role or career area you want to build proof for.',
  },
  {
    n: '02',
    title: 'Certify your skills',
    body: 'Complete individual skill assessments — knowledge, reasoning, interview and a practical build.',
  },
  {
    n: '03',
    title: 'Build your progress',
    body: 'Each certification moves you closer to your role credential.',
  },
  {
    n: '04',
    title: 'Unlock the role',
    body: 'Complete the required skills and unlock the final role-level certification.',
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="border-y border-border bg-surface/50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="How the system works"
          title="Four steps from skill to role."
        />

        <div className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <motion.div
            className="absolute left-0 right-0 top-[27px] hidden h-px origin-left bg-gradient-to-r from-brand via-brand-2 to-border lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1] }}
          />

          {STEPS.map((step, idx) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.2 + idx * 0.18 }}
              className="relative"
            >
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background font-mono text-sm shadow-soft">
                {step.n}
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
