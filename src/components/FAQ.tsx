import { useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { collapse, fadeUp, staggerContainer, staggerFor, viewportOnce } from '../lib/motion';

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
  /* One row open at a time; -1 closes all. */
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <MotionConfig reducedMotion="user">
      <section id="faq" className="scroll-mt-28 bg-paper py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="text-center"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ink text-center tracking-tight">
              Got <span className="text-primary-500">Questions?</span>
            </h2>
            <p className="mt-4 text-body">
              Everything about the build, the timeline and what is included.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer(staggerFor(faqs.length))}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            /* 5xl, not 3xl: at 768px the rows sat visibly narrower than every
               other section and read as a different page. Not the full 7xl —
               a single line of answer text that wide is hard to track. */
            className="mx-auto mt-10 lg:mt-12 flex max-w-5xl flex-col gap-3"
          >
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div key={faq.q} variants={fadeUp} className="surface-card rounded-xl">
                  {/* Native <button>: Enter and Space toggle for free. */}
                  <button
                    type="button"
                    id={`faq-trigger-${i}`}
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="focus-ring flex w-full items-center justify-between gap-4 rounded-xl px-5 py-4 text-left text-sm lg:text-base font-medium text-ink"
                  >
                    {faq.q}
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-5 w-5 shrink-0 text-primary-500 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Height animates from a real measurement, so a long answer
                      can never be clipped the way `max-h-96` clipped it. */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
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
                        <p className="px-5 pb-5 text-sm text-body leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
};

export default FAQ;
