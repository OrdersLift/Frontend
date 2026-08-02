import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, ArrowUp } from 'lucide-react';
import { askBot, type ChatTurn } from '../lib/askBot';

const GREETING =
  'Ask me anything about how we work — the review engine, the ads, what it costs, or what we ' +
  'refuse to do.';

const SUGGESTIONS = [
  'How fast does a rating move?',
  'Can you get me reviews?',
  'What does it cost?',
  'Why restaurants only?',
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
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Close the assistant' : 'Ask a question'}
        className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full border border-rule bg-ink text-paper transition-colors hover:bg-gold hover:text-[#14110d]"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      {open && (
        <div
          className="fixed bottom-20 right-5 z-50 flex w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded border border-rule bg-paper shadow-2xl"
          style={{ height: 'min(70vh, 540px)' }}
        >
          <div className="flex items-center justify-between gap-3 border-b border-rule px-4 py-3">
            <div>
              <p className="display text-base">Ask OrdersLift</p>
              <p className="label mt-0.5 text-[9px]">Answers from this site only</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close the assistant"
              className="text-muted transition-colors hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-[3px] px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-ink text-paper'
                      : 'border border-rule bg-raise text-body'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-[3px] border border-rule bg-raise px-4 py-3">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 rounded-full bg-muted"
                      style={{ animation: `fadeIn 1s ease-in-out ${d * 0.2}s infinite alternate` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {msgs.length <= 1 && (
            <div className="flex flex-wrap gap-1.5 px-4 pb-3">
              {SUGGESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  className="rounded-[3px] border border-rule px-2.5 py-1 text-[11px] text-body transition-colors hover:border-ink hover:text-ink"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex items-center gap-2 border-t border-rule p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a question"
              aria-label="Your question"
              className="flex-1 rounded-[3px] border border-rule bg-raise px-3 py-2 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-ink"
            />
            <button
              type="submit"
              aria-label="Send"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-[3px] bg-ink text-paper transition-colors hover:bg-gold hover:text-[#14110d]"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
