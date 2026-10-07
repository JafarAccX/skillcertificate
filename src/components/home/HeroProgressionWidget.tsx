import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Lock, Award } from 'lucide-react';
import { getProgramBySlug, getSkillBySlug } from '../../data/programsAndSkills';

const DEMO_PROGRAM_SLUG = 'ai-product-management';
const MAX_DEMO_STEPS = 3;

export const HeroProgressionWidget: React.FC = () => {
  const [completedSteps, setCompletedSteps] = useState(0);
  const program = getProgramBySlug(DEMO_PROGRAM_SLUG)!;

  useEffect(() => {
    let count = 0;
    const interval = setTimeout(function step() {
      count += 1;
      setCompletedSteps(count);
      if (count < MAX_DEMO_STEPS) {
        setTimeout(step, 650);
      }
    }, 1900);
    return () => clearTimeout(interval);
  }, []);

  const percent = Math.round((completedSteps / 12) * 100);

  return (
    <Link
      to={`/programs/${program.slug}`}
      className="group block rounded-[22px] border border-border bg-surface p-5 shadow-lift transition-transform duration-500 hover:-translate-y-1"
      aria-label="Open the AI Product Management path"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Certification path
          </div>
          <div className="mt-1.5 text-[17px] font-semibold tracking-tight">
            AI Product Management
          </div>
          <div className="text-xs text-muted-foreground">
            12 skill certifications
          </div>
        </div>
        <span className="rounded-full border border-border bg-surface-2 px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
          DEMO
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between font-mono text-[11px]">
        <span className="text-foreground">{completedSteps} / 12 complete</span>
        <span className="text-muted-foreground">{percent}%</span>
      </div>

      <div className="mt-2 h-1 overflow-hidden rounded-full bg-surface-3">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand to-brand-2"
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.6 }}
        />
      </div>

      <ol className="relative mt-5">
        <span
          className="absolute left-[9px] top-2 bottom-2 w-px bg-border"
          aria-hidden="true"
        />
        <motion.span
          className="absolute left-[9px] top-2 w-px bg-success"
          animate={{ height: `${(completedSteps / 13) * 100}%` }}
          transition={{ duration: 0.6 }}
          aria-hidden="true"
        />

        {program.skills.map((skillSlug, index) => {
          const status =
            index < completedSteps
              ? 'done'
              : index === completedSteps
              ? 'next'
              : 'locked';
          const skill = getSkillBySlug(skillSlug);

          return (
            <motion.li
              key={skillSlug}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.05 }}
              className="relative flex items-center gap-3 py-[5px]"
            >
              {status === 'done' ? (
                <span className="relative z-10 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-success text-background">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
              ) : status === 'next' ? (
                <span className="relative z-10 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-brand bg-surface glow-brand">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                </span>
              ) : (
                <span className="relative z-10 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-border bg-surface text-locked">
                  <Lock className="h-2 w-2" />
                </span>
              )}

              <span className="w-5 font-mono text-[10px] text-muted-foreground">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span
                className={`truncate text-[13px] ${
                  status === 'locked'
                    ? 'text-muted-foreground/70'
                    : 'text-foreground'
                }`}
              >
                {skill?.name}
              </span>

              {status === 'next' && (
                <span className="ml-auto rounded-full bg-brand/15 px-2 py-0.5 font-mono text-[9px] text-brand">
                  NEXT
                </span>
              )}
            </motion.li>
          );
        })}

        <li className="relative mt-2 flex items-center gap-3 rounded-xl border border-dashed border-border bg-surface-2/60 px-2 py-2.5">
          <span className="relative z-10 flex h-[18px] w-[18px] items-center justify-center rounded-[5px] border border-border bg-surface text-locked">
            <Award className="h-2.5 w-2.5" />
          </span>
          <span className="text-[13px] font-medium">AI Product Manager</span>
          <span className="ml-auto mr-1 flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
            <Lock className="h-3 w-3" /> Locked
          </span>
        </li>
      </ol>
    </Link>
  );
};
