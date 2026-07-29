import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  UtensilsCrossed, Smile, Dumbbell, Wrench, Scissors,
  Scale, Hotel, ShoppingBag, Home, Stethoscope
} from 'lucide-react';

const industries = [
  {
    icon: UtensilsCrossed,
    name: 'Restaurants',
    desc: 'Online ordering, AI menu chatbot, delivery integrations, reservation system.',
    color: 'from-primary-500/25 to-primary-600/15',
    border: 'hover:border-primary-500/50',
    iconColor: 'text-primary-600 dark:text-primary-400',
  },
  {
    icon: Smile,
    name: 'Dental Clinics',
    desc: 'Appointment booking, patient FAQ bot, treatment info, reminder automation.',
    color: 'from-glow-400/25 to-glow-500/15',
    border: 'hover:border-glow-500/50',
    iconColor: 'text-glow-600 dark:text-glow-400',
  },
  {
    icon: Dumbbell,
    name: 'Gyms & Fitness',
    desc: 'Class scheduling, membership management, trainer profiles, progress tracking.',
    color: 'from-accent-400/30 to-accent-500/15',
    border: 'hover:border-accent-500/50',
    iconColor: 'text-accent-600 dark:text-accent-300',
  },
  {
    icon: Wrench,
    name: 'Auto Garages',
    desc: 'Service booking, job status tracker, quote requests, parts inventory bot.',
    color: 'from-primary-600/25 to-glow-500/15',
    border: 'hover:border-primary-600/50',
    iconColor: 'text-primary-700 dark:text-primary-300',
  },
  {
    icon: Scissors,
    name: 'Salons & Spas',
    desc: 'Online booking, stylist portfolios, loyalty rewards, WhatsApp reminders.',
    color: 'from-accent-300/35 to-glow-400/20',
    border: 'hover:border-accent-400/60',
    iconColor: 'text-glow-600 dark:text-accent-300',
  },
  {
    icon: Scale,
    name: 'Law Firms',
    desc: 'Consultation booking, legal FAQ bot, case status portal, document intake.',
    color: 'from-glow-600/25 to-primary-600/15',
    border: 'hover:border-glow-600/50',
    iconColor: 'text-glow-700 dark:text-glow-300',
  },
  {
    icon: Hotel,
    name: 'Hotels & B&Bs',
    desc: 'Room booking, local recommendations bot, guest services, review management.',
    color: 'from-primary-300/35 to-accent-300/20',
    border: 'hover:border-primary-400/60',
    iconColor: 'text-primary-600 dark:text-primary-300',
  },
  {
    icon: ShoppingBag,
    name: 'Retail Shops',
    desc: 'Product catalogue, stock query bot, loyalty program, order management.',
    color: 'from-accent-500/25 to-glow-500/15',
    border: 'hover:border-accent-600/50',
    iconColor: 'text-accent-700 dark:text-accent-300',
  },
  {
    icon: Home,
    name: 'Real Estate',
    desc: 'Property search bot, valuation requests, viewing bookings, lead capture.',
    color: 'from-glow-500/25 to-accent-400/15',
    border: 'hover:border-glow-500/50',
    iconColor: 'text-glow-600 dark:text-glow-300',
  },
  {
    icon: Stethoscope,
    name: 'Clinics & Physio',
    desc: 'Appointment scheduling, treatment FAQ, prescription reminders, patient portal.',
    color: 'from-primary-400/25 to-accent-300/15',
    border: 'hover:border-primary-500/50',
    iconColor: 'text-primary-600 dark:text-primary-400',
  },
];

const Industries = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="industries" ref={ref} className="py-24 bg-cream-100 dark:bg-black relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-cream-100 to-white
                      dark:from-black dark:via-neutral-950 dark:to-black pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full glass border border-primary-500/30
                           text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
            Industries We Serve
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-5">
            We Work With{' '}
            <span className="gradient-text">Every Business</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            From restaurants to law firms — if your business serves customers, we build the AI platform
            that runs it smarter. One partner, every industry.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`glass-card p-5 transition-all duration-300 cursor-default card-hover
                         ${industry.border}`}
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${industry.color}
                              flex items-center justify-center mb-4`}>
                <industry.icon className={`w-5 h-5 ${industry.iconColor}`} />
              </div>
              <h3 className="text-neutral-900 dark:text-white font-semibold text-sm mb-2">{industry.name}</h3>
              <p className="text-neutral-600 dark:text-slate-500 text-xs leading-relaxed">{industry.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-center text-neutral-500 dark:text-slate-500 text-sm mt-10"
        >
          Don't see your industry?{' '}
          <a href="/#contact" className="text-primary-600 hover:text-primary-700 dark:text-primary-400
                                        dark:hover:text-primary-300 underline underline-offset-2">
            Talk to us — we build for everyone.
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default Industries;
