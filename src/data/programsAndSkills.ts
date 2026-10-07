import { Program, Skill, Stage, Testimonial } from '../types';

export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const STAGES: Stage[] = [
  {
    id: 'know',
    type: 'KNOW',
    title: 'MCQs',
    description: 'Baseline knowledge — scenario-based multiple choice.',
    duration: '15 min',
  },
  {
    id: 'think',
    type: 'THINK',
    title: 'Descriptive',
    description: "Reasoning — explain how you'd approach a real problem.",
    duration: '25 min',
  },
  {
    id: 'defend',
    type: 'DEFEND',
    title: 'AI Interview',
    description: 'Spoken understanding — defend your thinking to an AI interviewer.',
    duration: '20 min',
  },
  {
    id: 'build',
    type: 'BUILD',
    title: 'Practical Project',
    description: 'Practical application — complete a focused real-world task.',
    duration: '60–90 min',
  },
];

interface RawProgram {
  slug: string;
  name: string;
  role: string;
  area: string;
  image: string;
  description: string;
  skills: string[];
}

export const RAW_PROGRAMS: RawProgram[] = [
  {
    slug: 'ai-product-management',
    name: 'AI Product Management',
    role: 'AI Product Manager',
    area: 'product',
    image: 'https://media.base44.com/images/public/6ab7bee77689dc7dd13fa52e/09b351087_generated_image.png',
    description: 'Build verified proof across the core skills required for AI product management.',
    skills: [
      'Product Discovery',
      'User Research',
      'AI Product Strategy',
      'Product Requirements',
      'Prioritization',
      'Product Analytics',
      'AI UX',
      'Experimentation',
      'Prompt Engineering',
      'AI Prototyping',
      'Product Launch',
      'AI Product Case Study',
    ],
  },
  {
    slug: 'ai-data-analytics',
    name: 'AI Data Analytics',
    role: 'Data Analyst',
    area: 'analytics',
    image: 'https://media.base44.com/images/public/6ab7bee77689dc7dd13fa52e/9c50765b0_generated_image.png',
    description: 'Prove you can turn raw data into decisions — from SQL to predictive analytics.',
    skills: [
      'SQL Fundamentals',
      'Data Cleaning',
      'Exploratory Data Analysis',
      'Statistics for Analytics',
      'Excel Analytics',
      'Data Visualization',
      'Python for Analytics',
      'Business Analytics',
      'Dashboard Development',
      'Experimentation',
      'Predictive Analytics',
      'Data Analytics Case Study',
    ],
  },
  {
    slug: 'executive-leadership',
    name: 'Executive Leadership',
    role: 'Executive Leader',
    area: 'leadership',
    image: 'https://media.base44.com/images/public/6ab7bee77689dc7dd13fa52e/c01384239_generated_image.png',
    description: 'Certify the judgement, communication and strategic skills senior leaders are measured on.',
    skills: [
      'Strategic Thinking',
      'Decision Making',
      'Stakeholder Management',
      'Financial Acumen',
      'Leading Teams',
      'Change Management',
      'Communication & Influence',
      'OKRs & Goal Setting',
      'AI Strategy for Leaders',
      'Negotiation',
      'Hiring & Talent',
      'Leadership Case Study',
    ],
  },
  {
    slug: 'digital-marketing',
    name: 'AI Digital Marketing',
    role: 'Digital Marketing Specialist',
    area: 'marketing',
    image: 'https://media.base44.com/images/public/6ab7bee77689dc7dd13fa52e/83a806e9e_generated_image.png',
    description: 'Show you can research, reach and convert — across every modern marketing channel.',
    skills: [
      'Market Research',
      'Customer Segmentation',
      'Content Strategy',
      'SEO',
      'Performance Marketing',
      'Meta Advertising',
      'Google Advertising',
      'Marketing Analytics',
      'Conversion Optimization',
      'Email Marketing',
      'AI Marketing Automation',
      'Growth Strategy',
    ],
  },
  {
    slug: 'performance-marketing',
    name: 'Performance Marketing',
    role: 'Performance Marketer',
    area: 'paid growth',
    image: 'https://media.base44.com/images/public/6ab7bee77689dc7dd13fa52e/61c9ab37c_generated_image.png',
    description: 'Prove you can plan, run and scale paid campaigns that are accountable to numbers.',
    skills: [
      'Funnel Strategy',
      'Audience Targeting',
      'Meta Advertising',
      'Google Advertising',
      'Creative Testing',
      'Landing Page Optimization',
      'Attribution Modeling',
      'Marketing Analytics',
      'Budget & Bidding Strategy',
      'Retargeting',
      'Scaling Campaigns',
      'Performance Marketing Case Study',
    ],
  },
  {
    slug: 'software-development',
    name: 'Software Development',
    role: 'Software Developer',
    area: 'engineering',
    image: 'https://media.base44.com/images/public/6ab7bee77689dc7dd13fa52e/3ea248b29_generated_image.png',
    description: 'Certify the engineering fundamentals teams expect — from algorithms to system design.',
    skills: [
      'Programming Fundamentals',
      'Data Structures',
      'Algorithms',
      'Git & Version Control',
      'Web Fundamentals',
      'Frontend Development',
      'Backend Development',
      'Databases',
      'API Design',
      'Software Testing',
      'System Design',
      'Software Project',
    ],
  },
  {
    slug: 'generative-ai',
    name: 'Generative AI',
    role: 'Generative AI Specialist',
    area: 'AI',
    image: 'https://media.base44.com/images/public/6ab7bee77689dc7dd13fa52e/ac68e6509_generated_image.png',
    description: 'Prove you can design, build and evaluate real generative AI systems.',
    skills: [
      'Prompt Engineering',
      'LLM Fundamentals',
      'RAG Systems',
      'AI Agents',
      'Fine-Tuning',
      'Embeddings',
      'Vector Databases',
      'AI Evaluation',
      'Multimodal AI',
      'AI Safety & Guardrails',
      'AI Product Integration',
      'Generative AI Project',
    ],
  },
  {
    slug: 'ai-automation',
    name: 'Generative AI & Automation',
    role: 'AI Automation Specialist',
    area: 'automation',
    image: 'https://media.base44.com/images/public/6ab7bee77689dc7dd13fa52e/cc901df6c_generated_image.png',
    description: 'Certify that you can connect models, tools and APIs into automations that actually ship.',
    skills: [
      'Prompt Engineering',
      'LLM Fundamentals',
      'RAG Systems',
      'AI Agents',
      'Workflow Automation',
      'n8n Automation',
      'API Integration',
      'AI Evaluation',
      'Vector Databases',
      'AI Tool Orchestration',
      'Multi-Agent Systems',
      'AI Automation Project',
    ],
  },
  {
    slug: 'business-analytics',
    name: 'Business Analytics',
    role: 'Business Analyst',
    area: 'business',
    image: 'https://media.base44.com/images/public/6ab7bee77689dc7dd13fa52e/5dbe1242d_generated_image.png',
    description: 'Prove you can frame business problems, model them and recommend a decision.',
    skills: [
      'Business Problem Framing',
      'Requirements Gathering',
      'Process Mapping',
      'Excel Analytics',
      'SQL Fundamentals',
      'Data Visualization',
      'KPI Design',
      'Financial Analysis',
      'Market Sizing',
      'Stakeholder Management',
      'Business Case Writing',
      'Business Analytics Case Study',
    ],
  },
  {
    slug: 'product-marketing',
    name: 'Product Marketing',
    role: 'Product Marketing Manager',
    area: 'go-to-market',
    image: 'https://media.base44.com/images/public/6ab7bee77689dc7dd13fa52e/78b59d04f_generated_image.png',
    description: 'Certify the positioning, messaging and launch skills behind products people understand.',
    skills: [
      'Market Research',
      'Customer Segmentation',
      'Positioning',
      'Messaging',
      'Competitive Analysis',
      'Pricing Strategy',
      'Go-To-Market Strategy',
      'Sales Enablement',
      'Product Launch',
      'Content Strategy',
      'Customer Insights',
      'Product Marketing Case Study',
    ],
  },
];

