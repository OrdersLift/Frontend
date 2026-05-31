import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';

const industries = [
  'Restaurants',
  'Dental Clinics',
  'Gyms & Fitness',
  'Auto Garages',
  'Salons & Spas',
  'Law Firms',
  'Hotels',
  'Retail Stores',
];

const stats = [
  { number: '100+',  label: 'Businesses Powered' },
  { number: '3',     label: 'Countries Served' },
  { number: '2 Yrs', label: 'Free Maintenance' },
  { number: '24/7',  label: 'AI Support' },
];

const Hero = () => {
  const [industryIndex, setIndustryIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndustryIndex((i) => (i + 1) % industries.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-900"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Animated glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-glow-600/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent-500/15 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-500/30
                     text-primary-300 text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4" />
          AI-Powered Business Platform — Global
          <Globe className="w-4 h-4 ml-1" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-4"
        >
          The Complete AI Platform
          <span className="block text-slate-400 text-4xl sm:text-5xl lg:text-6xl mt-2 font-semibold">
            Built for
          </span>
        </motion.h1>

        {/* Cycling industry text */}
        <div className="h-20 sm:h-24 flex items-center justify-center mb-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={industryIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold gradient-text"
            >
              {industries[industryIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          We build your complete digital presence — custom website, admin panel, AI customer chatbot,
          internal RAG bot, hosting — and maintain it all for 2 years free. You focus on your business.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
        >
          <motion.a
            href="/#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary text-base px-8 py-4 glow-primary"
          >
            Start Your Project
            <ArrowRight className="ml-2 w-5 h-5" />
          </motion.a>
          <motion.a
            href="/#products"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-outline text-base px-8 py-4"
          >
            See What We Build
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
              className="glass-card p-4 text-center card-hover"
            >
              <div className="text-2xl md:text-3xl font-bold gradient-text-blue mb-1">
                {stat.number}
              </div>
              <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-9 border-2 border-white/20 rounded-full flex justify-center pt-1.5"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2.5 bg-primary-400 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
