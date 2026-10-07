import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Mic, FileText, Bot, Volume2 } from 'lucide-react';
import { SectionEyebrow } from '../common/SectionEyebrow';

const PreviewLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
    {children}
  </div>
);

// Stage 1: Know
const KnowPreview: React.FC = () => (
  <div>
    <PreviewLabel>Know · Question 3 of 5</PreviewLabel>
    <p className="mt-3 text-lg font-medium leading-snug tracking-tight">
      Which is the strongest starting point for an AI product strategy?
    </p>
    <div className="mt-5 space-y-2">
      {[
        'Ship an AI feature to match competitors',
        'Identify where AI meaningfully reduces user effort',
        'Add a chatbot to every screen',
        'Wait for model costs to drop',
      ].map((option, idx) => (
        <motion.div
          key={option}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + idx * 0.07 }}
          className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
            idx === 1
              ? 'border-brand/60 bg-brand/10 font-medium'
              : 'border-border'
          }`}
        >
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] ${
              idx === 1
                ? 'border-brand bg-brand text-brand-foreground'
                : 'border-border'
            }`}
          >
            {idx === 1 ? <Check className="h-3 w-3" /> : String.fromCharCode(65 + idx)}
          </span>
          {option}
        </motion.div>
      ))}
    </div>
  </div>
);

// Stage 2: Think
const SAMPLE_TEXT =
  "I'd start by mapping the three highest-effort moments in the current workflow, then test whether a model can remove one of them reliably. If accuracy is below the user's tolerance, the feature becomes an assistant rather than an automation…";

const ThinkPreview: React.FC = () => (
  <div>
    <PreviewLabel>Think · Written response</PreviewLabel>
    <p className="mt-3 text-sm text-muted-foreground">
      Your team wants to “add AI”. How would you decide what to build first?
    </p>
    <div className="mt-4 min-h-[190px] rounded-xl border border-border bg-background p-4 text-[15px] leading-relaxed">
      {SAMPLE_TEXT.split(' ').map((word, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 + idx * 0.03 }}
        >
          {word}{' '}
        </motion.span>
      ))}
      <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-foreground align-middle" />
    </div>
    <div className="mt-3 flex justify-between font-mono text-[11px] text-muted-foreground">
      <span>48 words</span>
      <span>Autosaved</span>
    </div>
  </div>
);

// Stage 3: Defend
const DefendPreview: React.FC = () => (
  <div className="flex h-full flex-col">
    <PreviewLabel>Defend · AI interview</PreviewLabel>
    <div className="mt-4 space-y-3">
      <div className="flex gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
          <Bot className="h-4 w-4" />
        </span>
        <p className="rounded-2xl rounded-tl-sm bg-surface-2 px-4 py-3 text-sm">
          You said accuracy decides assistant vs automation. How would you measure that before launch?
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="ml-11 rounded-2xl rounded-tr-sm border border-border px-4 py-3 text-sm"
      >
        I'd build a labelled evaluation set from real tickets and track precision on the cases users care most about…
      </motion.div>
    </div>

    <div className="mt-auto flex items-center gap-3 rounded-2xl border border-border p-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background">
        <Mic className="h-4 w-4" />
      </span>
      <div className="flex h-8 flex-1 items-center gap-[3px]">
        {Array.from({ length: 36 }).map((_, idx) => (
          <motion.span
            key={idx}
            className="w-[3px] rounded-full bg-brand/70"
            animate={{ height: [4, 8 + ((idx * 7) % 20), 4] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: idx * 0.04 }}
          />
        ))}
      </div>
      <span className="font-mono text-[11px] text-muted-foreground">01:24</span>
    </div>
  </div>
);

// Stage 4: Build
const BuildPreview: React.FC = () => (
  <div>
    <PreviewLabel>Build · Practical project</PreviewLabel>
    <p className="mt-3 text-lg font-medium tracking-tight">
      Draft a one-page AI strategy for a support product.
    </p>
    <div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-background p-4">
      <FileText className="h-8 w-8 text-brand" />
      <div className="flex-1">
        <div className="text-sm font-medium">ai-strategy-v2.pdf</div>
        <div className="font-mono text-[11px] text-muted-foreground">
          Uploaded · 2 pages
        </div>
      </div>
      <Check className="h-4 w-4 text-success" />
    </div>
    <ul className="mt-4 space-y-2">
      {['Opportunity map', 'Evaluation plan', 'Launch metrics'].map(
        (item, idx) => (
          <motion.li
            key={item}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + idx * 0.15 }}
            className="flex items-center gap-2.5 text-sm"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-success/20 text-success">
              <Check className="h-2.5 w-2.5" />
            </span>
            {item}
          </motion.li>
        )
      )}
    </ul>
  </div>
);

