import { motion, MotionConfig } from 'framer-motion';
import { fadeUp, viewportOnce } from '../lib/motion';
import { media } from '../data/media';
import { work } from '../data/site';

function LabelRow({ title, note }: { title: string; note: string }) {
  return (
    <div className="mx-auto flex max-w-7xl flex-wrap items-baseline gap-x-3 gap-y-1 px-5 sm:px-8">
      <h3 className="font-display text-sm font-semibold text-ink">{title}</h3>
      <p className="text-xs text-muted">{note}</p>
    </div>
  );
}

/* Full bleed: the track lives outside the container, `overflow-hidden` keeps it
   from widening the page at 360px. Hover pause and reduced-motion come from
   `.marquee-paused` / `.marquee-track` in global.css — the reduced-motion block
   there kills the animation outright, so nothing extra is needed here. */
function AdsMarquee() {
  return (
    <div
      style={{ '--speed': '60s' } as React.CSSProperties}
      className="marquee-paused mask-edges overflow-hidden"
    >
      <div className="marquee-track animate-marquee-rl flex w-max will-change-transform">
        {[false, true].map((isClone) => (
          <div key={String(isClone)} className="flex gap-5 pr-5" aria-hidden={isClone || undefined}>
            {media.ads.map((shot, i) => (
              <img
                key={shot.src}
                src={shot.src}
                width={shot.width}
                height={shot.height}
                loading="lazy"
                decoding="async"
                alt={isClone ? '' : `Meta ad creative ${i + 1} of 12 for a restaurant client`}
                className="h-auto w-[220px] flex-shrink-0 rounded-xl bg-white object-contain
                           ring-1 ring-rule lg:w-[260px]"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const Work = () => {
  return (
    <MotionConfig reducedMotion="user">
      <section id="work" className="scroll-mt-28 bg-paper pt-10 pb-14 lg:pt-12 lg:pb-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto max-w-7xl px-5 sm:px-8 text-center"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight">
            {work.heading} <span className="text-primary-500">{work.headingAccent}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-body">{work.sub}</p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 lg:mt-16"
        >
          <LabelRow title={work.ads.title} note={work.ads.note} />
          <div className="mt-5">
            <AdsMarquee />
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16"
        >
          <LabelRow title={work.email.title} note={work.email.note} />
          <div className="mx-auto mt-5 grid max-w-7xl grid-cols-1 gap-5 px-5 sm:px-8 lg:grid-cols-3">
            {media.email.map((shot, i) => (
              <div key={shot.src} className="surface-card p-3">
                <img
                  src={shot.src}
                  width={shot.width}
                  height={shot.height}
                  loading="lazy"
                  decoding="async"
                  alt={work.email.alts[i]}
                  className="h-auto w-full rounded-lg bg-white"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
};

export default Work;
