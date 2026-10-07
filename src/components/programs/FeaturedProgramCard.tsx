import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Award, Lock } from 'lucide-react';
import { Program } from '../../types';
import { useProgress } from '../../context/ProgressContext';
import { getSkillBySlug } from '../../data/programsAndSkills';
import { Button } from '../common/Button';

interface FeaturedProgramCardProps {
  program: Program;
}

export const FeaturedProgramCard: React.FC<FeaturedProgramCardProps> = ({
  program,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-40, 40]
  );

  const { state } = useProgress();
  const certifiedCount = program.skills.filter((s) => state.certified[s]).length;

  return (
    <div
      ref={containerRef}
      className="group relative grid overflow-hidden rounded-[30px] border border-border bg-surface lg:grid-cols-[1.1fr_1fr]"
    >
      <div className="relative h-[320px] overflow-hidden lg:h-auto lg:min-h-[560px]">
        <motion.div
          style={{ y: parallaxY }}
          className="absolute inset-[-60px]"
        >
          <img
            src={program.image}
            alt="AI product manager mapping a product flow"
            className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-surface" />
        <div className="absolute bottom-5 left-5 rounded-full border border-border bg-surface/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] backdrop-blur-md">
          Most chosen path
        </div>
      </div>

      <div className="relative flex flex-col p-7 sm:p-10">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          12 skill certifications · 1 role credential
        </div>
        <h3 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
          {program.name}
        </h3>
        <p className="mt-4 max-w-md text-muted-foreground">
          {program.description}
        </p>

        <ol className="mt-7 grid grid-cols-2 gap-x-6 gap-y-2">
          {program.skills.map((skillSlug, index) => {
            const skill = getSkillBySlug(skillSlug);
            const isCert = !!state.certified[skillSlug];
            return (
              <li key={skillSlug} className="flex items-center gap-2 text-[13px]">
                <span className="w-5 font-mono text-[10px] text-muted-foreground">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  className={
                    isCert
                      ? 'text-success'
                      : index === certifiedCount
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }
                >
                  {skill?.name}
                </span>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 flex items-center gap-3">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-surface-3">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{
                width: `${Math.max((certifiedCount / 12) * 100, 2)}%`,
              }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="h-full rounded-full bg-gradient-to-r from-brand to-brand-2"
            />
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            {certifiedCount} / 12 complete
          </span>
        </div>

        <div className="mt-auto flex flex-col gap-5 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-2">
              <Award className="h-4 w-4 text-brand" />
            </span>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Final credential
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium">
                {program.role} <Lock className="h-3 w-3 text-muted-foreground" />
              </div>
            </div>
          </div>
          <Button to={`/programs/${program.slug}`}>Explore path</Button>
        </div>
      </div>

      <Link
        to={`/programs/${program.slug}`}
        className="absolute inset-0 lg:hidden"
        aria-label={`Explore ${program.name}`}
      />
    </div>
  );
};
