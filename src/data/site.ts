/**
 * Every word and figure the marketing site renders lives here.
 *
 * The listings, review-request emails and ad creative below are worked
 * examples built from real campaign structures — they are labelled as
 * examples wherever they appear on the page. They are not client records.
 * Swap them for signed-off client work before making results claims.
 *
 * Photography is served from Unsplash. To use your own shots instead, drop
 * files in `public/images/` and change the `photo` fields to `/images/...`.
 */

const shot = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=72`;

export const photos = {
  diningDark:   shot('1517248135467-4c7edcad34c4'),
  diningWarm:   shot('1552566626-52f8b828add9'),
  diningAmber:  shot('1590846406792-0adc7f938f1d'),
  terrace:      shot('1559339352-11d035aa65de'),
  tablePlated:  shot('1414235077428-338989a2e8c0'),
  tableShared:  shot('1466978913421-dad2ebd01d17'),
  ribs:         shot('1544025162-d76694265947'),
  pizza:        shot('1565299624946-b28f40a0ae38'),
  burger:       shot('1568901346375-23c9450c58cd'),
  burgersDark:  shot('1550547660-d9450f859349'),
  bowl:         shot('1546069901-ba9599a7e63c'),
  spread:       shot('1504674900247-0877df9cc836'),
  noodles:      shot('1585032226651-759b368d7246'),
  paella:       shot('1512058564366-18510be2db19'),
};

/* ── Google Business Profile listings ───────────────────────────────── */

export type Listing = {
  rating: number;
  count: number;
  photo: string;
  inside: string;
  open: boolean;
  hours: string;
};

export type Review = {
  name: string;
  initial: string;
  tint: string;
  text: string;
  when: string;
};

export type Case = {
  id: string;
  name: string;
  category: string;
  price: string;
  address: string;
  phone: string;
  site: string;
  streets: [string, string];
  span: string;
  headline: string;
  before: Listing;
  after: Listing;
  reviews: Review[];
};

export const cases: Case[] = [
  {
    id: 'urban-plate',
    name: 'The Urban Plate',
    category: 'Restaurant',
    price: '$$',
    address: '4118 Guadalupe St, Austin, TX 78751',
    phone: '(512) 555-0184',
    site: 'theurbanplate.com',
    streets: ['Guadalupe St', 'W 41st St'],
    span: '7 months',
    headline: 'Kitchen was always good. Nobody could tell from the outside.',
    before: {
      rating: 2.8, count: 18, photo: photos.tablePlated, inside: photos.diningWarm,
      open: false, hours: 'Opens 11 AM',
    },
    after: {
      rating: 4.7, count: 327, photo: photos.diningAmber, inside: photos.diningDark,
      open: true, hours: 'Closes 10 PM',
    },
    reviews: [
      { name: 'Sophia M.', initial: 'S', tint: '#7b4bd8', when: '1 week ago',
        text: 'Amazing food and wonderful ambiance. Highly recommend.' },
      { name: 'James T.', initial: 'J', tint: '#1a73e8', when: '2 weeks ago',
        text: 'Excellent service and delicious meals. Will come back!' },
      { name: 'Rachel P.', initial: 'R', tint: '#d93025', when: '1 month ago',
        text: 'One of the best restaurants in town. Loved everything.' },
    ],
  },
  {
    id: 'coastal-kitchen',
    name: 'Coastal Kitchen',
    category: 'Seafood restaurant',
    price: '$$$',
    address: '210 Ocean Blvd, Long Beach, NY 11561',
    phone: '(516) 987-6543',
    site: 'coastalkitchenlb.com',
    streets: ['Ocean Blvd', 'Pine Ave'],
    span: '5 months',
    headline: 'Fifteen reviews, all of them from 2019.',
    before: {
      rating: 2.9, count: 15, photo: photos.spread, inside: photos.diningWarm,
      open: false, hours: 'Opens 11 AM',
    },
    after: {
      rating: 4.7, count: 342, photo: photos.terrace, inside: photos.diningAmber,
      open: true, hours: 'Closes 10 PM',
    },
    reviews: [
      { name: 'Sarah M.', initial: 'S', tint: '#0b8043', when: '2 weeks ago',
        text: 'Incredible food and amazing service. Our new favourite spot in Long Beach.' },
      { name: 'David R.', initial: 'D', tint: '#1a73e8', when: '1 month ago',
        text: "Best seafood I've had in a long time. Everything was perfect." },
      { name: 'Jessica T.', initial: 'J', tint: '#c5221f', when: '1 month ago',
        text: 'Great atmosphere and generous portions. Highly recommend.' },
    ],
  },
  {
    id: 'bistro-house',
    name: 'Bistro House',
    category: 'Bistro',
    price: '$$',
    address: '45 Maple Ave, Springfield, IL 62704',
    phone: '(217) 555-0123',
    site: 'bistrohouse.com',
    streets: ['Maple Ave', 'Elm St'],
    span: '6 months',
    headline: 'Twelve reviews and a phone number that went to a fax machine.',
    before: {
      rating: 2.6, count: 12, photo: photos.noodles, inside: photos.diningWarm,
      open: true, hours: 'Closes 9 PM',
    },
    after: {
      rating: 4.7, count: 358, photo: photos.diningWarm, inside: photos.diningDark,
      open: true, hours: 'Closes 10 PM',
    },
    reviews: [
      { name: 'Emily R.', initial: 'E', tint: '#e37400', when: '2 weeks ago',
        text: 'Amazing food and excellent service. Highly recommend.' },
      { name: 'Michael T.', initial: 'M', tint: '#1a73e8', when: '1 month ago',
        text: 'Great atmosphere and delicious dishes. Will definitely come back.' },
      { name: 'Sophia L.', initial: 'S', tint: '#7b4bd8', when: '2 months ago',
        text: 'One of the best restaurants in town. Loved every bite.' },
    ],
  },
  {
    id: 'grill-spot',
    name: 'The Grill Spot',
    category: 'American restaurant',
    price: '$$',
    address: '780 Jackson St, Madison, WI 53703',
    phone: '(608) 555-0198',
    site: 'thegrillspot.com',
    streets: ['Jackson St', 'E Johnson St'],
    span: '4 months',
    headline: 'Eleven reviews. Three of them were the owner’s family.',
    before: {
      rating: 2.7, count: 11, photo: photos.ribs, inside: photos.diningWarm,
      open: false, hours: 'Opens 11 AM',
    },
    after: {
      rating: 4.6, count: 286, photo: photos.burgersDark, inside: photos.diningAmber,
      open: true, hours: 'Closes 10 PM',
    },
    reviews: [
      { name: 'Amanda L.', initial: 'A', tint: '#c5221f', when: '1 week ago',
        text: 'Absolutely love this place. Steak was cooked perfectly and the service was excellent.' },
      { name: 'Chris D.', initial: 'C', tint: '#0b8043', when: '2 weeks ago',
        text: 'Great atmosphere, amazing burgers and friendly staff. Highly recommend!' },
      { name: 'Taylor J.', initial: 'T', tint: '#1a73e8', when: '1 month ago',
        text: "One of the best dinners we've had in Madison. We'll definitely be back." },
    ],
  },
];

/* ── Review-request emails ──────────────────────────────────────────── */

export type EmailSample = {
  id: string;
  brand: string;
  kicker: string;
  from: string;
  subject: string;
  received: string;
  heading: string;
  body: string[];
  prompt: string;
  promptSub: string;
  cta: string;
  fine: string;
  signoff: string;
  photo: string;
  paper: string;   // email background
  accent: string;  // button + rule
  onAccent: string;
  foot: string;    // footer band
  footInk: string;
  serif?: boolean;
};

export const emails: EmailSample[] = [
  {
    id: 'bella-napoli',
    brand: 'Bella Napoli', kicker: 'Italian Kitchen',
    from: 'hello@bellanapoli.com',
    subject: 'Thanks for dining with us!',
    received: '10:32 AM',
    heading: 'Thanks for dining with us!',
    body: [
      'We hope you enjoyed your evening as much as we enjoyed having you.',
      'If you have a minute, a quick Google review helps other people in the neighbourhood find us.',
    ],
    prompt: 'Enjoyed your meal?', promptSub: 'It takes about a minute.',
    cta: 'Leave a review on Google',
    fine: 'One click, no account setup.',
    signoff: 'Grazie mille — Team Bella Napoli',
    photo: photos.pizza,
    paper: '#fffdf9', accent: '#9b1c1c', onAccent: '#ffffff',
    foot: '#1c1917', footInk: '#f5f5f4', serif: true,
  },
  {
    id: 'urban-plate',
    brand: 'The Urban Plate', kicker: 'Kitchen & Bar',
    from: 'hello@theurbanplate.com',
    subject: "We'd love your feedback",
    received: '9:15 AM',
    heading: 'Thanks for joining us!',
    body: [
      'We hope the meal landed well and the service was quick.',
      'Reviews are how new guests find us. Yours would mean a lot.',
    ],
    prompt: 'How did we do?', promptSub: 'Tell us in a sentence.',
    cta: 'Leave a review on Google',
    fine: 'Takes under a minute.',
    signoff: 'See you again soon — The Urban Plate team',
    photo: photos.diningDark,
    paper: '#ffffff', accent: '#111827', onAccent: '#ffffff',
    foot: '#f3f4f6', footInk: '#4b5563', serif: true,
  },
  {
    id: 'spice-route',
    brand: 'Spice Route', kicker: 'Indian Cuisine',
    from: 'info@spicerouteindy.com',
    subject: 'Thanks for choosing Spice Route!',
    received: '11:08 AM',
    heading: 'Namaste!',
    body: [
      'Thank you for dining with us. We hope you enjoyed the flavours.',
      'Your review helps us serve you better and helps others find us.',
    ],
    prompt: 'Enjoyed your meal?', promptSub: 'Share it on Google.',
    cta: 'Leave a review on Google',
    fine: 'It just takes a minute.',
    signoff: 'Warm regards — Team Spice Route',
    photo: photos.noodles,
    paper: '#fffaf5', accent: '#dc5a2c', onAccent: '#ffffff',
    foot: '#fdece2', footInk: '#7c2d12',
  },
  {
    id: 'greenleaf',
    brand: 'GreenLeaf', kicker: 'Plant-Based Eatery',
    from: 'hello@greenleafeatery.com',
    subject: 'Your feedback means a lot to us',
    received: '8:45 AM',
    heading: 'Thanks for choosing GreenLeaf!',
    body: [
      'We hope you had a fresh and genuinely good meal with us.',
      'Reviews help us keep doing what we love — serving healthy food that people come back for.',
    ],
    prompt: 'Loved your bowl?', promptSub: "Let the neighbourhood know.",
    cta: 'Leave a review on Google',
    fine: 'One minute, and it means a lot.',
    signoff: 'Thanks a bunch — Team GreenLeaf',
    photo: photos.bowl,
    paper: '#fbfdf9', accent: '#2f6b3c', onAccent: '#ffffff',
    foot: '#e8f2e6', footInk: '#22402a',
  },
  {
    id: 'sunset-bites',
    brand: 'Sunset Bites', kicker: 'Café & Bistro',
    from: 'hi@sunsetbitescafe.com',
    subject: "We'd love to hear from you!",
    received: '12:30 PM',
    heading: 'Thanks for visiting us!',
    body: [
      'We hope you enjoyed your time at Sunset Bites.',
      'If you have a moment, please leave us a review on Google. It means a lot to a small team.',
    ],
    prompt: 'Loved your visit?', promptSub: 'Say so in a line.',
    cta: 'Leave a review on Google',
    fine: 'It only takes a minute.',
    signoff: "Can't wait to see you again — Team Sunset Bites",
    photo: photos.tableShared,
    paper: '#fffcf7', accent: '#e0702f', onAccent: '#ffffff',
    foot: '#fdeee1', footInk: '#7c3a10',
  },
  {
    id: 'ocean-breeze',
    brand: 'Ocean Breeze', kicker: 'Seafood Restaurant',
    from: 'hello@oceanbreezerestaurant.com',
    subject: 'Thank you for dining with us!',
    received: '1:22 PM',
    heading: 'Thanks for dining with us!',
    body: [
      'We hope you enjoyed the catch and had a good evening on the water.',
      'A quick review on Google helps other seafood lovers find us.',
    ],
    prompt: 'Had a great meal?', promptSub: 'Share it on Google.',
    cta: 'Leave a review on Google',
    fine: 'It only takes a minute.',
    signoff: 'Thanks, and see you soon — Ocean Breeze team',
    photo: photos.terrace,
    paper: '#f9fcff', accent: '#12557f', onAccent: '#ffffff',
    foot: '#e4f0f8', footInk: '#0c3a57',
  },
];

/* ── Meta ad creative ───────────────────────────────────────────────── */

export type AdSample = {
  id: string;
  page: string;
  handle: string;
  copy: string[];
  overlay?: string;
  overlaySub?: string;
  domain: string;
  linkTitle: string;
  linkSub?: string;
  button: string;
  photo: string;
  objective: string;
};

export const ads: AdSample[] = [
  {
    id: 'ocean-breeze',
    page: 'Ocean Breeze Seafood', handle: 'Sponsored',
    copy: [
      'Click “Send message” and we’ll drop a buy-one-get-one crab cake sandwich straight into your inbox.',
      'We’re looking for people who have never eaten with us before — that’s the whole reason for the offer.',
      'Once the dining room fills up we take it down.',
    ],
    overlay: 'BOGO crab cake', overlaySub: 'This week only',
    domain: 'MESSENGER', linkTitle: 'Claim your sandwich', linkSub: 'Answer three questions, bring the voucher',
    button: 'Send message',
    photo: photos.spread,
    objective: 'First-time guests · 4 mi radius',
  },
  {
    id: 'grill-house',
    page: 'The Grill House', handle: 'Sponsored',
    copy: [
      '★★★★★ “Excellent dinner and big portions — we got two meals out of our order. Service was kind and professional.” — Matt H.',
      '★★★★★ “Food was excellent. The linguine was perfectly done.” — Joanne K.',
      'Everything is made in-house from scratch. Book a table and see.',
    ],
    domain: 'THEGRILLHOUSE.COM', linkTitle: 'Reserve a table', linkSub: 'Walk-ins welcome, booking is faster',
    button: 'Learn more',
    photo: photos.ribs,
    objective: 'Review-led · retargeting site visitors',
  },
  {
    id: 'bella-napoli',
    page: 'Bella Napoli', handle: 'Sponsored',
    copy: [
      'Hungry? Free appetiser on us — pick any starter on the menu.',
      'Tap below, we’ll send the voucher, you show it at the table.',
    ],
    overlay: 'Free appetiser', overlaySub: 'On your first visit',
    domain: 'MESSENGER', linkTitle: 'Get your free appetiser', linkSub: 'Offer ends Sunday',
    button: 'Send message',
    photo: photos.pizza,
    objective: 'Cold traffic · 3 mi radius',
  },
  {
    id: 'mama-rosa',
    page: 'Mama Rosa Italian Kitchen', handle: 'Sponsored',
    copy: [
      'Buy one meal, get one free — of equal or lesser value.',
      'Tap below and we’ll send the offer over. Come hungry.',
      '312 Halsted St, Chicago, IL 60607',
    ],
    overlay: 'Buy 1 get 1', overlaySub: 'Dine-in only',
    domain: 'MESSENGER', linkTitle: 'Get your BOGO meal', linkSub: 'Ends 31 January',
    button: 'Sign up',
    photo: photos.paella,
    objective: 'Midweek fill · Tue–Thu delivery',
  },
  {
    id: 'sunset-bites',
    page: 'Sunset Bites Café', handle: 'Sponsored',
    copy: [
      'Limited time: use code SUNSET20 at checkout for 20% off your online order.',
      'Build it however you like — we’ve seen every combination at this point.',
      'Online orders placed through our own site only.',
    ],
    overlay: '20% off online', overlaySub: 'Code SUNSET20',
    domain: 'SUNSETBITESCAFE.COM', linkTitle: 'Order direct and save', linkSub: 'No delivery-app commission',
    button: 'Order now',
    photo: photos.burger,
    objective: 'Direct ordering · past customers',
  },
  {
    id: 'greenleaf',
    page: 'GreenLeaf Eatery', handle: 'Sponsored',
    copy: [
      'Birthday this week? Your bowl is on the house.',
      'Tell us which day, claim the coupon, bring it in. Valid any day this week.',
    ],
    overlay: 'Free birthday bowl', overlaySub: 'This week only',
    domain: 'GREENLEAFEATERY.COM', linkTitle: 'Claim your birthday meal', linkSub: 'One per guest',
    button: 'Get offer',
    photo: photos.bowl,
    objective: 'Birthday audience · 5 mi radius',
  },
];

/* ── Services ───────────────────────────────────────────────────────── */

export const services = [
  {
    id: 'reviews',
    marker: 'Reviews',
    title: 'Get the rating up. Keep it up.',
    lede:
      'A restaurant with 40 reviews and a 4.6 beats one with 11 reviews and a 4.9, every time. ' +
      'We build a steady flow of real reviews from people who actually ate with you, and we answer every one of them within a day.',
    points: [
      'Every guest asked once, timed to the visit',
      'Replies written and posted for you, good and bad',
      'Fake reviews reported and disputed',
      'Rating and count tracked weekly',
    ],
  },
  {
    id: 'profile',
    marker: 'Google profile',
    title: 'Own the map pack.',
    lede:
      'Most of your walk-ins come from a map, not a website. We rebuild the profile properly — categories, ' +
      'attributes, hours including holidays, menu, ordering links, and photographs that do not look like they were taken on a flip phone.',
    points: [
      'Categories and attributes set for how people actually search',
      'Menu, ordering and reservation links wired in',
      'Photos shot or sourced and captioned',
      'Calls, direction requests and clicks tracked',
    ],
  },
  {
    id: 'email',
    marker: 'Email & SMS',
    title: 'Ask once, at the right moment.',
    lede:
      'The ask goes out a few hours after the meal, while it still tastes like something. ' +
      'Branded to your restaurant, not to us. One message, one button, no guilt trip.',
    points: [
      'Designed to your brand, sent from your address',
      'Timed to the visit, never to a Tuesday blast',
      'Unhappy guests routed to you privately first',
      'Runs off your POS, booking system or a QR code',
    ],
  },
  {
    id: 'ads',
    marker: 'Meta ads',
    title: 'Fill Tuesday.',
    lede:
      'Facebook and Instagram ads aimed at people within a few miles who have not been in yet, ' +
      'built around an offer worth walking for. We write it, shoot it, run it, and tell you what it cost per guest.',
    points: [
      'Offer, copy and creative built for your menu',
      'Radius, day and daypart targeting',
      'Messenger and voucher flows that actually redeem',
      'Cost per redeemed voucher reported, not impressions',
    ],
  },
  {
    id: 'website',
    marker: 'Site & ordering',
    title: 'Stop renting your customers.',
    lede:
      'Delivery apps take a third of the ticket and keep the customer’s email. ' +
      'We build the site, the menu and the direct ordering flow, then point every ad and every profile link at it.',
    points: [
      'Menu, ordering and table booking on your own domain',
      'Commission-free direct orders',
      'Guest list stays yours, feeds the review engine',
      'Live example: Saffron & Ember',
    ],
    href: '/demo/restaurants/',
    hrefLabel: 'Open the demo restaurant',
  },
];

/* ── Process ────────────────────────────────────────────────────────── */

export const process = [
  {
    step: '01', title: 'Teardown',
    body:
      'We pull your profile, your reviews, your photos and the four restaurants nearest you, ' +
      'and show you exactly where you lose the click. Twenty minutes, no charge, no deck.',
  },
  {
    step: '02', title: 'Rebuild',
    body:
      'Profile, categories, hours, menu, ordering links, photography and tracking. ' +
      'This is the week where the listing stops working against you.',
  },
  {
    step: '03', title: 'Collect',
    body:
      'The review engine goes live. Every guest gets one ask a few hours after they eat. ' +
      'Unhappy ones reach you first, privately, before they reach Google.',
  },
  {
    step: '04', title: 'Advertise',
    body:
      'Once the rating holds, we start putting offers in front of people nearby who have never been in. ' +
      'Advertising a 2.8 is throwing money away, which is why this step is fourth and not first.',
  },
  {
    step: '05', title: 'Report',
    body:
      'One page, every Monday: rating, review count, calls, direction requests, ' +
      'direct orders, and what the ads cost per guest through the door.',
  },
];

/* ── Pricing ────────────────────────────────────────────────────────── */

export const plans = [
  {
    name: 'Listing',
    tag: 'One location',
    price: 'From £X / mo',
    note: 'Month to month',
    blurb: 'For a restaurant whose food is fine and whose search result is not.',
    includes: [
      'Google Business Profile rebuild',
      'Review engine — email or SMS',
      'All reviews answered within 24 hours',
      'Photo refresh, twice a year',
      'Monday report',
    ],
    cta: 'Start here',
    featured: false,
  },
  {
    name: 'Full plate',
    tag: 'One location',
    price: 'From £X / mo',
    note: 'Month to month, ad spend separate',
    blurb: 'Everything above, plus we go and get people who have never eaten with you.',
    includes: [
      'Everything in Listing',
      'Meta ads — written, shot, run and reported',
      'Offer and voucher flows',
      'Website, menu and direct ordering',
      'Seasonal campaigns and holiday hours',
      'Monthly call with the person doing the work',
    ],
    cta: 'Most restaurants start here',
    featured: true,
  },
  {
    name: 'Group',
    tag: 'Two or more',
    price: 'Quoted',
    note: 'Per location, tapering',
    blurb: 'For small groups where one bad location drags the rating on all of them.',
    includes: [
      'Everything in Full plate, per site',
      'Locations compared side by side',
      'Brand-level review policy and reply tone',
      'Franchise and multi-menu handling',
      'One report covering the whole group',
    ],
    cta: 'Talk to us',
    featured: false,
  },
];

/* ── FAQ ────────────────────────────────────────────────────────────── */

export const faqs = [
  {
    q: 'Can you get me reviews?',
    a: 'Real ones, from people who ate at your restaurant — yes, that is the whole service. Bought or fabricated reviews, no. Google catches them, strips them, and can suspend the profile, which costs you far more than the reviews were ever worth. Any agency offering you a bundle of reviews for a flat fee is selling you a risk.',
  },
  {
    q: 'How fast does the rating actually move?',
    a: 'It depends almost entirely on how many reviews you already have. A restaurant sitting on 11 reviews moves quickly, because each new one carries weight. One sitting on 400 barely moves at all, and the goal there becomes volume and recency instead. We tell you which of the two you are in the teardown, before you pay anything.',
  },
  {
    q: 'What if we get a bad review?',
    a: 'You will. Every restaurant does. We answer it within a day, in your voice, without arguing — a well-handled one-star does more for you than a wall of unanswered five-stars. Where the review breaks Google policy, we file the dispute.',
  },
  {
    q: 'Do you work with anyone other than restaurants?',
    a: 'No. Cafés, bars, takeaways and food trucks, yes. Everything else, no. The timing of a review request, the way a menu is indexed, the offers that get somebody to drive fifteen minutes on a Tuesday — none of that transfers from another industry, and pretending it does is how agencies end up mediocre at eleven things.',
  },
  {
    q: 'Do we need to change our POS or booking system?',
    a: 'No. We read from whatever you already run. If you take bookings on paper, we can start with a QR code at the table and a receipt line, and it still works.',
  },
  {
    q: 'Who owns the profile, the site and the guest list?',
    a: 'You do, all three, from day one. We work inside your accounts, not ours. If you leave, nothing gets switched off and nothing gets held hostage.',
  },
  {
    q: 'Is there a contract?',
    a: 'Month to month after the first ninety days. The first ninety exist because the rebuild takes a few weeks and the review flow needs time to compound — leaving before that means paying for the setup and none of the effect.',
  },
  {
    q: 'What do you need from us?',
    a: 'Access to the Google profile, a menu, and someone who will reply to a message once a week. We will ask for a table for two hours if we are shooting photos.',
  },
];

/* ── Contact ────────────────────────────────────────────────────────── */

export const contact = {
  email: 'restaurantorderlift@gmail.com',
  phone: '(+91) 63939 74340',
  formspree: 'https://formspree.io/f/xgvlkaar',
  venueTypes: [
    'Restaurant', 'Café', 'Bar or pub', 'Takeaway or QSR',
    'Food truck', 'Small group (2+ sites)',
  ],
};
