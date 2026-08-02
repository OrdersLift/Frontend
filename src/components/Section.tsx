import type { ReactNode } from 'react';

/**
 * Section masthead.
 *
 * Every section opens the same way: a hairline rule, a mono marker sitting in
 * the left margin, then the heading. The marker names what the block IS —
 * it is navigation, not ornament, which is why it repeats verbatim in the
 * nav and the footer.
 */
export function SectionHead({
  marker,
  title,
  lede,
  aside,
}: {
  marker: string;
  title: ReactNode;
  lede?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="border-t border-rule pt-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <p className="label">{marker}</p>
        {aside && <p className="label">{aside}</p>}
      </div>
      <h2 className="display mt-6 max-w-3xl text-[clamp(2rem,4.6vw,3.1rem)]">{title}</h2>
      {lede && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-body">{lede}</p>}
    </header>
  );
}
