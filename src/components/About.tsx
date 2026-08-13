import { motion, MotionConfig } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { cta } from '../data/site';
import { cardHover, fadeUp, staggerContainer, viewportOnce } from '../lib/motion';

/* about.astro renders <About /> with NO client directive, so this island is
   server-rendered once and never hydrated. That makes `initial="hidden"` fatal:
   framer-motion would serialise opacity:0 / translateY into the HTML and no JS
   would ever run whileInView to undo it — the whole page would be blank.

   Every motion element below therefore uses `initial={false}`, which tells
   framer-motion to skip the entry state entirely and render the element at rest.
   The variants stay wired up so the section behaves correctly the day someone
   adds `client:visible`; until then the reveal is simply a no-op and the content
   is visible with JavaScript disabled. */
const still = { initial: false as const, whileInView: 'show', viewport: viewportOnce };

const positions = [
  {
    head: 'Restaurants, and nothing else',
    body:
      'The timing of a review request, the way a menu gets indexed, the offer that gets someone ' +
      'to drive fifteen minutes on a wet Tuesday — none of it transfers from dentistry or ' +
      'conveyancing. An agency that serves eleven industries is competent at none of them.',
  },
  {
    head: 'The listing before the advertising',
    body:
      'Sending paid traffic at a two-point-eight rating buys strangers the chance to scroll past ' +
      'you. We fix what they land on first. It is a slower start and a smaller invoice in month ' +
      'one, and it is the only order that works.',
  },
  {
    head: 'Real reviews or none',
    body:
      'We will not buy, write or incentivise a review, and we will tell you to walk away from ' +
      'anyone who offers to. Google strips them and suspends profiles for it. A suspended profile ' +
      'costs more than every review it ever bought.',
  },
  {
    head: 'Your accounts, your data',
    body:
      'We work inside your Google profile, your ad account, your domain and your guest list. ' +
      'Nothing is held in ours. If you leave, nothing switches off and nothing needs handing back.',
  },
  {
    head: 'Numbers you can act on',
    body:
      'Impressions and reach are not food. The Monday report shows rating, review count, calls, ' +
      'direction requests, direct orders and cost per redeemed voucher — the six things that ' +
      'change what you do next week.',
  },
  {
    head: 'One page, one person',
    body:
      'You get the person doing the work, not an account manager relaying it. Small on purpose: ' +
      'we would rather run twenty restaurants properly than two hundred badly.',
  },
];

const refusals = [
  'Buy, write or incentivise reviews',
  'Mark up your ad spend',
  'Hold your Google profile or ad account hostage',
  'Lock you into a twelve-month contract',
  'Report on impressions and call it growth',
  'Take on a second restaurant on your street',
];

const eyebrow = 'text-xs font-semibold uppercase tracking-[0.18em] text-muted';
const h2 = 'font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight';

const About = () => (
  <MotionConfig reducedMotion="user">
    {/* pt-24 clears the ~68px fixed header. */}
    <section className="section-band pt-24 lg:pt-28 pb-14 lg:pb-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div variants={staggerContainer()} {...still}>
          <motion.p variants={fadeUp} className={eyebrow}>
            About
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-5 max-w-4xl font-display font-bold tracking-tight text-ink
                       text-4xl sm:text-5xl lg:text-6xl"
          >
            We got tired of watching <span className="text-primary-500">good kitchens</span> lose
            to worse ones.
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-base sm:text-lg leading-relaxed text-body">
            The gap between a restaurant that is busy and one that is not is very often not the
            food. It is eleven reviews against three hundred, a phone number that rings out, and
            a photograph of an empty dining room taken in 2017. That gap is fixable, it is
            unglamorous work, and it is all we do.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
            <a href={cta.primary.href} className="btn-primary focus-ring">
              Book a teardown
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
            <a href="/#work" className="btn-outline focus-ring">
              See the work
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>

    <section className="bg-paper py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div variants={staggerContainer()} {...still}>
          <motion.p variants={fadeUp} className={eyebrow}>
            How we work
          </motion.p>
          <motion.h2 variants={fadeUp} className={`${h2} mt-4 max-w-4xl`}>
            What we believe, <span className="text-primary-500">stated plainly</span> enough to be
            held to.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-sm text-muted">
            Six positions
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer()}
          {...still}
          className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {positions.map((p, i) => (
            <motion.div
              key={p.head}
              variants={fadeUp}
              whileHover={cardHover}
              className="surface-card surface-interactive rounded-2xl p-6 lg:p-7"
            >
              <span className="font-mono text-sm font-bold text-primary-500">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-display font-semibold text-lg text-ink tracking-tight">
                {p.head}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-body">{p.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    <section className="section-band py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div variants={staggerContainer()} {...still}>
          <motion.p variants={fadeUp} className={eyebrow}>
            What we will not do
          </motion.p>
          <motion.h2 variants={fadeUp} className={`${h2} mt-4 max-w-4xl`}>
            The shortest way to understand an agency is to ask{' '}
            <span className="text-primary-500">what it refuses</span>.
          </motion.h2>
        </motion.div>

        <div className="surface-card rounded-2xl p-6 lg:p-7 mt-12 lg:mt-16 max-w-3xl">
          <motion.ul variants={staggerContainer()} {...still} className="hairline-y">
            {refusals.map((r) => (
              <motion.li
                key={r}
                variants={fadeUp}
                className="flex items-start gap-4 py-4 first:pt-0 last:pb-0"
              >
                <X className="mt-0.5 h-5 w-5 shrink-0 text-loss" aria-hidden="true" />
                <span className="text-base sm:text-lg text-body">{r}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <p className="mt-10 max-w-2xl text-body leading-relaxed">
          If any of those are things you were hoping for, we are the wrong agency and it is
          cheaper for both of us to find that out now.{' '}
          <a
            href={cta.primary.href}
            className="focus-ring rounded font-semibold text-primary-500 underline underline-offset-4
                       hover:text-primary-400"
          >
            Otherwise, get in touch.
          </a>
        </p>
      </div>
    </section>
  </MotionConfig>
);

export default About;
