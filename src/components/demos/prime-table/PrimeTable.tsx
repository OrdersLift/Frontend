import { useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { Menu, X, Send } from 'lucide-react';

/* Prime Table — high-end steakhouse demo brand.
   Onyx + gold, hairline rules, glass panels. Everything is slower and quieter
   than the QSR demo on purpose; the restraint is the brand. */

const GOLD = '#c9a24b';
const GOLD_LIGHT = '#e8cd8a';

const NAV = [
  ['About', '#about'],
  ['Menu', '#menu'],
  ['Reservations', '#reservations'],
  ['Order', '#order'],
  ['Catering', '#catering'],
  ['Events', '#events'],
  ['Gallery', '#gallery'],
  ['Reviews', '#reviews'],
  ['Contact', '#contact'],
] as const;

/* Ordered by upper bound — `find` returns the first level the slider fits in. */
const DONENESS = [
  { max: 15, name: 'BLUE RARE · 115°F', from: '#9c3a2a', to: '#4a1810', sear: 0.15 },
  { max: 35, name: 'RARE · 120°F', from: '#8a3122', to: '#3d140d', sear: 0.3 },
  { max: 55, name: 'MEDIUM RARE · 130°F', from: '#7a2d1e', to: '#3a120c', sear: 0.45 },
  { max: 75, name: 'MEDIUM · 140°F', from: '#6b3220', to: '#34140c', sear: 0.65 },
  { max: 90, name: 'MEDIUM WELL · 150°F', from: '#5c3521', to: '#2e150d', sear: 0.8 },
  { max: 101, name: 'WELL DONE · 160°F+', from: '#4a3220', to: '#24150e', sear: 0.95 },
];

const MENU_TABS = ['Steaks', 'Starters', 'Sides', 'Seafood', 'Wine', 'Dessert'] as const;

const MENU: Record<string, { name: string; desc: string; price: string }[]> = {
  Steaks: [
    { name: 'Bone-In Ribeye, 22oz', desc: '45-day dry-aged, hardwood fire, bone marrow butter.', price: '$78' },
    { name: 'Filet Mignon, 8oz', desc: 'Center-cut, black garlic jus, roasted shallot.', price: '$62' },
    { name: 'Tomahawk for Two', desc: '36oz, tableside carve, chimichurri, smoked salt.', price: '$145' },
    { name: 'New York Strip, 16oz', desc: '28-day aged, café de Paris butter.', price: '$58' },
    { name: 'Wagyu Flight, A5', desc: 'Three-cut tasting, torched, ponzu, yuzu salt.', price: '$96' },
    { name: 'Dry-Aged Porterhouse', desc: '32oz, 40-day age, bordelaise.', price: '$112' },
  ],
  Starters: [
    { name: 'Beef Tartare', desc: 'Hand-cut prime, cured yolk, sourdough crisp.', price: '$26' },
    { name: 'Oysters, Half Dozen', desc: 'East coast selection, mignonette, horseradish.', price: '$24' },
    { name: 'Bone Marrow', desc: 'Roasted, parsley salad, grilled levain.', price: '$21' },
    { name: 'Charred Octopus', desc: 'Smoked paprika, potato, lemon oil.', price: '$28' },
  ],
  Sides: [
    { name: 'Truffle Creamed Spinach', desc: 'Black truffle, aged parmesan.', price: '$16' },
    { name: 'Duck Fat Potatoes', desc: 'Triple-cooked, rosemary salt.', price: '$14' },
    { name: 'Charred Broccolini', desc: 'Chilli, garlic, anchovy butter.', price: '$13' },
    { name: 'Mac & Gruyère', desc: 'Three-cheese, brioche crumb.', price: '$15' },
  ],
  Seafood: [
    { name: 'Butter-Poached Lobster', desc: 'Whole tail, tarragon, brown butter.', price: '$68' },
    { name: 'Chilean Sea Bass', desc: 'Miso glaze, bok choy, dashi.', price: '$52' },
    { name: 'Diver Scallops', desc: 'Seared, cauliflower, brown butter capers.', price: '$44' },
    { name: 'Surf & Turf', desc: '8oz filet, half lobster tail, béarnaise.', price: '$89' },
  ],
  Wine: [
    { name: 'Cabernet Sauvignon, 2018', desc: 'Napa Valley — bold, cassis, cedar.', price: '$120' },
    { name: 'Barolo, 2016', desc: 'Piedmont — rose, tar, long finish.', price: '$165' },
    { name: 'Châteauneuf-du-Pape, 2017', desc: 'Rhône — garrigue, dark fruit.', price: '$140' },
    { name: 'Champagne Brut NV', desc: 'Grower cuvée, brioche, citrus.', price: '$95' },
  ],
  Dessert: [
    { name: 'Basque Cheesecake', desc: 'Burnt top, crème fraîche, black cherry.', price: '$18' },
    { name: 'Chocolate Marquise', desc: '70% ganache, olive oil, sea salt.', price: '$19' },
    { name: 'Tarte Tatin for Two', desc: 'Caramelised apple, vanilla bean cream.', price: '$24' },
    { name: 'Cheese Selection', desc: 'Five cheeses, honeycomb, walnut bread.', price: '$28' },
  ],
};

const SLOTS = [
  { t: '5:30p', full: false },
  { t: '6:00p', full: true },
  { t: '6:30p', full: false },
  { t: '7:00p', full: false },
  { t: '7:30p', full: true },
  { t: '8:00p', full: false },
  { t: '8:30p', full: false },
  { t: '9:00p', full: true },
];

const SERVICES = [
  {
    num: '01 — ONLINE ORDERING',
    id: 'ordering',
    title: 'Pickup & Delivery',
    body: 'Order the full menu for pickup or delivery, pay securely, and track your order from the kitchen to your door.',
    cta: 'Start an Order',
    track: true,
  },
  {
    num: '02 — CATERING',
    id: 'catering',
    title: 'Private Catering',
    body: 'Full-service steakhouse catering for offices, weddings, and milestone gatherings, from 20 to 400 guests.',
    cta: 'Request a Quote',
    track: false,
  },
  {
    num: '03 — PRIVATE EVENTS',
    id: 'events',
    title: 'Events & Buyouts',
    body: "Book our private dining room or a full restaurant buyout, with a dedicated chef's tasting menu.",
    cta: 'Plan an Event',
    track: false,
  },
];

const GALLERY = [
  { span: 'row-span-2', emoji: '🥩' },
  { span: '', emoji: '🔥' },
  { span: 'col-span-2', emoji: '🍷' },
  { span: '', emoji: '🕯️' },
  { span: '', emoji: '🦞' },
  { span: 'row-span-2', emoji: '🧑‍🍳' },
  { span: 'col-span-2', emoji: '🍽️' },
];

const REVIEWS = [
  { stars: 5, text: 'The tomahawk for two was a genuine event — the tableside carve alone is worth the trip.', who: '— Marcus D., Google Reviews' },
  { stars: 5, text: "Best dry-aged ribeye I've had outside of a butcher shop. The room feels special without being stiff.", who: '— Priya S., Yelp' },
  { stars: 4, text: 'Reserved a table in seconds through the site and the AI assistant even recommended the perfect wine.', who: '— James O., OpenTable' },
  { stars: 5, text: 'Hosted our anniversary dinner in the private room — flawless service from start to finish.', who: '— Ana R., Google Reviews' },
];

const CANNED = [
  'The Tomahawk for Two is our most-loved dish tonight — carved tableside and easily worth the wait.',
  'I can hold a table for you — what time and party size works best?',
  "For a bone-in ribeye, I'd pair our 2018 Cabernet — bold enough to match the char.",
  'Happy to help with that! For anything more specific, our host team can confirm details by phone.',
];

/* ── shared motion ───────────────────────────────────────────────── */
const viewport = { once: true, amount: 0.15, margin: '0px 0px -10% 0px' } as const;
const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = (s = 0.09) => ({ hidden: {}, show: { transition: { staggerChildren: s } } });

const Reveal = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div variants={rise} initial="hidden" whileInView="show" viewport={viewport} transition={{ delay }} className={className}>
    {children}
  </motion.div>
);

