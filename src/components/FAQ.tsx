import { useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';
import {
  collapse, fadeIn, fadeUp, pressHover, pressTap, staggerContainer, staggerFor, viewportOnce,
} from '../lib/motion';

const faqs = [
  {
    q: 'I already have a website. Do you replace it or work with it?',
    a: 'Either. If your current site is decent we can add table booking and the QR menu to it. If it is dated, slow, or painful on a phone, we rebuild it properly and move your content across. We tell you honestly which one we would recommend on the discovery call — there is no upsell.',
  },
  {
    q: 'How long until my restaurant is live?',
    a: 'Usually 2–4 weeks from kick-off. A single-site restaurant with a straightforward menu is often live in 2 weeks. Groups, multiple sites or deeper POS integration take 4–6 weeks. You get a firm date after the discovery call.',
  },
  {
    q: 'How does the table booking system work?',
    a: 'Guests book from your own website — no third-party platform and no per-cover commission. You set your covers, service times and how far ahead people can book. Every booking lands in one dashboard, and guests automatically get a confirmation and a reminder before they come.',
  },
  {
    q: 'Do I have to reprint menus when prices change?',
    a: 'No. That is the point of the QR menu. One code stays on the table forever; you change dishes, prices and photos from your phone and every guest scanning it sees the update immediately. Sold out of something? Mark it out of stock in one tap.',
  },
  {
    q: 'Do guests need to download an app to see the menu?',
    a: 'No. They point their camera at the QR code and the menu opens in their browser. Nothing to install, works on any phone.',
  },
  {
    q: 'What does "2 years free maintenance" include?',
    a: 'Menu and content changes, seasonal updates, bug fixes, security patches, hosting management and performance monitoring — all included for 24 months at no extra cost. If you would rather send us the new menu than upload it yourself, that is included too. After two years we offer affordable ongoing plans.',
  },
  {
    q: 'Do you take a commission on bookings or orders?',
    a: 'No. Bookings and direct orders through your own site are commission-free — that is the main reason restaurants move off the marketplace apps. You pay for the build (one-off or monthly) and nothing per cover.',
  },
  {
    q: 'Can it connect to Deliveroo, Uber Eats or my till?',
    a: 'Yes. We connect the delivery platforms you already use so orders land in one place instead of on four tablets, and we sync your menu across all of them. Deeper till and POS integration is available on the higher plans.',
  },
  {
    q: 'Who handles hosting? Do I need to set anything up?',
    a: 'We handle everything — hosting, database, updates, the lot. You never touch a server. You just use your admin panel to change what you want to change.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <MotionConfig reducedMotion="user">
      <section id="faq" className="scroll-mt-24 py-16 sm:py-20 lg:py-24 section-band relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass
                             border border-primary-500/30 text-primary-700 dark:text-primary-300
                             text-sm font-medium mb-6">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-5">
              Got <span className="gradient-text">Questions?</span>
            </h2>
            <p className="text-neutral-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Everything you need to know about our platform and process. Can't find your answer?{' '}
              <a href="/#contact" className="text-primary-600 hover:text-primary-700 dark:text-primary-400
                                            dark:hover:text-primary-300 underline underline-offset-2">
                Just ask us.
              </a>
            </p>
          </motion.div>

          {/* Accordion — one panel, hairline-ruled rows */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="surface-card overflow-hidden"
          >
            <motion.div
              variants={staggerContainer(staggerFor(faqs.length))}
              className="hairline-y"
            >
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className={`relative transition-colors duration-200 ${
                    openIndex === i ? 'bg-primary-50/70 dark:bg-primary-500/[0.06]' : ''
                  }`}
                >
                  {openIndex === i && (
                    <span aria-hidden className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary-500 dark:bg-primary-400" />
                  )}

                  <button
                    id={`faq-trigger-${i}`}
                    onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                    aria-expanded={openIndex === i}
                    aria-controls={`faq-panel-${i}`}
                    className="focus-ring w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className={`font-medium text-sm sm:text-base transition-colors ${
                      openIndex === i
                        ? 'text-neutral-900 dark:text-white'
                        : 'text-neutral-700 dark:text-slate-300'
                    }`}>
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                        openIndex === i
                          ? 'rotate-180 text-primary-600 dark:text-primary-400'
                          : 'text-neutral-400 dark:text-slate-600'
                      }`}
                    />
                  </button>

                  {/* Height animates from a real measurement, so a long answer
                      can no longer be clipped the way `max-h-96` clipped it. */}
                  <AnimatePresence initial={false}>
                    {openIndex === i && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-trigger-${i}`}
                        variants={collapse}
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-neutral-600 dark:text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="text-center mt-14"
          >
            <motion.a
              href="/#contact"
              whileHover={pressHover}
              whileTap={pressTap}
              className="btn-primary focus-ring px-8 py-4"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Still Have Questions? Contact Us
            </motion.a>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
};

export default FAQ;
