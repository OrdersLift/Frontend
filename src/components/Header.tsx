import { Fragment, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { ChevronDown, Menu, Moon, Sun, X } from 'lucide-react';
import { brand, cta, nav, servicesMenu } from '../data/site';
import { collapse, duration, panel, pressTap, tr } from '../lib/motion';

/* The only string here that isn't in site.ts: `servicesMenu` ships the items
   but no label for the group that opens them. */
const SERVICES = 'Services';

// 15px/500 holds its own beside the CTA; 14px/400 read as fine print next to it.
const link = 'focus-ring relative rounded-md px-3 py-2 text-[15px] font-medium transition-colors';
const idle = 'text-body hover:text-ink';
const rowLink =
  'focus-ring block rounded-lg px-3 py-3 text-base transition-colors hover:bg-ink/5';

/* 2px bar sitting directly under the label of the current page. */
const Bar = () => (
  <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary-500" />
);

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  /* Empty until hydration so the server markup marks nothing active. */
  const [here, setHere] = useState('');

  const svcWrap = useRef<HTMLDivElement>(null);
  const svcBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const read = () => setHere(window.location.pathname + window.location.hash);
    read();
    window.addEventListener('hashchange', read);
    return () => window.removeEventListener('hashchange', read);
  }, []);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }, []);

  /* Escape + outside click, for whichever surface is open. */
  useEffect(() => {
    if (!svcOpen && !menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (svcOpen) svcBtn.current?.focus();
      setSvcOpen(false);
      setMenuOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (svcOpen && !svcWrap.current?.contains(e.target as Node)) setSvcOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [svcOpen, menuOpen]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', next === 'dark');
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch { /* storage unavailable */ }
    setTheme(next);
  };

  const isActive = (href: string) => (href.startsWith('#') ? here.endsWith(href) : here === href);
  const svcActive = servicesMenu.some((s) => isActive(s.href));
  const closeAll = () => { setMenuOpen(false); setSvcOpen(false); };

  // 44px touch target below lg, back to the compact chip once there is a cursor.
  // The icon swap is CSS, not state: `theme` is only known after hydration, so
  // rendering it from state flashed a Moon at dark-mode users on every load.
  const themeToggle = (
    <motion.button
      onClick={toggleTheme}
      whileTap={pressTap}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="focus-ring grid h-11 w-11 shrink-0 place-items-center rounded-lg border
                 border-rule text-primary-500 transition-colors
                 hover:border-primary-500/60 hover:bg-ink/5 lg:h-[38px] lg:w-[38px]"
    >
      <Sun className="hidden h-5 w-5 dark:block lg:h-[18px] lg:w-[18px]" />
      <Moon className="block h-5 w-5 dark:hidden lg:h-[18px] lg:w-[18px]" />
    </motion.button>
  );

  return (
    <MotionConfig reducedMotion="user">
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={tr(duration.base)}
        /* Border is always there, transparent at rest, so gaining the rule on
           scroll never shifts the 1px of layout underneath it. */
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled || menuOpen ? 'border-rule bg-paper/[0.92]' : 'border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="relative flex h-16 items-center justify-between gap-4 lg:h-[68px]">
            {/* Wordmark */}
            <a
              href="/"
              aria-label={brand.name}
              className="focus-ring -mx-1 shrink-0 rounded-md px-1 py-1 leading-none"
            >
              <span className="block font-display text-[19px] font-bold leading-none tracking-tight text-ink">
                Orders<span className="text-primary-500">Lift</span>
              </span>
              {/* 9px/0.16em keeps the two-line lockup inside the bar's height
                  instead of pushing it to the full 73px it was using. */}
              <span className="mt-[3px] block text-[9px] uppercase leading-none tracking-[0.16em] text-muted">
                {brand.tagline}
              </span>
            </a>

            {/* Desktop nav — Services sits after the first item */}
            <nav
              aria-label="Main"
              className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex"
            >
              {nav.map((item, i) => (
                <Fragment key={item.label}>
                  <a
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`${link} ${isActive(item.href) ? 'text-primary-500' : idle}`}
                  >
                    {item.label}
                    {isActive(item.href) && <Bar />}
                  </a>

                  {i === 0 && (
                    <div
                      ref={svcWrap}
                      className="relative"
                      /* Pointer-type guard: on a touch screen mouseenter fires
                         with the tap, which would open then immediately close. */
                      onPointerEnter={(e) => e.pointerType === 'mouse' && setSvcOpen(true)}
                      onPointerLeave={(e) => e.pointerType === 'mouse' && setSvcOpen(false)}
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget as Node)) setSvcOpen(false);
                      }}
                    >
                      <button
                        ref={svcBtn}
                        type="button"
                        onClick={() => setSvcOpen((v) => !v)}
                        aria-haspopup="true"
                        aria-expanded={svcOpen}
                        aria-controls="services-menu"
                        className={`${link} inline-flex items-center gap-1 ${
                          svcActive || svcOpen ? 'text-primary-500' : idle
                        }`}
                      >
                        {SERVICES}
                        <ChevronDown
                          aria-hidden="true"
                          className={`h-3.5 w-3.5 transition-transform duration-200 ${
                            svcOpen ? 'rotate-180' : ''
                          }`}
                        />
                        {svcActive && <Bar />}
                      </button>

                      <AnimatePresence>
                        {svcOpen && (
                          /* pt-2 is inside the positioned box on purpose: the
                             gap stays hoverable, so the pointer can travel from
                             the trigger to the list without closing it. */
                          <motion.div
                            id="services-menu"
                            variants={panel}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className="absolute left-1/2 top-full w-60 -translate-x-1/2 pt-2"
                          >
                            <ul className="surface-card elev-2 rounded-xl p-2">
                              {servicesMenu.map((s) => (
                                <li key={s.label}>
                                  <a
                                    href={s.href}
                                    onClick={closeAll}
                                    className="focus-ring block rounded-lg px-3 py-2 text-sm
                                               text-body transition-colors hover:bg-ink/5 hover:text-ink"
                                  >
                                    {s.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </Fragment>
              ))}
            </nav>

            {/* Right */}
            <div className="hidden shrink-0 items-center gap-3 lg:flex">
              {themeToggle}
              <a href={cta.primary.href} className="btn-primary btn-sm focus-ring">
                {cta.primary.label}
              </a>
            </div>

            <motion.button
              onClick={() => setMenuOpen((v) => !v)}
              whileTap={pressTap}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className="focus-ring -mr-2 grid h-11 w-11 shrink-0 place-items-center rounded-lg
                         text-body transition-colors hover:text-ink lg:hidden"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile panel */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-nav"
              variants={collapse}
              initial="collapsed"
              animate="open"
              exit="collapsed"
              className="overflow-hidden border-t border-rule bg-paper lg:hidden"
            >
              <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto px-5 py-4 sm:px-8">
                <nav aria-label="Mobile">
                  {nav.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={closeAll}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className={`${rowLink} ${isActive(item.href) ? 'text-primary-500' : 'text-body'}`}
                    >
                      {item.label}
                    </a>
                  ))}

                  <p className="px-3 pb-1 pt-5 text-[10px] uppercase tracking-[0.18em] text-muted">
                    {SERVICES}
                  </p>
                  {servicesMenu.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      onClick={closeAll}
                      className="focus-ring block rounded-lg px-3 py-2.5 text-sm text-body
                                 transition-colors hover:bg-ink/5 hover:text-ink"
                    >
                      {s.label}
                    </a>
                  ))}
                </nav>

                <div className="mt-5 flex items-center gap-3 border-t border-rule pt-5">
                  {themeToggle}
                  <a
                    href={cta.primary.href}
                    onClick={closeAll}
                    className="btn-primary focus-ring flex-1 justify-center"
                  >
                    {cta.primary.label}
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
