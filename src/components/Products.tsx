import { motion, MotionConfig } from 'framer-motion';
import {
  Globe, CalendarCheck, QrCode, MessageSquare, Clock, Shield, CheckCircle, ArrowRight,
} from 'lucide-react';
import {
  cardHover, cardTap, fadeUp, pressHover, pressTap, staggerContainer, staggerFor, viewportOnce,
} from '../lib/motion';

const pillars = [
  {
    icon: Globe,
    title: 'Your Restaurant Website',
    subtitle: 'Built new, or rebuilt properly',
    description:
      'No website yet? We build you one. Got an old one that looks dated on a phone? We rebuild it. ' +
      'Either way you get an admin panel to change photos, hours and content yourself.',
    features: [
      'New build or full redesign',
      'Looks right on every phone',
      'Found on Google from day one',
      'Edit it yourself, no code',
    ],
    gradient: 'from-primary-100 to-white dark:from-primary-600/25 dark:to-primary-800/10',
    border: 'border-primary-300/70 dark:border-primary-500/20',
    hoverBorder: 'hover:border-primary-500 dark:hover:border-primary-400/60',
    glow: 'hover:shadow-primary-500/25',
    iconBg: 'bg-primary-500/15 dark:bg-primary-500/20',
    iconColor: 'text-primary-600 dark:text-primary-400',
    iconRing: 'group-hover:ring-primary-500/40',
    spotlight: 'bg-primary-400/40 dark:bg-primary-500/25',
    underline: 'bg-primary-500',
    badge: 'Core',
  },
  {
    icon: CalendarCheck,
    title: 'Table Booking System',
    subtitle: 'Fill tables while you cook',
    description:
      'Guests book straight from your website — no commission, no third party. You see every ' +
      'booking in one place, and guests get an automatic confirmation and reminder.',
    features: [
      'Live table availability',
      'Automatic SMS & email reminders',
      'Fewer no-shows, fewer phone calls',
      'Covers and guest notes in one view',
    ],
    gradient: 'from-glow-100 to-white dark:from-glow-600/25 dark:to-glow-800/10',
    border: 'border-glow-300/70 dark:border-glow-500/20',
    hoverBorder: 'hover:border-glow-500 dark:hover:border-glow-400/60',
    glow: 'hover:shadow-glow-500/25',
    iconBg: 'bg-glow-500/15 dark:bg-glow-500/20',
    iconColor: 'text-glow-600 dark:text-glow-400',
    iconRing: 'group-hover:ring-glow-500/40',
    spotlight: 'bg-glow-400/40 dark:bg-glow-500/25',
    underline: 'bg-glow-500',
    badge: 'Most Wanted',
  },
  {
    icon: QrCode,
    title: 'QR Digital Menu',
    subtitle: 'Change a price in seconds',
    description:
      'One QR code on every table. Guests scan and see today\'s menu — no app to download. ' +
      'Sold out of the special? Change it from your phone and every table sees it instantly.',
    features: [
      'Update prices and dishes instantly',
      'Mark items sold out in one tap',
      'Photos, allergens and dietary tags',
      'No reprinting menus, ever',
    ],
    gradient: 'from-accent-100 to-white dark:from-accent-600/25 dark:to-accent-800/10',
    border: 'border-accent-300/70 dark:border-accent-500/20',
    hoverBorder: 'hover:border-accent-500 dark:hover:border-accent-400/60',
    glow: 'hover:shadow-accent-500/25',
    iconBg: 'bg-accent-500/15 dark:bg-accent-500/20',
    iconColor: 'text-accent-700 dark:text-accent-300',
    iconRing: 'group-hover:ring-accent-500/40',
    spotlight: 'bg-accent-400/40 dark:bg-accent-500/25',
    underline: 'bg-accent-500',
    badge: 'Guest Favourite',
  },
  {
    icon: MessageSquare,
    title: 'AI Assistant & Ordering',
    subtitle: 'Answers every question, 24/7',
    description:
      'A chatbot trained on your menu, hours and location. It answers "do you have gluten-free?" ' +
      'and "can I book for six on Friday?" at 11pm, and takes online orders while you sleep.',
    features: [
      'Trained on your menu & hours',
      'Takes bookings and orders',
      'Online ordering, commission-free',
      'Hands over to you when needed',
    ],
    gradient: 'from-primary-200 to-white dark:from-primary-700/30 dark:to-primary-900/10',
    border: 'border-primary-400/60 dark:border-primary-600/25',
    hoverBorder: 'hover:border-primary-600 dark:hover:border-primary-500/60',
    glow: 'hover:shadow-primary-600/25',
    iconBg: 'bg-primary-600/15 dark:bg-primary-600/25',
    iconColor: 'text-primary-700 dark:text-primary-300',
    iconRing: 'group-hover:ring-primary-600/40',
    spotlight: 'bg-primary-500/40 dark:bg-primary-600/25',
    underline: 'bg-primary-600',
    badge: 'Automated',
  },
];

