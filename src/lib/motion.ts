import type { TargetAndTransition, Transition, Variants } from 'framer-motion';

/* ===========================
   Easing
   ONE curve family for the whole site.

   `out` is an expo-style ease-out (near-identical to CSS
   `cubic-bezier(.22,1,.36,1)`). It covers ~80% of the distance in the
   first third of the duration, then settles slowly. That reads as
   "heavy, well-machined object coming to rest" — the expensive-product
   feel — while getting content legible almost immediately. It never
   overshoots, so nothing on a B2B page bounces like a toy.

   `inOut` is used ONLY for things that start and end at rest inside the
   viewport (accordion height, modal backdrop, colour crossfades), where
   an ease-out start looks like a jump.
=========================== */
type Bezier = [number, number, number, number];

export const ease: Record<'out' | 'inOut', Bezier> = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
};

/* ===========================
   Durations
   Four values. If a component needs a fifth, the component is wrong.
=========================== */
export const duration = {
  fast: 0.18,   // hover, tap, icon nudges — must feel like a direct response
  base: 0.32,   // open/close, expand/collapse, state changes
  slow: 0.5,    // the default for content entering on scroll
  slower: 0.7,  // hero panel and full-bleed surfaces only
} as const;

/* Travel distances. Small on purpose: long slides read as a slideshow. */
const Y = 24;
const X = 32;

/* Shorthand for the rare one-off `transition={...}` prop. */
export const tr = (d: number = duration.slow, delay = 0): Transition => ({
  duration: d,
  delay,
  ease: ease.out,
});

/* ===========================
   Reveal variants
   Every variant uses the SAME two state names — `hidden` / `show` — so a
   parent `staggerContainer` can drive any mix of children without the
   child re-declaring initial/animate.
=========================== */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: Y },
  show: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.out } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: duration.slow, ease: ease.out } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: duration.slow, ease: ease.out } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -X },
  show: { opacity: 1, x: 0, transition: { duration: duration.slow, ease: ease.out } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: X },
  show: { opacity: 1, x: 0, transition: { duration: duration.slow, ease: ease.out } },
};

/* ===========================
   Choreography
   The container animates nothing itself — it only schedules children.
=========================== */
export const staggerContainer = (stagger = 0.07, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

/**
 * Keeps a cascade inside a fixed time budget however many children there
 * are: with 9 FAQ rows a flat 0.07s stagger would take 560ms to even
 * *start* the last row. `window` is the total cascade length in seconds.
 */
export const staggerFor = (count: number, window = 0.36): number =>
  count > 1 ? Math.min(0.07, window / (count - 1)) : 0;

/* ===========================
   Viewport config for `whileInView`
   Replaces the useRef + useInView pattern: cheaper, no ref plumbing, and
   `once: true` means a section never re-animates on scroll-back.

   `viewportOnce`  — default. Fires when 20% of the element is inside a
                     viewport shortened by 12% at the bottom, so content
                     is already comfortably on screen when it moves.
   `viewportEager` — for elements as tall as (or taller than) the viewport,
                     and for the footer, which is often reached by a
                     scroll-to-bottom that would never satisfy 20%.
=========================== */
export const viewportOnce = { once: true, amount: 0.2, margin: '0px 0px -12% 0px' } as const;
export const viewportEager = { once: true, amount: 0.02, margin: '0px 0px -4% 0px' } as const;

/* ===========================
   Interaction affordances
   Spread onto `whileHover` / `whileTap`. Cards lift; controls compress.
   Deliberately tiny — the point is confirming the surface is live, not
   putting on a show.
=========================== */
export const cardHover: TargetAndTransition = {
  y: -6,
  transition: { duration: duration.fast, ease: ease.out },
};

export const cardTap: TargetAndTransition = {
  scale: 0.99,
  transition: { duration: duration.fast, ease: ease.out },
};

export const pressHover: TargetAndTransition = {
  scale: 1.03,
  transition: { duration: duration.fast, ease: ease.out },
};

export const pressTap: TargetAndTransition = {
  scale: 0.97,
  transition: { duration: duration.fast, ease: ease.out },
};

/* ===========================
   Expand / collapse
   For accordions and the mobile nav. The animated element needs
   `overflow-hidden`, and must be wrapped in <AnimatePresence> so the
   close direction plays.
=========================== */
export const collapse: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { duration: duration.base, ease: ease.inOut },
  },
  open: {
    height: 'auto',
    opacity: 1,
    transition: { duration: duration.base, ease: ease.inOut },
  },
};

/* ===========================
   Overlay surfaces
   Shared by Modal and the AIChat widget so both open with one gesture.
   Use `initial="hidden" animate="show" exit="hidden"`.
=========================== */
export const overlay: Variants = {
  hidden: { opacity: 0, transition: { duration: duration.base, ease: ease.inOut } },
  show: { opacity: 1, transition: { duration: duration.base, ease: ease.inOut } },
};

export const panel: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 16, transition: { duration: duration.fast, ease: ease.inOut } },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: duration.base, ease: ease.out } },
};
