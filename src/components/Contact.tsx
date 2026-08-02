import { useState } from 'react';
import { ArrowRight, Check, Mail, Phone } from 'lucide-react';
import { contact } from '../data/site';
import { SectionHead } from './Section';

const field =
  'w-full rounded-[3px] border border-rule bg-raise px-3.5 py-3 text-sm text-ink ' +
  'placeholder:text-muted focus:border-ink focus:outline-none transition-colors';

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', venue: '', type: '', listing: '', message: '',
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const change = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await fetch(contact.formspree, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          _subject: `Teardown request — ${form.venue || form.name}`,
          _replyto: form.email,
        }),
      });
      if (!res.ok) {
        let msg = 'That did not send. Try again, or email us directly.';
        try {
          const d = await res.json();
          if (d?.errors?.[0]?.message) msg = d.errors[0].message;
        } catch { /* keep the default message */ }
        setError(msg);
        return;
      }
      setSent(true);
    } catch {
      setError('No connection. Check your network, or email us directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section section-band">
      <div className="shell">
        <SectionHead
          marker="Get the teardown"
          aside="Reply within one working day"
          title="Tell us where you are. We will look you up before we call."
          lede="Twenty minutes on the phone. We read your listing back to you, show you the four
                restaurants nearest you, and tell you which of you is winning the search and why."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
          {/* form */}
          <div>
            {sent ? (
              <div className="panel flex flex-col items-start p-8">
                <Check className="h-8 w-8 text-gain" strokeWidth={2} />
                <h3 className="display mt-5 text-2xl">That is with us.</h3>
                <p className="mt-3 max-w-md text-body">
                  We will look up your listing and come back within one working day with what we
                  found — whether or not you end up hiring us.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="label">Your name *</span>
                    <input
                      required name="name" value={form.name} onChange={change}
                      className={field} placeholder="Ana Ferreira" autoComplete="name"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="label">Email *</span>
                    <input
                      required type="email" name="email" value={form.email} onChange={change}
                      className={field} placeholder="you@restaurant.com" autoComplete="email"
                    />
                  </label>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="label">Restaurant name *</span>
                    <input
                      required name="venue" value={form.venue} onChange={change}
                      className={field} placeholder="Bella Napoli"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="label">Type of place</span>
                    <select
                      name="type" value={form.type} onChange={change}
                      className={`${field} cursor-pointer`}
                    >
                      <option value="">Select one</option>
                      {contact.venueTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="label">Google listing or website</span>
                  <input
                    name="listing" value={form.listing} onChange={change}
                    className={field} placeholder="A link, or just the town — we will find you"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="label">What is going on? *</span>
                  <textarea
                    required rows={5} name="message" value={form.message} onChange={change}
                    className={`${field} resize-none`}
                    placeholder="Quiet weeknights, a rating that will not move, too much going to the delivery apps — whatever it is."
                  />
                </label>

                {error && (
                  <p role="alert" className="text-sm font-medium text-loss">{error}</p>
                )}

                <div className="flex flex-wrap items-center gap-4">
                  <button type="submit" disabled={sending} className="btn btn-solid disabled:opacity-60">
                    {sending ? 'Sending…' : 'Request the teardown'}
                    {!sending && <ArrowRight className="h-4 w-4" />}
                  </button>
                  <span className="text-xs text-muted">No newsletter, no sequence, no call centre.</span>
                </div>
              </form>
            )}
          </div>

          {/* direct lines */}
          <div className="grid content-start gap-8">
            <div className="border-t border-rule pt-6">
              <p className="label">Or skip the form</p>
              <div className="mt-5 grid gap-4">
                <a href={`mailto:${contact.email}`} className="flex items-start gap-3 group">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>
                    <span className="block text-sm font-semibold text-ink group-hover:text-gold transition-colors">
                      {contact.email}
                    </span>
                    <span className="block text-xs text-muted">Answered within a working day</span>
                  </span>
                </a>
                <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`} className="flex items-start gap-3 group">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>
                    <span className="figure block text-sm font-semibold text-ink group-hover:text-gold transition-colors">
                      {contact.phone}
                    </span>
                    <span className="block text-xs text-muted">A person, not a menu tree</span>
                  </span>
                </a>
              </div>
            </div>

            <div className="border-t border-rule pt-6">
              <p className="label">What the teardown covers</p>
              <ul className="mt-5 grid gap-3">
                {[
                  'Your listing, read back to you line by line',
                  'The four restaurants nearest you, side by side',
                  'Where your reviews stalled, and why',
                  'What we would do first, and what we would leave alone',
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-sm leading-snug text-body">
                    <span aria-hidden="true" className="mt-[0.45rem] h-px w-3 shrink-0 bg-gold" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
