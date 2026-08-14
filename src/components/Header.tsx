import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { brand, cta, demosMenu, nav } from '../data/site';
import { collapse, duration, panel, pressTap, tr } from '../lib/motion';

// Services is a plain nav entry now, so every desktop link shares this.
const link = 'focus-ring relative rounded-md px-3 py-2 text-base font-semibold transition-colors';
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
  const [demosOpen, setDemosOpen] = useState(false);
  const demosRef = useRef<HTMLDivElement>(null);
  /* Both empty until hydration so the server markup marks nothing active. */
  const [path, setPath] = useState('');
  const [activeHash, setActiveHash] = useState('');


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setPath(window.location.pathname), []);

  /* Scroll spy. The old version read location.hash and only listened for
     hashchange, so the highlight sat wherever you last clicked and never moved
     while scrolling — the hash doesn't change on scroll.
     A section is "current" when it crosses a reading line just below the fixed
     header; the last match wins, so overlapping sections resolve to the lower
     one. rAF-throttled, and passive so it can't block scrolling. */
  useEffect(() => {
    if (path !== '/') return;
    const ids = [...new Set(
      nav
        .map((i) => i.href)
        .filter((h) => h.startsWith('#'))
        .map((h) => h.slice(1)),
    )];

    let frame = 0;
    const spy = () => {
      frame = 0;
      const line = 96; // clears the 68px bar with a little air
      let current = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= line && bottom > line) current = `#${id}`;
      }
      // The last section can be too short to reach the line, so the bottom of
      // the page claims it outright. "Last" means furthest down the document,
      // not last in `ids` — the Services entries sort to the end of that array
      // while their section sits near the top of the page.
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atEnd) {
        let lowest = '';
        let lowestTop = -1;
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.offsetTop > lowestTop) { lowestTop = el.offsetTop; lowest = id; }
        }
        if (lowest) current = `#${lowest}`;
      }
      setActiveHash(current);
    };

    const onScroll = () => { if (!frame) frame = requestAnimationFrame(spy); };
    spy();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [path]);

  /* Escape closes the mobile panel and the Demos dropdown. */
  useEffect(() => {
    if (!menuOpen && !demosOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setDemosOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen, demosOpen]);

  /* The Demos dropdown is narrow, so unlike the full-width mobile panel it does
     have an "outside" to click. */
  useEffect(() => {
    if (!demosOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!demosRef.current?.contains(e.target as Node)) setDemosOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [demosOpen]);

  /* Hash links track the scroll position; "/" is only current at the very top,
     before any section has claimed the reading line. */
  const isActive = (href: string) =>
    href.startsWith('#') ? path === '/' && activeHash === href : path === href && !activeHash;
  const closeAll = () => {
    setMenuOpen(false);
    setDemosOpen(false);
  };
  const onDemo = path.startsWith('/demo');

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
              {/* Accent-tinted mark: the brand red is only 2.3:1 on charcoal.
                  Empty alt — the link's aria-label names the brand once. */}
              <img
                src="/logo-h-dark.png"
                alt=""
                width={491}
                height={120}
                className="block h-9 w-auto"
              />
            </a>

            {/* Desktop nav — Services sits after the first item */}
            {/* Centred by flex, not by `absolute left-1/2`. Absolute centring
                caps the width at half the container, and seven 16px items no
                longer fit in that — "How It Works" broke onto two lines. */}
            <nav
              aria-label="Main"
              className="hidden flex-1 items-center justify-center gap-0.5 whitespace-nowrap lg:flex"
            >
              {nav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`${link} ${isActive(item.href) ? 'text-primary-500' : idle}`}
                >
                  {item.label}
                  {isActive(item.href) && <Bar />}
                </a>
              ))}

              {/* Demos dropdown — the one nav entry that leads off the marketing
                  site, so it gets a panel rather than a bare link. */}
              <div ref={demosRef} className="relative">
                <button
                  onClick={() => setDemosOpen((v) => !v)}
                  aria-expanded={demosOpen}
                  aria-haspopup="true"
                  className={`${link} inline-flex items-center gap-1 ${onDemo ? 'text-primary-500' : idle}`}
                >
                  Demos
                  <motion.span animate={{ rotate: demosOpen ? 180 : 0 }} transition={tr(duration.fast)}>
                    <ChevronDown size={16} />
                  </motion.span>
                  {onDemo && <Bar />}
                </button>

                <AnimatePresence>
                  {demosOpen && (
                    <motion.div
                      variants={panel}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="absolute left-1/2 top-full z-50 mt-2 w-[300px] -translate-x-1/2 overflow-hidden
                                 rounded-xl border border-rule bg-paper p-1.5 shadow-2xl shadow-black/40"
                    >
                      {demosMenu.map((d) => (
                        <a
                          key={d.href}
                          href={d.href}
                          onClick={closeAll}
                          className="focus-ring flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-ink/5"
                        >
                          <span className="text-xl leading-none">{d.emoji}</span>
                          <span>
                            <span className="block text-sm font-semibold text-ink">{d.label}</span>
                            <span className="block text-xs text-muted">{d.kind}</span>
                          </span>
                        </a>
                      ))}
                      <a
                        href="/demo/"
                        onClick={closeAll}
                        className="focus-ring mt-1 block border-t border-rule px-3 py-2.5 text-sm
                                   font-semibold text-primary-500 transition-colors hover:bg-ink/5"
                      >
                        See all demos →
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Right */}
            <div className="hidden shrink-0 items-center gap-3 lg:flex">
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

                  {/* No dropdown on mobile — the panel already scrolls, so the
                      demos just list inline under a heading. */}
                  <p className="mt-3 px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted">
                    Demos
                  </p>
                  {demosMenu.map((d) => (
                    <a
                      key={d.href}
                      href={d.href}
                      onClick={closeAll}
                      className={`${rowLink} flex items-center gap-3 text-body`}
                    >
                      <span className="text-lg leading-none">{d.emoji}</span>
                      {d.label}
                    </a>
                  ))}
                  <a href="/demo/" onClick={closeAll} className={`${rowLink} text-primary-500`}>
                    See all demos →
                  </a>
                </nav>

                <div className="mt-5 flex items-center gap-3 border-t border-rule pt-5">
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
