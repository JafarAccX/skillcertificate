import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '../../data/programsAndSkills';
import { Testimonial } from '../../types';

const TestimonialCard: React.FC<{ item: Testimonial }> = ({ item }) => (
  <figure className="group/card rounded-2xl border border-border bg-surface p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-soft">
    <blockquote className="text-[13px] leading-relaxed text-foreground/90">
      “{item.quote}”
    </blockquote>
    <figcaption className="mt-3.5 flex items-center gap-2.5">
      <img
        src={item.avatar}
        alt={`${item.name}, demo profile`}
        loading="lazy"
        className="h-8 w-8 rounded-full object-cover opacity-80 blur-[0.4px] grayscale-[35%] transition-all duration-300 group-hover/card:opacity-100 group-hover/card:blur-0 group-hover/card:grayscale-0"
      />
      <div className="min-w-0">
        <div className="flex items-center gap-1 text-[12px] font-medium">
          {item.name}
          {item.verified && (
            <ShieldCheck
              className="h-3.5 w-3.5 text-brand"
              aria-label="Verified certificate"
            />
          )}
        </div>
        <div className="truncate text-[11px] text-muted-foreground transition-colors group-hover/card:text-foreground/80">
          {item.role} · {item.skill}
        </div>
      </div>
    </figcaption>
    <div className="mt-2.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground/80">
      Demo profile
    </div>
  </figure>
);

const StreamColumn: React.FC<{
  items: Testimonial[];
  dir: 'up' | 'down';
  className?: string;
}> = ({ items, dir, className = '' }) => (
  <div className={`overflow-hidden ${className}`}>
    <div
      className={`stream-track flex flex-col gap-3 ${
        dir === 'up' ? 'animate-stream-up' : 'animate-stream-down'
      }`}
    >
      {[...items, ...items].map((item, idx) => (
        <div key={`${item.id}-${idx}`} aria-hidden={idx >= items.length}>
          <TestimonialCard item={item} />
        </div>
      ))}
    </div>
  </div>
);

export const LiveTestimonialsStream: React.FC = () => {
  const [paused, setPaused] = useState(false);
  const leftCol = TESTIMONIALS.filter((_, idx) => idx % 2 === 0);
  const rightCol = TESTIMONIALS.filter((_, idx) => idx % 2 === 1);

  return (
    <section
      aria-label="What people are saying"
      className={`stream-panel rounded-[22px] border border-border bg-review p-4 ${
        paused ? 'is-paused' : ''
      }`}
      onTouchStart={() => setPaused((v) => !v)}
    >
      <div className="flex items-center justify-between px-1 pb-3">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          What people are saying
        </h2>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
          Live
        </span>
      </div>

      <div className="mask-fade-y grid h-[300px] grid-cols-1 gap-3 sm:grid-cols-2 md:h-[420px]">
        <StreamColumn items={leftCol} dir="up" />
        <StreamColumn items={rightCol} dir="down" className="hidden sm:block" />
      </div>
    </section>
  );
};
