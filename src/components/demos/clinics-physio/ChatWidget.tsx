import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Leaf } from 'lucide-react';
import { botGreeting, botSuggestions } from './data';
import { askBot, type ChatTurn } from '../../../lib/askBot';

type Msg = { from: 'bot' | 'user'; text: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([{ from: 'bot', text: botGreeting }]);
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing, open]);

  const send = async (text: string) => {
    const t = text.trim();
    if (!t) return;
    const history: ChatTurn[] = [...msgs, { from: 'user' as const, text: t }].map((m) => ({
      role: m.from,
      text: m.text,
    }));
    setMsgs((m) => [...m, { from: 'user', text: t }]);
    setInput('');
    setTyping(true);
    const reply = await askBot('clinics-physio', 'Verdant Physio & Health Clinic', history);
    setTyping(false);
    setMsgs((m) => [...m, { from: 'bot', text: reply }]);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed bottom-24 right-4 sm:right-6 z-[60] w-[calc(100vw-2rem)] sm:w-96 max-w-sm rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/30 border border-emerald-100 bg-white flex flex-col"
            style={{ height: '30rem' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-3 flex items-center gap-3 text-white">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20">
                <Leaf className="w-5 h-5" />
              </span>
              <div className="flex-1">
                <p className="font-semibold leading-tight">Sprout</p>
                <p className="text-[11px] text-emerald-50/90 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-300 inline-block" /> Verdant care assistant
                </p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="hover:bg-white/15 rounded-lg p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-emerald-50/40">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.from === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-md'
                        : 'bg-white text-slate-700 border border-emerald-100 rounded-bl-md shadow-sm'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white border border-emerald-100 rounded-2xl rounded-bl-md px-3 py-3 flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="w-2 h-2 rounded-full bg-emerald-400"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              {msgs.length <= 1 && (
                <div className="pt-1 flex flex-wrap gap-2">
                  {botSuggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-xs px-3 py-1.5 rounded-full bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="p-3 border-t border-emerald-100 bg-white flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about hours, prices, prep…"
                className="flex-1 px-3.5 py-2.5 rounded-full bg-emerald-50 border border-emerald-100 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                type="submit"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-md transition-shadow"
                aria-label="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-4 sm:right-6 z-[60] w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-500/40 flex items-center justify-center"
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait" initial={false}>
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
    </>
  );
}
