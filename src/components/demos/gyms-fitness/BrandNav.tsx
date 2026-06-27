import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Dumbbell, Flame } from 'lucide-react';

const links = [
  { name: 'Home', href: '/demo/gyms-fitness/' },
  { name: 'Classes', href: '/demo/gyms-fitness/classes' },
  { name: 'Membership', href: '/demo/gyms-fitness/membership' },
  { name: 'Trainers', href: '/demo/gyms-fitness/trainers' },
  { name: 'Join', href: '/demo/gyms-fitness/join' },
];

export default function BrandNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-16 lg:top-20 z-40 bg-black/80 backdrop-blur-xl border-b border-lime-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/demo/gyms-fitness/" className="flex items-center gap-2 group">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-lime-400 text-black shadow-[0_0_18px_rgba(163,230,53,0.6)]">
              <Dumbbell className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight text-white">
              PULSE<span className="text-lime-400">FORGE</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.name}
                href={l.href}
                className="px-3 py-2 text-sm font-semibold text-zinc-300 hover:text-lime-400 transition-colors"
              >
                {l.name}
              </a>
            ))}
            <a
              href="/demo/gyms-fitness/join"
              className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-lime-400 px-5 py-2 text-sm font-bold text-black hover:bg-lime-300 transition-colors shadow-[0_0_18px_rgba(163,230,53,0.5)]"
            >
              <Flame className="h-4 w-4" /> Start Trial
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-lime-400/10 bg-black/95"
          >
            <div className="px-4 py-3 space-y-1">
              {links.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  className="block px-3 py-3 rounded-lg text-base font-semibold text-zinc-200 hover:bg-lime-400/10 hover:text-lime-400"
                >
                  {l.name}
                </a>
              ))}
              <a
                href="/demo/gyms-fitness/join"
                className="block text-center mt-2 rounded-full bg-lime-400 px-5 py-3 font-bold text-black"
              >
                Start Free Trial
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
