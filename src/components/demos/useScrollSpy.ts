import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently under the reading line — a band just
 * below the fixed header — so a nav link can mark itself current while you
 * scroll. Shared by the demo brand navs.
 *
 * Reading the hash instead would leave the highlight wherever you last clicked:
 * the hash doesn't change on scroll. The last match wins, so overlapping
 * sections resolve to the lower one.
 *
 * `ids` is joined into the dep key rather than passed by reference, so callers
 * can hand in a fresh array each render without re-subscribing every time.
 */
export function useScrollSpy(ids: readonly string[], offset = 96): string {
  const [active, setActive] = useState('');
  const key = ids.join(',');

  useEffect(() => {
    const list = key.split(',').filter(Boolean);
    if (!list.length) return;

    let frame = 0;
    const spy = () => {
      frame = 0;
      let current = '';
      for (const id of list) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= offset && bottom > offset) current = id;
      }

      /* The last section can be shorter than the gap between the reading line
         and the bottom of the page, so it would never claim the line on its
         own. At the very bottom, the furthest-down section takes it — measured
         by offsetTop, since `ids` is nav order and need not be document order. */
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        let lowest = '';
        let lowestTop = -1;
        for (const id of list) {
          const el = document.getElementById(id);
          if (el && el.offsetTop > lowestTop) {
            lowestTop = el.offsetTop;
            lowest = id;
          }
        }
        if (lowest) current = lowest;
      }

      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(spy);
    };

    spy();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [key, offset]);

  return active;
}
