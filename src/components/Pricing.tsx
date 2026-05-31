import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Check, Zap, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    tag: 'One-time',
    price: 'Custom',
    priceNote: 'One-time payment',
    description: 'Perfect for small businesses wanting a complete platform with no ongoing fees.',
    features: [
      'Custom website design & build',
      'Admin panel',
      'AI customer chatbot (basic)',
      'Standard delivery/service integrations',
      'Analytics dashboard',
      'Managed hosting (1st year)',
      '12 months free maintenance',
    ],
    cta: 'Get a Quote',
    highlight: false,
    border: 'border-white/10',
    bg: 'bg-white/02',
  },
  {
    name: 'Growth',
    tag: 'Monthly',
    price: 'Custom',
    priceNote: 'Monthly subscription',
    description: 'Best for growing businesses who want continuous AI improvements and full support.',
    features: [
      'Everything in Starter',
      'Advanced AI chatbot (voice + text)',
      'Internal RAG bot',
      'WhatsApp & SMS automation',
      'Predictive analytics',
      'Managed hosting included',
      '24 months free maintenance',
      'Monthly AI model updates',
      'Priority support',
    ],
    cta: 'Get a Quote',
    highlight: true,
    border: 'border-primary-500/40',
    bg: 'bg-primary-500/05',
  },
  {
    name: 'Enterprise',
    tag: 'Custom',
    price: 'Bespoke',
    priceNote: 'Fully custom pricing',
    description: 'For multi-location businesses or complex integrations needing a fully tailored solution.',
    features: [
      'Everything in Growth',
      'Multi-location support',
      'Custom RAG data sources',
      'Voice AI phone agent',
      'CRM & POS deep integration',
      'Dedicated account manager',
      'SLA with guaranteed uptime',
      'Custom reporting & BI',
    ],
    cta: 'Talk to Us',
    highlight: false,
    border: 'border-white/10',
    bg: 'bg-white/02',
  },
];

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="pricing" ref={ref} className="py-24 bg-dark-850 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]
                      bg-primary-600/08 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass
                           border border-accent-500/30 text-accent-300 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Transparent Pricing
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-5">
            One-Time or Monthly —{' '}
            <span className="gradient-text">You Choose</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            No hidden fees. No surprise invoices. Pricing is always discussed and agreed upfront.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative rounded-2xl border ${plan.border} ${plan.bg}
                         p-8 flex flex-col transition-all duration-300 card-hover
                         ${plan.highlight ? 'shadow-2xl shadow-primary-500/20 lg:-mt-4 lg:pb-12' : ''}`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-primary-600 to-glow-600 text-white
                                   text-xs font-bold px-5 py-1.5 rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/08
                                   text-slate-400 border border-white/10">
                    {plan.tag}
                  </span>
                </div>
                <div className="text-3xl font-bold gradient-text-blue mb-1">{plan.price}</div>
                <div className="text-xs text-slate-500">{plan.priceNote}</div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-7">{plan.description}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="/#contact"
                className={`w-full text-center py-3.5 px-6 rounded-xl font-semibold text-sm
                           transition-all duration-200 flex items-center justify-center gap-2
                           ${plan.highlight
                             ? 'bg-primary-600 hover:bg-primary-500 text-white hover:shadow-lg hover:shadow-primary-500/30'
                             : 'border border-white/15 text-white/80 hover:border-primary-400 hover:text-white hover:bg-white/05'
                           }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center text-slate-500 text-sm mt-10"
        >
          All plans include a free discovery call. Final pricing depends on your business size and requirements.{' '}
          <a href="/#contact" className="text-primary-400 hover:text-primary-300 underline underline-offset-2">
            Contact us for a custom quote.
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;
