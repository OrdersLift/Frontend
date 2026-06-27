import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Scale, Phone } from 'lucide-react';
import { BRAND } from './data';

const links = [
  { name: 'Home', href: '/demo/law-firms/' },
  { name: 'Practice Areas', href: '/demo/law-firms/practice-areas' },
  { name: 'Attorneys', href: '/demo/law-firms/attorneys' },
  { name: 'Resources', href: '/demo/law-firms/resources' },
];

export default function BrandNav() {
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState('');

  useEffect(() => {
    setPath(window.location.pathname.replace(/\/$/, ''));
  }, []);

  const isActive = (href: string) => {
    const h = href.replace(/\/$/, '');
    return path === h || (h !== '/demo/law-firms' && path.startsWith(h));
  };

  return (
    <nav className="sticky top-16 lg:top-20 z-40 bg-[#0f1a2e]/95 backdrop-blur-md border-b border-amber-500/20 shadow-lg shadow-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/demo/law-firms/" className="flex items-center gap-2.5 group">
            <span className="flex items-center justify-center w-9 h-9 rounded-sm bg-gradient-to-br from-amber-400 to-yellow-600 text-[#0f1a2e] shadow-md">
              <Scale className="w-5 h-5" strokeWidth={2.2} />
            </span>
            <span className="font-serif leading-tight">
              <span className="block text-lg font-semibold text-white tracking-wide group-hover:text-amber-300 transition-colors">
                {BRAND.name}
              </span>
              <span className="block text-[10px] uppercase tracking-[0.35em] text-amber-400/80">
                {BRAND.suffix} · Attorneys
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`px-3.5 py-2 text-sm font-medium tracking-wide transition-colors relative ${
                  isActive(l.href) ? 'text-amber-300' : 'text-slate-300 hover:text-white'
                }`}
              >
                {l.name}
                {isActive(l.href) && (
                  <span className="absolute left-3.5 right-3.5 -bottom-0.5 h-0.5 bg-amber-400 rounded-full" />
                )}
              </a>
            ))}
            <a
              href={`tel:${BRAND.phone.replace(/[^+\d]/g, '')}`}
              className="ml-2 hidden lg:flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {BRAND.phone}
            </a>
            <a
              href="/demo/law-firms/book"
              className="ml-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-gradient-to-br from-amber-400 to-yellow-600 text-[#0f1a2e] text-sm font-semibold tracking-wide shadow-lg shadow-amber-900/30 hover:shadow-amber-700/40 hover:-translate-y-0.5 transition-all"
            >
              Book Consultation
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden text-slate-200 p-2"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-amber-500/10 bg-[#0f1a2e]"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-3 rounded-sm text-sm font-medium ${
                    isActive(l.href)
                      ? 'bg-amber-400/10 text-amber-300'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  {l.name}
                </a>
              ))}
              <a
                href="/demo/law-firms/book"
                onClick={() => setOpen(false)}
                className="block text-center mt-3 px-5 py-3 rounded-sm bg-gradient-to-br from-amber-400 to-yellow-600 text-[#0f1a2e] font-semibold"
              >
                Book Consultation
              </a>
              <a
                href={`tel:${BRAND.phone.replace(/[^+\d]/g, '')}`}
                className="block text-center text-xs text-slate-400 pt-2"
              >
                {BRAND.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
