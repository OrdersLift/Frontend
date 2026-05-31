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
    color: 'from-orange-500/20 to-red-500/20',
    border: 'hover:border-orange-500/40',
    iconColor: 'text-orange-400',
  },
  {
    icon: Smile,
    name: 'Dental Clinics',
    desc: 'Appointment booking, patient FAQ bot, treatment info, reminder automation.',
    color: 'from-blue-500/20 to-cyan-500/20',
    border: 'hover:border-blue-500/40',
    iconColor: 'text-blue-400',
  },
  {
    icon: Dumbbell,
    name: 'Gyms & Fitness',
    desc: 'Class scheduling, membership management, trainer profiles, progress tracking.',
    color: 'from-green-500/20 to-emerald-500/20',
    border: 'hover:border-green-500/40',
    iconColor: 'text-green-400',
  },
  {
    icon: Wrench,
    name: 'Auto Garages',
    desc: 'Service booking, job status tracker, quote requests, parts inventory bot.',
    color: 'from-yellow-500/20 to-amber-500/20',
    border: 'hover:border-yellow-500/40',
    iconColor: 'text-yellow-400',
  },
  {
    icon: Scissors,
    name: 'Salons & Spas',
    desc: 'Online booking, stylist portfolios, loyalty rewards, WhatsApp reminders.',
    color: 'from-pink-500/20 to-rose-500/20',
    border: 'hover:border-pink-500/40',
    iconColor: 'text-pink-400',
  },
  {
    icon: Scale,
    name: 'Law Firms',
    desc: 'Consultation booking, legal FAQ bot, case status portal, document intake.',
    color: 'from-indigo-500/20 to-violet-500/20',
    border: 'hover:border-indigo-500/40',
    iconColor: 'text-indigo-400',
  },
  {
    icon: Hotel,
    name: 'Hotels & B&Bs',
    desc: 'Room booking, local recommendations bot, guest services, review management.',
    color: 'from-teal-500/20 to-cyan-500/20',
    border: 'hover:border-teal-500/40',
    iconColor: 'text-teal-400',
  },
  {
    icon: ShoppingBag,
    name: 'Retail Shops',
    desc: 'Product catalogue, stock query bot, loyalty program, order management.',
    color: 'from-purple-500/20 to-fuchsia-500/20',
    border: 'hover:border-purple-500/40',
    iconColor: 'text-purple-400',
  },
  {
    icon: Home,
    name: 'Real Estate',
    desc: 'Property search bot, valuation requests, viewing bookings, lead capture.',
    color: 'from-lime-500/20 to-green-500/20',
    border: 'hover:border-lime-500/40',
    iconColor: 'text-lime-400',
  },
  {
    icon: Stethoscope,
    name: 'Clinics & Physio',
    desc: 'Appointment scheduling, treatment FAQ, prescription reminders, patient portal.',
    color: 'from-sky-500/20 to-blue-500/20',
    border: 'hover:border-sky-500/40',
    iconColor: 'text-sky-400',
  },
];

const Industries = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="industries" ref={ref} className="py-24 bg-dark-850 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-850 to-dark-900 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full glass border border-primary-500/30
                           text-primary-300 text-sm font-medium mb-6">
            Industries We Serve
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-5">
            We Work With{' '}
            <span className="gradient-text">Every Business</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
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
                         border border-white/06 ${industry.border}`}
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${industry.color}
                              flex items-center justify-center mb-4`}>
                <industry.icon className={`w-5 h-5 ${industry.iconColor}`} />
              </div>
              <h3 className="text-white font-semibold text-sm mb-2">{industry.name}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{industry.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-center text-slate-500 text-sm mt-10"
        >
          Don't see your industry?{' '}
          <a href="/#contact" className="text-primary-400 hover:text-primary-300 underline underline-offset-2">
            Talk to us — we build for everyone.
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default Industries;
