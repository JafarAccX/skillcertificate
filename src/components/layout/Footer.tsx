import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { PROGRAMS } from '../../data/programsAndSkills';

interface FooterColumnProps {
  title: string;
  links: { label: string; to: string }[];
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => (
  <div>
    <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
      {title}
    </h3>
    <ul className="mt-4 space-y-2.5">
      {links.map((link) => (
        <li key={link.to}>
          <Link
            to={link.to}
            className="text-sm text-foreground/80 transition-colors hover:text-foreground"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export const Footer: React.FC = () => {
  const firstHalfPrograms = PROGRAMS.slice(0, 5).map((p) => ({
    label: p.name,
    to: `/programs/${p.slug}`,
  }));

  const secondHalfPrograms = PROGRAMS.slice(5).map((p) => ({
    label: p.name,
    to: `/programs/${p.slug}`,
  }));

  const productLinks = [
    { label: 'All skills', to: '/skills' },
    { label: 'How it works', to: '/how-it-works' },
    { label: 'Verify a certificate', to: '/verify' },
    { label: 'FAQ', to: '/faq' },
  ];

  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Skill certificates for people who already know the work. Get
            assessed, scored and certified — without another course.
          </p>
        </div>

        <FooterColumn title="Paths" links={firstHalfPrograms} />
        <FooterColumn title="More paths" links={secondHalfPrograms} />
        <FooterColumn title="Product" links={productLinks} />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-border px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between lg:px-8">
        <span>
          © {new Date().getFullYear()} AcceleratorX. Demo build — testimonials
          are demo profiles.
        </span>
        <span className="font-mono">₹499 + GST per skill attempt</span>
      </div>
    </footer>
  );
};
