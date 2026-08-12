// Semantic image slots → files in `public/images/`.
//
// Source set (converted to WebP, 13MB → 1.5MB):
//   results/gbp-1..4   Google Business Profile before/after comparisons.
//                      Each file already contains BOTH states side by side, so
//                      never try to compose a before/after pair from two files.
//   ads/ad-1..12       Real Meta ad creatives, portrait, ~493px wide.
//   email/email-1..3   Email & SMS campaign mockups, landscape.
//
// There is no hero food photograph and no headshots in the set, so the hero
// leads with an ad creative and there is no avatar cluster. Don't add slots for
// images that don't exist — a fabricated face is worse than none.

const dir = '/images';

const ad = (n: number) => ({
  src: `${dir}/ads/ad-${n}.webp`,
  width: 494,
  // Real heights, so the masonry reserves the right space and nothing shifts.
  height: [1357, 806, 657, 866, 871, 1093, 782, 848, 611, 845, 865, 549][n - 1],
});

export const media = {
  /** Hero visual: a live ad creative, shown as the thing we actually ship. */
  hero: ad(5),

  /** Before/after proof. One file per card — each already shows both states. */
  results: [
    { src: `${dir}/results/gbp-1.webp`, width: 1400, height: 933 },
    { src: `${dir}/results/gbp-2.webp`, width: 1400, height: 933 },
    { src: `${dir}/results/gbp-3.webp`, width: 1400, height: 1120 },
    { src: `${dir}/results/gbp-4.webp`, width: 1400, height: 933 },
  ],

  /** Every ad creative, for the work gallery. */
  ads: Array.from({ length: 12 }, (_, i) => ad(i + 1)),

  /** Email & SMS campaign mockups. */
  email: [
    { src: `${dir}/email/email-1.webp`, width: 1400, height: 933 },
    { src: `${dir}/email/email-2.webp`, width: 1400, height: 933 },
    { src: `${dir}/email/email-3.webp`, width: 1400, height: 933 },
  ],
} as const;

export type Shot = { src: string; width: number; height: number };
