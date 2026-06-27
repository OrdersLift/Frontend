// Aurelia Estates — mock data (no network calls)

export type PropertyType = 'House' | 'Apartment' | 'Villa' | 'Penthouse' | 'Townhouse';
export type Listing = {
  id: string;
  title: string;
  address: string;
  city: string;
  price: number;
  beds: number;
  baths: number;
  area: number; // sqft
  type: PropertyType;
  status: 'For Sale' | 'New' | 'Reduced';
  gradient: string; // tailwind gradient classes for placeholder
  tags: string[];
  lat: string;
  description: string;
  features: string[];
};

export const listings: Listing[] = [
  {
    id: 'aur-101',
    title: 'Thornbury Glass House',
    address: '14 Marlowe Crescent',
    city: 'Hampstead',
    price: 4250000,
    beds: 5,
    baths: 4,
    area: 4120,
    type: 'House',
    status: 'New',
    gradient: 'from-emerald-700 via-emerald-600 to-teal-500',
    tags: ['Garden', 'Smart Home', 'Garage'],
    lat: 'NW3',
    description:
      'A sculptural new-build wrapped in floor-to-ceiling glass, framing a mature private garden. Designed by award-winning studio Halden & Roe for clients who want light, calm and serious entertaining space.',
    features: ['Heated infinity pool', 'Wine cellar (600 bottles)', 'Home cinema', 'Underfloor heating', 'EV charging', 'Landscaped 0.4 acre plot'],
  },
  {
    id: 'aur-102',
    title: 'The Meridian Penthouse',
    address: '1 Sovereign Quay, Floor 32',
    city: 'Canary Wharf',
    price: 6900000,
    beds: 3,
    baths: 3,
    area: 2980,
    type: 'Penthouse',
    status: 'For Sale',
    gradient: 'from-slate-800 via-slate-700 to-emerald-800',
    tags: ['River View', 'Concierge', 'Terrace'],
    lat: 'E14',
    description:
      'Occupying the entire 32nd floor, this penthouse delivers 270° river panoramas, a wraparound terrace and a private lift lobby. The interior was conceived as a gallery for living.',
    features: ['Private lift access', '24h concierge', 'Wraparound terrace', 'Floor-to-ceiling glazing', 'Residents spa & gym', 'Secure parking x2'],
  },
  {
    id: 'aur-103',
    title: 'Cassia Villa',
    address: 'Olive Grove Lane',
    city: 'Richmond Hill',
    price: 3150000,
    beds: 4,
    baths: 3,
    area: 3400,
    type: 'Villa',
    status: 'Reduced',
    gradient: 'from-amber-600 via-orange-500 to-rose-500',
    tags: ['Pool', 'Garden', 'South-facing'],
    lat: 'TW10',
    description:
      'A Mediterranean-inspired villa set behind gated walls, with terracotta terraces, an olive courtyard and a sun-trap pool. Warm, generous and made for long summers.',
    features: ['Outdoor kitchen', 'Olive courtyard', 'Pool house', 'Solar array', 'Triple garage', 'Gated entrance'],
  },
  {
    id: 'aur-104',
    title: 'Belgrave Mansion Flat',
    address: '8 Eaton Terrace',
    city: 'Belgravia',
    price: 5400000,
    beds: 3,
    baths: 2,
    area: 2240,
    type: 'Apartment',
    status: 'For Sale',
    gradient: 'from-emerald-900 via-emerald-800 to-slate-700',
    tags: ['Period', 'High Ceilings', 'Porter'],
    lat: 'SW1',
    description:
      'A lateral apartment within a stuccoed Belgravia terrace, retaining original cornicing and marble fireplaces while quietly modernised throughout. Garden square access included.',
    features: ['Garden square key', 'Period fireplaces', '3.6m ceilings', 'Resident porter', 'Lift access', 'Cellar storage'],
  },
  {
    id: 'aur-105',
    title: 'Juniper Townhouse',
    address: '22 Wren Street',
    city: 'Clerkenwell',
    price: 1980000,
    beds: 3,
    baths: 2,
    area: 1860,
    type: 'Townhouse',
    status: 'New',
    gradient: 'from-teal-600 via-cyan-600 to-sky-500',
    tags: ['Roof Terrace', 'Studio', 'Quiet St'],
    lat: 'EC1',
    description:
      'A converted Victorian warehouse townhouse arranged over four floors, with a top-floor studio and a planted roof terrace overlooking the rooftops of Clerkenwell.',
    features: ['Planted roof terrace', 'Top-floor studio', 'Exposed brick', 'Bike store', 'Smart lighting', 'Quiet conservation street'],
  },
  {
    id: 'aur-106',
    title: 'The Garden Apartment',
    address: '5 Holland Park Mews',
    city: 'Holland Park',
    price: 2650000,
    beds: 2,
    baths: 2,
    area: 1490,
    type: 'Apartment',
    status: 'For Sale',
    gradient: 'from-lime-600 via-emerald-500 to-green-600',
    tags: ['Private Garden', 'Mews', 'Bright'],
    lat: 'W11',
    description:
      'A tranquil ground- and lower-floor apartment opening directly onto a 60ft private garden, tucked within a cobbled Holland Park mews. A rare pocket of stillness.',
    features: ['60ft private garden', 'Cobbled mews', 'Double reception', 'Bespoke kitchen', 'Off-street parking', 'Storage vault'],
  },
  {
    id: 'aur-107',
    title: 'Saffron Hill Loft',
    address: '40 Saffron Hill',
    city: 'Farringdon',
    price: 1320000,
    beds: 2,
    baths: 1,
    area: 1180,
    type: 'Apartment',
    status: 'Reduced',
    gradient: 'from-fuchsia-600 via-purple-600 to-indigo-600',
    tags: ['Loft', 'Open Plan', 'Crossrail'],
    lat: 'EC1',
    description:
      'A double-height warehouse loft with steel mezzanine, polished concrete floors and oversized industrial windows. Minutes from the Elizabeth line.',
    features: ['Double-height ceilings', 'Steel mezzanine', 'Polished concrete', 'Crossrail 4 min walk', 'Secure entry', 'Bike storage'],
  },
  {
    id: 'aur-108',
    title: 'Wisteria Cottage',
    address: 'Church Lane, Barnes',
    city: 'Barnes',
    price: 2390000,
    beds: 4,
    baths: 3,
    area: 2510,
    type: 'House',
    status: 'For Sale',
    gradient: 'from-rose-500 via-pink-500 to-purple-500',
    tags: ['Family', 'Garden', 'Near Common'],
    lat: 'SW13',
    description:
      'A double-fronted family home a short stroll from Barnes Common, with a deep west-facing garden, a generous kitchen-diner and excellent local schooling on the doorstep.',
    features: ['West-facing garden', 'Eat-in kitchen', 'Utility & boot room', 'Catchment schools', 'Side return extension', 'Cellar'],
  },
];