const Eyebrow = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <span className={`ptb-mono mb-3.5 block text-[11px] uppercase tracking-[0.28em] text-[#c9a24b] ${className}`}>{children}</span>
);

const Btn = ({
  href = '#',
  solid = false,
  children,
  className = '',
}: {
  href?: string;
  solid?: boolean;
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.a
    href={href}
    whileHover={{ y: -2 }}
    whileTap={{ y: 0, scale: 0.98 }}
    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    className={`ptb-mono inline-block rounded-sm border px-[22px] py-3 text-[11px] uppercase tracking-[0.14em] transition-colors duration-300 ${
      solid
        ? 'border-[#c9a24b] bg-[#c9a24b] text-[#0b0b0d] hover:bg-[#e8cd8a]'
        : 'border-[#c9a24b] text-[#e8cd8a] hover:bg-[#c9a24b] hover:text-[#0b0b0d]'
    } ${className}`}
  >
    {children}
  </motion.a>
);

const Field = ({ id, label, ...rest }: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <label htmlFor={id} className="ptb-mono mb-2 block text-[11px] uppercase tracking-[0.08em] text-[#c9c4b8]">
      {label}
    </label>
    <input
      id={id}
      {...rest}
      className="w-full rounded border border-[#c9a24b]/[0.22] bg-black/25 px-3.5 py-3 text-sm text-[#f5f1e8] outline-none transition-colors focus:border-[#c9a24b]"
    />
  </div>
);

/* ── page ────────────────────────────────────────────────────────── */
export default function PrimeTable() {
  const reduced = useReducedMotion();
  const [navOpen, setNavOpen] = useState(false);
  const [doneness, setDoneness] = useState(45);
  const [tab, setTab] = useState<string>('Steaks');
  const [slot, setSlot] = useState('6:30p');
  const [chatOpen, setChatOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [msgs, setMsgs] = useState([
    { from: 'bot', text: "Good evening — I'm Ember. I can help you book a table, walk you through tonight's menu, or recommend a pairing. What would you like?" },
  ]);
  const [draft, setDraft] = useState('');

  const level = DONENESS.find((l) => doneness <= l.max) ?? DONENESS[DONENESS.length - 1];

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setDraft('');
    setMsgs((m) => [...m, { from: 'user', text }]);
    setTimeout(() => setMsgs((m) => [...m, { from: 'bot', text: CANNED[Math.floor(Math.random() * CANNED.length)] }]), 600);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="ptb-root min-h-screen bg-[#0b0b0d] text-[#f5f1e8] antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[1000] focus:bg-[#c9a24b] focus:px-4 focus:py-2.5 focus:text-[#0b0b0d]">
          Skip to main content
        </a>

        {/* ── NAV ─────────────────────────────────────────────── */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-0 z-[100] border-b border-[#c9a24b]/[0.22] bg-[#0b0b0d]/[0.55] backdrop-blur-[14px] backdrop-saturate-150"
        >
          <div className="flex items-center justify-between px-6 py-5 sm:px-8">
            <a href="/demo/prime-table/" className="ptb-display text-2xl tracking-[0.06em]">
              PRIME <span className="text-[#c9a24b]">TABLE</span>
            </a>

            <nav aria-label="Primary" className="hidden gap-8 text-[13px] tracking-[0.04em] xl:flex">
              {NAV.map(([label, href]) => (
                <a key={href} href={href} className="group relative py-1 text-[#c9c4b8] transition-colors hover:text-[#f5f1e8]">
                  {label}
                  <span className="absolute inset-x-0 bottom-0 h-px w-0 bg-[#c9a24b] transition-[width] duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3.5">
              <select
                aria-label="Select language"
                className="rounded-sm border border-[#c9a24b]/[0.22] bg-transparent px-2.5 py-2 text-xs text-[#c9c4b8] outline-none"
              >
                {['EN', 'ES', 'हिं', 'FR'].map((l) => (
                  <option key={l} className="bg-[#17161a]">
                    {l}
                  </option>
                ))}
              </select>
              <Btn href="#reservations" solid className="hidden sm:inline-block">
                Reserve
              </Btn>
              <button
                onClick={() => setNavOpen((v) => !v)}
                aria-label={navOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={navOpen}
                className="grid h-11 w-11 place-items-center text-[#e8cd8a] xl:hidden"
              >
                {navOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {navOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.32, ease: [0.65, 0, 0.35, 1] }}
                className="overflow-hidden border-t border-[#c9a24b]/[0.22] bg-[#0b0b0d] xl:hidden"
              >
                <div className="px-6 py-3">
                  {NAV.map(([label, href]) => (
                    <a
                      key={href}
                      href={href}
                      onClick={() => setNavOpen(false)}
                      className="block rounded px-3 py-2.5 text-sm text-[#c9c4b8] hover:bg-[#c9a24b]/10 hover:text-[#f5f1e8]"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </motion.header>

        <main id="main">
          {/* ── HERO ──────────────────────────────────────────── */}
          <section
            className="flex min-h-screen items-center px-6 pb-24 pt-[130px]"
            style={{
              background:
                'radial-gradient(ellipse at 20% 20%, rgba(201,162,75,0.10), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(201,162,75,0.06), transparent 55%), #0b0b0d',
            }}
          >
            <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
              <motion.div variants={stagger(0.11)} initial="hidden" animate="show">
                <motion.div variants={rise}>
                  <Eyebrow>Modern American Steakhouse · Est. 2014</Eyebrow>
                </motion.div>
                <motion.h1 variants={rise} className="ptb-display text-[clamp(42px,6vw,74px)] font-medium italic leading-[1.02]">
                  Fire, patience,
                  <br />
                  <em className="not-italic text-[#e8cd8a]">and the perfect table.</em>
                </motion.h1>
                <motion.p variants={rise} className="mt-6 max-w-[440px] text-base leading-[1.7] text-[#c9c4b8]">
                  Dry-aged prime cuts, live-fire cooking, and a wine list built over a decade — served in a room built
                  for the moments that deserve one.
                </motion.p>
                <motion.div variants={rise} className="mt-9 flex flex-wrap gap-4">
                  <Btn href="#reservations" solid>
                    Reserve a Table
                  </Btn>
                  <Btn href="#menu">View the Menu</Btn>
                </motion.div>
              </motion.div>

              {/* Doneness dial — the signature interaction */}
              <motion.div
                initial={{ opacity: 0, y: 44 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-md border border-[#c9a24b]/[0.22] bg-gradient-to-b from-[#17161a] to-[#1f1d22] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
              >
                <Eyebrow className="mb-1.5">Try it</Eyebrow>
                <h2 className="ptb-display mb-6 text-xl text-[#f5f1e8]">How do you take your steak?</h2>

                <div className="flex flex-col items-center gap-5">
                  <motion.div
                    animate={{ background: `radial-gradient(ellipse at 50% 40%, ${level.from}, ${level.to} 75%)` }}
                    transition={{ duration: 0.4 }}
                    className="relative h-[120px] w-[180px] overflow-hidden rounded-[14px] shadow-[inset_0_0_30px_rgba(0,0,0,0.5),0_12px_30px_rgba(0,0,0,0.4)]"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 mix-blend-multiply"
                      style={{ backgroundImage: 'repeating-linear-gradient(115deg, rgba(0,0,0,0.18) 0 3px, transparent 3px 14px)' }}
                    />
                    <motion.span
                      aria-hidden
                      animate={{ opacity: level.sear }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0"
                      style={{ background: 'repeating-linear-gradient(65deg, rgba(20,10,5,0.55) 0 2px, transparent 2px 20px)' }}
                    />
                  </motion.div>

                  <motion.div key={level.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="ptb-mono text-xs tracking-[0.08em] text-[#e8cd8a]">
                    {level.name}
                  </motion.div>

                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={doneness}
                    onChange={(e) => setDoneness(+e.target.value)}
                    aria-label="Choose steak doneness"
                    className="ptb-range w-full"
                  />
                  <div className="ptb-mono flex w-full justify-between text-[10px] tracking-[0.05em] text-[#c9c4b8]">
                    <span>RARE</span>
                    <span>MED</span>
                    <span>WELL</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── ABOUT ─────────────────────────────────────────── */}
          <section id="about" className="scroll-mt-20 bg-[#17161a] px-6 py-28">
            <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
              <Reveal>
                <motion.div
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.5 }}
                  className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-md border border-[#c9a24b]/[0.22] bg-gradient-to-br from-[#26221c] to-[#0b0b0d] text-[90px]"
                >
                  <motion.span animate={reduced ? {} : { scale: [1, 1.06, 1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
                    🔥
                  </motion.span>
                  <span className="ptb-mono absolute bottom-5 left-5 text-[11px] tracking-[0.1em] text-[#e8cd8a] opacity-70">
                    PRIME TABLE · EST. 2014
                  </span>
                </motion.div>
              </Reveal>

              <Reveal delay={0.1}>
                <Eyebrow>Our Story</Eyebrow>
                <h2 className="ptb-display text-[clamp(30px,4vw,46px)] font-medium italic">A room built around the fire.</h2>
                <p className="mt-[18px] text-[15px] leading-[1.8] text-[#c9c4b8]">
                  Prime Table opened with one idea: the steakhouse should feel as considered as the cut on the plate.
                  Our beef is dry-aged in-house for a minimum of 28 days, finished over live hardwood, and rested before
                  it ever reaches the pass. Every table is a reservation for time as much as for dinner.
                </p>
                <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport} className="mt-9 flex flex-wrap gap-10">
                  {[
                    ['28+', 'Days Dry-Aged'],
                    ['340', 'Wine Labels'],
                    ['11', 'Years Open'],
                    ['4.9', 'Avg. Rating'],
                  ].map(([n, label]) => (
                    <motion.div key={label} variants={rise}>
                      <b className="ptb-display block text-4xl text-[#e8cd8a]">{n}</b>
                      <span className="text-xs tracking-[0.05em] text-[#c9c4b8]">{label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </Reveal>
            </div>
          </section>

          {/* ── MENU ──────────────────────────────────────────── */}
          <section id="menu" className="scroll-mt-20 px-6 py-28">
            <div className="mx-auto max-w-[1180px]">
              <Reveal className="mb-14 max-w-[640px]">
                <Eyebrow>Digital Menu</Eyebrow>
                <h2 className="ptb-display text-[clamp(30px,4vw,46px)] font-medium italic">Tonight's selections.</h2>
              </Reveal>

              <Reveal className="mb-10 flex flex-wrap gap-2.5">
                {MENU_TABS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`ptb-mono relative rounded-full border px-[18px] py-2.5 text-[11px] uppercase tracking-[0.1em] transition-colors ${
                      tab === t ? 'border-[#c9a24b] text-[#e8cd8a]' : 'border-[#c9a24b]/[0.22] text-[#c9c4b8] hover:border-[#c9a24b] hover:text-[#e8cd8a]'
                    }`}
                  >
                    {tab === t && (
                      <motion.span layoutId="pt-tab" className="absolute inset-0 rounded-full bg-[#c9a24b]/[0.08]" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                    )}
                    <span className="relative">{t}</span>
                  </button>
                ))}
              </Reveal>

              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  variants={stagger(0.05)}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                  className="grid grid-cols-1 gap-px overflow-hidden rounded-md border border-[#c9a24b]/[0.22] bg-[#c9a24b]/[0.22] md:grid-cols-2"
                >
                  {MENU[tab].map((m) => (
                    <motion.div
                      key={m.name}
                      variants={rise}
                      className="flex justify-between gap-5 bg-[#17161a] px-7 py-6 transition-colors duration-300 hover:bg-[#1f1d22]"
                    >
                      <div>
                        <div className="ptb-display mb-1 text-lg">{m.name}</div>
                        <div className="max-w-[280px] text-[13px] leading-[1.6] text-[#c9c4b8]">{m.desc}</div>
                      </div>
                      <div className="ptb-mono whitespace-nowrap pt-0.5 text-[15px] text-[#e8cd8a]">{m.price}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              <Reveal className="mt-9">
                <div className="ptb-glass flex items-center gap-4 rounded-md p-5">
                  <span
                    role="img"
                    aria-label="QR code to open the digital menu on your phone"
                    className="h-14 w-14 shrink-0 rounded"
                    style={{
                      background:
                        'repeating-linear-gradient(0deg, #000 0 4px, #f5f1e8 4px 8px), repeating-linear-gradient(90deg, #000 0 4px, transparent 4px 8px)',
                      backgroundBlendMode: 'multiply',
                    }}
                  />
                  <p className="text-[13px] text-[#c9c4b8]">
                    Scan at your table to open the live digital menu, ask "Ember" the AI assistant for pairings, or place
                    an order directly from your phone.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── RESERVATIONS ──────────────────────────────────── */}
          <section id="reservations" className="scroll-mt-20 bg-[#17161a] px-6 py-28">
            <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-14 lg:grid-cols-2">
              <Reveal>
                <Eyebrow>Reservations</Eyebrow>
                <h2 className="ptb-display text-[clamp(30px,4vw,46px)] font-medium italic">Book your table.</h2>
                <p className="mb-8 mt-3.5 flex items-center text-sm text-[#c9c4b8]">
                  <motion.span
                    animate={reduced ? {} : { opacity: [1, 0.35, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className="mr-2 inline-block h-[7px] w-[7px] rounded-full bg-[#5fbf77] shadow-[0_0_8px_#5fbf77]"
                  />
                  Live availability — updated in real time.
                </p>

                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <Field id="pt-name" label="Name" type="text" placeholder="Your name" />
                    <Field id="pt-phone" label="Phone" type="tel" placeholder="+1 (___) ___-____" />
                  </div>
                  <div className="mb-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <Field id="pt-date" label="Date" type="date" />
                    <div>
                      <label htmlFor="pt-party" className="ptb-mono mb-2 block text-[11px] uppercase tracking-[0.08em] text-[#c9c4b8]">
                        Party Size
                      </label>
                      <select
                        id="pt-party"
                        className="w-full rounded border border-[#c9a24b]/[0.22] bg-black/25 px-3.5 py-3 text-sm text-[#f5f1e8] outline-none focus:border-[#c9a24b]"
                      >
                        {['2 Guests', '4 Guests', '6 Guests', '8+ Guests'].map((o) => (
                          <option key={o} className="bg-[#17161a]">
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <span className="ptb-mono mb-2 block text-[11px] uppercase tracking-[0.08em] text-[#c9c4b8]">Available Times</span>
                  <div className="grid grid-cols-4 gap-2">
                    {SLOTS.map((s) => (
                      <motion.button
                        key={s.t}
                        type="button"
                        disabled={s.full}
                        onClick={() => setSlot(s.t)}
                        whileTap={s.full ? {} : { scale: 0.95 }}
                        className={`ptb-mono relative rounded border px-1 py-2.5 text-center text-xs transition-colors ${
                          s.full
                            ? 'cursor-not-allowed border-[#c9a24b]/[0.22] text-[#c9c4b8] line-through opacity-30'
                            : slot === s.t
                            ? 'border-[#c9a24b] text-[#e8cd8a]'
                            : 'border-[#c9a24b]/[0.22] text-[#c9c4b8] hover:border-[#c9a24b] hover:text-[#e8cd8a]'
                        }`}
                      >
                        {!s.full && slot === s.t && (
                          <motion.span layoutId="pt-slot" className="absolute inset-0 rounded bg-[#c9a24b]/10" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                        )}
                        <span className="relative">{s.t}</span>
                      </motion.button>
                    ))}
                  </div>

                  <Btn solid className="mt-7 w-full text-center">
                    Confirm Reservation — {slot}
                  </Btn>
                </form>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-[#c9a24b]/[0.22] bg-gradient-to-br from-[#1c2418] to-[#0b0b0d]">
                  <motion.span
                    animate={reduced ? {} : { scale: [1, 1.3, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute left-[52%] top-[44%] h-3.5 w-3.5 rotate-[-45deg] rounded-[50%_50%_50%_0] bg-[#c9a24b] shadow-[0_0_20px_#c9a24b]"
                  />
                  <span className="ptb-mono absolute bottom-3.5 left-3.5 text-[11px] text-[#c9c4b8]">
                    211 Bellmore Ave, New York, NY · Open in Google Maps →
                  </span>
                </div>
                <div className="ptb-glass mt-5 rounded-md p-6">
                  <h3 className="ptb-mono mb-2.5 text-xs tracking-[0.08em] text-[#e8cd8a]">HOURS</h3>
                  <p className="text-[13px] leading-[2] text-[#c9c4b8]">
                    Mon–Thu: 5:00p – 10:30p
                    <br />
                    Fri–Sat: 5:00p – 11:30p
                    <br />
                    Sunday: 4:00p – 9:30p
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── ORDER / CATERING / EVENTS ─────────────────────── */}
          <section id="order" className="scroll-mt-20 px-6 py-28">
            <div className="mx-auto max-w-[1180px]">
              <Reveal className="mx-auto mb-14 max-w-[640px] text-center">
                <Eyebrow>Beyond the Table</Eyebrow>
                <h2 className="ptb-display text-[clamp(30px,4vw,46px)] font-medium italic">Order, cater, celebrate.</h2>
              </Reveal>

              <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {SERVICES.map((s) => (
                  <motion.div
                    key={s.num}
                    id={s.id === 'ordering' ? undefined : s.id}
                    variants={rise}
                    whileHover={{ y: -6, borderColor: GOLD }}
                    className="ptb-glass scroll-mt-24 rounded-md px-7 py-9"
                  >
                    <span className="ptb-mono mb-4 block text-xs tracking-[0.1em] text-[#c9a24b]">{s.num}</span>
                    <h3 className="ptb-display mb-3 text-[22px]">{s.title}</h3>
                    <p className="mb-5 text-sm leading-[1.7] text-[#c9c4b8]">{s.body}</p>
                    {s.track && (
                      <>
                        <div className="mt-3.5 h-[3px] overflow-hidden rounded bg-white/[0.08]">
                          <motion.i
                            initial={{ width: 0 }}
                            whileInView={{ width: '62%' }}
                            viewport={viewport}
                            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                            className="block h-full bg-gradient-to-r from-[#c9a24b] to-[#e8cd8a]"
                          />
                        </div>
                        <div className="ptb-mono mt-2 flex justify-between text-[10px] text-[#c9c4b8]">
                          <span>Placed</span>
                          <span>Fired</span>
                          <span>Plated</span>
                          <span>On the way</span>
                        </div>
                      </>
                    )}
                    <Btn href={s.track ? '#' : '#contact'} className="mt-5">
                      {s.cta}
                    </Btn>
                  </motion.div>
                ))}
              </motion.div>

              <Reveal className="mt-7">
                <div className="ptb-glass flex flex-wrap items-center justify-between gap-4 rounded-md px-7 py-6">
                  <div>
                    <Eyebrow className="mb-1.5">Loyalty &amp; Rewards</Eyebrow>
                    <h3 className="ptb-display text-lg">
                      Earn a $25 reward for every $250 spent — plus a birthday tomahawk on the house.
                    </h3>
                  </div>
                  <Btn solid>Join Prime Rewards</Btn>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── GALLERY ───────────────────────────────────────── */}
          <section id="gallery" className="scroll-mt-20 px-6 py-28">
            <div className="mx-auto max-w-[1180px]">
              <Reveal className="mb-14 max-w-[640px]">
                <Eyebrow>Gallery</Eyebrow>
                <h2 className="ptb-display text-[clamp(30px,4vw,46px)] font-medium italic">The room, the fire, the plate.</h2>
              </Reveal>
              <motion.div
                variants={stagger(0.06)}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                className="grid auto-rows-[140px] grid-cols-2 gap-2 md:grid-cols-4"
              >
                {GALLERY.map((g, i) => (
                  <motion.div
                    key={i}
                    variants={rise}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.35 }}
                    className={`grid place-items-center overflow-hidden rounded border border-[#c9a24b]/[0.22] bg-gradient-to-br from-[#26221c] to-[#0b0b0d] text-4xl opacity-80 ${g.span}`}
                  >
                    {g.emoji}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* ── REVIEWS ───────────────────────────────────────── */}
          <section id="reviews" className="scroll-mt-20 px-6 py-28">
            <div className="mx-auto max-w-[1180px]">
              <Reveal className="mb-14 max-w-[640px]">
                <Eyebrow>Reviews</Eyebrow>
                <h2 className="ptb-display text-[clamp(30px,4vw,46px)] font-medium italic">What guests are saying.</h2>
              </Reveal>
              <motion.div variants={stagger(0.09)} initial="hidden" whileInView="show" viewport={viewport} className="flex gap-6 overflow-x-auto pb-3">
                {REVIEWS.map((r, i) => (
                  <motion.blockquote key={i} variants={rise} whileHover={{ y: -6 }} className="ptb-glass min-w-[300px] flex-shrink-0 rounded-md p-7">
                    <div className="mb-3.5 tracking-[2px] text-[#c9a24b]">{'★'.repeat(r.stars) + '☆'.repeat(5 - r.stars)}</div>
                    <p className="mb-[18px] text-sm leading-[1.7] text-[#c9c4b8]">"{r.text}"</p>
                    <footer className="ptb-mono text-[11px] text-[#e8cd8a]">{r.who}</footer>
                  </motion.blockquote>
                ))}
              </motion.div>
            </div>
          </section>

          {/* ── CONTACT ───────────────────────────────────────── */}
          <section id="contact" className="scroll-mt-20 px-6 py-28">
            <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-14 lg:grid-cols-2">
              <Reveal>
                <Eyebrow>Contact</Eyebrow>
                <h2 className="ptb-display text-[clamp(30px,4vw,46px)] font-medium italic">Get in touch.</h2>
                <form onSubmit={(e) => e.preventDefault()} className="mt-7">
                  <div className="mb-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <Field id="pt-cname" label="Name" type="text" />
                    <Field id="pt-cemail" label="Email" type="email" />
                  </div>
                  <label htmlFor="pt-cmsg" className="ptb-mono mb-2 block text-[11px] uppercase tracking-[0.08em] text-[#c9c4b8]">
                    Message
                  </label>
                  <textarea
                    id="pt-cmsg"
                    rows={4}
                    className="w-full rounded border border-[#c9a24b]/[0.22] bg-black/25 px-3.5 py-3 text-sm text-[#f5f1e8] outline-none focus:border-[#c9a24b]"
                  />
                  <Btn solid className="mt-5">
                    Send Message
                  </Btn>
                </form>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="ptb-glass rounded-md p-7">
                  <h3 className="ptb-mono mb-4 text-xs tracking-[0.08em] text-[#e8cd8a]">GIFT CARDS</h3>
                  <p className="mb-[18px] text-sm leading-[1.7] text-[#c9c4b8]">
                    Send a Prime Table gift card, delivered instantly by email — any amount, redeemable dine-in or
                    online.
                  </p>
                  <Btn>Buy a Gift Card</Btn>
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        {/* ── FOOTER ──────────────────────────────────────────── */}
        <footer className="border-t border-[#c9a24b]/[0.22] bg-[#17161a] px-6 pb-8 pt-[70px]">
          <div className="mx-auto max-w-[1180px]">
            <div className="mb-12 grid grid-cols-2 gap-10 md:grid-cols-[1.3fr_0.8fr_0.8fr_1.1fr]">
              <div>
                <div className="ptb-display mb-3.5 text-2xl tracking-[0.06em]">
                  PRIME <span className="text-[#c9a24b]">TABLE</span>
                </div>
                <p className="mb-2.5 text-[13px] text-[#c9c4b8]">211 Bellmore Ave, New York, NY 10001</p>
                <p className="mb-2.5 text-[13px] text-[#c9c4b8]">(212) 555-0142 · hello@primetable.co</p>
                <div className="mt-4 flex gap-3" aria-label="Social media">
                  {['IG', 'FB', 'TT'].map((s) => (
                    <motion.a
                      key={s}
                      href="#"
                      whileHover={{ y: -3, borderColor: GOLD, color: GOLD_LIGHT }}
                      className="grid h-9 w-9 place-items-center rounded-full border border-[#c9a24b]/[0.22] text-[13px] text-[#c9c4b8]"
                    >
                      {s}
                    </motion.a>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="ptb-mono mb-4 text-xs uppercase tracking-[0.1em] text-[#e8cd8a]">Explore</h3>
                {[['Digital Menu', '#menu'], ['Gallery', '#gallery'], ['Reviews', '#reviews'], ['Contact', '#contact']].map(([l, h]) => (
                  <a key={h} href={h} className="mb-2.5 block text-[13px] text-[#c9c4b8] hover:text-[#e8cd8a]">
                    {l}
                  </a>
                ))}
              </div>
              <div>
                <h3 className="ptb-mono mb-4 text-xs uppercase tracking-[0.1em] text-[#e8cd8a]">Services</h3>
                {[['Online Ordering', '#order'], ['Catering', '#catering'], ['Private Events', '#events'], ['Reservations', '#reservations']].map(([l, h]) => (
                  <a key={h} href={h} className="mb-2.5 block text-[13px] text-[#c9c4b8] hover:text-[#e8cd8a]">
                    {l}
                  </a>
                ))}
              </div>
              <div>
                <h3 className="ptb-mono mb-4 text-xs uppercase tracking-[0.1em] text-[#e8cd8a]">Newsletter</h3>
                <p className="mb-2.5 text-[13px] text-[#c9c4b8]">Menu drops, tasting events, and off-menu specials.</p>
                <form onSubmit={(e) => e.preventDefault()} className="mt-2.5 flex overflow-hidden rounded border border-[#c9a24b]/[0.22]">
                  <input
                    type="email"
                    placeholder="Email address"
                    aria-label="Email address"
                    className="min-w-0 flex-1 bg-transparent px-3.5 py-3 text-sm text-[#f5f1e8] outline-none"
                  />
                  <button className="ptb-mono bg-[#c9a24b] px-[18px] text-[11px] tracking-[0.08em] text-[#0b0b0d]">Join</button>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap justify-between gap-3 border-t border-[#c9a24b]/[0.22] pt-6 text-xs text-[#c9c4b8]">
              <span>© {new Date().getFullYear()} Prime Table. Demo site built by OrdersLift.</span>
              <a href="/demo/" className="text-[#e8cd8a] hover:underline">
                ← Back to OrdersLift demos
              </a>
            </div>
          </div>
        </footer>

        {/* ── FLOATING WIDGETS ────────────────────────────────── */}
        <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3.5">
          <motion.button
            onClick={() => setListening((v) => !v)}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Talk to Ember, the voice assistant"
            aria-pressed={listening}
            className="relative grid h-[58px] w-[58px] place-items-center rounded-full border border-[#c9a24b] bg-gradient-to-br from-[#1f1d22] to-[#17161a] text-[22px] text-[#e8cd8a]"
          >
            {listening && !reduced && (
              <motion.span
                aria-hidden
                animate={{ opacity: [0.7, 0], scale: [1, 1.9] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="absolute inset-0 rounded-full border border-[#c9a24b]"
              />
            )}
            🎙
          </motion.button>
          <motion.button
            onClick={() => setChatOpen((v) => !v)}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Open chat with Ember"
            aria-expanded={chatOpen}
            className="grid h-[58px] w-[58px] place-items-center rounded-full bg-gradient-to-br from-[#e8cd8a] to-[#c9a24b] text-[22px] text-[#0b0b0d] shadow-[0_10px_30px_rgba(201,162,75,0.35)]"
          >
            💬
          </motion.button>
        </div>

        <AnimatePresence>
          {chatOpen && (
            <motion.div
              role="dialog"
              aria-label="Chat with Ember"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-[96px] right-6 z-[199] flex h-[420px] w-[320px] max-w-[calc(100vw-40px)] flex-col overflow-hidden rounded-[10px] border border-[#c9a24b]/[0.22] bg-[#17161a]/[0.92] shadow-[0_30px_70px_rgba(0,0,0,0.6)] backdrop-blur-[16px]"
            >
              <div className="flex items-center justify-between border-b border-[#c9a24b]/[0.22] px-[18px] py-4">
                <div>
                  <b className="ptb-display text-lg">Ember</b>
                  <br />
                  <span className="text-[11px] text-[#c9c4b8]">AI dining assistant · online</span>
                </div>
                <button onClick={() => setChatOpen(false)} aria-label="Close chat" className="p-1 text-[#c9c4b8]">
                  <X size={18} />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto px-[18px] py-4">
                {msgs.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`max-w-[80%] rounded-[10px] px-3 py-2.5 text-[13px] leading-relaxed ${
                      m.from === 'bot'
                        ? 'self-start rounded-bl-[2px] border border-[#c9a24b]/[0.22] bg-[#c9a24b]/[0.12]'
                        : 'self-end rounded-br-[2px] bg-[#c9a24b] text-[#0b0b0d]'
                    }`}
                  >
                    {m.text}
                  </motion.div>
                ))}
              </div>
              <form onSubmit={send} className="flex border-t border-[#c9a24b]/[0.22]">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Ask about the menu, reservations…"
                  aria-label="Message Ember"
                  className="min-w-0 flex-1 bg-transparent px-3.5 py-3 text-sm text-[#f5f1e8] outline-none"
                />
                <button type="submit" aria-label="Send" className="px-4 text-[#e8cd8a]">
                  <Send size={18} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
