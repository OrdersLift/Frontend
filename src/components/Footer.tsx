import { motion } from 'framer-motion';
import { ArrowUp, Zap } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const links = {
    services: [
      { name: 'Custom Website',      href: '/#products' },
      { name: 'AI Customer Chatbot', href: '/#features' },
      { name: 'Internal RAG Bot',    href: '/#features' },
      { name: 'Admin Panel',         href: '/#products' },
      { name: 'Managed Hosting',     href: '/#products' },
    ],
    industries: [
      { name: 'Restaurants',     href: '/#industries' },
      { name: 'Dental Clinics',  href: '/#industries' },
      { name: 'Gyms & Fitness',  href: '/#industries' },
      { name: 'Salons & Spas',   href: '/#industries' },
      { name: 'Auto Garages',    href: '/#industries' },
    ],
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
    <footer className="bg-dark-950 border-t border-white/06 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand — 2 cols */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-3 mb-5">
              <img src="/logo.png" alt="OrdersLift" className="h-10 w-auto" />
              <span className="text-xl font-display font-bold gradient-text">OrdersLift</span>
            </a>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              The complete AI platform for local and SMB businesses — custom website, AI chatbot,
              internal knowledge bot, and 2 years free maintenance. Serving businesses worldwide.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-slate-500">Actively onboarding new clients</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2.5">
              {links.services.map((l) => (
                <li key={l.name}>
                  <a href={l.href} className="text-slate-500 hover:text-white text-sm transition-colors duration-200">
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Industries</h4>
            <ul className="space-y-2.5">
              {links.industries.map((l) => (
                <li key={l.name}>
                  <a href={l.href} className="text-slate-500 hover:text-white text-sm transition-colors duration-200">
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2.5">
              {links.company.map((l) => (
                <li key={l.name}>
                  <a href={l.href} className="text-slate-500 hover:text-white text-sm transition-colors duration-200">
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + CTA */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2.5 mb-8">
              {links.legal.map((l) => (
                <li key={l.name}>
                  <a href={l.href} className="text-slate-500 hover:text-white text-sm transition-colors duration-200">
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
            <a href="/#contact" className="btn-primary text-sm py-2.5 px-5">
              <Zap className="w-4 h-4 mr-1.5" />
              Get Started
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/06 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} OrdersLift. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 bg-white/08 hover:bg-primary-600 rounded-lg flex items-center justify-center
                       transition-all duration-200"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
