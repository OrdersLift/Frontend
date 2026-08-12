// Human live chat: messages go to a Slack thread, the team's replies in that
// thread come back here. Separate from <AIChat/>, which answers with Gemini.
//
// A visitor can hold several chats at once. The id of each is kept in
// localStorage — without a login there is no cross-device identity to hang
// them off, so "come back later" means "same browser".
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { Headphones, X, Send, Plus, ChevronLeft } from 'lucide-react';
import { panel, pressHover, pressTap } from '../lib/motion';

const API = import.meta.env.PUBLIC_CHAT_API as string | undefined;
const CHATS_KEY = 'ol_chats';
const WHO_KEY = 'ol_chat_who';
const LEGACY_KEY = 'ol_chat_id';

// ponytail: polling, not SSE — a websocket per idle tab is not worth it at this
// volume. Swap to SSE if the reply latency ever feels slow.
const POLL_OPEN = 3_000;
const POLL_CLOSED = 20_000;

type Msg = {
  id: string;
  conversationId: string;
  role: 'visitor' | 'agent';
  text: string;
  author?: string;
  at: number;
};

/** What we remember per chat so the list renders before any network call. */
type Chat = { id: string; title: string; at: number; unread: number };

const readJSON = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback; // corrupt entry — start clean rather than break the widget
  }
};

function loadChats(): Chat[] {
  const chats = readJSON<Chat[]>(CHATS_KEY, []);
  // Adopt the single chat written by the previous version of this widget.
  const legacy = localStorage.getItem(LEGACY_KEY);
  if (legacy && !chats.some((c) => c.id === legacy)) {
    chats.push({ id: legacy, title: 'Earlier chat', at: 0, unread: 0 });
  }
  return chats.sort((a, b) => b.at - a.at);
}

const title = (text: string) => (text.length > 42 ? text.slice(0, 42).trimEnd() + '…' : text);

