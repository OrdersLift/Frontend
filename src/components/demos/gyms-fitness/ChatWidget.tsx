import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Flame } from 'lucide-react';
import { chatGreeting, chatQuick } from './data';
import { askBot, type ChatTurn } from '../../../lib/askBot';

interface Msg { from: 'bot' | 'user'; text: string; }

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([{ from: 'bot', text: chatGreeting }]);
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing, open]);

  const send = async (text: string) => {
    const t = text.trim();
    if (!t || typing) return;
    const next: Msg[] = [...msgs, { from: 'user', text: t }];
    setMsgs(next);
    setInput('');
    setTyping(true);
    const history: ChatTurn[] = next.map((m) => ({ role: m.from, text: m.text }));
    const reply = await askBot('gyms-fitness', 'PULSE FORGE', history);
    setMsgs((m) => [...m, { from: 'bot', text: reply }]);
    setTyping(false);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 right-6 z-[60] h-16 w-16 grid place-items-center rounded-full bg-lime-400 text-black shadow-[0_0_30px_rgba(163,230,53,0.7)]"
        aria-label="Open AI coach chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-7 w-7" strokeWidth={2.5} />
            </motion.span>
          ) : (
            <motion.span key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-7 w-7" strokeWidth={2.5} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 22, stiffness: 260 }}
            className="fixed bottom-24 right-6 z-[60] w-[calc(100vw-3rem)] max-w-sm h-[30rem] flex flex-col rounded-2xl overflow-hidden border border-lime-400/30 bg-zinc-950 shadow-2xl"
          >
            <div className="flex items-center gap-3 bg-gradient-to-r from-lime-500 to-emerald-500 px-4 py-3 text-black">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-black/15">
                <Flame className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display font-extrabold leading-tight">Forge AI Coach</p>
                <p className="text-xs font-semibold opacity-80">Online · replies instantly</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.from === 'user'
                        ? 'bg-lime-400 text-black rounded-br-sm font-medium'
                        : 'bg-zinc-800 text-zinc-100 rounded-bl-sm'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-zinc-800 px-3.5 py-3">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-2 w-2 rounded-full bg-lime-300"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.18 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="px-3 pb-2 flex flex-wrap gap-2">
              {chatQuick.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border border-lime-400/40 px-3 py-1 text-xs font-semibold text-lime-300 hover:bg-lime-400/10"
                >
                  {q}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 border-t border-white/10 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Forge anything…"
                className="flex-1 rounded-full bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:ring-2 focus:ring-lime-400/50"
              />
              <button
                type="submit"
                className="grid h-10 w-10 place-items-center rounded-full bg-lime-400 text-black hover:bg-lime-300"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
