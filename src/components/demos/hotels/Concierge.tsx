import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { askBot, type ChatTurn } from '../../../lib/askBot';

type Msg = { from: 'bot' | 'user'; text: string };

const suggestions = ['What time is check-in?', 'Is breakfast included?', 'Are pets allowed?', 'Best hiking trail?'];

export default function Concierge() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: 'bot', text: 'Hello, and welcome to Maple & Mist! I am Misty, your virtual concierge. Ask me anything about your stay.' },
  ]);
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing, open]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Msg = { from: 'user', text: trimmed };
    setMsgs((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);
    const history: ChatTurn[] = [...msgs, userMsg].map((m) => ({ role: m.from, text: m.text }));
    const reply = await askBot('hotels', 'Maple & Mist', history);
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
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-[#1c2b24] font-semibold shadow-lg shadow-orange-900/30 hover:shadow-xl transition"
        aria-label="Open concierge chat"
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
        <span className="hidden sm:inline text-sm">{open ? 'Close' : 'Ask Misty'}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 22 }}
            className="fixed bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] sm:w-96 max-h-[70vh] flex flex-col rounded-2xl overflow-hidden border border-emerald-900/30 bg-[#fbf7ef] shadow-2xl"
          >
            {/* Header */}
            <div className="bg-[#1c2b24] px-4 py-3 flex items-center gap-3">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-[#1c2b24]">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <p className="text-amber-50 font-serif leading-tight">Misty</p>
                <p className="text-emerald-200/70 text-xs">AI Concierge · replies instantly</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.from === 'user'
                        ? 'bg-emerald-800 text-amber-50 rounded-br-sm'
                        : 'bg-white text-stone-700 border border-stone-200 rounded-bl-sm'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] px-3.5 py-2.5 rounded-2xl rounded-bl-sm bg-white text-stone-700 border border-stone-200">
                    <span className="flex items-center gap-1">
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-amber-500"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      />
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-amber-500"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-amber-500"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      />
                    </span>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Suggestions */}
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 hover:bg-amber-200 transition"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 p-3 border-t border-stone-200 bg-white"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your stay…"
                className="flex-1 px-3 py-2 text-sm rounded-full border border-stone-300 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-400 text-stone-800"
              />
              <button
                type="submit"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-[#1c2b24]"
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
