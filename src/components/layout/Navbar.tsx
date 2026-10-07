import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '../common/Button';

const NAV_LINKS = [
  { label: 'Programs', to: '/programs' },
  { label: 'Skills', to: '/skills' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Verify', to: '/verify' },
];

const MOBILE_LINKS = [
  { label: 'Programs', to: '/programs' },
  { label: 'Skills', to: '/skills' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Verify', to: '/verify' },
  { label: 'FAQ', to: '/faq' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'border-b border-border bg-background/85 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8"
        aria-label="Main"
      >
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors ${
                    isActive
                      ? 'text-foreground font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            to="/programs"
            variant="ghost"
            size="sm"
            arrow={false}
            className="hidden lg:inline-flex"
          >
            Explore Paths
          </Button>
          <Button to="/skills" size="sm" className="hidden md:inline-flex">
            Get Certified
          </Button>
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border md:hidden text-foreground"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden md:hidden border-b border-border bg-background"
          >
            <div className="space-y-1 px-5 pb-6 pt-2">
              {MOBILE_LINKS.map((item, idx) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * idx }}
                >
                  <NavLink
                    to={item.to}
                    className="block border-b border-border py-3.5 text-2xl font-medium tracking-tight"
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              <div className="flex gap-2 pt-5">
                <Button
                  to="/programs"
                  variant="outline"
                  arrow={false}
                  className="flex-1"
                >
                  Explore Paths
                </Button>
                <Button to="/skills" className="flex-1">
                  Get Certified
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
