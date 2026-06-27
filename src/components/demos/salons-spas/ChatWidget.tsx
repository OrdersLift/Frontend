import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send } from 'lucide-react';
import { askBot, type ChatTurn } from '../../../lib/askBot';

type Msg = { from: 'bot' | 'user'; text: string };

const suggestions = ['Your hours?', 'Book a balayage', 'Pricing?', 'Loyalty points'];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: 'bot', text: 'Hi, I’m Lux ✨ your Lumière booking assistant. Ask me about services, stylists, prices or availability.' },
  ]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [msgs, open, typing]);

  const send = async (text: string) => {
    const t = text.trim();
    if (!t) return;
    const next: Msg[] = [...msgs, { from: 'user', text: t }];
    setMsgs(next);
    setInput('');
    setTyping(true);
    const history: ChatTurn[] = next.map((m) => ({ role: m.from, text: m.text }));
    const reply = await askBot('salons-spas', 'Lumière Salon & Spa', history);
    setMsgs((m) => [...m, { from: 'bot', text: reply }]);
    setTyping(false);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: 'spring' }}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 grid place-items-center w-14 h-14 rounded-full bg-gradient-to-br from-rose-400 to-amber-300 text-white shadow-xl shadow-rose-400/30"
        aria-label="Chat with Lux"
      >
        {open ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="fixed bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] max-w-sm rounded-3xl overflow-hidden bg-white shadow-2xl border border-rose-100 flex flex-col"
            style={{ height: 'min(70vh, 520px)' }}
          >
            <div className="bg-gradient-to-r from-rose-400 to-amber-300 px-5 py-4 text-white flex items-center gap-3">
              <span className="grid place-items-center w-9 h-9 rounded-full bg-white/20">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <p className="font-semibold leading-tight">Lux</p>
                <p className="text-xs text-white/80">Lumière booking assistant</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#fbf7f3]">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.from === 'user'
                        ? 'bg-stone-800 text-white rounded-br-sm'
                        : 'bg-white text-stone-700 border border-rose-100 rounded-bl-sm'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] px-3.5 py-2.5 rounded-2xl rounded-bl-sm bg-white text-stone-700 border border-rose-100">
                    <span className="flex items-center gap-1">
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-rose-300"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      />
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-rose-300"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-rose-300"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      />
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="px-3 pt-2 flex flex-wrap gap-2 bg-[#fbf7f3]">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs px-3 py-1.5 rounded-full bg-white border border-rose-200 text-rose-500 hover:bg-rose-50"
                >
                  {s}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="p-3 bg-[#fbf7f3] flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Lux anything…"
                className="flex-1 rounded-full border border-rose-200 bg-white px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
              <button
                type="submit"
                className="grid place-items-center w-10 h-10 rounded-full bg-stone-800 text-white hover:bg-rose-500 transition-colors"
                aria-label="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
