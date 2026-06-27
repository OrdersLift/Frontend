import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap, ChevronDown } from 'lucide-react';

const demoItems = [
  { name: 'Restaurants',     href: '/demo/restaurants' },
  { name: 'Dental Clinics',  href: '/demo/dental-clinics' },
  { name: 'Gyms & Fitness',  href: '/demo/gyms-fitness' },
  { name: 'Auto Garages',    href: '/demo/auto-garages' },
  { name: 'Salons & Spas',   href: '/demo/salons-spas' },
  { name: 'Law Firms',       href: '/demo/law-firms' },
  { name: 'Hotels & B&Bs',   href: '/demo/hotels' },
  { name: 'Retail Shops',    href: '/demo/retail-shops' },
  { name: 'Real Estate',     href: '/demo/real-estate' },
  { name: 'Clinics & Physio', href: '/demo/clinics-physio' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [mobileDemoOpen, setMobileDemoOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home',       href: '/#home' },
    { name: 'Industries', href: '/#industries' },
    { name: 'Services',   href: '/#products' },
    { name: 'Features',   href: '/#features' },
    { name: 'Pricing',    href: '/#pricing' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass shadow-lg shadow-black/20'
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
                className="text-slate-400 hover:text-white px-4 py-2 rounded-lg text-sm font-medium
                           transition-all duration-200 hover:bg-white/5 relative group"
              >
                {item.name}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5
                                 bg-primary-400 rounded-full transition-all duration-300
                                 group-hover:w-4" />
              </a>
            ))}

            {/* Demo dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDemoOpen(true)}
              onMouseLeave={() => setDemoOpen(false)}
            >
              <a
                href="/demo"
                className="flex items-center gap-1 text-slate-400 hover:text-white px-4 py-2 rounded-lg
                           text-sm font-medium transition-all duration-200 hover:bg-white/5"
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
                    <div className="glass rounded-xl border border-white/10 shadow-xl shadow-black/30 p-2">
                      {demoItems.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block text-slate-300 hover:text-white hover:bg-white/5
                                     text-sm font-medium py-2 px-3 rounded-lg transition-all duration-200"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="/#faq"
              className="text-slate-400 hover:text-white px-4 py-2 rounded-lg text-sm font-medium
                         transition-all duration-200 hover:bg-white/5 relative group"
            >
              FAQ
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5
                               bg-primary-400 rounded-full transition-all duration-300
                               group-hover:w-4" />
            </a>
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/#contact"
              className="btn-primary text-sm py-2 px-5"
            >
              <Zap className="w-4 h-4 mr-1.5" />
              Get Started
            </a>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-slate-300 hover:text-white p-2 transition-colors"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden glass border-t border-white/08 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-slate-300 hover:text-white hover:bg-white/5
                             font-medium py-3 px-4 rounded-lg transition-all duration-200"
                >
                  {item.name}
                </a>
              ))}

              {/* Mobile Demo accordion */}
              <button
                onClick={() => setMobileDemoOpen((v) => !v)}
                className="w-full flex items-center justify-between text-slate-300 hover:text-white
                           hover:bg-white/5 font-medium py-3 px-4 rounded-lg transition-all duration-200"
              >
                Demo
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${mobileDemoOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {mobileDemoOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden pl-3"
                  >
                    {demoItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block text-slate-400 hover:text-white hover:bg-white/5
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
                className="block text-slate-300 hover:text-white hover:bg-white/5
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
    </header>
  );
};

export default Header;