const promises = [
  { icon: CheckCircle, label: 'Free discovery call' },
  { icon: Clock,       label: '2–4 week delivery' },
  { icon: Shield,      label: '2 years free maintenance' },
];

const Products = () => (
  <MotionConfig reducedMotion="user">
    <section
      id="products"
      className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-black relative overflow-hidden scroll-mt-24"
    >
      {/* Background orbs */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary-300/25 dark:bg-primary-600/10
                      rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-accent-300/25 dark:bg-glow-600/10
                      rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full glass border border-glow-500/30
                           text-glow-700 dark:text-glow-300 text-sm font-medium mb-6">
            What We Build For You
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-5">
            Everything Your Restaurant{' '}
            <span className="gradient-text">Needs Online</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Four things, done properly — a website worth showing off, bookings that come straight to
            you, a menu you control, and an assistant that never sleeps.
          </p>
        </motion.div>

        {/* Pillar cards — the deliberate exception to the surface system: the
            per-pillar gradient, spotlight bloom and light sweep are this
            section's signature. */}
        <motion.div
          variants={staggerContainer(staggerFor(pillars.length))}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-12"
        >
          {pillars.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              whileHover={cardHover}
              whileTap={cardTap}
              className={`group relative overflow-hidden rounded-2xl border ${p.border} ${p.hoverBorder}
                         bg-gradient-to-b ${p.gradient} p-6 flex flex-col
                         transition-[box-shadow,border-color] duration-300 hover:shadow-2xl ${p.glow}`}
            >
              {/* Spotlight that blooms behind the icon on hover */}
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute -top-20 left-0 h-44 w-44 rounded-full blur-3xl
                            ${p.spotlight} opacity-0 group-hover:opacity-100
                            transition-opacity duration-500`}
              />

              {/* Light sweep across the card on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 skew-x-12
                           bg-gradient-to-r from-transparent via-white/60 to-transparent
                           dark:via-white/[0.12] opacity-0 group-hover:opacity-100
                           group-hover:left-[140%] transition-all duration-700 ease-out"
              />

              <div className="relative flex flex-col flex-1">
                {/* Badge */}
                <span className="absolute top-0 right-0 text-[11px] font-semibold px-2.5 py-1 rounded-full
                                 bg-white/70 text-neutral-600 border border-primary-200
                                 dark:bg-white/[0.08] dark:text-slate-400 dark:border-white/10
                                 transition-transform duration-300 group-hover:scale-105">
                  {p.badge}
                </span>

                <div className={`w-12 h-12 rounded-2xl ${p.iconBg} flex items-center justify-center mb-5
                                ring-2 ring-transparent ${p.iconRing}
                                transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6`}>
                  <p.icon className={`w-6 h-6 ${p.iconColor} transition-transform duration-300
                                     group-hover:rotate-6`} />
                </div>

                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">{p.title}</h3>
                <p className={`text-sm font-medium ${p.iconColor}`}>{p.subtitle}</p>
                <span className={`block h-0.5 w-8 rounded-full ${p.underline} my-3
                                 transition-all duration-500 group-hover:w-16`} />
                <p className="text-neutral-600 dark:text-slate-400 text-sm leading-relaxed mb-5">
                  {p.description}
                </p>

                <ul className="space-y-2 mt-auto">
                  {p.features.map((f, fi) => (
                    <li
                      key={f}
                      style={{ transitionDelay: `${fi * 60}ms` }}
                      className="flex items-start gap-2 text-sm text-neutral-700 dark:text-slate-300
                                 transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <span
                        style={{ transitionDelay: `${fi * 60}ms` }}
                        className={`w-1.5 h-1.5 mt-1.5 rounded-full ${p.iconColor} bg-current flex-shrink-0
                                    transition-transform duration-300 group-hover:scale-150`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Promise bar — its own trigger, not a delayed tail on the cascade. */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="surface-card p-6 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <p className="text-neutral-600 dark:text-slate-400 text-sm font-medium">
            All four, in every package:
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {promises.map((e) => (
              <div key={e.label} className="flex items-center gap-2 text-neutral-700 dark:text-slate-300 text-sm">
                <e.icon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                {e.label}
              </div>
            ))}
          </div>
          <motion.a
            href="/#contact"
            whileHover={pressHover}
            whileTap={pressTap}
            className="btn-primary text-sm py-2.5 px-6 flex-shrink-0
                       w-full sm:w-auto justify-center text-center"
          >
            Get Your Restaurant Online
            <ArrowRight className="ml-2 w-4 h-4 flex-shrink-0" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  </MotionConfig>
);

export default Products;