const CUSTOM_DESCRIPTIONS: Record<string, string> = {
  'product-discovery': 'Prove that you can identify, frame, and validate a meaningful product problem.',
  'user-research': 'Prove you can plan research, talk to users without leading them, and turn findings into insight.',
  'ai-product-strategy': "Prove you can decide where AI creates real user value — and where it doesn't.",
  'prompt-engineering': 'Prove you can design, test and iterate prompts that produce reliable model output.',
  'sql-fundamentals': 'Prove you can query, join and aggregate data correctly to answer real questions.',
};

export const PROGRAMS: Program[] = RAW_PROGRAMS.map((p) => ({
  id: p.slug,
  slug: p.slug,
  name: p.name,
  role: p.role,
  area: p.area,
  image: p.image,
  description: p.description,
  finalCredential: p.role,
  skills: p.skills.map(slugify),
}));

export const SKILLS_MAP: Record<string, Skill> = {};

RAW_PROGRAMS.forEach((p) => {
  p.skills.forEach((skillName) => {
    const slug = slugify(skillName);
    if (!SKILLS_MAP[slug]) {
      SKILLS_MAP[slug] = {
        id: slug,
        slug,
        name: skillName,
        programId: p.slug,
        category: p.name,
        area: p.area,
        description:
          CUSTOM_DESCRIPTIONS[slug] ||
          `Prove you can apply ${skillName.toLowerCase()} to real ${p.area} work — assessed on knowledge, reasoning, spoken defence and a practical build.`,
        duration: '2–3 hours',
        price: 499,
        passScore: 60,
        stages: STAGES,
        assignments: [
          {
            id: `${slug}-build`,
            skillId: slug,
            title: `${skillName} practical brief`,
            type: 'project',
            duration: '60–90 min',
          },
        ],
        programs: [],
      };
    }
    SKILLS_MAP[slug].programs.push(p.slug);
  });
});

