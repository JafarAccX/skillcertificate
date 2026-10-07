import React from 'react';
import { ALL_SKILLS, PROGRAMS } from '../../data/programsAndSkills';

export const HeroStats: React.FC = () => {
  const stats = [
    [ALL_SKILLS.length, 'Skill certifications'],
    [PROGRAMS.length, 'Role credentials'],
    [4, 'Assessment stages'],
  ];

  return (
    <div className="grid grid-cols-3 rounded-[22px] border border-border bg-surface py-4">
      {stats.map(([count, label], idx) => (
        <div
          key={label as string}
          className={`px-4 sm:px-5 ${idx ? 'border-l border-border' : ''}`}
        >
          <div className="font-heading text-3xl font-semibold tracking-[-0.04em]">
            {count}
          </div>
          <div className="mt-0.5 font-mono text-[9.5px] uppercase leading-snug tracking-[0.08em] sm:tracking-[0.14em] text-muted-foreground">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
};
