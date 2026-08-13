import { motion, MotionConfig } from 'framer-motion';
import { Check } from 'lucide-react';
import { cta } from '../data/site';
import { cardHover, fadeIn, fadeUp, staggerContainer, viewportOnce } from '../lib/motion';

/** `period` replaces the old tag + priceNote pair, which said the same thing twice. */
const plans = [
  {
    name: 'Starter',
    price: 'Custom',
    period: 'one-time',
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
    price: 'Custom',
    period: 'per month',
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
    price: 'Bespoke',
    period: 'quoted per site',
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

/* The `!` prefixes are deliberate: global.css says the .surface-* classes own
   background, border, border-radius and box-shadow, and they are declared
   after @tailwind utilities. Marking them important is the only way the
   featured card takes the primary edge and the shared 1rem corner. */
const cardClass = (highlight: boolean) =>
  [
    'surface-interactive rounded-2xl p-6 lg:p-8 flex flex-col h-full',
    highlight ? 'surface-card-raised !border-primary-500 !rounded-2xl' : 'surface-card',
  ].join(' ');

const Pricing = () => (
  <MotionConfig reducedMotion="user">
    <section id="pricing" className="scroll-mt-28 bg-paper py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-center"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight">
            Simple Pricing That <span className="text-primary-500">Pays for Itself</span>
          </h2>
          <p className="mt-4 text-base lg:text-lg text-body max-w-2xl mx-auto">
            No hidden fees, no commission on your bookings — every price agreed upfront.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch"
        >
          {plans.map((plan) => (
            <motion.div key={plan.name} variants={fadeUp} whileHover={cardHover} className={cardClass(plan.highlight)}>
              {plan.highlight && (
                <span className="self-start bg-primary-500 text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                  Most popular
                </span>
              )}

              <h3 className={`font-display font-semibold text-lg text-ink ${plan.highlight ? 'mt-4' : ''}`}>
                {plan.name}
              </h3>

              <div className="mt-3 flex flex-wrap items-baseline gap-x-2">
                <span className="font-mono font-bold text-4xl text-ink">{plan.price}</span>
                <span className="text-sm text-muted">{plan.period}</span>
              </div>

              <p className="mt-4 text-sm text-body leading-relaxed">{plan.description}</p>

              {/* flex-1 absorbs the height difference so every CTA lands on the same line. */}
              <ul className="mt-6 space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-body">
                    <Check className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={cta.primary.href}
                className={`focus-ring mt-8 w-full justify-center ${plan.highlight ? 'btn-primary' : 'btn-outline'}`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-10 text-center text-sm text-muted"
        >
          Every plan starts with a free call. Final pricing depends on your covers and what you need.{' '}
          <a href={cta.primary.href} className="focus-ring rounded text-primary-500 underline underline-offset-2">
            Get a custom quote
          </a>
          .
        </motion.p>
      </div>
    </section>
  </MotionConfig>
);

export default Pricing;
