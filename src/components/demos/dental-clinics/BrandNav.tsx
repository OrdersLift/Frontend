import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Smile, CalendarHeart } from 'lucide-react';
import { brand, navLinks } from './data';

export default function BrandNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-16 lg:top-20 z-40 bg-white/90 backdrop-blur-md border-b border-teal-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/demo/dental-clinics/" className="flex items-center gap-2.5 group">
            <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 text-white shadow-md shadow-teal-200 group-hover:scale-105 transition-transform">
              <Smile className="w-5 h-5" />
            </span>
            <span className="font-display font-extrabold text-lg text-slate-800 tracking-tight">
              {brand.name}
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks
              .filter((l) => l.name !== 'Book')
              .map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                >
                  {l.name}
                </a>
              ))}
            <a
              href="/demo/dental-clinics/book"
              className="ml-2 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-sm font-semibold shadow-md shadow-teal-200 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <CalendarHeart className="w-4 h-4" />
              Book Appointment
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-teal-50"
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
            className="md:hidden overflow-hidden bg-white border-t border-teal-100"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navLinks
                .filter((l) => l.name !== 'Book')
                .map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="px-3 py-2.5 rounded-lg text-slate-700 font-medium hover:bg-teal-50"
                  >
                    {l.name}
                  </a>
                ))}
              <a
                href="/demo/dental-clinics/book"
                onClick={() => setOpen(false)}
                className="mt-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold shadow-md"
              >
                <CalendarHeart className="w-4 h-4" />
                Book Appointment
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
