import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Menu, X, CalendarHeart } from 'lucide-react';

const links = [
  { name: 'Home', href: '/demo/clinics-physio/' },
  { name: 'Treatments', href: '/demo/clinics-physio/treatments' },
  { name: 'Our Team', href: '/demo/clinics-physio/team' },
  { name: 'Patient Info', href: '/demo/clinics-physio/info' },
];

export default function BrandNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-16 lg:top-20 z-40 bg-white/80 backdrop-blur-md border-b border-emerald-100 shadow-sm shadow-emerald-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/demo/clinics-physio/" className="flex items-center gap-2 group">
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/30 group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display font-bold text-lg text-slate-800 tracking-tight">Verdant</span>
              <span className="text-[10px] text-emerald-600 font-medium tracking-wide">PHYSIO &amp; HEALTH</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.name}
                href={l.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
              >
                {l.name}
              </a>
            ))}
            <a
              href="/demo/clinics-physio/book"
              className="ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-md shadow-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all"
            >
              <CalendarHeart className="w-4 h-4" />
              Book Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-700 hover:bg-emerald-50"
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
            className="md:hidden overflow-hidden border-t border-emerald-100 bg-white"
          >
            <div className="px-4 py-3 space-y-1">
              {links.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  {l.name}
                </a>
              ))}
              <a
                href="/demo/clinics-physio/book"
                className="block text-center mt-2 px-4 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-md"
              >
                Book an Appointment
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
