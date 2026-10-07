import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Program } from '../../types';
import { useProgress } from '../../context/ProgressContext';
import { getSkillBySlug } from '../../data/programsAndSkills';

interface ProgramCardProps {
  program: Program;
  tall?: boolean;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({ program, tall }) => {
  const { state } = useProgress();
  const certifiedCount = program.skills.filter((s) => state.certified[s]).length;

  return (
    <Link
      to={`/programs/${program.slug}`}
      className={`group relative flex flex-col justify-end overflow-hidden rounded-[26px] border border-border bg-surface transition-all duration-500 hover:-translate-y-1 hover:shadow-lift ${
        tall ? 'min-h-[440px]' : 'min-h-[400px]'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={program.image}
          alt={`${program.role} at work`}
          className="h-full w-full object-cover opacity-90 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05] group-hover:-translate-y-2"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-surface/0" />
      </div>

      <div className="relative p-6 sm:p-7">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          12 skill certifications
        </div>
        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-[28px]">
          {program.name}
        </h3>

        <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100">
          <ul className="overflow-hidden">
            {program.skills.slice(0, 4).map((skillSlug, idx) => {
              const skill = getSkillBySlug(skillSlug);
              const isCertified = !!state.certified[skillSlug];
              return (
                <li
                  key={skillSlug}
                  className="flex items-center gap-2.5 pt-2 text-[13px] text-foreground/85"
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isCertified
                        ? 'bg-success'
                        : idx === certifiedCount
                        ? 'bg-brand'
                        : 'bg-locked'
                    }`}
                  />
                  {skill?.name}
                </li>
              );
            })}
            <li className="pt-2 font-mono text-[11px] text-muted-foreground">
              + 8 more skills
            </li>
          </ul>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-foreground/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand to-brand-2 transition-all duration-700 group-hover:opacity-100"
              style={{
                width: `${Math.max((certifiedCount / 12) * 100, 2)}%`,
              }}
            />
          </div>
          <span className="font-mono text-[11px] text-muted-foreground">
            {certifiedCount} / 12
          </span>
        </div>

        <div className="mt-5 flex items-end justify-between gap-4 border-t border-border pt-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Final credential
            </div>
            <div className="mt-1 text-sm font-medium">{program.role}</div>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface transition-all duration-500 group-hover:rotate-45 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
};
