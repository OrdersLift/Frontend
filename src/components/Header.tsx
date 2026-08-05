import { useState, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { Menu, X, Zap, ChevronDown, Sun, Moon } from 'lucide-react';
import { collapse, duration, pressTap, tr } from '../lib/motion';

const demoItems = [
  { name: 'Restaurants',     href: '/demo/restaurants' },
  // { name: 'Dental Clinics',  href: '/demo/dental-clinics' },
  // { name: 'Gyms & Fitness',  href: '/demo/gyms-fitness' },
  // { name: 'Auto Garages',    href: '/demo/auto-garages' },
  // { name: 'Salons & Spas',   href: '/demo/salons-spas' },
  // { name: 'Law Firms',       href: '/demo/law-firms' },
  // { name: 'Hotels & B&Bs',   href: '/demo/hotels' },
  // { name: 'Retail Shops',    href: '/demo/retail-shops' },
  // { name: 'Real Estate',     href: '/demo/real-estate' },
  // { name: 'Clinics & Physio', href: '/demo/clinics-physio' },
];

const navLink =
  'text-neutral-600 hover:text-primary-700 hover:bg-primary-50 ' +
  'dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [mobileDemoOpen, setMobileDemoOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  // Individual demo sites keep their own fixed brand palette, so no toggle there.
  const [themeToggleVisible, setThemeToggleVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    setThemeToggleVisible(!/^\/demo\/.+/.test(window.location.pathname));
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', next === 'dark');
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch { /* storage unavailable */ }
    setTheme(next);
  };

  const navItems = [
    { name: 'Home',       href: '/#home' },
    // { name: 'Who We Serve', href: '/#industries' },
    { name: 'Services',   href: '/#products' },
    { name: 'Features',   href: '/#features' },
    { name: 'Pricing',    href: '/#pricing' },
  ];

  // 44px touch target below lg, back to the compact chip once there is a cursor.
  const themeToggle = (
    <motion.button
      onClick={toggleTheme}
      whileTap={pressTap}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="focus-ring grid place-items-center w-11 h-11 lg:w-9 lg:h-9 rounded-lg
                 border border-primary-500/30
                 text-primary-600 hover:bg-primary-50 hover:border-primary-500/60
                 dark:border-white/15 dark:text-accent-300 dark:hover:bg-white/5
                 transition-all duration-200"
    >
      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </motion.button>
  );

  return (
    <MotionConfig reducedMotion="user">
      {/* Height stays fixed at h-16 / lg:h-20 — a shrinking header is layout
          shift, and every section's scroll-mt-24 assumes a constant offset. */}
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={tr(duration.base)}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass elev-2 hairline-b'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 flex-shrink-0">
              <img src="/logo.png" alt="OrdersLift" className="h-10 w-auto" />
            </a>

            {/* Desktop Nav — centered */}
            <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`${navLink} px-4 py-2 rounded-lg text-sm font-medium
                             transition-all duration-200 relative group`}
                >
                  {item.name}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5
                                   bg-primary-500 rounded-full transition-all duration-300
                                   group-hover:w-4" />
                </a>
              ))}

              {/* Demo dropdown */}
              {/* <div
                className="relative"
                onMouseEnter={() => setDemoOpen(true)}
                onMouseLeave={() => setDemoOpen(false)}
              >
                <a
                  href="/demo"
                  className={`flex items-center gap-1 ${navLink} px-4 py-2 rounded-lg
                             text-sm font-medium transition-all duration-200`}
                >
                  Demo
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${demoOpen ? 'rotate-180' : ''}`}
                  />
                </a>

                <AnimatePresence>
                  {demoOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-56"
                    >
                      <div className="glass rounded-xl border border-primary-200/70 dark:border-white/10
                                      shadow-xl shadow-primary-900/10 dark:shadow-black/40 p-2">
                        {demoItems.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block text-neutral-700 hover:text-primary-700 hover:bg-primary-50
                                       dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5
                                       text-sm font-medium py-2 px-3 rounded-lg transition-all duration-200"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div> */}

              <a
                href="/#faq"
                className={`${navLink} px-4 py-2 rounded-lg text-sm font-medium
                           transition-all duration-200 relative group`}
              >
                FAQ
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5
                                 bg-primary-500 rounded-full transition-all duration-300
                                 group-hover:w-4" />
              </a>
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {themeToggleVisible && themeToggle}
              <a
                href="/#contact"
                className="btn-primary text-sm py-2 px-5"
              >
                <Zap className="w-4 h-4 mr-1.5" />
                Get Started
              </a>
            </div>

            {/* Mobile burger */}
            <div className="lg:hidden flex items-center gap-2">
              {themeToggleVisible && themeToggle}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileTap={pressTap}
                className="focus-ring grid place-items-center rounded-lg
                           min-w-[44px] min-h-[44px] lg:min-w-0 lg:min-h-0 p-2.5 lg:p-2
                           text-neutral-700 hover:text-primary-700 dark:text-slate-300
                           dark:hover:text-white transition-colors"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu — no child stagger: measuring `height: auto` while the
            children are still moving makes the panel jitter open. */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={collapse}
              initial="collapsed"
              animate="open"
              exit="collapsed"
              className="lg:hidden glass hairline-t overflow-hidden"
            >
              <div className="px-4 py-6 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-neutral-700 hover:text-primary-700 hover:bg-primary-50
                               dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5
                               font-medium py-3 px-4 rounded-lg transition-all duration-200"
                  >
                    {item.name}
                  </a>
                ))}

                {/* Mobile Demo accordion */}
                <button
                  onClick={() => setMobileDemoOpen((v) => !v)}
                  aria-expanded={mobileDemoOpen}
                  className="focus-ring w-full flex items-center justify-between text-neutral-700
                             hover:text-primary-700 hover:bg-primary-50 dark:text-slate-300
                             dark:hover:text-white dark:hover:bg-white/5
                             font-medium py-3 px-4 rounded-lg transition-all duration-200"
                >
                  Demo
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${mobileDemoOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {mobileDemoOpen && (
                    <motion.div
                      variants={collapse}
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      className="overflow-hidden pl-3"
                    >
                      {demoItems.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="block text-neutral-600 hover:text-primary-700 hover:bg-primary-50
                                     dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5
                                     text-sm font-medium py-2.5 px-4 rounded-lg transition-all duration-200"
                        >
                          {item.name}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <a
                  href="/#faq"
                  onClick={() => setIsOpen(false)}
                  className="block text-neutral-700 hover:text-primary-700 hover:bg-primary-50
                             dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5
                             font-medium py-3 px-4 rounded-lg transition-all duration-200"
                >
                  FAQ
                </a>

                <div className="pt-4">
                  <a href="/#contact" className="btn-primary w-full justify-center text-sm">
                    <Zap className="w-4 h-4 mr-1.5" />
                    Get Started
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </MotionConfig>
  );
};

export default Header;
