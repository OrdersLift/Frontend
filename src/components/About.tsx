import { ArrowRight } from 'lucide-react';
import { SectionHead } from './Section';

const positions = [
  {
    head: 'Restaurants, and nothing else',
    body:
      'The timing of a review request, the way a menu gets indexed, the offer that gets someone ' +
      'to drive fifteen minutes on a wet Tuesday — none of it transfers from dentistry or ' +
      'conveyancing. An agency that serves eleven industries is competent at none of them.',
  },
  {
    head: 'The listing before the advertising',
    body:
      'Sending paid traffic at a two-point-eight rating buys strangers the chance to scroll past ' +
      'you. We fix what they land on first. It is a slower start and a smaller invoice in month ' +
      'one, and it is the only order that works.',
  },
  {
    head: 'Real reviews or none',
    body:
      'We will not buy, write or incentivise a review, and we will tell you to walk away from ' +
      'anyone who offers to. Google strips them and suspends profiles for it. A suspended profile ' +
      'costs more than every review it ever bought.',
  },
  {
    head: 'Your accounts, your data',
    body:
      'We work inside your Google profile, your ad account, your domain and your guest list. ' +
      'Nothing is held in ours. If you leave, nothing switches off and nothing needs handing back.',
  },
  {
    head: 'Numbers you can act on',
    body:
      'Impressions and reach are not food. The Monday report shows rating, review count, calls, ' +
      'direction requests, direct orders and cost per redeemed voucher — the six things that ' +
      'change what you do next week.',
  },
  {
    head: 'One page, one person',
    body:
      'You get the person doing the work, not an account manager relaying it. Small on purpose: ' +
      'we would rather run twenty restaurants properly than two hundred badly.',
  },
];

const refusals = [
  'Buy, write or incentivise reviews',
  'Mark up your ad spend',
  'Hold your Google profile or ad account hostage',
  'Lock you into a twelve-month contract',
  'Report on impressions and call it growth',
  'Take on a second restaurant on your street',
];

export default function About() {
  return (
    <>
      <section className="pb-4 pt-28 sm:pt-32 lg:pt-40">
        <div className="shell">
          <p className="label">About</p>
          <h1 className="display mt-5 max-w-4xl text-[clamp(2.4rem,6.2vw,4rem)]">
            We got tired of watching good kitchens lose to worse ones.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-body">
            The gap between a restaurant that is busy and one that is not is very often not the
            food. It is eleven reviews against three hundred, a phone number that rings out, and
            a photograph of an empty dining room taken in 2017. That gap is fixable, it is
            unglamorous work, and it is all we do.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="/#contact" className="btn btn-solid">
              Book a teardown
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="/#work" className="btn btn-line">See the work</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHead
            marker="How we work"
            aside="Six positions"
            title="What we believe, stated plainly enough to be held to."
          />

          <div className="mt-14 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {positions.map((p, i) => (
              <div key={p.head} className="bg-paper p-7">
                <span className="figure text-sm text-gold">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="display mt-4 text-xl">{p.head}</h2>
                <p className="mt-3 text-sm leading-relaxed text-body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-band">
        <div className="shell">
          <SectionHead
            marker="What we will not do"
            title="The shortest way to understand an agency is to ask what it refuses."
          />

          <ul className="mt-12 max-w-3xl">
            {refusals.map((r) => (
              <li
                key={r}
                className="flex items-baseline gap-4 border-t border-rule py-4 last:border-b"
              >
                <span aria-hidden="true" className="figure shrink-0 text-loss">✕</span>
                <span className="text-lg text-body">{r}</span>
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-2xl text-body">
            If any of those are things you were hoping for, we are the wrong agency and it is
            cheaper for both of us to find that out now.{' '}
            <a href="/#contact" className="link font-semibold">Otherwise, get in touch.</a>
          </p>
        </div>
      </section>
    </>
  );
}
