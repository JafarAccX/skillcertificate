import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { FadeIn } from '../common/FadeIn';
import { FAQS } from '../../data/programsAndSkills';

interface HomeFaqAccordionProps {
  showHeading?: boolean;
}

export const HomeFaqAccordion: React.FC<HomeFaqAccordionProps> = ({
  showHeading = true,
}) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx((cur) => (cur === idx ? null : idx));
  };

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        {showHeading ? (
          <SectionHeader eyebrow="FAQ" title="Questions, answered." />
        ) : (
          <div />
        )}

        <FadeIn delay={0.1}>
          <div className="border-t border-border">
            {FAQS.map(([q, a], idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={q} className="border-b border-border">
                  <button
                    onClick={() => toggle(idx)}
                    className="flex w-full items-center justify-between py-5 text-left text-[17px] font-medium tracking-tight hover:no-underline transition-colors"
                  >
                    <span>{q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-[15px] leading-relaxed text-muted-foreground">
                          {a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
