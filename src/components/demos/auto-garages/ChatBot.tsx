import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Wrench } from 'lucide-react';
import { chatGreeting, chatSuggestions } from './data';
import { askBot, type ChatTurn } from '../../../lib/askBot';

interface Msg {
  from: 'bot' | 'user';
  text: string;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: 'bot', text: chatGreeting }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing, open]);

  const send = async (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    const history: ChatTurn[] = [
      ...msgs.map((m) => ({ role: m.from, text: m.text })),
      { role: 'user', text: clean },
    ];
    setMsgs((m) => [...m, { from: 'user', text: clean }]);
    setInput('');
    setTyping(true);
    const reply = await askBot('auto-garages', 'Ironclad Auto Works', history);
    setTyping(false);
    setMsgs((m) => [...m, { from: 'bot', text: reply }]);
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: 'spring' }}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600 text-zinc-900 shadow-xl shadow-orange-900/50"
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" strokeWidth={2.5} />
            </motion.span>
          ) : (
            <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageSquare className="h-6 w-6" strokeWidth={2.5} />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-zinc-900" />
          </span>
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-5 z-[60] flex w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-amber-500/20 bg-zinc-900 shadow-2xl shadow-black/60"
            style={{ height: 'min(560px, calc(100vh - 8rem))' }}
          >
            {/* header */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-zinc-800 to-zinc-900 px-4 py-3 border-b border-amber-500/20">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-amber-400 to-orange-600">
                <Wrench className="h-5 w-5 text-zinc-900" strokeWidth={2.5} />
              </span>
              <div className="leading-tight">
                <p className="font-display font-bold text-white text-sm">Sparky · Service Desk</p>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online now
                </p>
              </div>
            </div>

            {/* messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-zinc-950/60">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.from === 'user'
                        ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-zinc-900 rounded-br-sm font-medium'
                        : 'bg-zinc-800 text-zinc-100 rounded-bl-sm'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-2 w-2 rounded-full bg-amber-400"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* suggestions */}
            {msgs.length <= 1 && (
              <div className="px-3 pb-2 flex flex-wrap gap-2 bg-zinc-950/60">
                {chatSuggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-amber-500/30 px-3 py-1.5 text-xs text-amber-300 hover:bg-amber-500/10 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-white/5 bg-zinc-900 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about MOTs, prices, bookings…"
                className="flex-1 rounded-full bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:ring-2 focus:ring-amber-500/50"
              />
              <button
                type="submit"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-zinc-900 shrink-0 disabled:opacity-40"
                disabled={!input.trim()}
                aria-label="Send"
              >
                <Send className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
