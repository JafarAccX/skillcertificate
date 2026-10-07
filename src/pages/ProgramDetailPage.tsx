import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Award, Lock, Play, RotateCcw, Check } from 'lucide-react';
import { SectionEyebrow } from '../components/common/SectionEyebrow';
import { Button } from '../components/common/Button';
import { SkillCard } from '../components/skills/SkillCard';
import { getProgramBySlug, getSkillBySlug } from '../data/programsAndSkills';
import { useProgress } from '../context/ProgressContext';
import { Program, SkillStatus } from '../types';

// Unlocked celebration modal
const RoleUnlockedModal: React.FC<{
  program: Program;
  roleCertId: string;
  onClose: () => void;
}> = ({ program, roleCertId, onClose }) => {
  const [animStage, setAnimStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setAnimStage(1), 1200);
    const t2 = setTimeout(() => setAnimStage(2), 2300);
    const t3 = setTimeout(() => setAnimStage(3), 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/85 p-5 backdrop-blur-xl"
      role="dialog"
      aria-label="Role certification unlocked"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[120px]" />

      <div className="relative w-full max-w-md text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-sm tracking-[0.18em] text-success flex items-center justify-center gap-1"
        >
          <Check className="h-4 w-4" /> 12 / 12 COMPLETE
        </motion.div>

        <div className="relative mx-auto mt-8 flex h-[260px] items-center justify-center">
          <AnimatePresence>
            {animStage < 2 && (
              <motion.div
                key="lock"
                exit={{ opacity: 0, scale: 0.4, rotate: 20 }}
                animate={
                  animStage === 1
                    ? { rotate: [0, -12, 12, -8, 0] }
                    : {}
                }
                transition={{ duration: 0.6 }}
                className="flex h-24 w-24 items-center justify-center rounded-3xl border border-border bg-surface text-locked"
              >
                <Lock className="h-9 w-9" />
              </motion.div>
            )}
          </AnimatePresence>

          {animStage >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 90, damping: 14 }}
              className="light-sweep sweep-now absolute inset-x-4 rounded-[22px] border border-brand/40 bg-surface p-6 text-left shadow-lift"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  AcceleratorX · Role certification
                </span>
                <Award className="h-5 w-5 text-brand" />
              </div>
              <div className="mt-6 text-3xl font-semibold tracking-[-0.03em]">
                {program.role}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                Based on 12 verified skill certifications
              </div>
              <div className="mt-6 font-mono text-[11px] text-muted-foreground">
                {roleCertId}
              </div>
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {animStage === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-semibold tracking-[-0.03em]">
                Role certification unlocked
              </h2>
              <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
                <Button to={`/certificate/${roleCertId}`}>
                  View certificate
                </Button>
                <Button onClick={onClose} variant="outline" arrow={false}>
                  Back to path
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>,
    document.body
  );
};

