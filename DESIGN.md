# OrdersLift redesign spec

Every section is being rebuilt in parallel. This file is the contract between
them — follow it exactly so the finished page reads as one design.

## The look

Dark charcoal page, one orange accent, generous breathing room, everything on
a rounded card. Restrained: no gradients on text, no glow, no glass blur, no
decorative shapes. The page should feel like a product dashboard, not a
landing-page template.

- Page background: `bg-paper` (near-black charcoal, `#0C0C0E`)
- Alternating band: `.section-band` (`#141417`)
- Cards: `.surface-card` — subtle white-alpha fill, 1px hairline border, `rounded-2xl`
- Accent: `primary-500` `#f97316` for buttons, icons, numbers, emphasised words
- Headings: white (`text-ink`), body copy `text-body`, captions `text-muted`

## Type

Already loaded — do not add fonts.

- Display / headings: `font-display` (Poppins), `font-bold`, tight tracking
- Body: `font-sans` (Inter)
- Numbers and data: `font-mono`

Section heading pattern, centred:

```tsx
<h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ink text-center tracking-tight">
  Everything You Need to <span className="text-primary-500">Grow</span> Your Restaurant
</h2>
```

Only the words marked in `site.ts` get `text-primary-500`. Never colour a whole heading.

## Spacing

- Section wrapper: `py-20 lg:py-28`
- Inner container: `mx-auto max-w-7xl px-5 sm:px-8`
- Heading to content: `mt-12 lg:mt-16`
- Card padding: `p-6 lg:p-7`
- Grid gaps: `gap-5 lg:gap-6`

Use these exact values. Inconsistent vertical rhythm is the main thing wrong
with the current site.

## Buttons

Use the existing `.btn-primary` and `.btn-outline` classes from `global.css`.
Do not invent new button styles. Every interactive element keeps `.focus-ring`.

## Content

All copy lives in [`src/data/site.ts`](src/data/site.ts). Import it — never
hardcode a string that already exists there. If you need copy that isn't in
`site.ts`, add it there rather than inlining it.

Images come from [`src/data/media.ts`](src/data/media.ts), which maps a
semantic slot to a filename in `public/images/`. Always go through it. Every
`<img>` needs `alt`, explicit `width`/`height`, and `loading="lazy"` (except
the hero image, which is `loading="eager"` + `fetchpriority="high"`).

## Motion

Import from `src/lib/motion.ts` — `fadeUp`, `staggerContainer`, `viewportOnce`,
`cardHover`. The standard reveal:

```tsx
<motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
```

Wrap each section in `<MotionConfig reducedMotion="user">`. Nothing bounces, nothing
loops, nothing animates on hover except the small lift in `cardHover`.

## Rules

1. **One file per agent.** Do not edit any file outside your assignment, and do
   not touch `global.css`, `tailwind.config.mjs`, `site.ts`, `media.ts` or
   `index.astro` — they are shared and already done.
2. **No new dependencies.** React, framer-motion, lucide-react and Tailwind are
   all you get.
3. **Use semantic tokens** (`bg-paper`, `text-ink`, `text-body`, `text-muted`,
   `.surface-card`, `.section-band`), not raw colours like `bg-neutral-900
   dark:bg-white`. The tokens flip with the theme; hardcoded pairs are what
   made the current site inconsistent.
4. **Mobile first.** Every grid collapses to one column. Nothing may cause
   horizontal scroll at 360px.
5. **Accessibility is not optional.** Real heading order, `aria-label` on
   icon-only controls, keyboard-reachable everything, visible focus.
6. Default export, same component name as the file. Keep the props signature
   (all of these are called with no props).
7. Leave the file building: `npx astro build` must pass.
