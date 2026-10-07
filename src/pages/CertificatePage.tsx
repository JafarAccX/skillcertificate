import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Download, ShieldCheck, Share2, X, Check } from 'lucide-react';
import { CertificateCard } from '../components/certificate/CertificateCard';
import { useProgress } from '../context/ProgressContext';
import { Button } from '../components/common/Button';

export const CertificatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getCertificateById } = useProgress();
  const cert = getCertificateById(id);

  const [modalOpen, setModalOpen] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  if (!cert) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 pt-24 text-center">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          404
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
          Certificate not found
        </h1>
        <p className="mt-3 text-muted-foreground">
          No certificate matches “{id}”.
        </p>
        <Button to="/verify" className="mt-8">
          Verify a certificate
        </Button>
      </div>
    );
  }

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `AcceleratorX Certificate · ${cert.id}`,
          url,
        });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2400);
    }
  };

  const actionBtnClass =
    'flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-foreground/25 cursor-pointer';

  return (
    <div
      className="mx-auto max-w-4xl px-5 pb-24 pt-28 lg:pt-36"
      style={{ perspective: 1200 }}
    >
      <CertificateCard cert={cert} />

      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <button onClick={() => setModalOpen(true)} className={actionBtnClass}>
          <Eye className="h-4 w-4" /> View
        </button>
        <button onClick={() => window.print()} className={actionBtnClass}>
          <Download className="h-4 w-4" /> Download
        </button>
        <Link to={`/verify?id=${cert.id}`} className={actionBtnClass}>
          <ShieldCheck className="h-4 w-4" /> Verify
        </Link>
        <button onClick={handleShare} className={actionBtnClass}>
          <Share2 className="h-4 w-4" /> Share
        </button>
      </div>

      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl border border-success/40 bg-surface px-4 py-3 shadow-lift text-sm text-success">
          <Check className="h-4 w-4" /> Link copied to clipboard
        </div>
      )}

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Demo certificate. Verification checks certificates issued in this browser
        plus the public demo ID AX-DEMO78.
      </p>

      {/* Modal View */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
            className="fixed inset-0 z-[100] overflow-y-auto bg-background/90 p-5 backdrop-blur-xl sm:p-12"
            role="dialog"
            aria-label="Certificate view"
          >
            <button
              onClick={() => setModalOpen(false)}
              className="fixed right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <div
              className="mx-auto max-w-5xl pt-10"
              onClick={(e) => e.stopPropagation()}
            >
              <CertificateCard cert={cert} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
