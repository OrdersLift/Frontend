import { useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { Menu, X, Send } from 'lucide-react';

/* Burger Blaze — QSR demo brand.
   Neo-brutalist: 3px black rules, hard offset shadows, no soft blur anywhere.
   Palette and copy come from the template; the motion is ours. */

const NAV = [
  ['Menu', '#menu'],
  ['Combos', '#combos'],
  ['Order', '#order'],
  ['Locations', '#locations'],
  ['Franchise', '#franchise'],
  ['Rewards', '#rewards'],
  ['Careers', '#careers'],
  ['Contact', '#contact'],
] as const;

/* Bottom of the stack first — the flex column is reversed so the bun-top
   renders last but sits on top. `cal` is what a topping adds when switched on. */
const LAYERS: { id: string; cal: number; fixed?: boolean; h: number; w: string; bg: string; radius: string }[] = [
  { id: 'bun-bottom', cal: 0, fixed: true, h: 20, w: '78%', bg: 'linear-gradient(180deg,#E8A93C,#C98A28)', radius: '10px 10px 30px 30px' },
  { id: 'patty', cal: 250, fixed: true, h: 16, w: '82%', bg: 'linear-gradient(180deg,#6b4028,#4a2c1a)', radius: '4px' },
  { id: 'cheese', cal: 110, h: 10, w: '88%', bg: '#FFC72C', radius: '2px' },
  { id: 'bacon', cal: 90, h: 9, w: '74%', bg: '#8B3A2B', radius: '3px' },
  { id: 'lettuce', cal: 5, h: 12, w: '86%', bg: '#7CB342', radius: '20px' },
  { id: 'tomato', cal: 10, h: 10, w: '70%', bg: '#D64545', radius: '4px' },
  { id: 'bun-top', cal: 0, fixed: true, h: 26, w: '78%', bg: 'linear-gradient(180deg,#F2B84A,#D89A2E)', radius: '40px 40px 10px 10px' },
];

const TOPPINGS = ['cheese', 'bacon', 'lettuce', 'tomato'] as const;

const MENU_TABS = ['Burgers', 'Chicken', 'Sides', 'Shakes', 'Salads'] as const;

const MENU: Record<string, { name: string; desc: string; price: string; kcal: string; emoji: string }[]> = {
  Burgers: [
    { name: 'Blaze Classic', desc: 'Beef patty, cheddar, lettuce, blaze sauce.', price: '$6.49', kcal: '540 kcal', emoji: '🍔' },
    { name: 'Double Smokehouse', desc: 'Double patty, smoked bacon, BBQ, onion crisps.', price: '$8.99', kcal: '820 kcal', emoji: '🍔' },
    { name: 'Veggie Ember Stack', desc: 'Plant patty, avocado, roasted pepper, herb aioli.', price: '$6.99', kcal: '480 kcal', emoji: '🥬' },
  ],
  Chicken: [
    { name: 'Spicy Blaze Chicken', desc: 'Crispy chicken, jalapeño, pepper-jack, chipotle mayo.', price: '$7.29', kcal: '610 kcal', emoji: '🌶️' },
    { name: 'Grilled Herb Chicken', desc: 'Flame-grilled breast, garlic aioli, rocket.', price: '$6.89', kcal: '430 kcal', emoji: '🍗' },
    { name: 'Blaze Nuggets ×8', desc: 'Buttermilk-brined, honey-mustard dip.', price: '$4.99', kcal: '390 kcal', emoji: '🍗' },
  ],
  Sides: [
    { name: 'Loaded Blaze Fries', desc: 'Cheese sauce, bacon bits, scallion, chipotle drizzle.', price: '$4.49', kcal: '460 kcal', emoji: '🍟' },
    { name: 'Onion Rings', desc: 'Beer-battered, smoked paprika salt.', price: '$3.79', kcal: '340 kcal', emoji: '🧅' },
    { name: 'Mac & Cheese Bites', desc: 'Four-cheese, crisp crumb, ranch dip.', price: '$4.29', kcal: '410 kcal', emoji: '🧀' },
  ],
  Shakes: [
    { name: 'Salted Caramel Shake', desc: 'Hand-spun, whipped cream, caramel drizzle.', price: '$5.29', kcal: '590 kcal', emoji: '🥤' },
    { name: 'Double Chocolate Shake', desc: 'Cocoa, fudge ripple, chocolate shavings.', price: '$5.29', kcal: '620 kcal', emoji: '🍫' },
    { name: 'Strawberry Blaze', desc: 'Real fruit, vanilla soft-serve.', price: '$4.99', kcal: '510 kcal', emoji: '🍓' },
  ],
  Salads: [
    { name: 'Ember Chicken Salad', desc: 'Grilled chicken, avocado, lime dressing.', price: '$7.49', kcal: '380 kcal', emoji: '🥗' },
    { name: 'Garden Crunch', desc: 'Leaves, cucumber, seeds, herb vinaigrette.', price: '$5.99', kcal: '220 kcal', emoji: '🥗' },
    { name: 'Smoky Corn Bowl', desc: 'Charred corn, black bean, chipotle yoghurt.', price: '$6.29', kcal: '340 kcal', emoji: '🌽' },
  ],
};

const COMBOS = [
  { tag: 'SAVE $3', name: 'Blaze Duo Deal', desc: '2 Blaze Classics + shared fries + 2 drinks.', was: '$18.97', now: '$15.99' },
  { tag: 'SAVE $2', name: 'Solo Fire Combo', desc: 'Double Smokehouse + fries + drink.', was: '$13.98', now: '$11.99' },
  { tag: 'SAVE $5', name: 'Family Blaze Box', desc: '4 burgers, 2 large fries, 4 drinks, 8 nuggets.', was: '$39.96', now: '$34.99' },
  { tag: 'FOR YOU', name: 'Spicy Lover Combo', desc: 'Spicy Blaze Chicken + loaded fries + shake — picked from your taste profile.', was: '', now: '$16.49' },
];

const ORDER_WAYS = [
  { icon: '🛵', name: 'Delivery', desc: 'Hot, fast, tracked door to door.' },
  { icon: '🥡', name: 'Pickup', desc: 'Skip the line — order ahead & grab it.' },
  { icon: '🚗', name: 'Drive-Thru', desc: 'Order on the app, pull up, and go.' },
  { icon: '🎙', name: 'Voice Ordering', desc: 'Just say what you want — Blaze AI takes it from there.' },
];

const LOCATIONS = [
  { name: 'Burger Blaze — Newark, NJ', meta: '1.2 mi away · Drive-thru & Delivery', open: 'Open', live: true },
  { name: 'Burger Blaze — Jersey City, NJ', meta: '3.8 mi away · Delivery only', open: 'Open', live: true },
  { name: 'Burger Blaze — Edison, NJ', meta: '6.1 mi away · Drive-thru', open: 'Closes 11pm', live: false },
];

const JOBS = [
  { role: 'Crew Member — Newark, NJ', type: 'Full-time / Part-time' },
  { role: 'Shift Manager — Jersey City, NJ', type: 'Full-time' },
  { role: 'Delivery Driver — Multiple Locations', type: 'Flexible' },
];

const CANNED = [
  "Based on your order history, you'd probably love our Spicy Blaze Chicken combo — want me to add it?",
  'That item has no peanut or shellfish allergens. It does contain dairy and gluten.',
  'Adding a large fries for just $1.50 more — want me to upsize your order?',
  "Your order's on the grill now — should be ready in about 6 minutes!",
];

/* ── shared motion ───────────────────────────────────────────────── */
const viewport = { once: true, amount: 0.15, margin: '0px 0px -10% 0px' } as const;
const rise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = (s = 0.08) => ({ hidden: {}, show: { transition: { staggerChildren: s } } });

const Reveal = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    variants={rise}
    initial="hidden"
    whileInView="show"
    viewport={viewport}
    transition={{ delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const Eyebrow = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <span className={`bb-mono mb-3 block text-[12px] font-bold uppercase tracking-[0.18em] text-[#E8412C] ${className}`}>
    {children}
  </span>
);

/* Hard-shadow button. `variant` picks the fill; the lift is uniform. */
const Btn = ({
  href = '#',
  variant = 'plain',
  children,
  className = '',
}: {
  href?: string;
  variant?: 'plain' | 'solid' | 'yellow';
  children: React.ReactNode;
  className?: string;
}) => {
  const fill =
    variant === 'solid'
      ? 'bg-[#E8412C] text-white shadow-[4px_4px_0_#1A1A1A]'
      : variant === 'yellow'
      ? 'bg-[#FFC72C] text-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A]'
      : 'bg-white text-[#1A1A1A]';
  return (
    <motion.a
      href={href}
      whileHover={{ x: -2, y: -2 }}
      whileTap={{ x: 0, y: 0, scale: 0.98 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-block rounded-full border-[3px] border-[#1A1A1A] px-[22px] py-3 text-[13px] font-bold transition-shadow hover:shadow-[6px_6px_0_#1A1A1A] ${fill} ${className}`}
    >
      {children}
    </motion.a>
  );
};

/* ── page ────────────────────────────────────────────────────────── */
export default function BurgerBlaze() {
  const reduced = useReducedMotion();
  const [navOpen, setNavOpen] = useState(false);
  const [on, setOn] = useState<Record<string, boolean>>({});
  const [tab, setTab] = useState<string>('Burgers');
  const [chatOpen, setChatOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [msgs, setMsgs] = useState([
    { from: 'bot', text: "Hey! 👋 I'm Blaze AI. Want your usual Double Smokehouse combo, or feeling like something new tonight?" },
  ]);
  const [draft, setDraft] = useState('');

  const kcal = LAYERS.reduce((t, l) => t + (l.fixed || on[l.id] ? l.cal : 0), 0);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setDraft('');
    setMsgs((m) => [...m, { from: 'user', text }]);
    setTimeout(
      () => setMsgs((m) => [...m, { from: 'bot', text: CANNED[Math.floor(Math.random() * CANNED.length)] }]),
      600,
    );
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="bb min-h-screen bg-[#FFF8EC] text-[#1A1A1A]">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[1000] focus:bg-[#FFC72C] focus:px-4 focus:py-2.5 focus:font-bold">
          Skip to main content
        </a>

        {/* ── NAV ─────────────────────────────────────────────── */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-0 z-[100] border-b-[3px] border-[#1A1A1A] bg-white"
        >
          <div className="flex items-center justify-between px-5 py-3.5 sm:px-7">
            <a href="/demo/burger-blaze/" className="bb-display flex items-center gap-2 text-[26px] leading-none">
              🔥 BURGER <span className="text-[#E8412C]">BLAZE</span>
            </a>

            <nav aria-label="Primary" className="hidden gap-6 text-sm font-semibold xl:flex">
              {NAV.map(([label, href]) => (
                <a key={href} href={href} className="group relative py-1.5">
                  {label}
                  <span className="absolute inset-x-0 bottom-0 h-[3px] w-0 bg-[#FFC72C] transition-[width] duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Btn href="#order" variant="yellow" className="hidden sm:inline-block">
                Order Now
              </Btn>
              <button
                onClick={() => setNavOpen((v) => !v)}
                aria-label={navOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={navOpen}
                className="grid h-11 w-11 place-items-center xl:hidden"
              >
                {navOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {navOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.65, 0, 0.35, 1] }}
                className="overflow-hidden border-t-[3px] border-[#1A1A1A] bg-white xl:hidden"
              >
                <div className="px-5 py-3">
                  {NAV.map(([label, href]) => (
                    <a
                      key={href}
                      href={href}
                      onClick={() => setNavOpen(false)}
                      className="block rounded-lg px-3 py-2.5 font-semibold hover:bg-[#FFC72C]/40"
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
            className="flex min-h-screen items-center pt-[130px] pb-20"
            style={{
              background:
                'radial-gradient(circle at 15% 20%, rgba(255,199,44,0.35), transparent 45%), radial-gradient(circle at 85% 75%, rgba(232,65,44,0.25), transparent 50%), #FFF8EC',
            }}
          >
            <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
              <motion.div variants={stagger(0.1)} initial="hidden" animate="show">
                <motion.div variants={rise}>
                  <Eyebrow>Flame-Grilled Since 2016</Eyebrow>
                </motion.div>
                <motion.h1 variants={rise} className="bb-display text-[clamp(44px,6.4vw,80px)] leading-[1.05]">
                  Big flavor.
                  <br />
                  <motion.span
                    className="inline-block text-[#E8412C]"
                    initial={{ rotate: -3 }}
                    animate={reduced ? {} : { rotate: [-3, 2, -3] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    Zero
                  </motion.span>{' '}
                  waiting around.
                </motion.h1>
                <motion.p variants={rise} className="mt-5 max-w-[420px] text-[17px] font-medium text-[#4a4642]">
                  Flame-grilled burgers, crispy fries, and shakes — ordered your way in under 60 seconds, ready when you
                  get there.
                </motion.p>
                <motion.div variants={rise} className="mt-8 flex flex-wrap gap-3.5">
                  <Btn href="#order" variant="solid">
                    Order Online
                  </Btn>
                  <Btn href="#menu">See Full Menu</Btn>
                </motion.div>
                <motion.div variants={rise} className="mt-7 flex flex-wrap gap-2.5">
                  {['🚗 Drive-Thru', '🛵 Delivery', '🎁 Blaze Rewards'].map((b) => (
                    <span
                      key={b}
                      className="rounded-full border-2 border-[#1A1A1A] bg-white px-3.5 py-1.5 text-xs font-bold"
                    >
                      {b}
                    </span>
                  ))}
                </motion.div>
              </motion.div>

              {/* Burger builder — the signature interaction */}
              <motion.div
                initial={{ opacity: 0, y: 40, rotate: -1.5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border-[3px] border-[#1A1A1A] bg-white p-7 shadow-[8px_8px_0_#1A1A1A]"
              >
                <h3 className="bb-display text-[22px]">Build Your Blaze 🍔</h3>
                <p className="mb-5 text-[13px] font-semibold text-[#666]">
                  Tap toppings — watch your burger (and calories) stack up.
                </p>

                <div className="mb-4 flex min-h-[170px] flex-col-reverse items-center justify-start gap-1">
                  {LAYERS.map((l) => {
                    const shown = l.fixed || on[l.id];
                    return (
                      <AnimatePresence key={l.id} initial={false}>
                        {shown && (
                          <motion.div
                            layout
                            initial={{ opacity: 0, scaleX: 0.55, y: -14 }}
                            animate={{ opacity: 1, scaleX: 1, y: 0 }}
                            exit={{ opacity: 0, scaleX: 0.55, y: -10 }}
                            transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                            style={{ height: l.h, width: l.w, background: l.bg, borderRadius: l.radius }}
                          />
                        )}
                      </AnimatePresence>
                    );
                  })}
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {TOPPINGS.map((t) => (
                    <motion.button
                      key={t}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => setOn((o) => ({ ...o, [t]: !o[t] }))}
                      aria-pressed={!!on[t]}
                      className={`rounded-full border-2 border-[#1A1A1A] px-3.5 py-1.5 text-xs font-bold capitalize transition-colors ${
                        on[t] ? 'bg-[#E8412C] text-white' : 'bg-white'
                      }`}
                    >
                      + {t}
                    </motion.button>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t-2 border-dashed border-[#1A1A1A] pt-3.5">
                  <span className="bb-mono text-sm font-bold">TOTAL CALORIES</span>
                  <motion.span key={kcal} initial={{ scale: 1.25, color: '#E8412C' }} animate={{ scale: 1, color: '#1A1A1A' }} className="bb-mono text-sm font-bold">
                    {kcal} kcal
                  </motion.span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── MENU ──────────────────────────────────────────── */}
          <section id="menu" className="scroll-mt-20 py-24">
            <div className="mx-auto max-w-[1180px] px-6">
              <Reveal className="mb-12 max-w-[640px]">
                <Eyebrow>Digital Menu</Eyebrow>
                <h2 className="bb-display text-[clamp(30px,4.4vw,50px)]">Fired up daily.</h2>
              </Reveal>

              <Reveal className="mb-9 flex flex-wrap gap-2.5">
                {MENU_TABS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`relative rounded-full border-2 border-[#1A1A1A] px-[18px] py-2.5 text-[13px] font-bold transition-colors ${
                      tab === t ? 'text-[#1A1A1A]' : 'bg-white hover:bg-[#FFC72C]/50'
                    }`}
                  >
                    {tab === t && (
                      <motion.span
                        layoutId="bb-tab"
                        className="absolute inset-0 rounded-full bg-[#FFC72C]"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative">{t}</span>
                  </button>
                ))}
              </Reveal>

              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  variants={stagger(0.07)}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                  className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {MENU[tab].map((item) => (
                    <motion.article
                      key={item.name}
                      variants={rise}
                      whileHover={{ y: -6 }}
                      className="overflow-hidden rounded-2xl border-[3px] border-[#1A1A1A] bg-white shadow-[5px_5px_0_#1A1A1A]"
                    >
                      <div className="grid h-[140px] place-items-center bg-gradient-to-br from-[#FFD873] to-[#F2A900] text-[52px]">
                        <motion.span whileHover={{ scale: 1.12, rotate: -6 }} className="inline-block">
                          {item.emoji}
                        </motion.span>
                      </div>
                      <div className="px-5 py-[18px]">
                        <h3 className="mb-1.5 text-base font-bold">{item.name}</h3>
                        <p className="mb-3 text-xs text-[#666]">{item.desc}</p>
                        <div className="flex items-center justify-between">
                          <span className="bb-mono font-bold text-[#C22F1D]">{item.price}</span>
                          <span className="rounded-full border border-black/10 bg-[#FFF8EC] px-2 py-0.5 text-[11px] font-semibold">
                            {item.kcal}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.12 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={`Add ${item.name}`}
                            className="grid h-[34px] w-[34px] place-items-center rounded-full bg-[#E8412C] text-lg font-bold text-white"
                          >
                            +
                          </motion.button>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              </AnimatePresence>

              <Reveal className="mt-7">
                <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border-[3px] border-[#1A1A1A] bg-white p-7 shadow-[5px_5px_0_#1A1A1A]">
                  <div>
                    <Eyebrow className="mb-1">Allergy &amp; Nutrition</Eyebrow>
                    <p className="text-[15px] font-bold">Check allergens and calories for any item before you order.</p>
                  </div>
                  <Btn>Open Allergy Checker</Btn>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── COMBOS ────────────────────────────────────────── */}
          <section id="combos" className="scroll-mt-20 bg-white py-24">
            <div className="mx-auto max-w-[1180px] px-6">
              <Reveal className="mb-12 max-w-[640px]">
                <Eyebrow>Combo Deals</Eyebrow>
                <h2 className="bb-display text-[clamp(30px,4.4vw,50px)]">Made for your cravings, by AI.</h2>
                <p className="mt-2.5 text-sm font-medium text-[#666]">
                  Based on your last order, here's what our recommendation engine picked for you today.
                </p>
              </Reveal>

              <motion.div
                variants={stagger(0.09)}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                className="flex gap-5 overflow-x-auto pb-4"
              >
                {COMBOS.map((c) => (
                  <motion.div
                    key={c.name}
                    variants={rise}
                    whileHover={{ y: -8 }}
                    className="relative min-w-[260px] flex-shrink-0 overflow-hidden rounded-2xl bg-[#1A1A1A] p-6 text-white"
                  >
                    <motion.span
                      initial={{ rotate: 6 }}
                      whileHover={{ rotate: -6, scale: 1.06 }}
                      className="bb-mono absolute right-4 top-4 rounded-full bg-[#FFC72C] px-2.5 py-1 text-[11px] font-bold text-[#1A1A1A]"
                    >
                      {c.tag}
                    </motion.span>
                    <h3 className="bb-display mb-2 text-xl">{c.name}</h3>
                    <p className="mb-4 text-xs text-[#ccc]">{c.desc}</p>
                    <div className="bb-mono text-[22px] font-bold text-[#FFC72C]">
                      {c.was && <s className="mr-2 text-sm text-[#888]">{c.was}</s>}
                      {c.now}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* ── ORDER ─────────────────────────────────────────── */}
          <section id="order" className="scroll-mt-20 py-24">
            <div className="mx-auto max-w-[1180px] px-6">
              <Reveal className="mx-auto mb-12 max-w-[640px] text-center">
                <Eyebrow>Order Your Way</Eyebrow>
                <h2 className="bb-display text-[clamp(30px,4.4vw,50px)]">Delivery, pickup, or drive-thru.</h2>
              </Reveal>

              <motion.div
                variants={stagger(0.08)}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
              >
                {ORDER_WAYS.map((o) => (
                  <motion.div
                    key={o.name}
                    variants={rise}
                    whileHover={{ x: -3, y: -3 }}
                    className="rounded-2xl border-[3px] border-[#1A1A1A] bg-white px-[18px] py-7 text-center shadow-[5px_5px_0_#1A1A1A] transition-shadow hover:shadow-[8px_8px_0_#1A1A1A]"
                  >
                    <div className="mb-3 text-[34px]">{o.icon}</div>
                    <h3 className="mb-1.5 text-[15px] font-bold">{o.name}</h3>
                    <p className="text-xs text-[#666]">{o.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

              <Reveal className="mt-6">
                <div className="rounded-2xl border-[3px] border-[#1A1A1A] bg-white p-7 shadow-[5px_5px_0_#1A1A1A]">
                  <h3 className="mb-1.5 font-bold">Order #BB-48213 — On the way!</h3>
                  <div className="mt-4 flex items-center gap-1.5">
                    <span className="h-3.5 w-3.5 shrink-0 rounded-full bg-[#E8412C]" />
                    <span className="relative h-1 flex-1 overflow-hidden rounded bg-black/10">
                      <motion.i
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={viewport}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-y-0 left-0 block rounded bg-[#E8412C]"
                      />
                    </span>
                    <span className="h-3.5 w-3.5 shrink-0 rounded-full bg-[#E8412C]" />
                    <span className="relative h-1 flex-1 overflow-hidden rounded bg-black/10">
                      <motion.i
                        initial={{ width: 0 }}
                        whileInView={{ width: '38%' }}
                        viewport={viewport}
                        transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-y-0 left-0 block rounded bg-[#E8412C]"
                      />
                    </span>
                    <span className="h-3.5 w-3.5 shrink-0 rounded-full bg-[#1A1A1A]" />
                  </div>
                  <div className="mt-2 flex justify-between text-[11px] font-bold">
                    <span>Order Placed</span>
                    <span>On the Grill</span>
                    <span>Delivered</span>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {[' Apple Pay', 'G Pay', '💳 Stripe Secure Checkout', '🏷 Promo: BLAZE10'].map((p) => (
                      <span key={p} className="rounded-[10px] border-2 border-[#1A1A1A] bg-white px-4 py-2.5 text-xs font-bold">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── LOCATIONS ─────────────────────────────────────── */}
          <section id="locations" className="scroll-mt-20 bg-[#1A1A1A] py-24 text-white">
            <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-start gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
              <Reveal>
                <Eyebrow className="text-[#FFC72C]">Locations</Eyebrow>
                <h2 className="bb-display text-[clamp(30px,4.4vw,50px)]">Find your nearest Blaze.</h2>
                <div className="mt-6">
                  {LOCATIONS.map((l) => (
                    <motion.div
                      key={l.name}
                      whileHover={{ x: 6 }}
                      className="flex justify-between gap-4 border-b border-white/15 py-4"
                    >
                      <div>
                        <b>{l.name}</b>
                        <br />
                        <span className="text-xs text-[#aaa]">{l.meta}</span>
                      </div>
                      <span
                        className={`h-fit shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          l.live ? 'bg-[#3BAA57]' : 'bg-[#777]'
                        }`}
                      >
                        {l.open}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border-[3px] border-[#FFC72C] bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a]">
                  {[
                    { top: '40%', left: '48%' },
                    { top: '60%', left: '65%' },
                    { top: '30%', left: '70%' },
                  ].map((p, i) => (
                    <motion.span
                      key={i}
                      style={{ ...p, boxShadow: '0 0 14px #E8412C' }}
                      className="absolute h-4 w-4 rotate-[-45deg] rounded-[50%_50%_50%_0] bg-[#E8412C]"
                      animate={reduced ? {} : { scale: [1, 1.25, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
                    />
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── FRANCHISE ─────────────────────────────────────── */}
          <section id="franchise" className="scroll-mt-20 py-24">
            <div className="mx-auto max-w-[1180px] px-6">
              <Reveal className="mb-12 max-w-[640px]">
                <Eyebrow>Franchise</Eyebrow>
                <h2 className="bb-display text-[clamp(30px,4.4vw,50px)]">Own a piece of the fire.</h2>
                <p className="mt-2.5 text-sm font-medium text-[#666]">
                  Join 140+ independently owned Burger Blaze locations across the U.S.
                </p>
              </Reveal>
              <motion.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={viewport} className="flex flex-wrap gap-12">
                {[
                  ['140+', 'Locations'],
                  ['$450K', 'Avg. Unit Volume'],
                  ['18mo', 'Avg. Payback'],
                ].map(([n, label]) => (
                  <motion.div key={label} variants={rise}>
                    <b className="bb-display block text-[34px] text-[#E8412C]">{n}</b>
                    <span className="text-xs font-bold text-[#555]">{label}</span>
                  </motion.div>
                ))}
              </motion.div>
              <Reveal className="mt-8">
                <Btn href="#contact" variant="solid">
                  Request Franchise Info
                </Btn>
              </Reveal>
            </div>
          </section>

          {/* ── REWARDS ───────────────────────────────────────── */}
          <section id="rewards" className="scroll-mt-20 bg-white py-24">
            <div className="mx-auto max-w-[1180px] px-6">
              <Reveal>
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#E8412C] to-[#C22F1D] p-10 text-white">
                  <motion.span
                    aria-hidden
                    animate={reduced ? {} : { scale: [1, 1.08, 1], rotate: [0, 4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-2 right-5 text-[100px] opacity-15"
                  >
                    🔥
                  </motion.span>
                  <Eyebrow className="text-[#FFC72C]">Blaze Rewards</Eyebrow>
                  <h2 className="bb-display text-[clamp(30px,4.4vw,50px)] text-white">
                    1,280 points to your next free burger.
                  </h2>
                  <div className="my-4 h-3 overflow-hidden rounded-full bg-white/25">
                    <motion.i
                      initial={{ width: 0 }}
                      whileInView={{ width: '64%' }}
                      viewport={viewport}
                      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                      className="block h-full rounded-full bg-[#FFC72C]"
                    />
                  </div>
                  <p className="mb-5 text-[13px]">
                    Earn 10 points per $1. Redeem for free items, birthday treats, and early combo access.
                  </p>
                  <Btn variant="yellow">Join Free</Btn>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── CAREERS ───────────────────────────────────────── */}
          <section id="careers" className="scroll-mt-20 py-24">
            <div className="mx-auto max-w-[1180px] px-6">
              <Reveal className="mb-12 max-w-[640px]">
                <Eyebrow>Careers</Eyebrow>
                <h2 className="bb-display text-[clamp(30px,4.4vw,50px)]">Work where it's always sizzling.</h2>
              </Reveal>
              <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewport}>
                {JOBS.map((j) => (
                  <motion.div
                    key={j.role}
                    variants={rise}
                    whileHover={{ x: -3, y: -3 }}
                    className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-2xl border-2 border-[#1A1A1A] bg-white px-5 py-[18px] transition-shadow hover:shadow-[5px_5px_0_#1A1A1A]"
                  >
                    <h3 className="text-[15px] font-bold">{j.role}</h3>
                    <span className="text-xs text-[#666]">{j.type}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* ── CONTACT ───────────────────────────────────────── */}
          <section id="contact" className="scroll-mt-20 bg-white py-24">
            <div className="mx-auto max-w-[1180px] px-6">
              <Reveal className="mb-12 max-w-[640px]">
                <Eyebrow>Contact</Eyebrow>
                <h2 className="bb-display text-[clamp(30px,4.4vw,50px)]">Talk to Blaze HQ.</h2>
              </Reveal>
              <Reveal>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="max-w-[560px] rounded-2xl border-[3px] border-[#1A1A1A] bg-white p-7 shadow-[5px_5px_0_#1A1A1A]"
                >
                  <label htmlFor="bb-name" className="mb-1.5 block text-[13px] font-bold">
                    Name
                  </label>
                  <input
                    id="bb-name"
                    type="text"
                    className="mb-3.5 w-full rounded-[10px] border-2 border-[#1A1A1A] px-3.5 py-3 outline-none focus:border-[#E8412C]"
                  />
                  <label htmlFor="bb-msg" className="mb-1.5 block text-[13px] font-bold">
                    Message
                  </label>
                  <textarea
                    id="bb-msg"
                    rows={4}
                    className="mb-4 w-full rounded-[10px] border-2 border-[#1A1A1A] px-3.5 py-3 outline-none focus:border-[#E8412C]"
                  />
                  <Btn variant="solid">Send Message</Btn>
                </form>
              </Reveal>
            </div>
          </section>
        </main>

        {/* ── FOOTER ──────────────────────────────────────────── */}
        <footer className="bg-[#1A1A1A] px-0 pb-8 pt-[70px] text-[#ddd]">
          <div className="mx-auto max-w-[1180px] px-6">
            <div className="mb-12 grid grid-cols-2 gap-10 md:grid-cols-[1.3fr_0.8fr_0.8fr_1.1fr]">
              <div>
                <div className="bb-display mb-3.5 text-[26px] text-white">
                  🔥 BURGER <span className="text-[#E8412C]">BLAZE</span>
                </div>
                <p className="mb-2.5 text-[13px] text-[#bbb]">1400 Blaze Ave, Newark, NJ 07102</p>
                <p className="mb-2.5 text-[13px] text-[#bbb]">(973) 555-0199 · hello@burgerblaze.com</p>
                <div className="mt-3.5 flex gap-2.5" aria-label="Social media">
                  {['IG', 'TT', 'FB'].map((s) => (
                    <motion.a
                      key={s}
                      href="#"
                      whileHover={{ y: -3, borderColor: '#FFC72C', color: '#FFC72C' }}
                      className="grid h-[34px] w-[34px] place-items-center rounded-full border-2 border-[#444] text-xs"
                    >
                      {s}
                    </motion.a>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="bb-display mb-4 text-[15px] text-[#FFC72C]">Explore</h3>
                {[['Menu', '#menu'], ['Combos', '#combos'], ['Locations', '#locations'], ['Rewards', '#rewards']].map(([l, h]) => (
                  <a key={h} href={h} className="mb-2.5 block text-[13px] text-[#bbb] hover:text-[#FFC72C]">
                    {l}
                  </a>
                ))}
              </div>
              <div>
                <h3 className="bb-display mb-4 text-[15px] text-[#FFC72C]">Company</h3>
                {[['Franchise', '#franchise'], ['Careers', '#careers'], ['Contact', '#contact']].map(([l, h]) => (
                  <a key={h} href={h} className="mb-2.5 block text-[13px] text-[#bbb] hover:text-[#FFC72C]">
                    {l}
                  </a>
                ))}
              </div>
              <div>
                <h3 className="bb-display mb-4 text-[15px] text-[#FFC72C]">Stay Fired Up</h3>
                <p className="mb-2.5 text-[13px] text-[#bbb]">Deals, drops, and combo alerts.</p>
                <form onSubmit={(e) => e.preventDefault()} className="mt-2.5 flex overflow-hidden rounded-[10px] border-2 border-[#FFC72C]">
                  <input
                    type="email"
                    placeholder="Email address"
                    aria-label="Email address"
                    className="min-w-0 flex-1 bg-transparent px-3.5 py-3 text-white outline-none"
                  />
                  <button className="bg-[#FFC72C] px-[18px] font-bold text-[#1A1A1A]">Join</button>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap justify-between gap-2.5 border-t border-[#333] pt-6 text-xs">
              <span>© {new Date().getFullYear()} Burger Blaze. Demo site built by OrdersLift.</span>
              <a href="/demo/" className="text-[#FFC72C] hover:underline">
                ← Back to OrdersLift demos
              </a>
            </div>
          </div>
        </footer>

        {/* ── FLOATING WIDGETS ────────────────────────────────── */}
        <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3.5">
          <motion.button
            onClick={() => setListening((v) => !v)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            animate={
              listening && !reduced
                ? { boxShadow: ['4px 4px 0 #1A1A1A, 0 0 0 0 rgba(232,65,44,0.4)', '4px 4px 0 #1A1A1A, 0 0 0 14px rgba(232,65,44,0)'] }
                : { boxShadow: '4px 4px 0 #1A1A1A' }
            }
            transition={{ duration: 1.1, repeat: listening ? Infinity : 0 }}
            aria-label="Talk to Blaze voice ordering assistant"
            aria-pressed={listening}
            className="grid h-[60px] w-[60px] place-items-center rounded-full border-[3px] border-[#1A1A1A] bg-[#E8412C] text-2xl text-white"
          >
            🎙
          </motion.button>
          <motion.button
            onClick={() => setChatOpen((v) => !v)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Open chat with Blaze AI"
            aria-expanded={chatOpen}
            className="grid h-[60px] w-[60px] place-items-center rounded-full border-[3px] border-[#1A1A1A] bg-[#FFC72C] text-2xl shadow-[4px_4px_0_#1A1A1A]"
          >
            💬
          </motion.button>
        </div>

        <AnimatePresence>
          {chatOpen && (
            <motion.div
              role="dialog"
              aria-label="Chat with Blaze AI"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-[100px] right-6 z-[199] flex h-[420px] w-[320px] max-w-[calc(100vw-40px)] flex-col overflow-hidden rounded-[20px] border-[3px] border-[#1A1A1A] bg-white shadow-[8px_8px_0_#1A1A1A]"
            >
              <div className="flex items-center justify-between border-b-[3px] border-[#1A1A1A] bg-[#FFC72C] px-[18px] py-4">
                <div>
                  <b className="bb-display text-lg">Blaze AI</b>
                  <br />
                  <span className="text-[11px] font-semibold">Order assistant · online</span>
                </div>
                <button onClick={() => setChatOpen(false)} aria-label="Close chat" className="p-1">
                  <X size={18} />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto px-[18px] py-4">
                {msgs.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`max-w-[82%] rounded-[14px] border-2 border-[#1A1A1A] px-3 py-2.5 text-[13px] leading-relaxed ${
                      m.from === 'bot'
                        ? 'self-start rounded-bl-[2px] bg-[#FFF8EC]'
                        : 'self-end rounded-br-[2px] bg-[#E8412C] text-white'
                    }`}
                  >
                    {m.text}
                  </motion.div>
                ))}
              </div>
              <form onSubmit={send} className="flex border-t-[3px] border-[#1A1A1A]">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Ask about combos, allergies…"
                  aria-label="Message Blaze AI"
                  className="min-w-0 flex-1 bg-transparent px-3.5 py-3 outline-none"
                />
                <button type="submit" aria-label="Send" className="px-4 text-[#E8412C]">
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
