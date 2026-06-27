// Maple & Mist — boutique B&B mock data (all client-side, no network)

export type Room = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  maxGuests: number;
  beds: string;
  size: string;
  view: 'Mountain' | 'Garden' | 'Lake';
  category: 'Room' | 'Suite' | 'Cabin';
  amenities: string[];
  gradient: string; // tailwind gradient classes for the "photo"
  emoji: string;
  popular?: boolean;
};

export const rooms: Room[] = [
  {
    id: 'maple-loft',
    name: 'The Maple Loft',
    tagline: 'Sun-drenched eaves with a private reading nook',
    price: 189,
    maxGuests: 2,
    beds: '1 Queen',
    size: '320 ft²',
    view: 'Garden',
    category: 'Room',
    amenities: ['Fireplace', 'Free Wi-Fi', 'Rainfall shower', 'Breakfast included', 'Smart TV'],
    gradient: 'from-amber-300 via-orange-400 to-rose-400',
    emoji: '🍁',
    popular: true,
  },
  {
    id: 'mist-suite',
    name: 'Mist Valley Suite',
    tagline: 'Floor-to-ceiling windows over the morning fog',
    price: 289,
    maxGuests: 3,
    beds: '1 King + Sofa bed',
    size: '540 ft²',
    view: 'Mountain',
    category: 'Suite',
    amenities: ['Soaking tub', 'Private balcony', 'Fireplace', 'Espresso bar', 'Breakfast included', 'Robes & slippers'],
    gradient: 'from-emerald-300 via-teal-500 to-cyan-600',
    emoji: '🌄',
    popular: true,
  },
  {
    id: 'cedar-cabin',
    name: 'Cedar Hollow Cabin',
    tagline: 'A standalone hideaway among the pines',
    price: 349,
    maxGuests: 4,
    beds: '1 King + 2 Twin',
    size: '720 ft²',
    view: 'Lake',
    category: 'Cabin',
    amenities: ['Wood stove', 'Full kitchenette', 'Private deck', 'Hot tub', 'Pet friendly', 'Lake access'],
    gradient: 'from-lime-300 via-green-600 to-emerald-800',
    emoji: '🌲',
  },
  {
    id: 'willow-room',
    name: 'Willow Garden Room',
    tagline: 'Open straight onto the herb garden patio',
    price: 159,
    maxGuests: 2,
    beds: '1 Queen',
    size: '280 ft²',
    view: 'Garden',
    category: 'Room',
    amenities: ['Garden patio', 'Free Wi-Fi', 'Breakfast included', 'Smart TV', 'Tea station'],
    gradient: 'from-rose-200 via-pink-300 to-fuchsia-400',
    emoji: '🌿',
  },
  {
    id: 'summit-suite',
    name: 'Summit Panorama Suite',
    tagline: 'Our crown jewel — 270° ridge-line views',
    price: 419,
    maxGuests: 4,
    beds: '1 King + 1 Queen',
    size: '860 ft²',
    view: 'Mountain',
    category: 'Suite',
    amenities: ['Private hot tub', 'Wraparound balcony', 'Fireplace', 'Wet bar', 'Breakfast included', 'Telescope'],
    gradient: 'from-indigo-300 via-violet-500 to-purple-700',
    emoji: '⛰️',
    popular: true,
  },
  {
    id: 'lakeside-nook',
    name: 'Lakeside Nook',
    tagline: 'Wake to loons calling across the water',
    price: 209,
    maxGuests: 2,
    beds: '1 Queen',
    size: '340 ft²',
    view: 'Lake',
    category: 'Room',
    amenities: ['Lake view', 'Free Wi-Fi', 'Rainfall shower', 'Breakfast included', 'Canoe included'],
    gradient: 'from-sky-300 via-blue-500 to-indigo-600',
    emoji: '🛶',
  },
];

export const amenities = [
  { icon: 'Coffee', title: 'Farm Breakfast', text: 'A daily spread of local eggs, fresh pastries, and our famous maple granola — included with every stay.' },
  { icon: 'Flame', title: 'Wood-Fired Sauna', text: 'Unwind after a hike in our cedar barrel sauna overlooking the valley.' },
  { icon: 'Wifi', title: 'Fibre Wi-Fi', text: 'Fast, free, blanket coverage across every room and the garden.' },
  { icon: 'Dog', title: 'Pet Friendly', text: 'Well-behaved four-legged guests are welcome in select cabins.' },
  { icon: 'Bike', title: 'Trail Gear', text: 'Complimentary e-bikes, snowshoes, and canoes depending on the season.' },
  { icon: 'Wine', title: 'Evening Social', text: 'Join us at 6pm for local wine, cheese, and stories by the great-room hearth.' },
  { icon: 'Sparkles', title: 'Spa Treatments', text: 'In-room massage and a forest-bathing guide bookable on request.' },
  { icon: 'Car', title: 'Free Parking', text: 'On-site parking plus EV charging, no reservation needed.' },
];

