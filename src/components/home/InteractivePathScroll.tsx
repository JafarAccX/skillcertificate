import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { Check, Lock, Award, Unlock } from 'lucide-react';
import { SectionEyebrow } from '../common/SectionEyebrow';
import { Button } from '../common/Button';
import { getProgramBySlug, getSkillBySlug } from '../../data/programsAndSkills';

const PROGRAM_SLUG = 'ai-product-management';

export const InteractivePathScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const program = getProgramBySlug(PROGRAM_SLUG)!;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.65', 'end 0.75'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
  });

  const [activeStep, setActiveStep] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setActiveStep(Math.min(12, Math.floor(latest * 13.2)));
  });

  const isRoleUnlocked = activeStep >= 12;

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[1fr_1.1fr] lg:px-8">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <SectionEyebrow>Interactive skill path</SectionEyebrow>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
            Twelve skills.
            <br />
            <span className="font-display font-normal italic text-muted-foreground">
              One credential.
            </span>
          </h2>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">
            Scroll the path. Every certified skill fills the line — complete all twelve and the role credential unlocks.
          </p>

          <div className="mt-8 flex items-baseline gap-3">
            <span className="font-heading text-7xl font-semibold tabular-nums tracking-[-0.05em]">
              {activeStep}
            </span>
            <span className="font-mono text-sm text-muted-foreground">
              / 12 certified
            </span>
          </div>

          <div className="mt-8">
            <Button to={`/programs/${program.slug}`} variant="outline">
              Open the full path
            </Button>
          </div>
        </div>

        <div ref={containerRef} className="relative pl-2">
          <div
            className="absolute bottom-10 left-[27px] top-4 w-px bg-border"
            aria-hidden="true"
          />
          <motion.div
            style={{ scaleY: smoothProgress }}
            className="absolute bottom-10 left-[27px] top-4 w-px origin-top bg-gradient-to-b from-success via-brand to-brand-2"
            aria-hidden="true"
          />

          <ol className="space-y-3">
            {program.skills.map((skillSlug, index) => {
              const isDone = index < activeStep;
              const skill = getSkillBySlug(skillSlug);

              return (
                <li key={skillSlug}>
                  <Link
                    to={`/skills/${skillSlug}`}
                    className={`flex items-center gap-4 rounded-2xl border px-3 py-3 transition-all duration-500 ${
                      isDone
                        ? 'border-border bg-surface shadow-soft'
                        : 'border-transparent'
                    }`}
                  >
                    <span
                      className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-500 ${
                        isDone
                          ? 'border-success/50 bg-success/15 text-success'
                          : 'border-border bg-background text-locked'
                      }`}
                    >
                      {isDone ? (
                        <Check className="h-4 w-4" strokeWidth={2.5} />
                      ) : (
                        <Lock className="h-3.5 w-3.5" />
                      )}
                    </span>

                    <span className="w-6 font-mono text-xs text-muted-foreground">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span
                      className={`text-[15px] font-medium transition-colors duration-500 ${
                        isDone ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {skill?.name}
                    </span>

                    {isDone && (
                      <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-success">
                        Certified
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ol>

          <div
            className={`relative mt-5 flex items-center gap-4 rounded-2xl border p-4 transition-all duration-700 ${
              isRoleUnlocked
                ? 'border-brand/50 bg-brand/10 glow-brand'
                : 'border-dashed border-border bg-surface-2/50'
            }`}
          >
            <span
              className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-700 ${
                isRoleUnlocked
                  ? 'border-brand bg-brand text-brand-foreground'
                  : 'border-border bg-background text-locked'
              }`}
            >
              {isRoleUnlocked ? (
                <Unlock className="h-5 w-5" />
              ) : (
                <Award className="h-4 w-4" />
              )}
            </span>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Role certification
              </div>
              <div className="text-lg font-semibold tracking-tight">
                {program.role}
              </div>
            </div>
            <span
              className={`ml-auto font-mono text-[11px] uppercase tracking-[0.14em] ${
                isRoleUnlocked ? 'text-brand' : 'text-muted-foreground'
              }`}
            >
              {isRoleUnlocked ? 'Unlocked' : 'Locked'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
