import React from 'react';
import { Link } from 'react-router-dom';

export const Logo: React.FC = () => {
  return (
    <Link
      to="/"
      className="group flex items-center gap-2.5"
      aria-label="AcceleratorX home"
    >
      <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-background transition-transform duration-500 group-hover:rotate-[8deg]">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M5 5l14 14M19 5L5 19" />
        </svg>
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-brand" />
      </span>
      <span className="font-heading text-[15px] font-semibold tracking-tight">
        AcceleratorX
      </span>
    </Link>
  );
};