export const localGuide = [
  {
    category: 'Outdoors',
    emoji: '🥾',
    items: [
      { name: 'Misty Ridge Loop', detail: '6.4 mi · moderate · 2 min drive', desc: 'Our favourite sunrise trail — ridgeline views and a hidden waterfall.' },
      { name: 'Loon Lake Paddle', detail: 'Lakefront · easy', desc: 'Borrow a hotel canoe and glide out before the morning mist lifts.' },
    ],
  },
  {
    category: 'Eat & Drink',
    emoji: '🍽️',
    items: [
      { name: 'The Copper Kettle', detail: 'Farm-to-table · 5 min', desc: 'Seasonal tasting menu; ask us to reserve the window table.' },
      { name: 'Hollow Brew Co.', detail: 'Craft taproom · 8 min', desc: 'Small-batch ales and a wood-fired pizza oven on the patio.' },
    ],
  },
  {
    category: 'Culture',
    emoji: '🎨',
    items: [
      { name: 'Valley Makers Market', detail: 'Saturdays · town square', desc: 'Local potters, weavers, and the best cider doughnuts around.' },
      { name: 'Old Mill Gallery', detail: 'Arts · 10 min', desc: 'Rotating exhibits from regional landscape painters.' },
    ],
  },
];

export const testimonials = [
  { name: 'Hannah & Ravi', stay: 'Mist Valley Suite', text: 'We came for a weekend and left planning our anniversary here every year. The breakfast alone is worth the drive.', rating: 5 },
  { name: 'Marcus T.', stay: 'Cedar Hollow Cabin', text: 'Hot tub under the stars, a fire crackling inside, and our dog snoring on the deck. Pure peace.', rating: 5 },
  { name: 'Eleni P.', stay: 'Summit Panorama Suite', text: 'The view genuinely stopped me in my tracks. Staff remembered our names and our coffee order by day two.', rating: 5 },
];

export const hours = {
  checkIn: '3:00 PM',
  checkOut: '11:00 AM',
  frontDesk: '7:00 AM – 10:00 PM',
  breakfast: '7:30 AM – 10:00 AM',
};

export const contact = {
  brand: 'Maple & Mist',
  phone: '(555) 274-6300',
  email: 'stay@mapleandmist.com',
  address: '42 Hollow Ridge Road, Aldergrove Valley',
};

// Simulated availability: deterministic per-date pseudo "sold out" rooms
export function unavailableRoomIds(checkIn: string): string[] {
  if (!checkIn) return [];
  // hash the date string to pseudo-randomly mark 0-2 rooms unavailable
  let h = 0;
  for (let i = 0; i < checkIn.length; i++) h = (h * 31 + checkIn.charCodeAt(i)) >>> 0;
  const pool = rooms.map((r) => r.id);
  const out: string[] = [];
  const count = h % 3; // 0,1,2
  for (let i = 0; i < count; i++) out.push(pool[(h + i * 7) % pool.length]);
  return Array.from(new Set(out));
}

// AI Concierge keyword responses
export const conciergeReplies: { keywords: string[]; reply: string }[] = [
  { keywords: ['check in', 'check-in', 'checkin', 'arrive', 'arrival'], reply: `Check-in opens at ${hours.checkIn}. Early arrival? Drop your bags with us any time after 11 AM and explore the valley while we ready your room.` },
  { keywords: ['check out', 'check-out', 'checkout', 'leave', 'departure'], reply: `Check-out is at ${hours.checkOut}. Need a later departure? Just ask the front desk — we can often extend until 1 PM.` },
  { keywords: ['breakfast', 'food', 'eat', 'morning'], reply: `A farm breakfast is included with every stay, served ${hours.breakfast} in the great room — local eggs, fresh pastries, and our signature maple granola.` },
  { keywords: ['pet', 'dog', 'cat', 'animal'], reply: 'We love four-legged guests! Cedar Hollow Cabin and a few select rooms are pet friendly. There is a small cleaning fee of $35 per stay.' },
  { keywords: ['wifi', 'wi-fi', 'internet'], reply: 'Fast fibre Wi-Fi is free across every room and the garden — perfect for a remote-work getaway.' },
  { keywords: ['parking', 'car', 'ev', 'charge'], reply: 'Free on-site parking is included, and we have two EV chargers by the barn — no reservation needed.' },
  { keywords: ['hike', 'trail', 'walk', 'outdoor', 'hiking'], reply: 'The Misty Ridge Loop (6.4 mi) is our staff favourite for sunrise. We also lend e-bikes, snowshoes, and canoes depending on the season!' },
  { keywords: ['restaurant', 'dinner', 'drink', 'bar', 'wine'], reply: 'For dinner, The Copper Kettle is a 5-minute drive (ask us to reserve the window table). Join our free 6 PM wine & cheese social by the hearth too.' },
  { keywords: ['spa', 'massage', 'sauna'], reply: 'Our wood-fired cedar sauna is open to all guests. In-room massages and a forest-bathing guide can be booked at the front desk.' },
  { keywords: ['price', 'cost', 'rate', 'how much'], reply: 'Rooms start at $159/night and our suites & cabins range up to $419. Every rate includes breakfast. Use the Book Now page to check live dates!' },
  { keywords: ['book', 'reserve', 'availability', 'reservation'], reply: 'You can check availability and book directly on our Book Now page — booking direct gets you 10% off and free late checkout. No fees, ever.' },
  { keywords: ['cancel', 'refund', 'policy'], reply: 'Free cancellation up to 48 hours before arrival. After that, the first night is non-refundable.' },
  { keywords: ['hello', 'hi', 'hey'], reply: 'Hello, and welcome to Maple & Mist! I am your virtual concierge. Ask me about rooms, breakfast, check-in, pets, or things to do in the valley.' },
];

export function getConciergeReply(input: string): string {
  const text = input.toLowerCase();
  for (const r of conciergeReplies) {
    if (r.keywords.some((k) => text.includes(k))) return r.reply;
  }
  return "I'm not quite sure about that one — but our front desk would love to help at (555) 274-6300. Meanwhile, ask me about rooms, breakfast, check-in, pets, parking, or local trails!";
}
