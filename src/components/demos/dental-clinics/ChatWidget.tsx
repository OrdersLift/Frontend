import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { chatbotGreeting, chatSuggestions } from './data';
import { askBot, type ChatTurn } from '../../../lib/askBot';

type Msg = { from: 'bot' | 'user'; text: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([{ from: 'bot', text: chatbotGreeting }]);
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, open, typing]);

  const send = async (text: string) => {
    const t = text.trim();
    if (!t || typing) return;
    const userMsg: Msg = { from: 'user', text: t };
    const next = [...msgs, userMsg];
    setMsgs(next);
    setInput('');
    setTyping(true);

    const history: ChatTurn[] = next.map((m) => ({ role: m.from, text: m.text }));
    const reply = await askBot('dental-clinics', 'Lumina Dental', history);

    setMsgs((m) => [...m, { from: 'bot', text: reply }]);
    setTyping(false);
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: 'spring' }}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 w-15 h-15 grid place-items-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 text-white shadow-xl shadow-teal-300/50 hover:scale-105 transition-transform"
        style={{ width: 60, height: 60 }}
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
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="fixed bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] max-w-sm h-[28rem] flex flex-col rounded-2xl bg-white shadow-2xl border border-teal-100 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
              <span className="grid place-items-center w-9 h-9 rounded-full bg-white/20">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <p className="font-semibold leading-tight">Lumi</p>
                <p className="text-xs text-teal-50 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-300 inline-block" /> Online now
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-teal-50/40">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.from === 'user'
                        ? 'bg-teal-600 text-white rounded-br-sm'
                        : 'bg-white text-slate-700 border border-teal-100 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] px-3.5 py-3 rounded-2xl rounded-bl-sm bg-white text-slate-700 border border-teal-100 shadow-sm">
                    <span className="flex items-center gap-1">
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      />
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      />
                    </span>
                  </div>
                </div>
              )}
              {msgs.length <= 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {chatSuggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="px-3 py-1.5 rounded-full bg-white border border-teal-200 text-xs text-teal-700 hover:bg-teal-100 transition-colors"
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
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 p-3 border-t border-teal-100 bg-white"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about insurance, pain, hours…"
                className="flex-1 px-3.5 py-2.5 rounded-full bg-teal-50 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-teal-300"
              />
              <button
                type="submit"
                className="grid place-items-center w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 text-white shrink-0 hover:scale-105 transition-transform"
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
