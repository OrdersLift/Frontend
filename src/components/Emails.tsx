import { emails } from '../data/site';
import { EmailCard } from './mockups';
import { SectionHead } from './Section';

/**
 * The review-request email, six ways.
 *
 * The point of the gallery is that none of them look like each other, and
 * none of them look like us — the whole thing only works if the guest thinks
 * the restaurant wrote to them.
 */
export default function Emails() {
  return (
    <section id="emails" className="section">
      <div className="shell">
        <SectionHead
          marker="Email & SMS"
          aside="Six restaurants, six voices"
          title="The ask goes out while the meal is still on their mind."
          lede="A few hours after they eat, one message, one button. Written in your voice,
                sent from your address, in your colours. Nobody gets asked twice."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {emails.map((e) => (
            <EmailCard key={e.id} e={e} />
          ))}
        </div>

        <div className="mt-12 grid gap-8 border-t border-rule pt-8 sm:grid-cols-3">
          {[
            {
              h: 'Timed to the table',
              p: 'The send fires off the visit, not off a Tuesday schedule. A guest who ate at 8pm hears from you the next morning, not next month.',
            },
            {
              h: 'Unhappy guests reach you first',
              p: 'If the reply comes back negative, it routes to your inbox privately instead of to Google. You get the chance to fix it before it is public.',
            },
            {
              h: 'Runs on what you already have',
              p: 'POS export, booking system, Wi-Fi sign-in or a QR code on the receipt. If you take names on paper, we can still make it work.',
            },
          ].map((b) => (
            <div key={b.h}>
              <h3 className="font-semibold text-ink">{b.h}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{b.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
