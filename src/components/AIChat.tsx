import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { askBot, type ChatTurn } from '../lib/askBot';
import { panel, pressHover, pressTap } from '../lib/motion';

const GREETING =
  "Hi! I'm OrdersLift's assistant 👋 Ask me about restaurant websites, table booking, QR menus, pricing, or see our live demo.";

const SUGGESTIONS = [
  'What do you build?',
  'How much does it cost?',
  'How does table booking work?',
  'Show me a demo',
];

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<ChatTurn[]>([{ role: 'bot', text: GREETING }]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, open, typing]);

  const send = async (text: string) => {
    const t = text.trim();
    if (!t || typing) return;
    const history: ChatTurn[] = [...msgs, { role: 'user', text: t }];
    setMsgs(history);
    setInput('');
    setTyping(true);
    const reply = await askBot('orderslift', 'OrdersLift', history);
    setMsgs((m) => [...m, { role: 'bot', text: reply }]);
    setTyping(false);
  };

  return (
    <MotionConfig reducedMotion="user">
      {/* The one spring on the site — correct for a floating action button. */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: 'spring' }}
        whileHover={pressHover}
        whileTap={pressTap}
        onClick={() => setOpen((o) => !o)}
        className="focus-ring fixed bottom-5 right-5 z-50 grid place-items-center w-14 h-14 rounded-full
                   bg-gradient-to-br from-primary-600 to-glow-500 text-white shadow-xl shadow-primary-600/40
                   hover:brightness-110"
        aria-label="Open OrdersLift assistant"
        aria-expanded={open}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={panel}
            initial="hidden"
            animate="show"
            exit="hidden"
            role="dialog"
            aria-label="OrdersLift Assistant"
            className="fixed bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] max-w-sm rounded-2xl overflow-hidden
                       bg-white dark:bg-neutral-950 border border-primary-300 dark:border-primary-500/30
                       elev-3 flex flex-col"
            style={{ height: 'min(70vh, 540px)' }}
          >
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary-600 to-glow-500 text-white">
              <span className="grid place-items-center w-9 h-9 rounded-full bg-white/20 flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-sm">OrdersLift Assistant</p>
                <p className="text-[11px] text-white/80">Ask about our AI platform</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3" aria-live="polite">
              {/* Bubbles keep their asymmetric tail radii — a chat bubble is not a
                  card, and `.surface-inset` owns border-radius. Deliberate. */}
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-primary-600 text-white rounded-br-sm'
                        : 'bg-cream-100 text-neutral-800 border border-primary-200 rounded-bl-sm dark:bg-white/[0.05] dark:text-slate-200 dark:border-white/[0.08]'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-cream-100 border border-primary-200 dark:bg-white/[0.05] dark:border-white/[0.08]
                                  rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="w-1.5 h-1.5 rounded-full bg-primary-500 dark:bg-primary-400"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {msgs.length <= 1 && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="focus-ring text-[11px] px-2.5 py-1 rounded-full border border-primary-400 text-primary-700
                               hover:bg-primary-50 dark:border-primary-400/40 dark:text-primary-200
                               dark:hover:bg-primary-400/10 transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 p-3 hairline-t"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about OrdersLift..."
                aria-label="Ask about OrdersLift"
                className="flex-1 min-w-0 bg-cream-100 border border-primary-200 text-neutral-900 placeholder-neutral-400
                           dark:bg-black dark:border-white/10 dark:text-white dark:placeholder-slate-500
                           rounded-full px-4 py-2 text-sm
                           outline-none focus:ring-2 focus:ring-primary-400/60"
              />
              <button type="submit" className="focus-ring grid place-items-center w-9 h-9 rounded-full bg-gradient-to-br from-primary-600 to-glow-500 text-white shrink-0" aria-label="Send">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
