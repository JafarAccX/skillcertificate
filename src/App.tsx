import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { ProgressProvider } from './context/ProgressContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ProgramsPage } from './pages/ProgramsPage';
import { ProgramDetailPage } from './pages/ProgramDetailPage';
import { SkillsPage } from './pages/SkillsPage';
import { SkillDetailPage } from './pages/SkillDetailPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { AssessmentResultPage } from './pages/AssessmentResultPage';
import { CertificatePage } from './pages/CertificatePage';
import { VerifyPage } from './pages/VerifyPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { FaqPage } from './pages/FaqPage';
import { NotFoundPage } from './pages/NotFoundPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <Navbar />
      <motion.main
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/programs/:slug" element={<ProgramDetailPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/skills/:slug" element={<SkillDetailPage />} />
          <Route path="/assessment/:slug" element={<AssessmentPage />} />
          <Route
            path="/assessment/:slug/result"
            element={<AssessmentResultPage />}
          />
          <Route path="/certificate/:id" element={<CertificatePage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.main>
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Layout />
        </BrowserRouter>
      </ProgressProvider>
    </ThemeProvider>
  );
}

export default App;
