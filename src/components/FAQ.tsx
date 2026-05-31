import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How long does it take to build and launch my platform?',
    a: 'Typically 2–4 weeks from kick-off to launch, depending on complexity. Restaurants and clinics with standard setups are often live in 2 weeks. Multi-location or heavily integrated platforms take 4–6 weeks. We give you a firm timeline after the discovery call.',
  },
  {
    q: 'What is the Internal RAG Bot and how does it help my business?',
    a: 'RAG stands for Retrieval-Augmented Generation. We connect your own data — your database, documents, POS records — to an AI model. Your staff and owner can ask plain-English questions like "What were last week\'s top services?" or "How many appointments did we miss?" and get instant answers, without logging into dashboards.',
  },
  {
    q: 'Do you only work with restaurants?',
    a: 'Not at all. We work with any business that serves customers — restaurants, dental clinics, gyms, auto garages, salons, law firms, hotels, retail shops, real estate agencies, and more. If your industry isn\'t listed, just ask — we\'ve likely done something similar.',
  },
  {
    q: 'What does "2 years free maintenance" include?',
    a: 'Bug fixes, security patches, AI model updates, content changes (menus, services, hours), hosting management, and performance monitoring — all included for 24 months at no extra cost. After that, we offer affordable ongoing plans.',
  },
  {
    q: 'Can I choose between a one-time payment and a monthly subscription?',
    a: 'Yes. One-time payment suits businesses that want ownership with no recurring fees. Monthly subscription suits businesses that want continuous improvements, the full AI suite (including Internal RAG bot), and priority support. We walk you through both options during the discovery call.',
  },
  {
    q: 'What data sources can the RAG bot connect to?',
    a: 'Almost anything: your SQL/NoSQL database, Google Drive documents, Notion pages, PDFs, spreadsheets, POS exports, Confluence, or custom APIs. If your data lives somewhere, we can build a connector to make it queryable.',
  },
  {
    q: 'Who handles hosting? Do I need to set anything up?',
    a: 'We handle everything. Backend, frontend, database, AI services — all deployed and managed by us. You never touch a server or deal with infrastructure. Just use your admin panel.',
  },
];

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="faq" ref={ref} className="py-24 bg-dark-850 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass
                           border border-primary-500/30 text-primary-300 text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-5">
            Got <span className="gradient-text">Questions?</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Everything you need to know about our platform and process. Can't find your answer?{' '}
            <a href="/#contact" className="text-primary-400 hover:text-primary-300 underline underline-offset-2">
              Just ask us.
            </a>
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
              className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                openIndex === i
                  ? 'border-primary-500/40 bg-primary-500/05'
                  : 'border-white/07 bg-white/02 hover:border-white/12'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className={`font-medium text-sm sm:text-base transition-colors ${
                  openIndex === i ? 'text-white' : 'text-slate-300'
                }`}>
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                    openIndex === i ? 'rotate-180 text-primary-400' : 'text-slate-600'
                  }`}
                />
              </button>
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openIndex === i ? 'max-h-96' : 'max-h-0'
              }`}>
                <p className="px-6 pb-5 text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="text-center mt-14"
        >
          <a href="/#contact" className="btn-primary px-8 py-4">
            <HelpCircle className="w-4 h-4 mr-2" />
            Still Have Questions? Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
