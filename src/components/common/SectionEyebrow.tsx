import React from 'react';

interface SectionEyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionEyebrow: React.FC<SectionEyebrowProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground ${className}`}
    >
      <span
        className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_10px_hsl(var(--glow))]"
        aria-hidden="true"
      />
      {children}
    </div>
  );
};
