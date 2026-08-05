import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  UtensilsCrossed, Coffee, ShoppingBag, Wine,
  Pizza, Truck, Croissant, ChefHat, IceCream2, Soup
} from 'lucide-react';

const venues = [
  {
    icon: UtensilsCrossed,
    name: 'Restaurants',
    desc: 'Table booking, QR menu, online ordering and a website that fills your covers.',
    color: 'from-primary-500/25 to-primary-600/15',
    border: 'hover:border-primary-500/50',
    iconColor: 'text-primary-600 dark:text-primary-400',
  },
  {
    icon: Coffee,
    name: 'Cafés & Coffee Shops',
    desc: 'Daily-special QR menus, loyalty sign-ups and quick click-and-collect ordering.',
    color: 'from-glow-400/25 to-glow-500/15',
    border: 'hover:border-glow-500/50',
    iconColor: 'text-glow-600 dark:text-glow-400',
  },
  {
    icon: ShoppingBag,
    name: 'Takeaways',
    desc: 'Commission-free ordering straight from your own site, with live order alerts.',
    color: 'from-accent-400/30 to-accent-500/15',
    border: 'hover:border-accent-500/50',
    iconColor: 'text-accent-600 dark:text-accent-300',
  },
  {
    icon: ChefHat,
    name: 'Fine Dining',
    desc: 'Deposit-backed reservations, seating preferences and tasting-menu presentation.',
    color: 'from-primary-600/25 to-glow-500/15',
    border: 'hover:border-primary-600/50',
    iconColor: 'text-primary-700 dark:text-primary-300',
  },
  {
    icon: Wine,
    name: 'Bars & Pubs',
    desc: 'Event nights, table reservations and a drinks list you update from your phone.',
    color: 'from-accent-300/35 to-glow-400/20',
    border: 'hover:border-accent-400/60',
    iconColor: 'text-glow-600 dark:text-accent-300',
  },
  {
    icon: Pizza,
    name: 'Pizzerias',
    desc: 'Build-your-own ordering, delivery-partner sync and repeat-order reminders.',
    color: 'from-glow-600/25 to-primary-600/15',
    border: 'hover:border-glow-600/50',
    iconColor: 'text-glow-700 dark:text-glow-300',
  },
  {
    icon: Truck,
    name: 'Food Trucks',
    desc: 'A QR menu that travels with you and a live "where we are today" location page.',
    color: 'from-primary-300/35 to-accent-300/20',
    border: 'hover:border-primary-400/60',
    iconColor: 'text-primary-600 dark:text-primary-300',
  },
  {
    icon: Soup,
    name: 'Cloud Kitchens',
    desc: 'Multi-brand menus, direct ordering and one dashboard across every kitchen.',
    color: 'from-accent-500/25 to-glow-500/15',
    border: 'hover:border-accent-600/50',
    iconColor: 'text-accent-700 dark:text-accent-300',
  },
  {
    icon: Croissant,
    name: 'Bakeries',
    desc: 'Pre-orders for cakes and celebrations, plus daily stock updates on the menu.',
    color: 'from-glow-500/25 to-accent-400/15',
    border: 'hover:border-glow-500/50',
    iconColor: 'text-glow-600 dark:text-glow-300',
  },
  {
    icon: IceCream2,
    name: 'Dessert & Ice Cream',
    desc: 'Seasonal flavour boards, walk-in queue booking and shareable social menus.',
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
            Who We Build For
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-5">
            Built for Every Kind of{' '}
            <span className="gradient-text">Restaurant</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Fine dining or food truck, we do one thing and do it properly — get restaurants online
            with a website, table bookings and a QR menu that actually gets used.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {venues.map((industry, i) => (
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
          Run something a little different?{' '}
          <a href="/#contact" className="text-primary-600 hover:text-primary-700 dark:text-primary-400
                                        dark:hover:text-primary-300 underline underline-offset-2">
            Tell us about your place — we'll make it work.
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default Industries;