export const ProgramDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const program = getProgramBySlug(slug);
  const {
    state,
    getProgramStatuses,
    simulateNext,
    resetProgram,
    unlockRoleCertificate,
  } = useProgress();

  const [modalOpen, setModalOpen] = useState(false);

  if (!program) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 pt-24 text-center">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          404
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
          Path not found
        </h1>
        <p className="mt-3 text-muted-foreground">
          We couldn't find what you were looking for.
        </p>
        <Button to="/programs" className="mt-8">
          See all paths
        </Button>
      </div>
    );
  }

  const statuses: SkillStatus[] = getProgramStatuses(program.slug);
  const certifiedCount = statuses.filter((s) => s === 'certified').length;
  const isComplete = certifiedCount === program.skills.length;
  const existingRoleCertId = state.roleCerts[program.slug];

  useEffect(() => {
    if (isComplete && !existingRoleCertId) {
      const generated = unlockRoleCertificate(program.slug);
      const timer = setTimeout(() => setModalOpen(true), 900);
      return () => clearTimeout(timer);
    }
  }, [isComplete, existingRoleCertId, program.slug]);

  const percent = Math.round((certifiedCount / program.skills.length) * 100);
  const nextSkillIndex = statuses.findIndex((s) => s !== 'certified');
  const nextSkill =
    nextSkillIndex >= 0 ? getSkillBySlug(program.skills[nextSkillIndex]) : null;

  const circumference = 2 * Math.PI * 52;
  const strokeDashoffset = circumference - (circumference * percent) / 100;

  const lineProgressFraction =
    nextSkillIndex === -1 ? 1 : nextSkillIndex / program.skills.length;

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-28 lg:px-8 lg:pt-36">
      <Link
        to="/programs"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All paths
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8 }}
        className="mt-8 max-w-4xl"
      >
        <SectionEyebrow>
          12 skill certifications · One role-level credential
        </SectionEyebrow>
        <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.045em] sm:text-7xl">
          {program.name}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Complete the required skill certifications to unlock the{' '}
          <span className="text-foreground font-medium">{program.role}</span>{' '}
          credential.
        </p>
      </motion.div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[360px_1fr] lg:gap-16">
        {/* Sticky Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-[26px] border border-border bg-surface p-6 shadow-soft">
            <div className="flex items-center gap-5">
              <div className="relative h-[124px] w-[124px] shrink-0">
                <svg viewBox="0 0 124 124" className="h-full w-full -rotate-90">
                  <circle
                    cx="62"
                    cy="62"
                    r={52}
                    fill="none"
                    stroke="hsl(var(--surface-3))"
                    strokeWidth="6"
                  />
                  <motion.circle
                    cx="62"
                    cy="62"
                    r={52}
                    fill="none"
                    stroke="url(#ringGrad)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
                  />
                  <defs>
                    <linearGradient id="ringGrad">
                      <stop offset="0%" stopColor="hsl(var(--brand))" />
                      <stop offset="100%" stopColor="hsl(var(--brand-2))" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-heading text-3xl font-semibold tabular-nums tracking-[-0.04em]">
                    {percent}%
                  </span>
                </div>
              </div>

              <div>
                <div className="font-heading text-2xl font-semibold tracking-tight">
                  {certifiedCount} / 12
                </div>
                <div className="text-sm text-muted-foreground">
                  skills certified
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {12 - certifiedCount} to {program.role}
                </div>
              </div>
            </div>

            {nextSkill ? (
              <div className="mt-6 border-t border-border pt-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Up next
                </div>
                <div className="mt-1 text-lg font-semibold tracking-tight">
                  {nextSkill.name}
                </div>
                <Button to={`/skills/${nextSkill.slug}`} className="mt-4 w-full">
                  Get certified
                </Button>
              </div>
            ) : (
              <div className="mt-6 border-t border-border pt-5">
                <div className="text-lg font-semibold tracking-tight text-success flex items-center gap-2">
                  <Check className="h-5 w-5" /> Path complete
                </div>
                {existingRoleCertId && (
                  <Button
                    to={`/certificate/${existingRoleCertId}`}
                    className="mt-4 w-full"
                  >
                    View role certificate
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Demo Controls */}
          <div className="mt-4 rounded-[20px] border border-dashed border-border p-5">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              <Play className="h-3.5 w-3.5" /> Demo controls
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Preview the progression without taking every assessment. Simulated certifications are marked as demo.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => simulateNext(program.slug)}
                disabled={!nextSkill}
                className="flex-1 rounded-full border border-border bg-surface-2 px-3 py-2 text-xs font-medium transition-colors hover:bg-surface-3 disabled:opacity-40"
              >
                Simulate next
              </button>
              <button
                onClick={() => resetProgram(program.slug)}
                disabled={certifiedCount === 0}
                className="flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
                aria-label="Reset path progress"
              >
                <RotateCcw className="h-3 w-3" /> Reset
              </button>
            </div>
          </div>
        </aside>

        {/* Skill Timeline */}
        <section aria-label={`${program.name} skill path`} className="relative">
          <div
            className="absolute bottom-16 left-[21px] top-6 w-px bg-border sm:left-[25px]"
            aria-hidden="true"
          />
          <motion.div
            className="absolute left-[21px] top-6 w-px bg-gradient-to-b from-success via-brand to-brand-2 sm:left-[25px]"
            initial={{ height: 0 }}
            animate={{
              height: `calc((100% - 88px) * ${lineProgressFraction})`,
            }}
            transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
            aria-hidden="true"
          />

          <ol className="space-y-1.5">
            {program.skills.map((skillSlug, idx) => (
              <motion.li
                key={skillSlug}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(idx, 6) * 0.05, duration: 0.5 }}
              >
                <SkillCard
                  skill={getSkillBySlug(skillSlug)!}
                  index={idx}
                  status={statuses[idx]}
                  celebrate={modalOpen || !!existingRoleCertId}
                />
              </motion.li>
            ))}
          </ol>

          {/* Role Certification Tile */}
          <div className="mt-4">
            {existingRoleCertId ? (
              <Link
                to={`/certificate/${existingRoleCertId}`}
                className="relative block overflow-hidden rounded-[22px] border border-brand/50 bg-brand/10 p-5 glow-brand light-sweep sweep-now transition-transform hover:-translate-y-0.5"
                aria-label="View role certificate"
              >
                <div className="flex items-center gap-4">
                  <span className="relative z-10 flex h-11 w-11 shrink-0 rotate-45 items-center justify-center rounded-xl border border-brand bg-brand text-brand-foreground sm:h-[52px] sm:w-[52px]">
                    <Award className="h-5 w-5 -rotate-45" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      Role certification
                    </div>
                    <div className="text-xl font-semibold tracking-tight">
                      {program.role}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand">
                      Unlocked
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-brand" />
                </div>
              </Link>
            ) : (
              <div
                className={`relative overflow-hidden rounded-[22px] border border-dashed border-border bg-surface-2/50 p-5`}
              >
                <div className="flex items-center gap-4">
                  <span className="relative z-10 flex h-11 w-11 shrink-0 rotate-45 items-center justify-center rounded-xl border border-border bg-background text-locked sm:h-[52px] sm:w-[52px]">
                    <Lock className={`h-4 w-4 -rotate-45 ${isComplete ? 'animate-pulse' : ''}`} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      Role certification
                    </div>
                    <div className="text-xl font-semibold tracking-tight">
                      {program.role}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      {isComplete
                        ? 'Unlocking…'
                        : 'Locked · complete all 12 skills'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {modalOpen && existingRoleCertId && (
        <RoleUnlockedModal
          program={program}
          roleCertId={existingRoleCertId}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};
