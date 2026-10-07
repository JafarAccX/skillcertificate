import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ArrowRight } from 'lucide-react';
import { Skill, SkillStatus } from '../../types';
import { SkillStatusBadge } from './SkillStatusBadge';
import { STAGES } from '../../data/programsAndSkills';

interface SkillCardProps {
  skill: Skill;
  index: number;
  status: SkillStatus;
  celebrate?: boolean;
}

const statusActions: Record<SkillStatus, string> = {
  available: 'Get certified',
  in_progress: 'Continue',
  completed: 'Retake',
  certified: 'View certificate',
  locked: 'View skill',
};

const statusLabels: Record<SkillStatus, string> = {
  locked: 'Locked',
  available: 'Available',
  in_progress: 'In progress',
  completed: 'Completed · retake to certify',
  certified: 'Certified',
};

export const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  index,
  status,
  celebrate,
}) => {
  const [hovered, setHovered] = useState(false);
  const isLocked = status === 'locked';

  return (
    <Link
      to={`/skills/${skill.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={`group relative block rounded-2xl border px-1 py-2 transition-all duration-300 sm:px-2 ${
        hovered
          ? 'border-border bg-surface shadow-soft'
          : 'border-transparent'
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <span
          className={
            celebrate && status === 'certified'
              ? 'rounded-full shadow-[0_0_24px_hsl(var(--glow)/0.6)] transition-shadow duration-700'
              : ''
          }
        >
          <SkillStatusBadge status={status} />
        </span>

        <span className="w-6 font-mono text-xs text-muted-foreground">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="min-w-0 flex-1">
          <div
            className={`truncate text-[15px] font-medium tracking-tight sm:text-base ${
              isLocked ? 'text-muted-foreground' : 'text-foreground'
            }`}
          >
            {skill.name}
          </div>
          <div
            className={`font-mono text-[10px] uppercase tracking-[0.14em] ${
              status === 'certified'
                ? 'text-success'
                : status === 'available'
                ? 'text-brand'
                : 'text-muted-foreground'
            }`}
          >
            {statusLabels[status]}
          </div>
        </div>

        {status === 'certified' && (
          <Award className="h-4 w-4 text-success" aria-hidden="true" />
        )}

        {status === 'available' && !hovered && (
          <span className="hidden font-mono text-[11px] text-brand sm:block">
            ₹499
          </span>
        )}
      </div>

      <AnimatePresence initial={false}>
        {hovered && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-2 pl-[52px] pr-2 pt-3 sm:pl-[88px]">
              <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
                {skill.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {STAGES.map((st) => (
                  <span
                    key={st.id}
                    className="rounded-full border border-border bg-surface-2 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em]"
                  >
                    {st.type} · {st.title}
                  </span>
                ))}
              </div>

              <span
                className={`mt-4 inline-flex items-center gap-1.5 text-sm font-medium ${
                  isLocked ? 'text-muted-foreground' : 'text-foreground'
                }`}
              >
                {isLocked
                  ? 'Certify the previous skill to unlock'
                  : statusActions[status]}{' '}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
};
