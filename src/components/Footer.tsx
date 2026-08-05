import { motion, MotionConfig } from 'framer-motion';
import { ArrowUp, Zap } from 'lucide-react';
import { fadeUp, staggerContainer, pressHover, pressTap, viewportEager } from '../lib/motion';

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  /* ≥36px tall below sm so a thumb can hit a link without hitting its neighbour */
  const linkClass = `inline-flex items-center min-h-[36px] sm:min-h-0
                     text-neutral-600 hover:text-primary-700 dark:text-slate-500
                     dark:hover:text-white text-sm transition-colors duration-200`;

  const links = {
    services: [
      { name: 'Restaurant Website',   href: '/#products' },
      { name: 'Table Booking System', href: '/#products' },
      { name: 'QR Digital Menu',      href: '/#products' },
      { name: 'Online Ordering',      href: '/#features' },
      { name: 'AI Menu Chatbot',      href: '/#features' },
    ],
    // Points at the "Who We Serve" section, currently commented out on the homepage.
    // industries: [
    //   { name: 'Restaurants',   href: '/#industries' },
    //   { name: 'Cafés',         href: '/#industries' },
    //   { name: 'Takeaways',     href: '/#industries' },
    //   { name: 'Bars & Pubs',   href: '/#industries' },
    //   { name: 'Food Trucks',   href: '/#industries' },
    // ],
    company: [
      { name: 'How It Works',  href: '/#how-it-works' },
      { name: 'Pricing',       href: '/#pricing' },
      { name: 'Reviews',       href: '/#reviews' },
      { name: 'FAQ',           href: '/#faq' },
      { name: 'Contact Us',    href: '/#contact' },
    ],
    legal: [
      { name: 'Privacy Policy',   href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy',    href: '/cookies' },
    ],
  };

  return (
    <MotionConfig reducedMotion="user">
      <footer className="bg-cream-200 dark:bg-black hairline-t text-neutral-900 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Two cards, not five loose columns.
              `viewportEager` is mandatory: the footer is normally reached by a
              scroll-to-bottom, where `amount: 0.2` on a tall block may never fire. */}
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewportEager}
            className="py-14 lg:py-16 grid grid-cols-1 lg:grid-cols-5 gap-6"
          >
            {/* Brand */}
            <motion.div variants={fadeUp} className="surface-card lg:col-span-2 p-6 lg:p-8">
              <a href="/" className="flex items-center gap-3 mb-5">
                <img src="/logo.png" alt="OrdersLift" className="h-10 w-auto" />
                <span className="text-xl font-display font-bold gradient-text">OrdersLift</span>
              </a>
              <p className="text-neutral-600 dark:text-slate-500 text-sm leading-relaxed max-w-xs">
                Websites, table bookings and QR menus for restaurants — built, hosted and maintained
                for 2 years free. One partner, every kind of kitchen.
              </p>
              <div className="surface-inset mt-6 px-4 py-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary-500 dark:bg-glow-400 rounded-full animate-pulse flex-shrink-0" />
                <span className="text-xs text-neutral-600 dark:text-slate-500">Actively onboarding new restaurants</span>
              </div>
            </motion.div>

            {/* Links */}
            <motion.div variants={fadeUp} className="surface-card lg:col-span-3 p-6 lg:p-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                {/* Services */}
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">Services</h4>
                  <ul className="space-y-2.5">
                    {links.services.map((l) => (
                      <li key={l.name}>
                        <a href={l.href} className={linkClass}>{l.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* We Serve — hidden while the "Who We Serve" section is commented out */}
                {/* <div>
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">We Serve</h4>
                  <ul className="space-y-2.5">
                    {links.industries.map((l) => (
                      <li key={l.name}>
                        <a href={l.href} className={linkClass}>{l.name}</a>
                      </li>
                    ))}
                  </ul>
                </div> */}

                {/* Company */}
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">Company</h4>
                  <ul className="space-y-2.5">
                    {links.company.map((l) => (
                      <li key={l.name}>
                        <a href={l.href} className={linkClass}>{l.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Legal */}
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">Legal</h4>
                  <ul className="space-y-2.5">
                    {links.legal.map((l) => (
                      <li key={l.name}>
                        <a href={l.href} className={linkClass}>{l.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA sits under the columns so it reads as the card's action, not a fourth list */}
              <div className="hairline-t mt-8 pt-6">
                <a href="/#contact" className="btn-primary text-sm py-2.5 px-5">
                  <Zap className="w-4 h-4 mr-1.5" />
                  Get Started
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom bar */}
          <div className="hairline-t py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-neutral-500 dark:text-slate-600 text-xs">
              © {new Date().getFullYear()} OrdersLift. All rights reserved.
            </p>
            <motion.button
              onClick={scrollToTop}
              whileHover={pressHover}
              whileTap={pressTap}
              aria-label="Back to top"
              className="focus-ring w-11 h-11 sm:w-9 sm:h-9 bg-white border border-primary-200 text-neutral-700
                         hover:bg-primary-600 hover:text-white hover:border-primary-600
                         dark:bg-white/[0.08] dark:border-transparent dark:text-white dark:hover:bg-primary-600
                         rounded-lg flex items-center justify-center transition-all duration-200"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </footer>
    </MotionConfig>
  );
};

export default Footer;
