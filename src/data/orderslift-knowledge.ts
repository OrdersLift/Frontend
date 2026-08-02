// Knowledge base for the OrdersLift site assistant.
//
// The demo restaurant under /demo/restaurants auto-extracts its knowledge from
// its own data.ts. OrdersLift's own positioning lives in JSX, so it is
// summarised here — derived from src/data/site.ts. Keep the two in step.

import { faqs, plans, process, services } from './site';

export const ordersliftKnowledge = {
  brand: 'OrdersLift',
  tagline: 'Growth marketing for restaurants. Nothing else.',
  what_we_do:
    'OrdersLift is a marketing agency that works only with restaurants, cafés, bars, takeaways ' +
    'and food trucks. We rebuild the Google Business Profile, run a review engine that brings in ' +
    'real reviews from real guests, send branded review-request emails and texts, run Facebook ' +
    'and Instagram ads built around a redeemable offer, and build the website and direct ordering ' +
    'flow so the restaurant stops paying commission to delivery apps.',

  services: services.map((s) => ({
    name: s.marker,
    headline: s.title,
    detail: s.lede,
    includes: s.points,
  })),

  order_of_work:
    'The channels run in a deliberate order. The profile and the reviews come first because ' +
    'advertising a low rating wastes money; ads come fourth, once the rating holds.',

  process: process.map((p) => ({ step: p.step, name: p.title, detail: p.body })),

  pricing: {
    note:
      'Three plans, month to month after the first ninety days. Ad spend is billed by Meta ' +
      'directly to the client and is never marked up. Exact prices are quoted after the free ' +
      'teardown, once we have seen the state of the listing.',
    plans: plans.map((p) => ({
      name: p.name,
      for: p.tag,
      price: p.price,
      terms: p.note,
      suits: p.blurb,
      includes: p.includes,
    })),
  },

  teardown:
    'Every engagement starts with a free 20-minute teardown call. We read the listing back to ' +
    'the owner, compare the four nearest restaurants, explain where the reviews stalled, and say ' +
    'what we would do first. The findings are theirs whether or not they hire us.',

  what_we_refuse: [
    'Buying, writing or incentivising reviews — Google strips them and can suspend the profile',
    'Marking up ad spend',
    'Holding a client Google profile, ad account or domain',
    'Twelve-month lock-in contracts',
    'Reporting on impressions instead of guests through the door',
    'Taking on a second restaurant on the same street',
  ],

  ownership:
    'Clients own their Google profile, ad account, website, domain and guest list from day one. ' +
    'OrdersLift works inside the client accounts, never its own.',

  reporting:
    'One page every Monday: rating, review count, calls, direction requests, direct orders, and ' +
    'cost per redeemed voucher on the ads.',

  industries: 'Restaurants, cafés, bars and pubs, takeaways and QSR, food trucks, and small groups of two or more sites. No other industries.',

  demo:
    'A complete working demo restaurant — Saffron & Ember — is at /demo/restaurants. It has a ' +
    'menu, direct ordering, table booking and an on-site assistant.',

  faqs: faqs.map((f) => ({ question: f.q, answer: f.a })),

  contact:
    'Email restaurantorderlift@gmail.com or call (+91) 63939 74340, or use the form in the ' +
    'contact section to request the free teardown. Replies come within one working day.',

  examples_disclaimer:
    'The before-and-after listings, review-request emails and ad creative shown on the site are ' +
    'worked examples built from real campaign structures, not client records. Say so if asked.',
};
