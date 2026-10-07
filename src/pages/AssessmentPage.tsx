import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Link as LinkIcon, Loader2 } from 'lucide-react';
import { SectionEyebrow } from '../components/common/SectionEyebrow';
import { Button } from '../components/common/Button';
import { getSkillBySlug, STAGES } from '../data/programsAndSkills';
import { useProgress } from '../context/ProgressContext';
import { Skill } from '../types';

interface MCQ {
  q: string;
  options: string[];
  answer: number;
}

const generateMCQs = (skill: Skill): MCQ[] => {
  const name = skill.name;
  return [
    {
      q: `You're asked to apply ${name} on a live project with an unclear brief. What's the strongest first move?`,
      options: [
        'Start producing output immediately to show momentum',
        'Clarify the goal, constraints and how success will be measured',
        'Reuse the approach from your last project unchanged',
        'Wait for a complete specification before doing anything',
      ],
      answer: 1,
    },
    {
      q: `Which signal best shows your ${name} work is actually effective?`,
      options: [
        'A measurable change in the outcome it was meant to influence',
        'The number of hours invested',
        'Positive comments from teammates',
        'How many tools were used',
      ],
      answer: 0,
    },
    {
      q: `A stakeholder challenges a decision you made using ${name}. The best response is to…`,
      options: [
        'Defer to the most senior person in the room',
        'Defend it without revisiting',
        'Walk through the evidence and trade-offs, and invite counter-evidence',
        'Quietly drop the decision',
      ],
      answer: 2,
    },
    {
      q: `Time is short. How should you scope ${name} work?`,
      options: [
        'Do everything, but at lower quality',
        'Push the deadline until it can be done fully',
        'Pick the part you find most interesting',
        'Prioritise the smallest piece that tests the riskiest assumption',
      ],
      answer: 3,
    },
    {
      q: `What most often causes ${name} work to fail in practice?`,
      options: [
        'Solving a poorly defined problem',
        'Too much documentation',
        'Not using the newest tools',
        'Presenting too early',
      ],
      answer: 0,
    },
  ];
};

const getInterviewQuestions = (skill: Skill): string[] => [
  `Let's start simple. In your own words, what does good ${skill.name.toLowerCase()} look like?`,
  `Tell me about a time your ${skill.name.toLowerCase()} work didn't go to plan. What did you change?`,
  `If you had to teach one principle of ${skill.name.toLowerCase()} to a new teammate, what would it be and why?`,
];

const countWords = (text = '') =>
  text.trim().split(/\s+/).filter(Boolean).length;

const clampScore = (v: number) => Math.max(0, Math.min(100, Math.round(v)));

