import React, { createContext, useContext, useEffect, useState, useSyncExternalStore } from 'react';
import { Attempt, Certificate, ProgressState, SkillStatus } from '../types';
import { getProgramBySlug, getSkillBySlug, PROGRAMS, SKILLS_MAP } from '../data/programsAndSkills';

const STORAGE_KEY = 'ax_progress_v1';
const EVENT_NAME = 'ax-progress';

const DEFAULT_CERTIFICATES: Record<string, Certificate> = {
  'AX-DEMO78': {
    id: 'AX-DEMO78',
    type: 'skill',
    skillId: 'ai-product-strategy',
    candidate: 'Demo Candidate',
    score: 78,
    issueDate: '2026-09-01T10:00:00.000Z',
    verificationStatus: 'demo',
  },
};

const DEFAULT_STATE: ProgressState = {
  certified: {},
  attempts: {},
  inProgress: {},
  roleCerts: {},
  certificates: DEFAULT_CERTIFICATES,
  candidate: '',
};

let cachedState: ProgressState | null = null;

const getRawState = (): ProgressState => {
  if (cachedState) return cachedState;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    cachedState = {
      ...DEFAULT_STATE,
      ...(saved ? JSON.parse(saved) : {}),
      certificates: {
        ...DEFAULT_CERTIFICATES,
        ...(saved ? JSON.parse(saved).certificates : {}),
      },
    };
  } catch {
    cachedState = { ...DEFAULT_STATE };
  }
  return cachedState;
};

const saveRawState = (next: ProgressState) => {
  cachedState = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
  window.dispatchEvent(new Event(EVENT_NAME));
};

const subscribe = (callback: () => void) => {
  window.addEventListener(EVENT_NAME, callback);
  return () => window.removeEventListener(EVENT_NAME, callback);
};

