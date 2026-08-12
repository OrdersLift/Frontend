// Semantic image slots → files in `public/images/`.
//
// The source set is Restaurant-Ad-1.png … Restaurant-Ad-12.png, so the mapping
// below is a guess at which shot suits which slot. Remap here — one file — once
// you can see them on the page; nothing else references a filename.
//
// A missing file degrades to the placeholder colour behind it rather than a
// broken-image icon, because every <img> sits on a filled card.

const dir = '/images';

export const media = {
  /** Large food photograph behind the hero's floating stat cards. */
  hero: `${dir}/Restaurant-Ad-1.png`,

  /** Before/after pairs in the results section. */
  results: {
    googleProfile: { before: `${dir}/Restaurant-Ad-2.png`, after: `${dir}/Restaurant-Ad-3.png` },
    social: { before: `${dir}/Restaurant-Ad-4.png`, after: `${dir}/Restaurant-Ad-5.png` },
    website: { before: `${dir}/Restaurant-Ad-6.png`, after: `${dir}/Restaurant-Ad-7.png` },
  },

  /** Faces in the hero's "trusted by owners" cluster. */
  avatars: [
    `${dir}/Restaurant-Ad-8.png`,
    `${dir}/Restaurant-Ad-9.png`,
    `${dir}/Restaurant-Ad-10.png`,
    `${dir}/Restaurant-Ad-11.png`,
  ],

  /** Supporting shot for the about/story block. */
  about: `${dir}/Restaurant-Ad-12.png`,
} as const;
