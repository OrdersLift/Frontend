// Human live chat: messages go to a Slack thread, the team's replies in that
// thread come back here. Separate from <AIChat/>, which answers with Gemini.
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { Headphones, X, Send } from 'lucide-react';
import { panel, pressHover, pressTap } from '../lib/motion';

const API = import.meta.env.PUBLIC_CHAT_API as string | undefined;
const STORAGE_KEY = 'ol_chat_id';

// ponytail: polling, not SSE — a websocket per idle tab is not worth it at this
// volume. Swap to SSE if the reply latency ever feels slow.
const POLL_OPEN = 3_000;
const POLL_CLOSED = 20_000;

type Msg = { id: string; role: 'visitor' | 'agent'; text: string; author?: string; at: number };

export default function LiveChat() {
  const [open, setOpen] = useState(false);
  const [convId, setConvId] = useState<string | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [unread, setUnread] = useState(0);
  const lastAt = useRef(0);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => setConvId(localStorage.getItem(STORAGE_KEY)), []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, open]);
  useEffect(() => { if (open) setUnread(0); }, [open, msgs]);

  // Only one floating panel at a time — <AIChat/> listens for the same event.
  useEffect(() => {
    const close = (e: Event) => { if ((e as CustomEvent).detail !== 'live') setOpen(false); };
    window.addEventListener('ol:panel-open', close);
    return () => window.removeEventListener('ol:panel-open', close);
  }, []);

  // The poll re-sends the boundary message every tick (the API filters with
  // >= so nothing can slip through a shared millisecond), so dedupe by id.
  const seen = useRef(new Set<string>());
  const merge = useCallback((incoming: Msg[]) => {
    const fresh = incoming.filter((m) => !seen.current.has(m.id));
    if (!fresh.length) return;
    fresh.forEach((m) => seen.current.add(m.id));
    lastAt.current = Math.max(lastAt.current, ...fresh.map((m) => m.at));
    setMsgs((prev) => [...prev, ...fresh]);
    const fromTeam = fresh.filter((m) => m.role === 'agent').length;
    if (fromTeam) setUnread((u) => u + fromTeam);
  }, []);

  useEffect(() => {
    if (!API || !convId) return;
    let alive = true;
    const tick = async () => {
      try {
        const res = await fetch(`${API}/api/chat/messages?conversationId=${convId}&after=${lastAt.current}`);
        const data = await res.json();
        if (alive && Array.isArray(data?.messages)) merge(data.messages);
      } catch { /* offline — the next tick retries */ }
    };
    tick();
    const id = setInterval(tick, open ? POLL_OPEN : POLL_CLOSED);
    return () => { alive = false; clearInterval(id); };
  }, [convId, open, merge]);

  const send = async (text: string) => {
    const t = text.trim();
    if (!t || sending || !API) return;
    setSending(true);
    setError('');
    try {
      const res = await fetch(`${API}/api/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: convId,
          text: t,
          name: name.trim(),
          email: email.trim(),
          page: location.pathname,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? 'send failed');
      if (!convId) {
        localStorage.setItem(STORAGE_KEY, data.conversationId);
        setConvId(data.conversationId);
      }
      merge([data.message]);
      setInput('');
    } catch {
      setError("Couldn't send that — please try again.");
    } finally {
      setSending(false);
    }
  };

  if (!API) return null; // not configured — better no widget than a broken one

  const started = Boolean(convId);

  return (
    <MotionConfig reducedMotion="user">
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        whileHover={pressHover}
        whileTap={pressTap}
        onClick={() => {
          if (!open) window.dispatchEvent(new CustomEvent('ol:panel-open', { detail: 'live' }));
          setOpen((o) => !o);
        }}
        className="focus-ring fixed bottom-5 right-24 z-50 grid place-items-center w-14 h-14 rounded-full
                   bg-neutral-900 text-white shadow-xl shadow-black/30 hover:brightness-125
                   dark:bg-white dark:text-neutral-900"
        aria-label="Chat with the OrdersLift team"
        aria-expanded={open}
      >
        {open ? <X className="w-6 h-6" /> : <Headphones className="w-6 h-6" />}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 grid place-items-center min-w-[20px] h-5 px-1 rounded-full
                           bg-red-500 text-white text-[11px] font-semibold">
            {unread}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={panel}
            initial="hidden"
            animate="show"
            exit="hidden"
            role="dialog"
            aria-label="Chat with the OrdersLift team"
            className="fixed bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] max-w-sm rounded-2xl overflow-hidden
                       bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-white/10
                       elev-3 flex flex-col"
            style={{ height: 'min(70vh, 540px)' }}
          >
            <div className="flex items-center gap-3 px-4 py-3 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
              <span className="grid place-items-center w-9 h-9 rounded-full bg-white/20 dark:bg-neutral-900/10 flex-shrink-0">
                <Headphones className="w-5 h-5" />
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-sm">Talk to the team</p>
                <p className="text-[11px] opacity-70">A real person replies here</p>
              </div>
            </div>

            {!started ? (
              <form
                onSubmit={(e) => { e.preventDefault(); send(input); }}
                className="flex-1 overflow-y-auto p-4 space-y-3"
              >
                <p className="text-sm text-neutral-600 dark:text-slate-400">
                  Leave a message and we'll reply right here — add your email if you'd like us to follow up too.
                </p>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  aria-label="Your name"
                  className={fieldClass}
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email (optional)"
                  aria-label="Email (optional)"
                  className={fieldClass}
                />
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="How can we help?"
                  aria-label="How can we help?"
                  rows={4}
                  required
                  className={fieldClass + ' resize-none'}
                />
                {error && <p className="text-xs text-red-500">{error}</p>}
                <button
                  type="submit"
                  disabled={sending || !input.trim()}
                  className="focus-ring w-full rounded-full py-2.5 text-sm font-semibold
                             bg-neutral-900 text-white dark:bg-white dark:text-neutral-900
                             disabled:opacity-50"
                >
                  {sending ? 'Sending…' : 'Start chat'}
                </button>
              </form>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3" aria-live="polite">
                  {msgs.map((m) => (
                    <div key={m.id} className={`flex ${m.role === 'visitor' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                          m.role === 'visitor'
                            ? 'bg-neutral-900 text-white rounded-br-sm dark:bg-white dark:text-neutral-900'
                            : 'bg-neutral-100 text-neutral-800 border border-neutral-200 rounded-bl-sm dark:bg-white/[0.05] dark:text-slate-200 dark:border-white/[0.08]'
                        }`}
                      >
                        {m.role === 'agent' && m.author && (
                          <span className="block text-[11px] font-semibold opacity-60 mb-0.5">{m.author}</span>
                        )}
                        {m.text}
                      </div>
                    </div>
                  ))}
                  <div ref={endRef} />
                </div>

                {error && <p className="px-4 pb-1 text-xs text-red-500">{error}</p>}

                <form
                  onSubmit={(e) => { e.preventDefault(); send(input); }}
                  className="flex items-center gap-2 p-3 hairline-t"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message…"
                    aria-label="Type a message"
                    className="flex-1 min-w-0 bg-neutral-100 border border-neutral-200 text-neutral-900 placeholder-neutral-400
                               dark:bg-black dark:border-white/10 dark:text-white dark:placeholder-slate-500
                               rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-400/60"
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className="focus-ring grid place-items-center w-9 h-9 rounded-full shrink-0 disabled:opacity-50
                               bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                    aria-label="Send"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

const fieldClass =
  'w-full bg-neutral-100 border border-neutral-200 text-neutral-900 placeholder-neutral-400 ' +
  'dark:bg-black dark:border-white/10 dark:text-white dark:placeholder-slate-500 ' +
  'rounded-xl px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-neutral-400/60';
