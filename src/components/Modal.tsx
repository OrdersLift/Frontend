import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { overlay, panel, pressHover, pressTap } from '../lib/motion';

/* Everything reachable by Tab inside the panel. Used to keep focus from
   escaping the dialog into the page behind it. */
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

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

  /* Move focus into the dialog on open and hand it back to whatever opened
     it on close — otherwise a keyboard user lands at the top of the page. */
  useEffect(() => {
    if (!isOpen) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const frame = requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      cancelAnimationFrame(frame);
      restoreRef.current?.focus();
    };
  }, [isOpen]);

  const trapFocus = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return;
    const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
    if (!nodes || nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              variants={overlay}
              initial="hidden"
              animate="show"
              exit="hidden"
              onClick={onClose}
              aria-hidden="true"
              className="absolute inset-0 bg-neutral-900/40 dark:bg-black/70 backdrop-blur-md"
            />

            {/* Modal panel — the one place a raw `bg-*` is correct: the panel must
                be fully opaque over the backdrop, and the `.surface-*` fills are
                translucent in dark mode. `.elev-3` supplies the elevation. */}
            <motion.div
              ref={panelRef}
              variants={panel}
              initial="hidden"
              animate="show"
              exit="hidden"
              onKeyDown={trapFocus}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              className="relative w-full max-w-3xl max-h-[88vh] flex flex-col
                         rounded-2xl border border-primary-200 dark:border-white/10 overflow-hidden
                         bg-white dark:bg-neutral-950 elev-3"
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-3 px-5 sm:px-7 py-4 sm:py-5
                              hairline-b flex-shrink-0">
                <h2 id="modal-title" className="text-xl font-display font-bold text-neutral-900 dark:text-white">
                  {title}
                </h2>
                <button
                  ref={closeRef}
                  onClick={onClose}
                  aria-label="Close dialog"
                  className="focus-ring w-11 h-11 sm:w-10 sm:h-10 grid place-items-center flex-shrink-0
                             rounded-lg text-neutral-500 hover:text-primary-700 hover:bg-primary-50
                             dark:text-slate-500 dark:hover:text-white dark:hover:bg-white/[0.08]
                             transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="overflow-y-auto flex-1 px-5 sm:px-7 py-6">
                {children}
              </div>

              {/* Footer CTA */}
              <div className="flex-shrink-0 px-5 sm:px-7 py-4 hairline-t
                              flex flex-wrap items-center justify-between gap-3">
                <p className="text-neutral-500 dark:text-slate-500 text-sm">Ready to add this to your platform?</p>
                <motion.a
                  href="/#contact"
                  onClick={onClose}
                  whileHover={pressHover}
                  whileTap={pressTap}
                  className="btn-primary text-sm py-2.5 px-6"
                >
                  Get Started
                </motion.a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
};

export default Modal;
