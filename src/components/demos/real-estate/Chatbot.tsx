import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Gem } from 'lucide-react';
import { chatbotIntro } from './data';
import { askBot, type ChatTurn } from '../../../lib/askBot';

type Msg = { from: 'bot' | 'user'; text: string };

const suggestions = ['Book a viewing', 'What are your fees?', 'Value my home', 'Show me apartments'];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([{ from: 'bot', text: chatbotIntro }]);
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing, open]);

  const send = async (text: string) => {
    const t = text.trim();
    if (!t) return;
    const userMsg: Msg = { from: 'user', text: t };
    const history: ChatTurn[] = [...msgs, userMsg].map((m) => ({ role: m.from, text: m.text }));
    setMsgs((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);
    const reply = await askBot('real-estate', 'Aurelia Estates', history);
    setTyping(false);
    setMsgs((m) => [...m, { from: 'bot', text: reply }]);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: 'spring' }}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 grid place-items-center w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-[#0b1f17] shadow-xl shadow-emerald-900/50 hover:scale-105 transition"
        aria-label="Open chat"
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
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="fixed bottom-24 right-5 z-50 w-[340px] max-w-[calc(100vw-2.5rem)] h-[480px] max-h-[70vh] flex flex-col rounded-2xl overflow-hidden bg-white shadow-2xl border border-emerald-100"
          >
            {/* header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#0b1f17] text-white">
              <span className="grid place-items-center w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-[#0b1f17]">
                <Gem className="w-4 h-4" />
              </span>
              <div className="leading-tight">
                <p className="font-serif">Auri</p>
                <p className="text-[11px] text-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" /> Property Concierge
                </p>
              </div>
            </div>

            {/* messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5 bg-emerald-50/40">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-sm leading-relaxed ${
                      m.from === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-sm'
                        : 'bg-white text-slate-700 border border-emerald-100 rounded-bl-sm'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="px-3.5 py-2.5 rounded-2xl bg-white border border-emerald-100 flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              {msgs.length <= 1 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="px-2.5 py-1.5 rounded-full text-xs bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 p-2.5 border-t border-emerald-100 bg-white"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Auri anything…"
                className="flex-1 px-3 py-2 rounded-full text-sm bg-emerald-50/60 border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-300 text-slate-700"
              />
              <button
                type="submit"
                className="grid place-items-center w-9 h-9 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 transition shrink-0"
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