export const propertyTypes: ('All' | PropertyType)[] = ['All', 'House', 'Apartment', 'Villa', 'Penthouse', 'Townhouse'];

export const testimonials = [
  {
    name: 'Eleanor & James Whitfield',
    role: 'Sold in Hampstead',
    quote: 'Aurelia found us a buyer in eleven days at 6% over guide. Discreet, calm, and genuinely brilliant negotiators.',
    initials: 'EW',
  },
  {
    name: 'Dr. Priya Anand',
    role: 'Purchased in Belgravia',
    quote: 'They understood exactly the kind of home we wanted before we did. The whole process felt effortless and private.',
    initials: 'PA',
  },
  {
    name: 'Marcus Lindqvist',
    role: 'Relocated from Stockholm',
    quote: 'Relocating internationally is stressful — Aurelia handled everything from viewings to legal handover. Five stars.',
    initials: 'ML',
  },
];

export const stats = [
  { label: 'Sold last year', value: '£480M+' },
  { label: 'Avg. days to offer', value: '23' },
  { label: 'Of guide achieved', value: '99.2%' },
  { label: 'Client referrals', value: '74%' },
];

export const team = [
  { name: 'Sophie Carrington', role: 'Founding Partner', initials: 'SC', area: 'Prime Central' },
  { name: 'Daniel Osei', role: 'Head of Sales', initials: 'DO', area: 'New Homes' },
  { name: 'Yuki Tanaka', role: 'Lettings Director', initials: 'YT', area: 'Riverside' },
  { name: 'Rebecca Hall', role: 'Valuations Lead', initials: 'RH', area: 'Country & Village' },
];

export const offices = [
  { area: 'Mayfair HQ', address: '18 Berkeley Street, W1J', phone: '+44 20 7946 0123' },
  { area: 'Richmond', address: '4 The Quadrant, TW9', phone: '+44 20 7946 0456' },
];

export const hours = [
  { day: 'Mon – Fri', time: '8:30 – 19:00' },
  { day: 'Saturday', time: '9:00 – 17:00' },
  { day: 'Sunday', time: 'By appointment' },
];

