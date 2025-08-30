import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/about' },
    { name: 'Features', href: '/#features' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2 border-primary-700 ${
        isScrolled 
          ? 'bg-primary-50/95 backdrop-blur-md shadow-lg' 
          : 'bg-primary-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              {/* Company Logo */}
              <img 
                src="/logo.png" 
                alt="OrdersLift Logo" 
                className="h-12 w-auto mr-3"
              />
            </a>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex space-x-2 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="text-text-secondary hover:text-text-primary hover:bg-primary-100 px-4 py-2 rounded-lg font-medium transition-all duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full transform -translate-x-1/2"></span>
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-primary hover:text-primary-500 transition-colors duration-200 p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-border-light shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-text-secondary hover:text-text-primary hover:bg-primary-50 font-medium py-3 px-4 rounded-lg transition-all duration-200"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header; 