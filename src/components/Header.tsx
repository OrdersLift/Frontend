import { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';

const nav = [
  { name: 'What we do', href: '/#services' },
  { name: 'The work',   href: '/#work' },
  { name: 'How it runs', href: '/#process' },
  { name: 'Pricing',    href: '/#pricing' },
  { name: 'Questions',  href: '/#faq' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  // Demo sites carry their own fixed brand palette, so the toggle is hidden there.
  const [canToggle, setCanToggle] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    setCanToggle(!/^\/demo\/.+/.test(window.location.pathname));
  }, []);

  const flipTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', next === 'dark');
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch { /* storage unavailable */ }
    setTheme(next);
  };

  const themeButton = (
    <button
      type="button"
      onClick={flipTheme}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className="grid h-9 w-9 place-items-center rounded-[3px] border border-rule text-body transition-colors hover:border-ink hover:text-ink"
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled || open ? 'border-b border-rule bg-paper/95 backdrop-blur-sm' : 'border-b border-transparent'
      }`}
    >
      <div className="shell">
        <div className="flex h-16 items-center justify-between gap-6 lg:h-20">
          <a href="/" className="flex shrink-0 items-center gap-2.5" aria-label="OrdersLift — home">
            <img src="/logo.png" alt="" className="h-8 w-auto lg:h-9" />
            <span className="hidden sm:block">
              <span className="display block text-lg leading-none">OrdersLift</span>
              <span className="label block text-[9px] leading-tight">Restaurant growth</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.map((n) => (
              <a
                key={n.name}
                href={n.href}
                className="rounded-[3px] px-3 py-2 text-sm font-medium text-body transition-colors hover:text-ink"
              >
                {n.name}
              </a>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            {canToggle && themeButton}
            <a href="/#contact" className="btn btn-solid px-5 py-2.5 text-sm">
              Book a teardown
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            {canToggle && themeButton}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-9 w-9 place-items-center rounded-[3px] border border-rule text-ink"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t border-rule bg-paper lg:hidden">
          <nav className="shell grid py-3" aria-label="Primary, mobile">
            {nav.map((n) => (
              <a
                key={n.name}
                href={n.href}
                onClick={() => setOpen(false)}
                className="border-b border-rule py-3.5 text-base font-medium text-ink"
              >
                {n.name}
              </a>
            ))}
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="btn btn-solid mt-5 mb-2 w-full"
            >
              Book a teardown
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
