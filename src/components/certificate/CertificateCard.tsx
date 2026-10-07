import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck } from 'lucide-react';
import { Certificate } from '../../types';
import { getProgramBySlug, getSkillBySlug } from '../../data/programsAndSkills';

interface CertificateCardProps {
  cert: Certificate;
}

const DetailItem: React.FC<{
  k: string;
  v: React.ReactNode;
  mono?: boolean;
  accent?: boolean;
}> = ({ k, v, mono, accent }) => (
  <div>
    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
      {k}
    </dt>
    <dd
      className={`mt-1 text-sm font-medium ${mono ? 'font-mono' : ''} ${
        accent ? 'text-success' : ''
      }`}
    >
      {v}
    </dd>
  </div>
);

export const CertificateCard: React.FC<CertificateCardProps> = ({ cert }) => {
  const isRole = cert.type === 'role';
  const program = isRole ? getProgramBySlug(cert.programId) : null;
  const skill = !isRole ? getSkillBySlug(cert.skillId) : null;
  const title = isRole ? program?.role : skill?.name;

  const formattedDate = new Date(cert.issueDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ type: 'spring', stiffness: 70, damping: 16 }}
      className="print-area light-sweep sweep-now relative overflow-hidden rounded-[28px] border border-border bg-surface p-8 shadow-lift sm:p-12"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-3 rounded-[22px] border border-border" />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-heading text-sm font-semibold tracking-[0.2em]">
              ACCELERATORX
            </div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {isRole ? 'Role certification' : 'Skill certificate'}
            </div>
          </div>
          <span
            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
              isRole
                ? 'rotate-45 bg-brand text-brand-foreground'
                : 'bg-brand/15 text-brand'
            }`}
          >
            <Award className={`h-6 w-6 ${isRole ? '-rotate-45' : ''}`} />
          </span>
        </div>

        <div className="mt-14 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {isRole ? 'Certified as' : 'Certified in'}
        </div>
        <h2 className="mt-2 text-balance text-4xl font-semibold leading-[1] tracking-[-0.04em] sm:text-6xl">
          {title}
        </h2>

        <div className="mt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Awarded to
        </div>
        <div className="mt-1 font-display text-3xl italic sm:text-4xl">
          {cert.candidate}
        </div>

        {isRole && (
          <>
            <div className="mt-3 text-sm text-muted-foreground">
              Based on {cert.completedSkills} verified skill certifications
            </div>
            {program && (
              <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
                {program.skills.map((skillSlug) => {
                  const s = getSkillBySlug(skillSlug);
                  return (
                    <li
                      key={skillSlug}
                      className="flex items-center gap-2 text-[13px]"
                    >
                      <ShieldCheck className="h-3.5 w-3.5 text-success" />
                      {s?.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        )}

        <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-border pt-6 sm:grid-cols-4">
          <DetailItem
            k={isRole ? 'Overall score' : 'Score'}
            v={`${cert.score}%`}
          />
          <DetailItem k="Certificate ID" v={cert.id} mono />
          <DetailItem k="Issue date" v={formattedDate} />
          <DetailItem
            k="Status"
            v={
              cert.verificationStatus === 'demo'
                ? 'Demo'
                : 'Verified · Demo'
            }
            accent
          />
        </dl>
      </div>
    </motion.div>
  );
};