export const ALL_SKILLS: Skill[] = Object.values(SKILLS_MAP);

export const getProgramBySlug = (slug?: string): Program | undefined =>
  PROGRAMS.find((p) => p.slug === slug);

export const getSkillBySlug = (slug?: string): Skill | undefined =>
  SKILLS_MAP[slug || ''];

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?w=160&h=160&fit=crop&crop=faces&q=80`;

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Aria M.',
    role: 'Associate PM',
    skill: 'Product Discovery',
    quote: "I'd been doing discovery for two years with nothing to show for it. The build stage made me prove it properly.",
    avatar: unsplash('photo-1494790108377-be9c29b29330'),
    verified: true,
    demo: true,
    result: 'Added to portfolio',
  },
  {
    id: 't2',
    name: 'Daniel K.',
    role: 'Data Analyst',
    skill: 'SQL Fundamentals',
    quote: 'No videos to sit through. Straight into questions that felt like real work.',
    avatar: unsplash('photo-1507003211169-0a1dd7228f2d'),
    verified: true,
    demo: true,
    result: 'Scored 84%',
  },
  {
    id: 't3',
    name: 'Sofia R.',
    role: 'Marketing Lead',
    skill: 'Performance Marketing',
    quote: 'The AI interview was harder than I expected — in a good way. It pushed on the why.',
    avatar: unsplash('photo-1438761681033-6461ffad8d80'),
    verified: true,
    demo: true,
  },
  {
    id: 't4',
    name: 'Marcus L.',
    role: 'Career Switcher',
    skill: 'Python for Analytics',
    quote: 'Self-taught for a year. Finally something that measures what I can actually do.',
    avatar: unsplash('photo-1472099645785-5658abf4ff4e'),
    verified: false,
    demo: true,
    result: '3 / 12 on path',
  },
  {
    id: 't5',
    name: 'Leah T.',
    role: 'Product Designer',
    skill: 'AI UX',
    quote: 'Watching the path fill up is weirdly motivating. I booked the next skill the same day.',
    avatar: unsplash('photo-1534528741775-53994a69daeb'),
    verified: true,
    demo: true,
  },
  {
    id: 't6',
    name: 'Ethan W.',
    role: 'Software Engineer',
    skill: 'System Design',
    quote: 'The practical brief was specific enough to be fair and open enough to show judgement.',
    avatar: unsplash('photo-1500648767791-00dcc994a43e'),
    verified: true,
    demo: true,
    result: 'Scored 81%',
  },
  {
    id: 't7',
    name: 'Nora B.',
    role: 'Student',
    skill: 'Prompt Engineering',
    quote: "A few hours on a Saturday and I had a certificate with a verifiable ID. That's it.",
    avatar: unsplash('photo-1544005313-94ddf0286df2'),
    verified: false,
    demo: true,
  },
  {
    id: 't8',
    name: 'Jonas P.',
    role: 'Growth Manager',
    skill: 'Experimentation',
    quote: "Clear about what's being measured at every stage. No black box.",
    avatar: unsplash('photo-1506794778202-cad84cf45f1d'),
    verified: true,
    demo: true,
  },
];

export const FAQS = [
  [
    'Do I need to take a course?',
    "No. AcceleratorX certifies skills you already have. You go straight into the assessment — there's no course content to sit through.",
  ],
  [
    'How long does a skill assessment take?',
    'Most people finish all four stages in 2–3 hours. The practical build is the longest part, typically 60–90 minutes.',
  ],
  [
    'What happens if I fail?',
    "You'll see your score breakdown across knowledge, reasoning, interview and practical, so you know exactly where you fell short. No certificate is issued for that attempt.",
  ],
  [
    'Can I retake an assessment?',
    'Yes. Each retake is a new attempt at the standard ₹499 + GST price.',
  ],
  [
    'What does ₹499 include?',
    'One full attempt: MCQs, a descriptive assessment, an AI interview, a practical assignment, evaluation, and a skill certificate if you meet the required standard.',
  ],
  [
    'What is a skill certificate?',
    'A certificate for one specific skill, with your score, a unique certificate ID and an issue date that anyone can verify.',
  ],
  [
    'How does the role-level certification work?',
    'Each path has 12 required skills. Certify all of them and the role-level credential — for example AI Product Manager — unlocks automatically.',
  ],
  [
    'How many skills are required?',
    'Every current path requires 12 skill certifications. Some skills are shared between paths and count towards each of them.',
  ],
  [
    'Can I verify the certificate?',
    'Yes. Every certificate has an ID you can check on the Verify page.',
  ],
  [
    'Can I use it on my resume?',
    'Yes. Add the certificate and its ID to your resume or profile so others can verify it.',
  ],
];