// ---- Instant valuation model (purely client-side) ----
export const areaMultipliers: Record<string, number> = {
  Belgravia: 1850,
  Mayfair: 1900,
  Hampstead: 1150,
  'Holland Park': 1300,
  'Canary Wharf': 980,
  Richmond: 820,
  Clerkenwell: 1050,
  Barnes: 760,
  Farringdon: 1100,
  Other: 700,
};

export const valuationAreas = Object.keys(areaMultipliers);

export const conditionFactor: Record<string, number> = {
  'Needs work': 0.86,
  'Good': 1.0,
  'Excellent': 1.12,
  'Newly renovated': 1.2,
};

export function estimateValue(input: {
  area: string;
  sqft: number;
  beds: number;
  condition: string;
  propertyType: PropertyType | 'House';
}): { low: number; mid: number; high: number } {
  const base = (areaMultipliers[input.area] ?? areaMultipliers.Other) * input.sqft;
  const bedUplift = 1 + Math.max(0, input.beds - 2) * 0.04;
  const cond = conditionFactor[input.condition] ?? 1;
  const typeFactor: Record<string, number> = {
    Penthouse: 1.25,
    Villa: 1.15,
    House: 1.08,
    Townhouse: 1.05,
    Apartment: 1.0,
  };
  const mid = base * bedUplift * cond * (typeFactor[input.propertyType] ?? 1);
  return {
    low: Math.round((mid * 0.93) / 1000) * 1000,
    mid: Math.round(mid / 1000) * 1000,
    high: Math.round((mid * 1.08) / 1000) * 1000,
  };
}

export const formatPrice = (n: number) =>
  '£' + n.toLocaleString('en-GB', { maximumFractionDigits: 0 });

export const formatShort = (n: number) => {
  if (n >= 1_000_000) return '£' + (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 2) + 'M';
  if (n >= 1000) return '£' + Math.round(n / 1000) + 'K';
  return '£' + n;
};

// ---- AI chatbot canned replies (keyword matched) ----
export const chatbotIntro =
  "Hello, I'm Auri — Aurelia's property concierge. Ask me about listings, viewings, valuations, or our fees.";

export const chatbotReplies: { keywords: string[]; reply: string }[] = [
  { keywords: ['hello', 'hi', 'hey'], reply: 'Hello! Lovely to meet you. Are you looking to buy, sell, or arrange a valuation today?' },
  { keywords: ['valuation', 'worth', 'value', 'estimate', 'price my'], reply: 'You can get an instant indicative valuation on our Valuation page — it takes about 30 seconds. For a formal in-person appraisal, I can book one of our valuers to visit you.' },
  { keywords: ['viewing', 'visit', 'see', 'tour', 'book'], reply: 'Of course — head to "Book a Viewing" and pick a date that suits you. We offer in-person and private video viewings 7 days a week.' },
  { keywords: ['fee', 'commission', 'cost', 'charge'], reply: 'Our sales fee is a transparent 1.2% (inc. VAT) on completion, with no upfront costs. Lettings management starts at 9%.' },
  { keywords: ['penthouse', 'apartment', 'flat'], reply: 'We have several apartments and the Meridian Penthouse currently available — browse them all on the Listings page with our filters.' },
  { keywords: ['house', 'villa', 'family'], reply: 'For houses and family homes, try filtering Listings by "House" or "Villa" — Wisteria Cottage and Thornbury Glass House are favourites right now.' },
  { keywords: ['budget', 'cheap', 'affordable', 'lowest'], reply: 'Our current entry point is Saffron Hill Loft at £1.32M. Set a max price on the Listings filter to see everything in range.' },
  { keywords: ['area', 'location', 'where', 'belgravia', 'hampstead'], reply: 'We specialise in prime central and riverside locations — Mayfair, Belgravia, Hampstead, Richmond and Holland Park among them.' },
  { keywords: ['contact', 'phone', 'call', 'email', 'office'], reply: 'Our Mayfair HQ is at 18 Berkeley Street, W1J — call +44 20 7946 0123. The Book a Viewing form is the fastest way to reach a person.' },
  { keywords: ['mortgage', 'finance', 'loan'], reply: 'We partner with independent advisers who can arrange competitive mortgage and bridging finance — mention it on your viewing request and we will connect you.' },
  { keywords: ['thank', 'thanks', 'cheers'], reply: 'My pleasure. Anything else I can help with before you go?' },
];

export function matchReply(input: string): string {
  const t = input.toLowerCase();
  for (const r of chatbotReplies) {
    if (r.keywords.some((k) => t.includes(k))) return r.reply;
  }
  return "I'm not certain on that one — but our team will be. Pop your question into the Book a Viewing form, or ask me about listings, viewings, valuations or fees.";
}
