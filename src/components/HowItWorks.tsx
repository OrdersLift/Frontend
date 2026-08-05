import { motion, MotionConfig } from 'framer-motion';
import { MessageCircle, Cpu, Rocket } from 'lucide-react';
import {
  cardHover, cardTap, fadeUp, pressHover, pressTap, staggerContainer, viewportOnce,
} from '../lib/motion';

const steps = [
  {
    number: '01',
    icon: MessageCircle,
    title: 'Discovery Call',
    description:
      'We sit down with you and go through your menu, your covers, how bookings come in today, and ' +
      'what is eating your time. No generic templates.',
    details: ['Free consultation', 'We look at your current site', 'Honest scope and timeline'],
    color: 'text-primary-600 dark:text-primary-400',
    border: 'border-primary-500/30',
    bg: 'bg-primary-500/10',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'Build & Integrate',
    description:
      'We build the site, wire up table bookings, set up your QR menu and train the AI on your ' +
      'dishes — connected to the tools you already use. We handle every technical detail.',
    details: ['2–4 week delivery', 'Daily progress updates', 'Your feedback at every stage'],
    color: 'text-glow-600 dark:text-glow-400',
    border: 'border-glow-500/30',
    bg: 'bg-glow-500/10',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Launch & Maintain',
    description:
      'We go live, watch it closely through your first few services, and maintain everything for ' +
      '2 full years — free. Menu changes, fixes, updates. You never touch a server.',
    details: ['2 years free maintenance', '24/7 monitoring', 'Menu changes done for you'],
    color: 'text-accent-700 dark:text-accent-300',
    border: 'border-accent-500/30',
    bg: 'bg-accent-500/10',
  },
];

const HowItWorks = () => (
  <MotionConfig reducedMotion="user">
    <section
      id="how-it-works"
      className="py-16 sm:py-20 lg:py-24 section-band relative overflow-hidden scroll-mt-24"
    >
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — mb-16, not mb-20: the cards carry their own weight now. */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full glass border border-accent-500/40
                           text-accent-700 dark:text-accent-300 text-sm font-medium mb-6">
            How It Works
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-5">
            From Idea to{' '}
            <span className="gradient-text">Live in Weeks</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-slate-400 max-w-2xl mx-auto">
            Three steps. We do the technical bit — you get bookings landing while you cook.
          </p>
        </motion.div>

        {/* Steps — 3 items × 0.1 is a 200ms window, inside the 360ms budget. */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch relative z-10"
        >
          {/* Connector line (desktop only) — runs centre-to-centre behind the
              cards, so it reads as a thread rather than a rule under them. */}
          <div className="hidden lg:block absolute top-[4.5rem] left-[16.66%] right-[16.66%] h-px -z-10
                          bg-gradient-to-r from-primary-500/50 via-glow-500/50 to-accent-500/50" />

          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              whileHover={cardHover}
              whileTap={cardTap}
              className="surface-card surface-interactive relative flex flex-col h-full
                         p-6 sm:p-7 overflow-hidden"
            >
              {/* The numeral is a corner watermark, not an inline element —
                  pulling it out of the flex row is what turns a paragraph
                  into a product card. */}
              <span
                aria-hidden="true"
                className={`absolute top-3 right-5 text-6xl font-display font-bold
                            opacity-10 dark:opacity-[0.14] ${step.color} pointer-events-none`}
              >
                {step.number}
              </span>

              <div className={`w-14 h-14 rounded-2xl ${step.bg} border ${step.border}
                              flex items-center justify-center flex-shrink-0 mb-5`}>
                <step.icon className={`w-6 h-6 ${step.color}`} />
              </div>

              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">{step.title}</h3>
              <p className="text-neutral-600 dark:text-slate-400 text-sm leading-relaxed mb-6">{step.description}</p>

              <ul className="surface-inset mt-auto p-4 space-y-2">
                {step.details.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-sm text-neutral-700 dark:text-slate-300">
                    <span className={`w-1.5 h-1.5 rounded-full ${step.color} bg-current flex-shrink-0`} />
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-center mt-16"
        >
          <motion.a
            href="/#contact"
            whileHover={pressHover}
            whileTap={pressTap}
            className="btn-primary w-full sm:w-auto px-6 sm:px-10 py-4 text-base glow-primary
                       justify-center text-center"
          >
            Book Your Free Discovery Call
          </motion.a>
        </motion.div>
      </div>
    </section>
  </MotionConfig>
);

export default HowItWorks;