function when(at: number): string {
  if (!at) return '';
  const mins = Math.round((Date.now() - at) / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return new Date(at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export default function LiveChat() {
  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [composing, setComposing] = useState(false); // on the "new chat" form
  const [msgs, setMsgs] = useState<Record<string, Msg[]>>({});
  const [input, setInput] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const lastAt = useRef(0);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = loadChats();
    setChats(stored);
    setComposing(stored.length === 0);
    const who = readJSON<{ name?: string; email?: string }>(WHO_KEY, {});
    if (who.name) setName(who.name);
    if (who.email) setEmail(who.email);
  }, []);

  // chats is the source of truth for the list; persist every change.
  const persist = useCallback((next: Chat[]) => {
    const sorted = [...next].sort((a, b) => b.at - a.at);
    setChats(sorted);
    localStorage.setItem(CHATS_KEY, JSON.stringify(sorted));
    return sorted;
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, activeId, open]);

  // Only one floating panel at a time — <AIChat/> listens for the same event.
  useEffect(() => {
    const close = (e: Event) => { if ((e as CustomEvent).detail !== 'live') setOpen(false); };
    window.addEventListener('ol:panel-open', close);
    return () => window.removeEventListener('ol:panel-open', close);
  }, []);

  // Reading a chat clears its badge.
  useEffect(() => {
    if (!open || !activeId) return;
    setChats((prev) => {
      if (!prev.some((c) => c.id === activeId && c.unread)) return prev;
      const next = prev.map((c) => (c.id === activeId ? { ...c, unread: 0 } : c));
      localStorage.setItem(CHATS_KEY, JSON.stringify(next));
      return next;
    });
  }, [open, activeId, msgs]);

  // The poll re-sends the boundary message every tick (the API filters with
  // >= so nothing can slip through a shared millisecond), so dedupe by id.
  const seen = useRef(new Set<string>());
  const merge = useCallback((incoming: Msg[], activeNow: string | null) => {
    const fresh = incoming.filter((m) => !seen.current.has(m.id));
    if (!fresh.length) return;
    fresh.forEach((m) => seen.current.add(m.id));
    lastAt.current = Math.max(lastAt.current, ...fresh.map((m) => m.at));

    setMsgs((prev) => {
      const next = { ...prev };
      for (const m of fresh) {
        next[m.conversationId] = [...(next[m.conversationId] ?? []), m].sort((a, b) => a.at - b.at);
      }
      return next;
    });

    setChats((prev) => {
      let touched = false;
      const next = prev.map((c) => {
        const mine = fresh.filter((m) => m.conversationId === c.id);
        if (!mine.length) return c;
        touched = true;
        const unread = mine.filter((m) => m.role === 'agent').length;
        return {
          ...c,
          at: Math.max(c.at, ...mine.map((m) => m.at)),
          // A chat you are looking at is already read.
          unread: c.id === activeNow ? 0 : c.unread + unread,
        };
      });
      if (!touched) return prev;
      const sorted = next.sort((a, b) => b.at - a.at);
      localStorage.setItem(CHATS_KEY, JSON.stringify(sorted));
      return sorted;
    });
  }, []);

  // One request covers every chat, so a reply to a chat you're not looking at
  // still raises its badge.
  const ids = chats.map((c) => c.id).join(',');
  useEffect(() => {
    if (!API || !ids) return;
    let alive = true;
    const tick = async () => {
      try {
        const res = await fetch(`${API}/api/chat/messages?conversationId=${ids}&after=${lastAt.current}`);
        const data = await res.json();
        if (alive && Array.isArray(data?.messages)) merge(data.messages, open ? activeId : null);
      } catch { /* offline — the next tick retries */ }
    };
    tick();
    const id = setInterval(tick, open ? POLL_OPEN : POLL_CLOSED);
    return () => { alive = false; clearInterval(id); };
  }, [ids, open, activeId, merge]);

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
          conversationId: composing ? undefined : activeId,
          text: t,
          name: name.trim(),
          email: email.trim(),
          page: location.pathname,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? 'send failed');

      const id: string = data.conversationId;
      if (composing) {
        persist([...chats, { id, title: title(t), at: data.message.at, unread: 0 }]);
        localStorage.setItem(WHO_KEY, JSON.stringify({ name: name.trim(), email: email.trim() }));
        setActiveId(id);
        setComposing(false);
      }
      merge([data.message], id);
      setInput('');
    } catch {
      setError("Couldn't send that — please try again.");
    } finally {
      setSending(false);
    }
  };

  if (!API) return null; // not configured — better no widget than a broken one

  const totalUnread = chats.reduce((n, c) => n + c.unread, 0);
  const active = activeId ? chats.find((c) => c.id === activeId) : undefined;
  const view: 'list' | 'new' | 'chat' = composing ? 'new' : active ? 'chat' : 'list';
  const thread = activeId ? msgs[activeId] ?? [] : [];

  const backToList = () => { setActiveId(null); setComposing(false); };

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
        {!open && totalUnread > 0 && (
          <span className="absolute -top-1 -right-1 grid place-items-center min-w-[20px] h-5 px-1 rounded-full
                           bg-red-500 text-white text-[11px] font-semibold">
            {totalUnread}
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
              {view === 'list' ? (
                <span className="grid place-items-center w-9 h-9 rounded-full bg-white/20 dark:bg-neutral-900/10 flex-shrink-0">
                  <Headphones className="w-5 h-5" />
                </span>
              ) : (
                <button
                  onClick={backToList}
                  className="focus-ring grid place-items-center w-9 h-9 rounded-full bg-white/20 dark:bg-neutral-900/10 flex-shrink-0"
                  aria-label="Back to all chats"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm truncate">
                  {view === 'chat' ? active!.title : view === 'new' ? 'New chat' : 'Talk to the team'}
                </p>
                <p className="text-[11px] opacity-70">A real person replies here</p>
              </div>
              {view === 'list' && chats.length > 0 && (
                <button
                  onClick={() => { setActiveId(null); setInput(''); setComposing(true); }}
                  className="focus-ring grid place-items-center w-9 h-9 rounded-full bg-white/20 dark:bg-neutral-900/10 flex-shrink-0"
                  aria-label="Start a new chat"
                >
                  <Plus className="w-5 h-5" />
                </button>
              )}
            </div>

            {view === 'list' && (
              <div className="flex-1 overflow-y-auto p-2">
                {chats.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveId(c.id)}
                    className="focus-ring w-full text-left px-3 py-3 rounded-xl flex items-center gap-3
                               hover:bg-neutral-100 dark:hover:bg-white/[0.05] transition"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm text-neutral-900 dark:text-slate-100 truncate">{c.title}</span>
                      <span className="block text-[11px] text-neutral-500 dark:text-slate-400">{when(c.at)}</span>
                    </span>
                    {c.unread > 0 && (
                      <span className="grid place-items-center min-w-[20px] h-5 px-1 rounded-full bg-red-500 text-white text-[11px] font-semibold">
                        {c.unread}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {view === 'new' && (
              <form
                onSubmit={(e) => { e.preventDefault(); send(input); }}
                className="flex-1 overflow-y-auto p-4 space-y-3"
              >
                <p className="text-sm text-neutral-600 dark:text-slate-400">
                  Leave a message and we'll reply right here — add your email if you'd like us to follow up too.
                </p>
                <input value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Your name" aria-label="Your name" className={fieldClass} />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"
                  placeholder="Email (optional)" aria-label="Email (optional)" className={fieldClass} />
                <textarea value={input} onChange={(e) => setInput(e.target.value)}
                  placeholder="How can we help?" aria-label="How can we help?" rows={4} required
                  className={fieldClass + ' resize-none'} />
                {error && <p className="text-xs text-red-500">{error}</p>}
                <button
                  type="submit"
                  disabled={sending || !input.trim()}
                  className="focus-ring w-full rounded-full py-2.5 text-sm font-semibold
                             bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 disabled:opacity-50"
                >
                  {sending ? 'Sending…' : 'Start chat'}
                </button>
                {chats.length > 0 && (
                  <button type="button" onClick={backToList}
                    className="focus-ring w-full text-xs text-neutral-500 dark:text-slate-400 hover:underline">
                    Back to my chats
                  </button>
                )}
              </form>
            )}

            {view === 'chat' && (
              <>
                <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3" aria-live="polite">
                  {thread.map((m) => (
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
