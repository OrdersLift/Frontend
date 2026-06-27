import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Flame } from 'lucide-react';
import { botQuickReplies } from './data';
import { askBot, type ChatTurn } from '../../../lib/askBot';

type Msg = { from: 'bot' | 'user'; text: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: 'bot', text: 'Hi, I\'m Ember 🔥 — your menu assistant at Saffron & Ember. Ask me about dishes, allergens, vegan options or our hours!' },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, open, typing]);

  const send = async (text: string) => {
    const t = text.trim();
    if (!t) return;
    setInput('');
    const next: Msg[] = [...msgs, { from: 'user', text: t }];
    setMsgs(next);
    setTyping(true);
    const history: ChatTurn[] = next.map((m) => ({ role: m.from, text: m.text }));
    const reply = await askBot('restaurants', 'Saffron & Ember', history);
    setMsgs((m) => [...m, { from: 'bot', text: reply }]);
    setTyping(false);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: 'spring' }}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 grid place-items-center w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-rose-600 text-white shadow-xl shadow-rose-900/40 hover:brightness-110"
        aria-label="Open menu assistant"
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
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            className="fixed bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] max-w-sm rounded-2xl overflow-hidden bg-[#1a120b] border border-amber-500/30 shadow-2xl shadow-black/50 flex flex-col"
            style={{ height: 'min(70vh, 540px)' }}
          >
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-amber-600 to-rose-700 text-white">
              <span className="grid place-items-center w-9 h-9 rounded-full bg-white/20">
                <Flame className="w-5 h-5" />
              </span>
              <div>
                <p className="font-semibold text-sm">Ember — Menu Assistant</p>
                <p className="text-[11px] text-amber-100/90">Powered by OrdersLift AI</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.from === 'user'
                        ? 'bg-amber-500 text-amber-950 rounded-br-sm'
                        : 'bg-amber-500/10 text-amber-50 rounded-bl-sm'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl rounded-bl-sm px-3.5 py-3 bg-amber-500/10 text-amber-50">
                    <span className="flex items-center gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="inline-block w-1.5 h-1.5 rounded-full bg-amber-300"
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18 }}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {botQuickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-[11px] px-2.5 py-1 rounded-full border border-amber-400/40 text-amber-200 hover:bg-amber-400/10 transition"
                >
                  {q}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 p-3 border-t border-amber-500/20"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about a dish..."
                className="flex-1 bg-amber-500/10 text-amber-50 placeholder-amber-200/40 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400/50"
              />
              <button type="submit" className="grid place-items-center w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-rose-600 text-white shrink-0" aria-label="Send">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