// Stage 5: Result
const ResultPreview: React.FC = () => (
  <div>
    <div className="flex items-center justify-between">
      <div>
        <PreviewLabel>Result</PreviewLabel>
        <div className="mt-2 flex items-center gap-2 text-2xl font-semibold tracking-tight text-success">
          Certified <Check className="h-5 w-5" />
        </div>
      </div>
      <div className="text-right">
        <div className="font-heading text-5xl font-semibold tracking-[-0.05em]">
          78%
        </div>
        <div className="font-mono text-[10px] text-muted-foreground">
          PASS ≥ 60%
        </div>
      </div>
    </div>

    <div className="mt-6 space-y-3.5">
      {[
        ['Knowledge', 80],
        ['Reasoning', 76],
        ['Interview', 74],
        ['Practical', 82],
      ].map(([label, score], idx) => (
        <div key={label as string}>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-mono">{score}%</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 1, delay: 0.1 + idx * 0.1 }}
              className="h-full rounded-full bg-gradient-to-r from-brand to-brand-2"
            />
          </div>
        </div>
      ))}
    </div>

    <div className="light-sweep sweep-now mt-6 rounded-xl border border-success/40 bg-success/10 px-4 py-3 text-sm font-medium text-success">
      Certificate generated · AX-DEMO78
    </div>
  </div>
);

const STAGES_LIST = [
  {
    k: 'KNOW',
    t: 'Baseline knowledge',
    d: 'Scenario-based multiple choice checks what you know.',
    component: KnowPreview,
  },
  {
    k: 'THINK',
    t: 'Reasoning',
    d: 'A written response shows how you approach a real problem.',
    component: ThinkPreview,
  },
  {
    k: 'DEFEND',
    t: 'Spoken understanding',
    d: 'An AI interviewer asks you to explain and defend your thinking.',
    component: DefendPreview,
  },
  {
    k: 'BUILD',
    t: 'Practical application',
    d: 'A focused, real-world task proves you can do the work.',
    component: BuildPreview,
  },
  {
    k: 'RESULT',
    t: 'Certified',
    d: 'Meet the standard and your skill certificate is issued.',
    component: ResultPreview,
  },
];

export const AssessmentPreviewSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const CurrentComponent = STAGES_LIST[activeStage].component;

  return (
    <section className="relative border-y border-border bg-surface/40 py-24 lg:py-32">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
        <div>
          <SectionEyebrow>The assessment experience</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
            Know. Think. Defend. Build.
          </h2>

          <ol className="mt-6 hidden space-y-2 lg:block">
            {STAGES_LIST.map((item, idx) => (
              <li key={item.k}>
                <button
                  onClick={() => setActiveStage(idx)}
                  className={`w-full text-left rounded-2xl border px-5 py-4 transition-all duration-300 ${
                    idx === activeStage
                      ? 'border-border bg-surface shadow-soft opacity-100'
                      : 'border-transparent opacity-60 hover:opacity-90'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-xs ${
                        idx === activeStage ? 'text-brand' : 'text-muted-foreground'
                      }`}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-xs tracking-[0.16em] font-medium">
                      {item.k}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      · {item.t}
                    </span>
                  </div>
                  {idx === activeStage && (
                    <p className="mt-2 pl-8 text-sm text-muted-foreground">
                      {item.d}
                    </p>
                  )}
                </button>
              </li>
            ))}
          </ol>

          <div className="mt-5 flex gap-1.5 flex-wrap lg:hidden">
            {STAGES_LIST.map((item, idx) => (
              <button
                key={item.k}
                onClick={() => setActiveStage(idx)}
                className={`rounded-full px-3 py-1 font-mono text-xs transition-colors ${
                  idx === activeStage
                    ? 'bg-foreground text-background font-medium'
                    : 'bg-surface-2 text-muted-foreground'
                }`}
              >
                {item.k}
              </button>
            ))}
          </div>
        </div>

        <div className="relative rounded-[26px] border border-border bg-surface p-2 shadow-lift">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-2.5 w-2.5 rounded-full bg-surface-3" />
              ))}
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">
              AI Product Strategy · {Math.min(activeStage + 1, 4)} / 4
            </span>
          </div>

          <div className="h-1 overflow-hidden rounded-full bg-surface-3 mx-4">
            <motion.div
              className="h-full bg-gradient-to-r from-brand to-brand-2"
              animate={{ width: `${((activeStage + 1) / 5) * 100}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>

          <div className="relative h-[380px] overflow-hidden sm:h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0 p-5 sm:p-7 overflow-y-auto"
              >
                <CurrentComponent />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
