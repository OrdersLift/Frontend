import { motion, MotionConfig } from 'framer-motion';
import { Check, Zap, ArrowRight } from 'lucide-react';
import {
  cardHover, cardTap, fadeIn, fadeUp, staggerContainer, viewportOnce,
} from '../lib/motion';

const plans = [
  {
    name: 'Starter',
    tag: 'One-time',
    price: 'Custom',
    priceNote: 'One-time payment',
    description: 'For independents who want the lot up front, owned outright, with no monthly bill.',
    features: [
      'Custom restaurant website',
      'Admin panel',
      'Table booking system',
      'QR digital menu',
      'AI menu chatbot (basic)',
      'Managed hosting (1st year)',
      '12 months free maintenance',
    ],
    cta: 'Get a Quote',
    highlight: false,
  },
  {
    name: 'Growth',
    tag: 'Monthly',
    price: 'Custom',
    priceNote: 'Monthly subscription',
    description: 'For restaurants that want the bookings, the ordering and the automation running properly.',
    features: [
      'Everything in Starter',
      'Advanced AI bot (voice + text)',
      'Commission-free online ordering',
      'WhatsApp & SMS booking reminders',
      'Covers & revenue analytics',
      'Managed hosting included',
      '24 months free maintenance',
      'Monthly AI model updates',
      'Priority support',
    ],
    cta: 'Get a Quote',
    highlight: true,
  },
  {
    name: 'Enterprise',
    tag: 'Custom',
    price: 'Bespoke',
    priceNote: 'Fully custom pricing',
    description: 'For groups and multi-site operators who need it tied into the systems they already run.',
    features: [
      'Everything in Growth',
      'Multi-site & group support',
      'Custom POS data sources',
      'Voice AI phone reservations',
      'Deep POS & till integration',
      'Dedicated account manager',
      'SLA with guaranteed uptime',
      'Custom reporting per site',
    ],
    cta: 'Talk to Us',
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <MotionConfig reducedMotion="user">
      <section id="pricing" className="scroll-mt-24 py-16 sm:py-20 lg:py-24 section-band relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]
                        bg-primary-300/30 dark:bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass
                             border border-accent-500/40 text-accent-700 dark:text-accent-300
                             text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Transparent Pricing
            </span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-5">
              One-Time or Monthly —{' '}
              <span className="gradient-text">You Choose</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-slate-400 max-w-2xl mx-auto">
              No hidden fees. No commission on your bookings. Pricing is agreed upfront, always.
            </p>
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
          >
            {plans.map((plan) => (
              /* The featured card's `lg:scale-[1.03]` lives on this wrapper, not on
                 the card: framer-motion writes `transform` inline on the animated
                 element, which would silently overwrite a Tailwind scale utility. */
              <div key={plan.name} className={plan.highlight ? 'lg:scale-[1.03] lg:z-10' : undefined}>
                <motion.div
                  variants={fadeUp}
                  whileHover={cardHover}
                  whileTap={cardTap}
                  className={plan.highlight
                    ? 'surface-card-raised surface-featured surface-interactive relative flex flex-col h-full p-8 pt-9'
                    : 'surface-card surface-interactive relative flex flex-col h-full p-8'}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                      <span className="bg-gradient-to-r from-primary-600 to-glow-500 text-white
                                       text-xs font-bold px-5 py-1.5 rounded-full shadow-sm">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="surface-inset p-5 mb-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{plan.name}</h3>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary-100
                                       text-primary-700 border border-primary-200
                                       dark:bg-white/[0.08] dark:text-slate-400 dark:border-white/10">
                        {plan.tag}
                      </span>
                    </div>
                    <div className="text-3xl font-bold gradient-text-blue mb-1">{plan.price}</div>
                    <div className="text-xs text-neutral-500 dark:text-slate-500">{plan.priceNote}</div>
                  </div>

                  <p className="text-neutral-600 dark:text-slate-400 text-sm leading-relaxed mb-7">{plan.description}</p>

                  <ul className="hairline-t pt-6 space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-neutral-700 dark:text-slate-300">
                        <Check className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="/#contact"
                    className={`focus-ring w-full text-center py-3.5 px-6 rounded-xl font-semibold text-sm
                               transition-all duration-200 flex items-center justify-center gap-2
                               ${plan.highlight
                                 ? 'bg-gradient-to-r from-primary-600 to-glow-500 hover:from-primary-500 hover:to-accent-400 text-white hover:shadow-lg hover:shadow-primary-500/40'
                                 : 'border border-primary-300 text-neutral-700 hover:border-primary-500 hover:text-primary-700 hover:bg-primary-50 dark:border-white/15 dark:text-white/80 dark:hover:border-primary-400 dark:hover:text-white dark:hover:bg-white/[0.05]'
                               }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              </div>
            ))}
          </motion.div>

          {/* Footer note */}
          <motion.p
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="text-center text-neutral-500 dark:text-slate-500 text-sm mt-10"
          >
            Every plan starts with a free call. Final pricing depends on your covers and what you need.{' '}
            <a href="/#contact" className="text-primary-600 hover:text-primary-700 dark:text-primary-400
                                          dark:hover:text-primary-300 underline underline-offset-2">
              Contact us for a custom quote.
            </a>
          </motion.p>
        </div>
      </section>
    </MotionConfig>
  );
};

export default Pricing;
