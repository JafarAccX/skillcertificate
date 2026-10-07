import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { SectionEyebrow } from '../components/common/SectionEyebrow';
import { Button } from '../components/common/Button';
import { useProgress } from '../context/ProgressContext';
import { Certificate } from '../types';
import { getProgramBySlug, getSkillBySlug } from '../data/programsAndSkills';

export const VerifyPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const urlId = searchParams.get('id') || '';

  const { getCertificateById } = useProgress();
  const [certIdInput, setCertIdInput] = useState(urlId);
  const [verifyStatus, setVerifyStatus] = useState<
    'idle' | 'checking' | 'valid' | 'invalid'
  >('idle');
  const [foundCert, setFoundCert] = useState<Certificate | null>(null);

  const performVerification = (idToVerify: string) => {
    const trimmed = idToVerify.trim().toUpperCase();
    if (!trimmed) return;

    setVerifyStatus('checking');
    setTimeout(() => {
      const match = getCertificateById(trimmed);
      if (match) {
        setFoundCert(match);
        setVerifyStatus('valid');
      } else {
        setFoundCert(null);
        setVerifyStatus('invalid');
      }
    }, 900);
  };

  useEffect(() => {
    if (urlId) {
      setCertIdInput(urlId);
      performVerification(urlId);
    }
  }, [urlId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performVerification(certIdInput);
  };

  const getCertTitle = (cert: Certificate) => {
    if (cert.type === 'role') {
      return getProgramBySlug(cert.programId)?.role;
    }
    return getSkillBySlug(cert.skillId)?.name;
  };

  return (
    <div className="mx-auto max-w-2xl px-5 pb-24 pt-32 lg:pt-40">
      <SectionEyebrow>Certificate verification</SectionEyebrow>
      <h1 className="mt-5 text-5xl font-semibold tracking-[-0.045em] sm:text-6xl">
        Verify a certificate.
      </h1>
      <p className="mt-5 text-lg text-muted-foreground">
        Enter a certificate ID to confirm it was issued by AcceleratorX.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-2 sm:flex-row">
        <input
          value={certIdInput}
          onChange={(e) => {
            setCertIdInput(e.target.value.toUpperCase());
            setVerifyStatus('idle');
          }}
          placeholder="AX-XXXXXX"
          aria-label="Certificate ID"
          className="h-14 flex-1 rounded-full border border-input bg-surface px-6 font-mono text-[15px] tracking-wider outline-none transition-colors placeholder:text-muted-foreground focus:border-brand text-foreground"
        />
        <Button
          type="submit"
          size="lg"
          disabled={verifyStatus === 'checking'}
        >
          Verify
        </Button>
      </form>

      <p className="mt-3 pl-2 text-xs text-muted-foreground">
        Try the public demo ID{' '}
        <button
          type="button"
          onClick={() => {
            setCertIdInput('AX-DEMO78');
            performVerification('AX-DEMO78');
          }}
          className="font-mono text-foreground underline underline-offset-4"
        >
          AX-DEMO78
        </button>
      </p>

      <div className="mt-10 min-h-[160px]">
        <AnimatePresence mode="wait">
          {verifyStatus === 'checking' && (
            <motion.div
              key="checking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 text-muted-foreground"
            >
              <Loader2 className="h-5 w-5 animate-spin" /> Checking records…
            </motion.div>
          )}

          {verifyStatus === 'valid' && foundCert && (
            <motion.div
              key="valid"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-[24px] border border-success/40 bg-success/10 p-6"
            >
              <div className="flex items-center gap-2 font-mono text-sm tracking-[0.14em] text-success">
                <ShieldCheck className="h-5 w-5" /> VALID CERTIFICATE
                {foundCert.verificationStatus === 'demo' ? ' · DEMO' : ''}
              </div>
              <div className="mt-4 text-2xl font-semibold tracking-tight">
                {getCertTitle(foundCert)}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {foundCert.type === 'role'
                  ? 'Role certification'
                  : 'Skill certificate'}{' '}
                · {foundCert.candidate} · {foundCert.score}% ·{' '}
                {new Date(foundCert.issueDate).toLocaleDateString('en-GB')}
              </div>
              <Link
                to={`/certificate/${foundCert.id}`}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:underline"
              >
                View certificate <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          )}

          {verifyStatus === 'invalid' && (
            <motion.div
              key="invalid"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-[24px] border border-border bg-surface p-6"
            >
              <div className="flex items-center gap-2 font-mono text-sm tracking-[0.14em] text-warning">
                <AlertCircle className="h-5 w-5" /> NO MATCH
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                No certificate found for{' '}
                <span className="font-mono text-foreground">
                  {certIdInput}
                </span>
                . Check the ID and try again.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-xs text-muted-foreground">
        Demo build: verification checks certificates issued in this browser.
      </p>
    </div>
  );
};
