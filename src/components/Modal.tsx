import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-900/40 dark:bg-black/70 backdrop-blur-md"
          />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative w-full max-w-3xl max-h-[88vh] flex flex-col
                       rounded-2xl border border-primary-200 dark:border-white/10 overflow-hidden
                       bg-white dark:bg-neutral-950
                       shadow-2xl shadow-primary-900/20 dark:shadow-black/60"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-7 py-5 border-b border-primary-200
                            dark:border-white/[0.08] flex-shrink-0">
              <h2 className="text-xl font-display font-bold text-neutral-900 dark:text-white">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-neutral-500 hover:text-primary-700 hover:bg-primary-50
                           dark:text-slate-500 dark:hover:text-white dark:hover:bg-white/[0.08]
                           transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 px-7 py-6">
              {children}
            </div>

            {/* Footer CTA */}
            <div className="flex-shrink-0 px-7 py-4 border-t border-primary-200 dark:border-white/[0.08]
                            flex items-center justify-between gap-4">
              <p className="text-neutral-500 dark:text-slate-500 text-sm">Ready to add this to your platform?</p>
              <a
                href="/#contact"
                onClick={onClose}
                className="btn-primary text-sm py-2.5 px-6"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
