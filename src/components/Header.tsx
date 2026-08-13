import { Fragment, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
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
  /* Both empty until hydration so the server markup marks nothing active. */
  const [path, setPath] = useState('');
  const [activeHash, setActiveHash] = useState('');

  const svcWrap = useRef<HTMLDivElement>(null);
  const svcBtn = useRef<HTMLButtonElement>(null);

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
      [...nav, ...servicesMenu]
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

  /* Hash links track the scroll position; "/" is only current at the very top,
     before any section has claimed the reading line. */
  const isActive = (href: string) =>
    href.startsWith('#') ? path === '/' && activeHash === href : path === href && !activeHash;
  const svcActive = servicesMenu.some((s) => isActive(s.href));
  const closeAll = () => { setMenuOpen(false); setSvcOpen(false); };

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
