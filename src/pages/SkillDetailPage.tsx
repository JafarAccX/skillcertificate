import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Target, Award, Lock, ArrowUpRight } from 'lucide-react';
import { SectionEyebrow } from '../components/common/SectionEyebrow';
import { Button } from '../components/common/Button';
import {
  getSkillBySlug,
  getProgramBySlug,
  STAGES,
} from '../data/programsAndSkills';
import { useProgress } from '../context/ProgressContext';
import { SkillStatus } from '../types';

const statusLabels: Record<SkillStatus, string> = {
  locked: 'Locked',
  available: 'Available',
  in_progress: 'In progress',
  completed: 'Completed · retake to certify',
  certified: 'Certified',
};

export const SkillDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const skill = getSkillBySlug(slug);
  const { state, getSkillAccess } = useProgress();

  if (!skill) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 pt-24 text-center">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          404
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
          Skill not found
        </h1>
        <p className="mt-3 text-muted-foreground">
          We couldn't find what you were looking for.
        </p>
        <Button to="/skills" className="mt-8">
          See all skills
        </Button>
      </div>
    );
  }

  const access = getSkillAccess(skill.slug);
  const primaryProgram = getProgramBySlug(skill.programs[0]);
  const certifiedData = state.certified[skill.slug];

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-28 lg:px-8 lg:pt-36">
      {primaryProgram && (
        <Link
          to={`/programs/${primaryProgram.slug}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> {primaryProgram.name} path
        </Link>
      )}

      <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-16">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8 }}
          >
            <SectionEyebrow>Skill certification</SectionEyebrow>
            <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.045em] sm:text-7xl">
              {skill.name}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {skill.description}
            </p>
          </motion.div>

          {/* Assessment stages */}
          <div className="mt-14">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              The assessment
            </h2>
            <ol className="mt-5 grid gap-3 sm:grid-cols-2">
              {STAGES.map((st, idx) => (
                <motion.li
                  key={st.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.6 }}
                  className="group rounded-[22px] border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {st.duration}
                    </span>
                  </div>
                  <div className="mt-6 font-heading text-3xl font-semibold tracking-[-0.03em]">
                    {st.type}
                  </div>
                  <div className="mt-1 text-sm font-medium text-brand">
                    {st.title}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {st.description}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* Counts toward section */}
          <div className="mt-14">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Counts toward
            </h2>
            <ul className="mt-5 space-y-3">
              {skill.programs.map((progSlug) => {
                const prog = getProgramBySlug(progSlug);
                if (!prog) return null;
                const completedInProg = prog.skills.filter(
                  (s) => state.certified[s]
                ).length;
                const skillIndexInProg = prog.skills.indexOf(skill.slug) + 1;

                return (
                  <li key={progSlug}>
                    <Link
                      to={`/programs/${progSlug}`}
                      className="group flex items-center gap-5 rounded-[20px] border border-border bg-surface p-5 transition-all hover:border-foreground/20"
                    >
                      <div className="flex-1">
                        <div className="font-medium tracking-tight">
                          {prog.role} role certification
                        </div>
                        <div className="mt-0.5 text-sm text-muted-foreground">
                          Skill {String(skillIndexInProg).padStart(2, '0')} of 12
                          in {prog.name}
                        </div>
                        <div className="mt-3 flex items-center gap-3">
                          <div className="h-1 flex-1 overflow-hidden rounded-full bg-surface-3">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-brand to-brand-2"
                              style={{
                                width: `${(completedInProg / 12) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="font-mono text-[11px] text-muted-foreground">
                            {completedInProg} / 12
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Aside purchase card */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="light-sweep rounded-[26px] border border-border bg-surface p-7 shadow-lift">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                One certification attempt
              </span>
              <span
                className={`rounded-full px-2.5 py-1 font-mono text-[10px] ${
                  access.status === 'certified'
                    ? 'bg-success/15 text-success'
                    : access.status === 'locked'
                    ? 'bg-surface-2 text-muted-foreground'
                    : 'bg-brand/15 text-brand'
                }`}
              >
                {statusLabels[access.status]}
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-heading text-6xl font-semibold tracking-[-0.05em]">
                ₹499
              </span>
              <span className="text-muted-foreground">+ GST</span>
            </div>

            <ul className="mt-6 space-y-2.5 text-sm">
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-muted-foreground" />
                {skill.duration} total
              </li>
              <li className="flex items-center gap-2.5">
                <Target className="h-4 w-4 text-muted-foreground" />
                Pass standard: {skill.passScore}%
              </li>
              <li className="flex items-center gap-2.5">
                <Award className="h-4 w-4 text-muted-foreground" />
                Verifiable skill certificate
              </li>
            </ul>

            <div className="mt-7">
              {access.status === 'certified' && certifiedData && (
                <div className="space-y-2">
                  <Button
                    to={`/certificate/${certifiedData.certId}`}
                    className="w-full"
                  >
                    View certificate
                  </Button>
                  <Button
                    to={`/assessment/${skill.slug}/result`}
                    variant="outline"
                    arrow={false}
                    className="w-full"
                  >
                    See result
                  </Button>
                </div>
              )}

              {access.status === 'locked' && (
                <div>
                  <button
                    disabled
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-border bg-surface-2 text-sm text-muted-foreground cursor-not-allowed"
                  >
                    <Lock className="h-4 w-4" /> Locked
                  </button>
                  {access.blocker?.prev && (
                    <p className="mt-3 text-center text-xs text-muted-foreground">
                      Certify{' '}
                      <Link
                        to={`/skills/${access.blocker.prev.slug}`}
                        className="text-foreground underline underline-offset-4"
                      >
                        {access.blocker.prev.name}
                      </Link>{' '}
                      first to unlock.
                    </p>
                  )}
                </div>
              )}

              {['available', 'in_progress', 'completed'].includes(
                access.status
              ) && (
                <Button
                  to={`/assessment/${skill.slug}`}
                  size="lg"
                  className="w-full"
                >
                  {access.status === 'in_progress'
                    ? 'Continue assessment'
                    : access.status === 'completed'
                    ? 'Retake assessment'
                    : 'Get certified'}
                </Button>
              )}
            </div>

            <p className="mt-5 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">
              You're purchasing an{' '}
              <span className="text-foreground font-medium">
                assessment and certification attempt
              </span>{' '}
              — not a course. Demo build: no payment is taken.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
