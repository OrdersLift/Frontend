import { motion, MotionConfig } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, Send, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import {
  fadeUp, scaleIn, slideInLeft, slideInRight, staggerContainer,
  pressHover, pressTap, viewportOnce,
} from '../lib/motion';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xgvlkaar';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', business: '', industry: '', message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          _subject: `New restaurant enquiry — ${formData.name} (${formData.industry})`,
          _replyto: formData.email,
        }),
      });
      if (!res.ok) {
        let msg = 'Something went wrong. Please try again.';
        try { const d = await res.json(); if (d?.errors?.[0]?.message) msg = d.errors[0].message; } catch {}
        alert(msg);
        setIsSubmitting(false);
        return;
      }
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', business: '', industry: '', message: '' });
      }, 4000);
    } catch {
      alert('Network error. Please check your connection.');
      setIsSubmitting(false);
    }
  };

  /* `.surface-inset` owns fill, border and radius; the focus border still wins
     because `focus:` compiles to a class + pseudo-class selector. `py-3` with
     `text-sm` keeps every field at ~46px — above the 44px touch minimum. */
  const inputClass = `w-full px-4 py-3 rounded-xl text-sm transition-all duration-200
                      surface-inset focus-ring
                      text-neutral-900 placeholder:text-neutral-400
                      focus:border-primary-500
                      dark:text-white dark:placeholder:text-slate-600 dark:focus:border-primary-500/60`;

  const venueTypes = [
    'Restaurant', 'Café / Coffee Shop', 'Takeaway', 'Fine Dining',
    'Bar / Pub', 'Pizzeria', 'Food Truck', 'Cloud Kitchen',
    'Bakery', 'Dessert Shop', 'Other',
  ];

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="contact"
        className="scroll-mt-28 py-16 sm:py-20 lg:py-24 bg-white dark:bg-black relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[800px] h-[400px] bg-primary-200/40 dark:bg-primary-600/10
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
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass
                             border border-primary-500/30 text-primary-700 dark:text-primary-300
                             text-sm font-medium mb-6">
              <MessageSquare className="w-4 h-4" />
              Get In Touch
            </span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-5">
              Let's Build Something{' '}
              <span className="gradient-text">Great Together</span>
            </h2>
            <p className="text-neutral-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Tell us about your restaurant. We'll come back within 24 hours with a plan.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Form — takes 3 cols. The only elevation-2 surface in the section. */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="lg:col-span-3 surface-card-raised p-6 sm:p-8"
            >
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">Send us a message</h3>

              {isSubmitted ? (
                <motion.div
                  variants={scaleIn}
                  initial="hidden"
                  animate="show"
                  className="text-center py-16"
                >
                  <CheckCircle className="w-14 h-14 text-primary-500 dark:text-glow-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Message Sent!</h4>
                  <p className="text-neutral-600 dark:text-slate-400">We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-medium text-neutral-600 dark:text-slate-400 mb-2">Full Name *</label>
                      <input type="text" id="contact-name" name="name" value={formData.name} onChange={handleChange}
                        required autoComplete="name" className={inputClass} placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-medium text-neutral-600 dark:text-slate-400 mb-2">Email *</label>
                      <input type="email" id="contact-email" name="email" value={formData.email} onChange={handleChange}
                        required autoComplete="email" inputMode="email" className={inputClass} placeholder="your@email.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-business" className="block text-xs font-medium text-neutral-600 dark:text-slate-400 mb-2">Restaurant Name</label>
                      <input type="text" id="contact-business" name="business" value={formData.business} onChange={handleChange}
                        autoComplete="organization" className={inputClass} placeholder="Your restaurant name" />
                    </div>
                    <div>
                      <label htmlFor="contact-industry" className="block text-xs font-medium text-neutral-600 dark:text-slate-400 mb-2">Type of Venue</label>
                      <select id="contact-industry" name="industry" value={formData.industry} onChange={handleChange}
                        className={`${inputClass} cursor-pointer`}>
                        <option value="" className="bg-white dark:bg-neutral-900">Select your venue type</option>
                        {venueTypes.map((ind) => (
                          <option key={ind} value={ind} className="bg-white dark:bg-neutral-900">{ind}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-medium text-neutral-600 dark:text-slate-400 mb-2">Message *</label>
                    <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange}
                      required rows={5} className={`${inputClass} resize-none`}
                      placeholder="Tell us about your restaurant and what you need..." />
                  </div>

                  {/* Footer edge, so the form ends on a rule rather than a floating button */}
                  <div className="hairline-t pt-5">
                    <motion.button
                      type="submit" disabled={isSubmitting}
                      whileHover={pressHover} whileTap={pressTap}
                      className="w-full btn-primary justify-center py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />Sending...</>
                      ) : (
                        <><Send className="w-5 h-5 mr-2" />Send Message</>
                      )}
                    </motion.button>
                  </div>
                </form>
              )}
            </motion.div>

            {/* Info — takes 2 cols */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="lg:col-span-2"
            >
              {/* Orchestrator only — the slide belongs to the column, the cascade to the panels */}
              <motion.div variants={staggerContainer(0.08)} className="flex flex-col gap-6">
                <motion.div variants={fadeUp} className="surface-card p-6">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-5">Contact Information</h3>
                  <div className="space-y-5">
                    {[
                      { icon: Mail,  label: 'Email',  value: 'restaurantorderlift@gmail.com', sub: 'Reply within 24 hours' },
                      { icon: Phone, label: 'Phone',  value: '(+91) 63939 74340',             sub: 'Available 24/7' },
                    ].map((c) => (
                      <div key={c.label} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary-500/15 flex items-center justify-center flex-shrink-0">
                          <c.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-neutral-900 dark:text-white mb-0.5">{c.label}</div>
                          <div className="text-primary-600 dark:text-primary-400 text-sm font-medium break-words">{c.value}</div>
                          <div className="text-neutral-500 dark:text-slate-500 text-xs">{c.sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="surface-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                    <h4 className="text-neutral-900 dark:text-white font-semibold">Availability</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-3 text-neutral-700 dark:text-slate-300">
                      <span>Support</span><span className="text-accent-700 dark:text-accent-400">24/7 Online</span>
                    </div>
                    <div className="flex justify-between gap-3 text-neutral-700 dark:text-slate-300">
                      <span>Discovery calls</span><span>Mon – Sat</span>
                    </div>
                    <div className="flex justify-between gap-3 text-neutral-700 dark:text-slate-300">
                      <span>Time zones</span><span>Worldwide</span>
                    </div>
                  </div>
                </motion.div>

                {/* The tinted accent panel — `.surface-inset-brand` carries the warm
                    wash, so no utility fill is needed (or possible) here. */}
                <motion.div variants={fadeUp} className="surface-inset-brand p-6">
                  <p className="text-sm text-neutral-700 dark:text-slate-300 leading-relaxed">
                    <span className="text-neutral-900 dark:text-white font-semibold block mb-1">Free Discovery Call</span>
                    Every project starts with a free 30-minute call. No commitment. We'll map out exactly
                    what you need and give you a clear plan.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
};

export default Contact;
