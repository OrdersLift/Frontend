import { useState } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { AlertCircle, CheckCircle2, Mail, Phone, Send } from 'lucide-react';
import { brand } from '../data/site';
import { fadeUp, pressHover, pressTap, staggerContainer, viewportOnce } from '../lib/motion';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xgvlkaar';

const venueTypes = [
  'Restaurant', 'Café / Coffee Shop', 'Takeaway', 'Fine Dining',
  'Bar / Pub', 'Pizzeria', 'Food Truck', 'Cloud Kitchen',
  'Bakery', 'Dessert Shop', 'Other',
];

const details = [
  { icon: Mail,  label: 'Email', value: brand.email, href: `mailto:${brand.email}` },
  { icon: Phone, label: 'Phone', value: brand.phone, href: `tel:${brand.phone.replace(/[^+\d]/g, '')}` },
];

/* `.surface-inset` owns fill, border and radius (--radius-inset = rounded-xl);
   padding and type are ours. `py-3` with `text-sm` keeps every field at ~46px,
   above the 44px touch minimum. */
const fieldClass =
  'w-full surface-inset border-rule rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted ' +
  'focus:outline-none focus:ring-2 focus:ring-primary-500/50';
const labelClass = 'block text-xs text-muted mb-1.5';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', business: '', industry: '', message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
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
        let reason = 'The form service rejected this message.';
        try { const d = await res.json(); if (d?.errors?.[0]?.message) reason = d.errors[0].message; } catch {}
        setError(`${reason} Correct it and send again, or email ${brand.email} directly.`);
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
      setError(`Your message never left the browser — the connection dropped. Check your network and send again, or email ${brand.email} directly.`);
      setIsSubmitting(false);
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <section id="contact" className="scroll-mt-28 bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="text-center"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ink text-center tracking-tight">
              Let&rsquo;s Build Something <span className="text-primary-500">Great</span> Together
            </h2>
            <p className="mt-4 text-body">
              Tell us about your restaurant. We come back within 24 hours with a plan.
            </p>
          </motion.div>

          {/* Form first in the DOM, so it is also first on mobile. */}
          <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="lg:col-span-2 surface-card rounded-2xl p-6 lg:p-8"
            >
              {isSubmitted ? (
                <div className="py-12 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-primary-500" aria-hidden="true" />
                  <h3 className="mt-4 font-display font-semibold text-lg text-ink">Message received</h3>
                  <p className="mt-2 text-sm text-body">
                    We reply within 24 hours to the address you gave us. Nothing else to do from here.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className={labelClass}>Full name *</label>
                      <input
                        type="text" id="contact-name" name="name" value={formData.name} onChange={handleChange}
                        required autoComplete="name" className={fieldClass} placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className={labelClass}>Email *</label>
                      <input
                        type="email" id="contact-email" name="email" value={formData.email} onChange={handleChange}
                        required autoComplete="email" inputMode="email" className={fieldClass} placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-business" className={labelClass}>Restaurant name</label>
                      <input
                        type="text" id="contact-business" name="business" value={formData.business} onChange={handleChange}
                        autoComplete="organization" className={fieldClass} placeholder="Your restaurant name"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-industry" className={labelClass}>Type of venue</label>
                      <select
                        id="contact-industry" name="industry" value={formData.industry} onChange={handleChange}
                        className={`${fieldClass} cursor-pointer`}
                      >
                        <option value="" className="bg-paper text-ink">Select your venue type</option>
                        {venueTypes.map((v) => (
                          <option key={v} value={v} className="bg-paper text-ink">{v}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className={labelClass}>Message *</label>
                    <textarea
                      id="contact-message" name="message" value={formData.message} onChange={handleChange}
                      required rows={5} className={`${fieldClass} resize-none`}
                      placeholder="Tell us about your restaurant and what you need..."
                    />
                  </div>

                  {error && (
                    <p role="alert" className="flex items-start gap-2 text-sm text-loss">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      {error}
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={pressHover}
                    whileTap={pressTap}
                    className="btn-primary focus-ring w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="mr-2 h-5 w-5" aria-hidden="true" />
                    {isSubmitting ? 'Sending…' : 'Send Message'}
                  </motion.button>
                </form>
              )}
            </motion.div>

            <motion.div
              variants={staggerContainer()}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="surface-card rounded-2xl p-6 lg:p-7 flex flex-col gap-5"
            >
              {details.map((d) => (
                <motion.a
                  key={d.label}
                  href={d.href}
                  variants={fadeUp}
                  className="focus-ring flex items-start gap-4 rounded-lg"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-500/10"
                  >
                    <d.icon className="h-5 w-5 text-primary-500" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted">{d.label}</span>
                    <span className="block text-sm text-ink break-words">{d.value}</span>
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
};

export default Contact;
