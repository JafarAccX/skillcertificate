export type SkillStatus = 'locked' | 'available' | 'in_progress' | 'completed' | 'certified';

export interface Stage {
  id: string;
  type: string;
  title: string;
  description: string;
  duration: string;
}

export interface Assignment {
  id: string;
  skillId: string;
  title: string;
  type: string;
  duration: string;
}

export interface Skill {
  id: string;
  slug: string;
  name: string;
  programId: string;
  category: string;
  area: string;
  description: string;
  duration: string;
  price: number;
  passScore: number;
  stages: Stage[];
  assignments: Assignment[];
  programs: string[];
}

export interface Program {
  id: string;
  slug: string;
  name: string;
  role: string;
  area: string;
  image: string;
  description: string;
  skills: string[]; // skill slugs
  finalCredential: string;
}

export interface Breakdown {
  knowledge: number;
  reasoning: number;
  interview: number;
  practical: number;
}

export interface Attempt {
  score: number;
  breakdown: Breakdown;
  passed: boolean;
  simulated?: boolean;
  date: string;
  certId?: string;
}

export interface Certificate {
  id: string;
  type: 'skill' | 'role';
  skillId?: string;
  programId?: string;
  candidate: string;
  score: number;
  issueDate: string;
  verificationStatus: 'demo' | 'verified-demo' | 'verified';
  completedSkills?: number;
  totalSkills?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  skill: string;
  quote: string;
  avatar: string;
  verified: boolean;
  demo: boolean;
  result?: string;
}

export interface ProgressState {
  certified: Record<string, { certId: string; score: number; date: string }>;
  attempts: Record<string, Attempt>;
  inProgress: Record<string, number>;
  roleCerts: Record<string, string>;
  certificates: Record<string, Certificate>;
  candidate: string;
}