export const AssessmentPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const skill = getSkillBySlug(slug);
  const { candidateName, setCandidate, setInProgress, recordAttempt, getSkillAccess } =
    useProgress();

  const mcqs = useMemo(() => (skill ? generateMCQs(skill) : []), [skill]);
  const interviewQuestions = useMemo(
    () => (skill ? getInterviewQuestions(skill) : []),
    [skill]
  );

  const [stageIndex, setStageIndex] = useState(-1);
  const [candidateInput, setCandidateInput] = useState(
    candidateName || 'Demo Candidate'
  );

  // Stage 0: Know answers
  const [mcqAnswers, setMcqAnswers] = useState<number[]>([]);
  const [currentMcqIdx, setCurrentMcqIdx] = useState(0);

  // Stage 1: Think answer
  const [thinkText, setThinkText] = useState('');

  // Stage 2: Defend answers
  const [interviewAnswers, setInterviewAnswers] = useState<string[]>([]);
  const [interviewInput, setInterviewInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Stage 3: Build answer
  const [buildText, setBuildText] = useState('');
  const [buildLink, setBuildLink] = useState('');

  // Submitting / Evaluating
  const [isEvaluating, setIsEvaluating] = useState(false);

  if (!skill) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 pt-24 text-center">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          404
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
          Assessment not found
        </h1>
        <Button to="/skills" className="mt-8">
          See all skills
        </Button>
      </div>
    );
  }

  const access = getSkillAccess(skill.slug);
  if (access.status === 'locked' && stageIndex === -1) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 pt-24 text-center">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Locked
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
          This skill is locked
        </h1>
        <p className="mt-3 text-muted-foreground">
          Certify the previous skill in its path to unlock this assessment.
        </p>
        <Button to={`/skills/${skill.slug}`} className="mt-8">
          Back to skill
        </Button>
      </div>
    );
  }

  const goToStage = (idx: number) => {
    setStageIndex(idx);
    setInProgress(skill.slug, idx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    setCandidate(candidateInput.trim() || 'Demo Candidate');
    goToStage(0);
  };

  const handleSendInterviewMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interviewInput.trim()) return;

    const nextAnswers = [...interviewAnswers, interviewInput.trim()];
    setInterviewAnswers(nextAnswers);
    setInterviewInput('');

    if (nextAnswers.length < interviewQuestions.length) {
      setIsAiTyping(true);
      setTimeout(() => {
        setIsAiTyping(false);
      }, 900);
    }
  };

  const calculateResults = (finalBuild: string) => {
    setIsEvaluating(true);

    const correctMcqs = mcqs.filter(
      (m, i) => mcqAnswers[i] === m.answer
    ).length;
    const knowScore = clampScore((correctMcqs / mcqs.length) * 100);

    const thinkWords = countWords(thinkText);
    const thinkScore = clampScore(thinkWords ? 35 + thinkWords * 0.55 : 0);

    const interviewScore = clampScore(
      interviewAnswers.reduce(
        (sum, a) => sum + (countWords(a) ? 40 + countWords(a) * 1.1 : 0),
        0
      ) / interviewQuestions.length
    );

    const buildWords = countWords(finalBuild);
    const buildScore = clampScore(
      buildWords
        ? 40 + buildWords * 0.5 + (/https?:\/\//.test(finalBuild) ? 12 : 0)
        : 0
    );

    const overallScore = Math.round(
      (knowScore + thinkScore + interviewScore + buildScore) / 4
    );

    setTimeout(() => {
      recordAttempt(skill.slug, {
        score: overallScore,
        breakdown: {
          knowledge: knowScore,
          reasoning: thinkScore,
          interview: interviewScore,
          practical: buildScore,
        },
        passed: overallScore >= skill.passScore,
        date: new Date().toISOString(),
      });
      navigate(`/assessment/${skill.slug}/result`);
    }, 2200);
  };

  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-24 lg:pt-28">
      {/* Sticky Stage Nav Header */}
      {stageIndex >= 0 && (
        <div className="sticky top-16 z-20 -mx-5 mb-10 border-b border-border bg-background/85 px-5 py-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <div className="truncate text-sm font-medium tracking-tight">
                {skill.name}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Stage {stageIndex + 1} / 4 · {STAGES[stageIndex].type}
              </div>
            </div>
            <div className="flex gap-1">
              {STAGES.map((st, idx) => (
                <span
                  key={st.id}
                  className={`rounded-full px-2 py-1 font-mono text-[10px] transition-colors duration-300 ${
                    idx === stageIndex
                      ? 'bg-foreground text-background'
                      : idx < stageIndex
                      ? 'bg-success/15 text-success'
                      : 'bg-surface-2 text-muted-foreground'
                  }`}
                >
                  {st.type}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-surface-3">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand to-brand-2"
              animate={{ width: `${((stageIndex + 1) / 4) * 100}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </div>
      )}

      {/* Evaluating Loader Screen */}
      {isEvaluating ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex min-h-[50vh] flex-col items-center justify-center text-center"
        >
          <Loader2 className="h-8 w-8 animate-spin text-brand" />
          <h2 className="mt-6 text-2xl font-semibold tracking-tight">
            Evaluating your attempt
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Scoring knowledge, reasoning, interview and practical work…
          </p>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          {/* Start Screen */}
          {stageIndex === -1 && (
            <motion.form
              key="start"
              onSubmit={handleStart}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="pt-8"
            >
              <SectionEyebrow>Skill certification attempt</SectionEyebrow>
              <h1 className="mt-5 text-5xl font-semibold tracking-[-0.045em]">
                {skill.name}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Four stages. Take your time — the pass standard is{' '}
                {skill.passScore}% overall.
              </p>

              <ol className="mt-8 divide-y divide-border rounded-[22px] border border-border bg-surface">
                {STAGES.map((st, idx) => (
                  <li
                    key={st.id}
                    className="flex items-center gap-4 px-5 py-4"
                  >
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="w-16 font-mono text-xs tracking-[0.14em]">
                      {st.type}
                    </span>
                    <span className="flex-1 text-sm text-muted-foreground">
                      {st.description}
                    </span>
                    <span className="hidden font-mono text-[11px] text-muted-foreground sm:block">
                      {st.duration}
                    </span>
                  </li>
                ))}
              </ol>

              <label className="mt-8 block">
                <span className="text-sm font-medium">Name on certificate</span>
                <input
                  value={candidateInput}
                  onChange={(e) => setCandidateInput(e.target.value)}
                  placeholder="Demo Candidate"
                  className="mt-2 h-12 w-full rounded-xl border border-input bg-surface px-4 text-[15px] outline-none transition-colors focus:border-brand"
                />
              </label>

              <Button
                type="submit"
                size="lg"
                className="mt-6 w-full sm:w-auto"
              >
                Start assessment
              </Button>
              <p className="mt-4 text-xs text-muted-foreground">
                Demo build — ₹499 + GST would be charged here. No payment is taken.
              </p>
            </motion.form>
          )}

          {/* Stage 0: Know (MCQs) */}
          {stageIndex === 0 && (
            <motion.div
              key="know"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
                Know · Question {currentMcqIdx + 1} of {mcqs.length}
              </div>

              <h2 className="mt-4 text-balance text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
                {mcqs[currentMcqIdx].q}
              </h2>

              <div className="mt-8 space-y-2.5" role="radiogroup">
                {mcqs[currentMcqIdx].options.map((option, optIdx) => {
                  const isSelected = mcqAnswers[currentMcqIdx] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => {
                        const next = [...mcqAnswers];
                        next[currentMcqIdx] = optIdx;
                        setMcqAnswers(next);
                      }}
                      className={`flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left text-[15px] transition-all duration-200 ${
                        isSelected
                          ? 'border-brand bg-brand/10 font-medium'
                          : 'border-border bg-surface hover:border-foreground/25'
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs transition-colors ${
                          isSelected
                            ? 'border-brand bg-brand text-brand-foreground'
                            : 'border-border'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      {option}
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex gap-1.5">
                {mcqs.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      mcqAnswers[idx] === undefined
                        ? 'bg-surface-3'
                        : 'bg-brand'
                    }`}
                  />
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between gap-4">
                {currentMcqIdx > 0 ? (
                  <button
                    onClick={() => setCurrentMcqIdx((i) => i - 1)}
                    className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                ) : (
                  <span />
                )}

                <Button
                  onClick={() => {
                    if (currentMcqIdx < mcqs.length - 1) {
                      setCurrentMcqIdx((i) => i + 1);
                    } else {
                      goToStage(1);
                    }
                  }}
                  disabled={mcqAnswers[currentMcqIdx] === undefined}
                >
                  {currentMcqIdx === mcqs.length - 1
                    ? 'Continue to Think'
                    : 'Next'}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Stage 1: Think (Descriptive) */}
          {stageIndex === 1 && (
            <motion.div
              key="think"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
                Think · Descriptive
              </div>

              <h2 className="mt-4 text-balance text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
                Describe a real situation where you applied{' '}
                {skill.name.toLowerCase()}. What was the problem, what did you do,
                what trade-offs did you make — and how did you know it worked?
              </h2>

              <p className="mt-3 text-sm text-muted-foreground">
                Aim for 120–250 words. Specifics beat generalities.
              </p>

              <textarea
                value={thinkText}
                onChange={(e) => setThinkText(e.target.value)}
                rows={12}
                placeholder="Start with the situation…"
                className="mt-6 w-full resize-y rounded-2xl border border-input bg-surface p-5 text-[15px] leading-relaxed outline-none transition-colors placeholder:text-muted-foreground focus:border-brand text-foreground"
                aria-label="Your written response"
              />

              <div className="mt-2 flex justify-between font-mono text-[11px] text-muted-foreground">
                <span
                  className={
                    countWords(thinkText) >= 40 ? 'text-success font-medium' : ''
                  }
                >
                  {countWords(thinkText)} words
                </span>
                <span>Minimum 40 words</span>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4">
                <button
                  onClick={() => goToStage(0)}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <Button
                  onClick={() => goToStage(2)}
                  disabled={countWords(thinkText) < 40}
                >
                  Continue to Defend
                </Button>
              </div>
            </motion.div>
          )}

          {/* Stage 2: Defend (AI Interview) */}
          {stageIndex === 2 && (
            <motion.div
              key="defend"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
                Defend · AI interview
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                Explain your thinking.
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Demo interviewer with scripted questions. The full product runs a
                spoken interview — here you answer by typing.
              </p>

              <div className="mt-6 space-y-4 rounded-[22px] border border-border bg-surface p-5">
                {interviewQuestions
                  .slice(0, interviewAnswers.length + 1)
                  .map((q, idx) => (
                    <div key={idx} className="space-y-3">
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                          <Send className="h-4 w-4" />
                        </span>
                        <p className="rounded-2xl rounded-tl-sm bg-surface-2 px-4 py-3 text-[15px]">
                          {q}
                        </p>
                      </motion.div>

                      {interviewAnswers[idx] && (
                        <motion.p
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="ml-11 rounded-2xl rounded-tr-sm border border-border px-4 py-3 text-[15px]"
                        >
                          {interviewAnswers[idx]}
                        </motion.p>
                      )}
                    </div>
                  ))}

                {isAiTyping && (
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/15 text-brand">
                      <Send className="h-4 w-4" />
                    </span>
                    <span className="flex gap-1 py-3 px-4 rounded-2xl bg-surface-2">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </span>
                  </div>
                )}
              </div>

              {interviewAnswers.length < interviewQuestions.length && (
                <form
                  onSubmit={handleSendInterviewMessage}
                  className="mt-4 flex items-end gap-2"
                >
                  <textarea
                    value={interviewInput}
                    onChange={(e) => setInterviewInput(e.target.value)}
                    disabled={isAiTyping}
                    rows={3}
                    placeholder="Type your answer…"
                    className="flex-1 resize-none rounded-2xl border border-input bg-surface p-4 text-[15px] outline-none transition-colors placeholder:text-muted-foreground focus:border-brand disabled:opacity-50 text-foreground"
                  />
                  <button
                    type="submit"
                    disabled={isAiTyping || !interviewInput.trim()}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background transition-transform active:scale-95 disabled:opacity-30"
                    aria-label="Send answer"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}

              <div className="mt-8 flex items-center justify-between gap-4">
                <button
                  onClick={() => goToStage(1)}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <div className="flex items-center gap-4">
                  <span className="hidden font-mono text-[11px] text-muted-foreground sm:block">
                    {interviewAnswers.length} / {interviewQuestions.length}{' '}
                    answered
                  </span>
                  <Button
                    onClick={() => goToStage(3)}
                    disabled={
                      interviewAnswers.length < interviewQuestions.length
                    }
                  >
                    Continue to Build
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Stage 3: Build (Practical Project) */}
          {stageIndex === 3 && (
            <motion.div
              key="build"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
                Build · Practical project
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                {skill.name} — practical brief
              </h2>

              <div className="mt-6 rounded-[22px] border border-border bg-surface p-6">
                <p className="text-[15px] leading-relaxed">
                  You've joined a mid-sized company as the person responsible for{' '}
                  {skill.name.toLowerCase()}. Leadership wants a short, concrete
                  plan they can act on this quarter.
                </p>

                <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Deliverables
                </div>
                <ul className="mt-3 space-y-2 text-sm">
                  {[
                    'Your approach, step by step',
                    "Key assumptions and how you'd test them",
                    "What you'd measure to know it worked",
                    'Optional: a link to supporting work (doc, repo, file)',
                  ].map((deliv, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                      {deliv}
                    </li>
                  ))}
                </ul>
              </div>

              <textarea
                value={buildText}
                onChange={(e) => setBuildText(e.target.value)}
                rows={12}
                placeholder="Write your plan here…"
                className="mt-6 w-full resize-y rounded-2xl border border-input bg-surface p-5 text-[15px] leading-relaxed outline-none transition-colors placeholder:text-muted-foreground focus:border-brand text-foreground"
                aria-label="Your practical submission"
              />

              <div className="mt-2 flex justify-between font-mono text-[11px] text-muted-foreground">
                <span
                  className={
                    countWords(buildText) >= 50 ? 'text-success font-medium' : ''
                  }
                >
                  {countWords(buildText)} words
                </span>
                <span>Minimum 50 words</span>
              </div>

              <label className="mt-5 flex items-center gap-3 rounded-2xl border border-input bg-surface px-4 focus-within:border-brand">
                <LinkIcon className="h-4 w-4 text-muted-foreground" />
                <input
                  value={buildLink}
                  onChange={(e) => setBuildLink(e.target.value)}
                  placeholder="https:// link to supporting work (optional)"
                  className="h-12 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground text-foreground"
                  aria-label="Supporting link"
                />
              </label>

              <div className="mt-8 flex items-center justify-between gap-4">
                <button
                  onClick={() => goToStage(2)}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <Button
                  onClick={() =>
                    calculateResults(`${buildText}\n${buildLink}`.trim())
                  }
                  disabled={countWords(buildText) < 50}
                >
                  Submit for evaluation
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
