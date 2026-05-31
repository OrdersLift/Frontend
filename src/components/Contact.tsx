import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, Send, MessageSquare, Clock, CheckCircle } from 'lucide-react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xgvlkaar';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

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
          _subject: `New contact from OrdersLift — ${formData.name} (${formData.industry})`,
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

  const inputClass = `w-full px-4 py-3 rounded-xl bg-white/05 border border-white/10 text-white
                      placeholder:text-slate-600 focus:outline-none focus:border-primary-500/60
                      focus:bg-primary-500/05 transition-all duration-200 text-sm`;

  const industries = [
    'Restaurant', 'Dental Clinic', 'Gym & Fitness', 'Auto Garage',
    'Salon & Spa', 'Law Firm', 'Hotel / B&B', 'Retail Shop',
    'Real Estate', 'Clinic / Physio', 'Other',
  ];

  return (
    <section id="contact" ref={ref} className="py-24 bg-dark-900 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[800px] h-[400px] bg-primary-600/05 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass
                           border border-primary-500/30 text-primary-300 text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4" />
            Get In Touch
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-5">
            Let's Build Something{' '}
            <span className="gradient-text">Great Together</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Tell us about your business. We'll come back within 24 hours with a plan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form — takes 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3 glass rounded-2xl p-8 border border-white/07"
          >
            <h3 className="text-xl font-bold text-white mb-6">Send us a message</h3>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <CheckCircle className="w-14 h-14 text-green-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Message Sent!</h4>
                <p className="text-slate-400">We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange}
                      required className={inputClass} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                      required className={inputClass} placeholder="your@email.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">Business Name</label>
                    <input type="text" name="business" value={formData.business} onChange={handleChange}
                      className={inputClass} placeholder="Your business name" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2">Industry</label>
                    <select name="industry" value={formData.industry} onChange={handleChange}
                      className={`${inputClass} cursor-pointer`}>
                      <option value="" className="bg-dark-800">Select your industry</option>
                      {industries.map((ind) => (
                        <option key={ind} value={ind} className="bg-dark-800">{ind}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">Message *</label>
                  <textarea name="message" value={formData.message} onChange={handleChange}
                    required rows={5} className={`${inputClass} resize-none`}
                    placeholder="Tell us about your business and what you need..." />
                </div>

                <motion.button
                  type="submit" disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary justify-center py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />Sending...</>
                  ) : (
                    <><Send className="w-5 h-5 mr-2" />Send Message</>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Info — takes 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="glass rounded-2xl p-6 border border-white/07">
              <h3 className="text-lg font-bold text-white mb-5">Contact Information</h3>
              <div className="space-y-5">
                {[
                  { icon: Mail,  label: 'Email',  value: 'restaurantorderlift@gmail.com', sub: 'Reply within 24 hours' },
                  { icon: Phone, label: 'Phone',  value: '(+91) 63939 74340',             sub: 'Available 24/7' },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-500/15 flex items-center justify-center flex-shrink-0">
                      <c.icon className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white mb-0.5">{c.label}</div>
                      <div className="text-primary-400 text-sm font-medium">{c.value}</div>
                      <div className="text-slate-500 text-xs">{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6 border border-white/07">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-accent-400" />
                <h4 className="text-white font-semibold">Availability</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>Support</span><span className="text-accent-400">24/7 Online</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Discovery calls</span><span>Mon – Sat</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Time zones</span><span>Worldwide</span>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 border border-primary-500/20 bg-primary-500/05">
              <p className="text-sm text-slate-300 leading-relaxed">
                <span className="text-white font-semibold block mb-1">Free Discovery Call</span>
                Every project starts with a free 30-minute call. No commitment. We'll map out exactly
                what you need and give you a clear plan.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
