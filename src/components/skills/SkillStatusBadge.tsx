import React from 'react';
import { Lock, Play, RotateCcw, Check } from 'lucide-react';
import { SkillStatus } from '../../types';

interface SkillStatusBadgeProps {
  status: SkillStatus;
  size?: 'sm' | 'md';
}

const statusLabels: Record<SkillStatus, string> = {
  locked: 'Locked',
  available: 'Available',
  in_progress: 'In progress',
  completed: 'Completed · retake to certify',
  certified: 'Certified',
};

export const SkillStatusBadge: React.FC<SkillStatusBadgeProps> = ({
  status,
  size = 'md',
}) => {
  const dim = size === 'sm' ? 'h-6 w-6' : 'h-9 w-9';
  const iconDim = size === 'sm' ? 'h-3 w-3' : 'h-4 w-4';

  const config: Record<SkillStatus, [string, React.ReactNode]> = {
    locked: [
      'border-border bg-surface text-locked',
      <Lock className={iconDim} />,
    ],
    available: [
      'border-brand/60 bg-brand/10 text-brand glow-brand',
      <Play className={iconDim} />,
    ],
    in_progress: [
      'border-warning/50 bg-warning/10 text-warning',
      <Play className={`${iconDim} animate-pulse`} />,
    ],
    completed: [
      'border-foreground/25 bg-surface-2 text-foreground',
      <RotateCcw className={iconDim} />,
    ],
    certified: [
      'border-success/50 bg-success/15 text-success',
      <Check className={iconDim} strokeWidth={2.5} />,
    ],
  };

  const [colorCls, iconEl] = config[status] || config.locked;

  return (
    <span
      className={`relative z-10 inline-flex shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${dim} ${colorCls}`}
      aria-label={statusLabels[status]}
    >
      {iconEl}
    </span>
  );
};
