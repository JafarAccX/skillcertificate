# AcceleratorX Skill Certificates Platform

A complete reproduction and enhancement of the [Skill Certificates Platform](https://skill-great-path-pro.base44.app/), built using the exact technology stack of **AcceleratorX-Website** (`React 18`, `TypeScript`, `Vite`, `Tailwind CSS`, `Framer Motion`, `Lucide React`).

---

## 🚀 Tech Stack

- **Framework**: React 18 + TypeScript + Vite 5
- **Styling**: Tailwind CSS with custom CSS design tokens (`--brand`, `--brand-2`, `--surface`, `--success`, `--locked`, etc.)
- **Typography**: Geist, Geist Mono, Instrument Serif (loaded from Google Fonts)
- **Animation**: Framer Motion 11
- **Icons**: Lucide React
- **Routing**: React Router DOM v6
- **State & Storage**: Reactive `ProgressContext` synced with `localStorage` (`ax_progress_v1`) and window event dispatching for cross-component sync

---

## 📁 Routes & Pages

| Route | Page | Description |
|---|---|---|
| `/` | `HomePage` | Hero with interactive path progress widget, live streaming testimonials ticker, 10 career path collections, 4-step progression, scroll-driven skill path, 5-stage assessment simulator preview, audience cards, demo testimonials, pricing box, FAQ, and CTA. |
| `/programs` | `ProgramsPage` | Directory of 10 certification paths / career roles. |
| `/programs/:slug` | `ProgramDetailPage` | Full 12-skill timeline, circular progress ring, up-next skill prompt, demo controls (simulate / reset), and unlocked celebration modal. |
| `/skills` | `SkillsPage` | Searchable and filterable catalogue of all 120+ skill certifications with status indicators and pricing. |
| `/skills/:slug` | `SkillDetailPage` | In-depth skill overview, assessment stage breakdown, roles that count toward this skill, and purchase/assessment action panel. |
| `/assessment/:slug` | `AssessmentPage` | Interactive 4-stage assessment engine simulator: **Know** (scenario MCQs), **Think** (descriptive question with word counter), **Defend** (AI interviewer simulation), and **Build** (practical brief with deliverables and link submission). |
| `/assessment/:slug/result` | `AssessmentResultPage` | Detailed result breakdown across Knowledge, Reasoning, Interview, and Practical application, with pass/fail status and certificate generation. |
| `/certificate/:id` | `CertificatePage` | High-fidelity certificate canvas with unique ID, QR status, score breakdown, full-screen view modal, print/download, verify link, and share copy. |
| `/verify` | `VerifyPage` | Certificate verification portal supporting custom lookup and public demo ID (`AX-DEMO78`). |
| `/how-it-works` | `HowItWorksPage` | Deep dive into the four assessment steps and proof-of-work certification model. |
| `/faq` | `FaqPage` | Comprehensive collapsible FAQ accordion. |

---

## 🛠️ How to Run Locally

```bash
# In C:\Users\Lenovo\OneDrive\Desktop\skillcertificate
npm install
npm run dev
```

---

## 🔌 Integration into `AcceleratorX-Website`

Since this project was built specifically using the exact stack of `AcceleratorX-Website`, integration is effortless:

1. **Option A: Full Sub-Route Mounting**:
   - In `AcceleratorX-Website/src/routes/mainRoutes.tsx`, mount the pages under `/skill-certificates/*`.
   - Copy `src/context/ProgressContext.tsx` and `src/data/programsAndSkills.ts` into `AcceleratorX-Website/src/context/` and `src/data/`.
2. **Option B: Replace / Update `SkillCertificatesPage`**:
   - The components (`HeroProgressionWidget`, `InteractivePathScroll`, `AssessmentPreviewSection`, `ProgramCard`, `SkillCard`, etc.) can be directly imported into `AcceleratorX-Website/src/pages/skill-certificates/SkillCertificatesPage.tsx`.
3. **Styling Tokens**:
   - The CSS variables in `src/index.css` (`--brand`, `--brand-2`, `--surface`, `--success`, etc.) and typography definitions can be added directly to `AcceleratorX-Website`'s `index.html` and `src/index.css`.
