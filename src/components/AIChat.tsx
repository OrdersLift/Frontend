import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { askBot, type ChatTurn } from '../lib/askBot';

const GREETING =
  "Hi! I'm OrdersLift's assistant 👋 Ask me about what we build, pricing, the industries we serve, or our live demos.";

const SUGGESTIONS = [
  'What do you build?',
  'How much does it cost?',
  'Show me a demo',
  'What is the RAG bot?',
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
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: 'spring' }}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 grid place-items-center w-14 h-14 rounded-full
                   bg-gradient-to-br from-primary-600 to-glow-600 text-white shadow-xl shadow-primary-900/40
                   hover:brightness-110"
        aria-label="Open OrdersLift assistant"
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
            className="fixed bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] max-w-sm rounded-2xl overflow-hidden
                       bg-dark-850 border border-primary-500/30 shadow-2xl shadow-black/50 flex flex-col"
            style={{ height: 'min(70vh, 540px)' }}
          >
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary-600 to-glow-600 text-white">
              <span className="grid place-items-center w-9 h-9 rounded-full bg-white/20">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <p className="font-semibold text-sm">OrdersLift Assistant</p>
                <p className="text-[11px] text-white/80">Ask about our AI platform</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-primary-600 text-white rounded-br-sm'
                        : 'bg-white/05 text-slate-200 rounded-bl-sm border border-white/08'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white/05 border border-white/08 rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="w-1.5 h-1.5 rounded-full bg-primary-400"
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
                    className="text-[11px] px-2.5 py-1 rounded-full border border-primary-400/40 text-primary-200
                               hover:bg-primary-400/10 transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 p-3 border-t border-white/08"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about OrdersLift..."
                className="flex-1 bg-dark-900 border border-white/10 text-white placeholder-slate-500 rounded-full px-4 py-2 text-sm
                           outline-none focus:ring-2 focus:ring-primary-400/50"
              />
              <button type="submit" className="grid place-items-center w-9 h-9 rounded-full bg-gradient-to-br from-primary-600 to-glow-600 text-white shrink-0" aria-label="Send">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