export const generateCertId = (prefix = 'AX'): string =>
  `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

export interface ProgressContextType {
  state: ProgressState;
  candidateName: string;
  setCandidate: (name: string) => void;
  setInProgress: (skillSlug: string, stageIndex: number) => void;
  recordAttempt: (skillSlug: string, attempt: Attempt) => Attempt;
  simulateNext: (programSlug: string) => void;
  resetProgram: (programSlug: string) => void;
  unlockRoleCertificate: (programSlug: string) => string;
  getSkillAccess: (skillSlug: string) => {
    status: SkillStatus;
    blocker?: { program: any; prev: any } | null;
  };
  getProgramStatuses: (programSlug: string) => SkillStatus[];
  getCertificateById: (id?: string) => Certificate | undefined;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const state = useSyncExternalStore(subscribe, getRawState, getRawState);

  const setCandidate = (name: string) => {
    const current = getRawState();
    saveRawState({ ...current, candidate: name });
  };

  const setInProgress = (skillSlug: string, stageIndex: number) => {
    const current = getRawState();
    saveRawState({
      ...current,
      inProgress: {
        ...current.inProgress,
        [skillSlug]: stageIndex,
      },
    });
  };

  const recordAttempt = (skillSlug: string, attempt: Attempt): Attempt => {
    const current = getRawState();
    const nextInProgress = { ...current.inProgress };
    delete nextInProgress[skillSlug];

    const nextState: ProgressState = {
      ...current,
      inProgress: nextInProgress,
      attempts: {
        ...current.attempts,
        [skillSlug]: attempt,
      },
    };

    if (attempt.passed) {
      const certId = generateCertId('AX');
      const cert: Certificate = {
        id: certId,
        type: 'skill',
        skillId: skillSlug,
        candidate: current.candidate || 'Demo Candidate',
        score: attempt.score,
        issueDate: new Date().toISOString(),
        verificationStatus: attempt.simulated ? 'demo' : 'verified-demo',
      };

      nextState.certificates = {
        ...current.certificates,
        [certId]: cert,
      };

      nextState.certified = {
        ...current.certified,
        [skillSlug]: {
          certId,
          score: attempt.score,
          date: cert.issueDate,
        },
      };

      nextState.attempts[skillSlug] = {
        ...attempt,
        certId,
      };
    }

    saveRawState(nextState);
    return nextState.attempts[skillSlug];
  };

  const simulateNext = (programSlug: string) => {
    const prog = getProgramBySlug(programSlug);
    if (!prog) return;
    const current = getRawState();
    const nextSkill = prog.skills.find((s) => !current.certified[s]);
    if (!nextSkill) return;

    const score = 70 + Math.floor(Math.random() * 25);
    recordAttempt(nextSkill, {
      score,
      passed: true,
      breakdown: {
        knowledge: score,
        reasoning: score,
        interview: score,
        practical: score,
      },
      simulated: true,
      date: new Date().toISOString(),
    });
  };

  const unlockRoleCertificate = (programSlug: string): string => {
    const prog = getProgramBySlug(programSlug);
    if (!prog) return '';
    const current = getRawState();
    if (current.roleCerts[programSlug]) return current.roleCerts[programSlug];

    const scores = prog.skills.map((s) => current.certified[s]?.score || 0);
    const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const roleCertId = generateCertId('AXR');

    const cert: Certificate = {
      id: roleCertId,
      type: 'role',
      programId: programSlug,
      candidate: current.candidate || 'Demo Candidate',
      completedSkills: prog.skills.length,
      totalSkills: prog.skills.length,
      score: avgScore,
      issueDate: new Date().toISOString(),
      verificationStatus: 'verified-demo',
    };

    saveRawState({
      ...current,
      roleCerts: {
        ...current.roleCerts,
        [programSlug]: roleCertId,
      },
      certificates: {
        ...current.certificates,
        [roleCertId]: cert,
      },
    });

    return roleCertId;
  };

  const resetProgram = (programSlug: string) => {
    const prog = getProgramBySlug(programSlug);
    if (!prog) return;
    const current = getRawState();

    const nextCertified = { ...current.certified };
    const nextAttempts = { ...current.attempts };
    const nextInProgress = { ...current.inProgress };

    prog.skills.forEach((s) => {
      delete nextCertified[s];
      delete nextAttempts[s];
      delete nextInProgress[s];
    });

    const nextRoleCerts = { ...current.roleCerts };
    delete nextRoleCerts[programSlug];

    saveRawState({
      ...current,
      certified: nextCertified,
      attempts: nextAttempts,
      inProgress: nextInProgress,
      roleCerts: nextRoleCerts,
    });
  };

  const getProgramStatuses = (programSlug: string): SkillStatus[] => {
    const prog = getProgramBySlug(programSlug);
    if (!prog) return [];

    return prog.skills.map((skillSlug, index) => {
      if (state.certified[skillSlug]) return 'certified';
      const att = state.attempts[skillSlug];
      const isPriorCompleted = index === 0 || !!state.certified[prog.skills[index - 1]];

      if (isPriorCompleted) {
        if (state.inProgress[skillSlug] !== undefined) return 'in_progress';
        if (att && !att.passed) return 'completed';
        return 'available';
      }
      return 'locked';
    });
  };

  const getSkillAccess = (
    skillSlug: string
  ): {
    status: SkillStatus;
    blocker?: { program: any; prev: any } | null;
  } => {
    const skill = getSkillBySlug(skillSlug);
    if (!skill) return { status: 'locked' };

    if (state.certified[skillSlug]) {
      return { status: 'certified' };
    }

    let blocker: { program: any; prev: any } | null = null;

    for (const progSlug of skill.programs) {
      const prog = getProgramBySlug(progSlug);
      if (!prog) continue;
      const idx = prog.skills.indexOf(skillSlug);
      const statuses = getProgramStatuses(progSlug);
      const status = statuses[idx];

      if (status !== 'locked') {
        return { status };
      }

      if (!blocker && idx > 0) {
        blocker = {
          program: prog,
          prev: getSkillBySlug(prog.skills[idx - 1]),
        };
      }
    }

    return { status: 'locked', blocker };
  };

  const getCertificateById = (id?: string): Certificate | undefined => {
    if (!id) return undefined;
    const upper = id.toUpperCase();
    return state.certificates[upper] || DEFAULT_CERTIFICATES[upper];
  };

  return (
    <ProgressContext.Provider
      value={{
        state,
        candidateName: state.candidate,
        setCandidate,
        setInProgress,
        recordAttempt,
        simulateNext,
        resetProgram,
        unlockRoleCertificate,
        getSkillAccess,
        getProgramStatuses,
        getCertificateById,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
