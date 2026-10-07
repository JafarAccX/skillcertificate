import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, X, Award, ArrowRight } from 'lucide-react';
import { SectionEyebrow } from '../components/common/SectionEyebrow';
import { Button } from '../components/common/Button';
import { getSkillBySlug, getProgramBySlug } from '../data/programsAndSkills';
import { useProgress } from '../context/ProgressContext';

const AnimatedCounter: React.FC<{ to: number; suffix?: string; delay?: number }> = ({
  to,
  suffix = '',
  delay = 0,
}) => {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = to / steps;

    const timeout = setTimeout(() => {
      const timer = setInterval(() => {
        start += increment;
        if (start >= to) {
          setVal(to);
          clearInterval(timer);
        } else {
          setVal(Math.round(start));
        }
      }, stepTime);
      return () => clearInterval(timer);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [to, delay]);

  return (
    <span className="tabular-nums">
      {val}
      {suffix}
    </span>
  );
};

export const AssessmentResultPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const skill = getSkillBySlug(slug);
  const { state } = useProgress();

  if (!skill) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 pt-24 text-center">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          404
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
          Skill not found
        </h1>
        <Button to="/skills" className="mt-8">
          See all skills
        </Button>
      </div>
    );
  }

  const attempt = state.attempts[skill.slug];

  if (!attempt) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 pt-24 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">No attempt yet</h1>
        <p className="mt-3 text-muted-foreground">
          You haven't completed the {skill.name} assessment.
        </p>
        <Button to={`/skills/${skill.slug}`} className="mt-8">
          Go to skill
        </Button>
      </div>
    );
  }

  const passed = attempt.passed;
  const program = getProgramBySlug(skill.programs[0]);
  const completedInProg = program
    ? program.skills.filter((s) => state.certified[s]).length
    : 0;
  const nextSkillSlug = program?.skills.find((s) => !state.certified[s]);
  const nextSkill = nextSkillSlug ? getSkillBySlug(nextSkillSlug) : null;

  const breakdownItems: [string, string, string][] = [
    ['knowledge', 'Knowledge', 'KNOW'],
    ['reasoning', 'Reasoning', 'THINK'],
    ['interview', 'Interview', 'DEFEND'],
    ['practical', 'Practical', 'BUILD'],
  ];

  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-28 lg:pt-36">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <SectionEyebrow>
          Skill certification result{attempt.simulated ? ' · simulated demo' : ''}
        </SectionEyebrow>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
          {skill.name}
        </h1>
      </motion.div>

      <div className="mt-10 grid gap-5 md:grid-cols-[1fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={`rounded-[26px] border p-8 ${
            passed
              ? 'border-success/40 bg-success/10'
              : 'border-border bg-surface'
          }`}
        >
          <div
            className={`flex items-center gap-2 font-mono text-sm tracking-[0.16em] ${
              passed ? 'text-success' : 'text-warning'
            }`}
          >
            {passed ? (
              <Check className="h-4 w-4" strokeWidth={3} />
            ) : (
              <X className="h-4 w-4" />
            )}{' '}
            {passed ? 'CERTIFIED' : 'NOT YET CERTIFIED'}
          </div>

          <div className="mt-6 font-heading text-8xl font-semibold tracking-[-0.06em]">
            <AnimatedCounter to={attempt.score} suffix="%" delay={0.3} />
          </div>

          <div className="mt-2 font-mono text-xs text-muted-foreground">
            Pass standard {skill.passScore}%
          </div>
        </motion.div>

        {/* Breakdown bars */}
        <div className="rounded-[26px] border border-border bg-surface p-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Breakdown
          </div>
          <div className="mt-6 space-y-5">
            {breakdownItems.map(([key, label, code], idx) => {
              const score = (attempt.breakdown as any)[key] || 0;
              return (
                <div key={key}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium">
                      {label}{' '}
                      <span className="ml-1 font-mono text-[10px] text-muted-foreground">
                        {code}
                      </span>
                    </span>
                    <span className="font-mono text-sm">
                      <AnimatedCounter
                        to={score}
                        suffix="%"
                        delay={0.5 + idx * 0.15}
                      />
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{
                        delay: 0.5 + idx * 0.15,
                        duration: 1.2,
                        ease: [0.2, 0.7, 0.2, 1],
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-brand to-brand-2"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Certificate generation banner */}
      {passed && attempt.certId ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7 }}
          className="light-sweep sweep-now mt-5 flex flex-col gap-5 rounded-[26px] border border-border bg-surface p-7 sm:flex-row sm:items-center"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/15 text-brand">
            <Award className="h-6 w-6" />
          </span>
          <div className="flex-1">
            <div className="text-lg font-semibold tracking-tight">
              Certificate generated
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              {attempt.certId}
            </div>
          </div>
          <Button to={`/certificate/${attempt.certId}`}>
            View certificate
          </Button>
        </motion.div>
      ) : (
        <div className="mt-5 flex flex-col gap-4 rounded-[26px] border border-border bg-surface p-7 sm:flex-row sm:items-center">
          <p className="flex-1 text-muted-foreground">
            You didn't meet the standard this time. Focus on your lowest-scoring
            stage and retake when ready.
          </p>
          <Button to={`/assessment/${skill.slug}`}>Retake</Button>
        </div>
      )}

      {/* Program Progression link */}
      {program && (
        <Link
          to={`/programs/${program.slug}`}
          className="group mt-5 flex items-center gap-5 rounded-[26px] border border-border p-7 transition-colors hover:bg-surface"
        >
          <div className="flex-1">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {program.role} path
            </div>
            <div className="mt-1 text-lg font-semibold tracking-tight">
              {completedInProg} / 12 skills certified
              {nextSkill
                ? ` · Next: ${nextSkill.name}`
                : ' · Role credential ready'}
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-surface-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(completedInProg / 12) * 100}%` }}
                transition={{ delay: 1.8, duration: 1 }}
                className="h-full rounded-full bg-gradient-to-r from-brand to-brand-2"
              />
            </div>
          </div>
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
};
