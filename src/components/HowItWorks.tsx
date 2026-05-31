import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageCircle, Cpu, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: MessageCircle,
    title: 'Discovery Call',
    description:
      'We spend time understanding your business — your customers, pain points, goals, and existing tools. ' +
      'No generic templates. Every solution starts here.',
    details: ['Free consultation', 'Industry-specific scoping', 'Technology fit assessment'],
    color: 'text-primary-400',
    border: 'border-primary-500/30',
    bg: 'bg-primary-500/10',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'Build & Integrate',
    description:
      'Our team builds your custom website, admin panel, AI chatbot, and RAG bot — all integrated ' +
      'with your existing systems. We handle every technical detail.',
    details: ['2–4 week delivery', 'Daily progress updates', 'Your feedback at every stage'],
    color: 'text-glow-400',
    border: 'border-glow-500/30',
    bg: 'bg-glow-500/10',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Launch & Maintain',
    description:
      'We go live, monitor everything, and maintain your platform for 2 full years — free. ' +
      'Updates, fixes, AI model improvements, new features. You never touch a server.',
    details: ['2 years free maintenance', '24/7 monitoring', 'Continuous AI improvements'],
    color: 'text-accent-400',
    border: 'border-accent-500/30',
    bg: 'bg-accent-500/10',
  },
];

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="how-it-works" ref={ref} className="py-24 bg-dark-850 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full glass border border-accent-500/30
                           text-accent-300 text-sm font-medium mb-6">
            How It Works
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-5">
            From Idea to{' '}
            <span className="gradient-text">Live in Weeks</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Three simple steps. We do the heavy lifting — you get a complete AI-powered business platform.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden lg:block absolute top-16 left-1/3 right-1/3 h-px bg-gradient-to-r
                          from-primary-500/50 via-glow-500/50 to-accent-500/50 z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative flex flex-col"
            >
              {/* Step number + icon */}
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className={`w-14 h-14 rounded-2xl ${step.bg} border ${step.border}
                                flex items-center justify-center flex-shrink-0`}>
                  <step.icon className={`w-6 h-6 ${step.color}`} />
                </div>
                <span className={`text-5xl font-bold ${step.color} opacity-20 font-display`}>
                  {step.number}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{step.description}</p>

              <ul className="space-y-2 mt-auto">
                {step.details.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className={`w-1.5 h-1.5 rounded-full ${step.color} bg-current flex-shrink-0`} />
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-center mt-16"
        >
          <a href="/#contact" className="btn-primary px-10 py-4 text-base glow-primary">
            Book Your Free Discovery Call
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
