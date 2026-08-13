import { motion, MotionConfig } from 'framer-motion';
import { Megaphone, BarChart3, ClipboardList, Package, Star, Bot } from 'lucide-react';
import { services } from '../data/site';
import { cardHover, fadeUp, staggerContainer, viewportOnce } from '../lib/motion';

/** `services.items[].icon` is one of these lucide export names. */
const icons = { Megaphone, BarChart3, ClipboardList, Package, Star, Bot };

const Features = () => (
  <MotionConfig reducedMotion="user">
    {/* Asymmetric on purpose: the trusted-by band directly above already ends
        in its own padding, so a full py-28 here read as a gap twice the size
        of every other section break. Bottom padding stays at the standard. */}
    <section id="services" className="scroll-mt-28 bg-paper pt-10 pb-12 lg:pt-12 lg:pb-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ink text-center tracking-tight"
        >
          {services.heading} <span className="text-primary-500">{services.headingAccent}</span>
        </motion.h2>

        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {services.items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={cardHover}
                className="surface-card surface-interactive rounded-2xl p-6 lg:p-7 flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-primary-500/10 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-primary-500" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-display font-semibold text-base lg:text-lg text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-body leading-relaxed">{item.body}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  </MotionConfig>
);

export default Features;
