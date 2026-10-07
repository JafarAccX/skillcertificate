import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { SectionEyebrow } from '../components/common/SectionEyebrow';
import { FadeIn } from '../components/common/FadeIn';
import { SkillStatusBadge } from '../components/skills/SkillStatusBadge';
import { ALL_SKILLS, PROGRAMS, getProgramBySlug } from '../data/programsAndSkills';
import { useProgress } from '../context/ProgressContext';

export const SkillsPage: React.FC = () => {
  const { getSkillAccess } = useProgress();
  const [search, setSearch] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('all');

  const filteredSkills = useMemo(() => {
    return ALL_SKILLS.filter((skill) => {
      const matchProgram =
        selectedProgram === 'all' || skill.programs.includes(selectedProgram);
      const matchSearch = skill.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchProgram && matchSearch;
    });
  }, [search, selectedProgram]);

  return (
    <div className="mx-auto max-w-5xl px-5 pb-24 pt-32 lg:px-8 lg:pt-40">
      <FadeIn>
        <SectionEyebrow>All skill certifications</SectionEyebrow>
      </FadeIn>

      <FadeIn delay={0.05}>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.045em] sm:text-6xl">
          Find a skill to certify.
        </h1>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="mt-5 max-w-xl text-lg text-muted-foreground">
          Every skill belongs to at least one role path. Certify it once — it
          counts everywhere it appears.
        </p>
      </FadeIn>

      {/* Sticky Filter & Search Bar */}
      <div className="sticky top-16 z-20 -mx-5 mt-10 border-b border-border bg-background/85 px-5 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ width: searchActive ? '100%' : 40 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative flex h-10 max-w-sm shrink-0 items-center overflow-hidden rounded-full border border-border bg-surface"
          >
            <button
              onClick={() => setSearchActive(true)}
              className="flex h-10 w-10 shrink-0 items-center justify-center text-muted-foreground hover:text-foreground"
              aria-label="Search skills"
            >
              <Search className="h-4 w-4" />
            </button>

            {searchActive && (
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search skills"
                className="h-full flex-1 bg-transparent pr-2 text-sm outline-none placeholder:text-muted-foreground text-foreground"
                aria-label="Search skills"
              />
            )}

            {searchActive && (
              <button
                onClick={() => {
                  setSearch('');
                  setSearchActive(false);
                }}
                className="mr-2 flex h-7 w-7 items-center justify-center rounded-full hover:bg-surface-2 text-muted-foreground"
                aria-label="Close search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </motion.div>

          <div className="flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none]">
            {[{ slug: 'all', name: 'All' }, ...PROGRAMS].map((prog) => (
              <button
                key={prog.slug}
                onClick={() => setSelectedProgram(prog.slug)}
                className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-medium transition-colors ${
                  selectedProgram === prog.slug
                    ? 'bg-foreground text-background'
                    : 'border border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {prog.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Skills list */}
      <ul className="mt-4 divide-y divide-border">
        <AnimatePresence initial={false}>
          {filteredSkills.map((skill) => {
            const { status } = getSkillAccess(skill.slug);
            const programNames = skill.programs
              .map((slug) => getProgramBySlug(slug)?.name)
              .filter(Boolean)
              .join(' · ');

            return (
              <motion.li
                key={skill.slug}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Link
                  to={`/skills/${skill.slug}`}
                  className="group flex items-center gap-4 py-4 transition-colors"
                >
                  <SkillStatusBadge status={status} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                      {skill.name}
                    </div>
                    <div className="truncate text-xs text-muted-foreground">
                      {programNames}
                    </div>
                  </div>
                  <span className="hidden font-mono text-xs text-muted-foreground sm:block">
                    ₹499
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-foreground" />
                </Link>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      {filteredSkills.length === 0 && (
        <p className="py-16 text-center text-muted-foreground">
          No skills match “{search}”.
        </p>
      )}
    </div>
  );
};
