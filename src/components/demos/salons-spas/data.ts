// Lumière Salon & Spa — mock data (no network calls)

export const brand = {
  name: 'Lumière',
  tagline: 'Salon & Spa',
  phone: '(415) 555-0192',
  email: 'hello@lumiere-spa.com',
  address: '218 Maiden Lane, San Francisco, CA 94108',
  hours: [
    { day: 'Mon – Tue', time: '10:00 – 19:00' },
    { day: 'Wed – Fri', time: '09:00 – 21:00' },
    { day: 'Saturday', time: '09:00 – 20:00' },
    { day: 'Sunday', time: '11:00 – 17:00' },
  ],
};

export type ServiceCategory = {
  id: string;
  name: string;
  blurb: string;
  icon: string; // emoji
  items: { name: string; duration: number; price: number; desc: string }[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'hair',
    name: 'Hair',
    blurb: 'Precision cuts, dimensional colour and luxe treatments.',
    icon: '✂️',
    items: [
      { name: 'Signature Cut & Style', duration: 60, price: 95, desc: 'Consultation, shampoo, precision cut and a finished blow-dry.' },
      { name: 'Balayage & Gloss', duration: 180, price: 285, desc: 'Hand-painted dimension with a shine-boosting gloss.' },
      { name: 'Full Highlights', duration: 150, price: 220, desc: 'Foil highlights crown to ends with a toner finish.' },
      { name: 'Keratin Smoothing', duration: 150, price: 260, desc: 'Frizz-free, glassy smooth hair for up to 12 weeks.' },
      { name: 'Luxe Blow-Out', duration: 45, price: 65, desc: 'Volumised, glossy styling for any occasion.' },
    ],
  },
  {
    id: 'nails',
    name: 'Nails',
    blurb: 'Spa manicures and pedicures with lasting, glossy finishes.',
    icon: '💅',
    items: [
      { name: 'Lumière Spa Manicure', duration: 50, price: 55, desc: 'Soak, shape, cuticle care, massage and polish.' },
      { name: 'Gel Manicure', duration: 60, price: 70, desc: 'Chip-resistant gel that lasts up to three weeks.' },
      { name: 'Hot-Stone Pedicure', duration: 70, price: 85, desc: 'Exfoliation, masque and warm-stone massage.' },
      { name: 'Nail Art (per nail)', duration: 10, price: 8, desc: 'Hand-painted detail by our nail artists.' },
    ],
  },
  {
    id: 'spa',
    name: 'Spa & Skin',
    blurb: 'Restorative facials, massage and full-body rituals.',
    icon: '🌿',
    items: [
      { name: 'Radiance Facial', duration: 60, price: 130, desc: 'Deep-cleanse, exfoliation and a brightening masque.' },
      { name: 'Deep-Tissue Massage', duration: 60, price: 140, desc: 'Targeted pressure to release tension and knots.' },
      { name: 'Hot-Stone Ritual', duration: 90, price: 185, desc: 'Warm basalt stones melt away stress, head to toe.' },
      { name: 'Lumière Glow Ritual', duration: 120, price: 245, desc: 'Body scrub, wrap and scalp massage — our signature.' },
    ],
  },
  {
    id: 'makeup',
    name: 'Makeup & Brows',
    blurb: 'Event-ready glam and tailored brow artistry.',
    icon: '✨',
    items: [
      { name: 'Event Makeup', duration: 60, price: 110, desc: 'Camera-ready makeup tailored to your look.' },
      { name: 'Brow Shape & Tint', duration: 30, price: 45, desc: 'Sculpted, defined brows with a custom tint.' },
      { name: 'Lash Lift', duration: 45, price: 95, desc: 'Lifted, curled lashes that last for weeks.' },
    ],
  },
];

export const stylists = [
  {
    id: 'amara',
    name: 'Amara Vance',
    role: 'Creative Director · Colour',
    specialties: ['Balayage', 'Lived-in Colour', 'Editorial'],
    bio: 'Fifteen years behind the chair, with work featured in two national editorials. Amara lives for soft, sunlit dimension.',
    rating: 4.9,
    reviews: 412,
    initials: 'AV',
    gradient: 'from-rose-300 to-amber-200',
  },
  {
    id: 'theo',
    name: 'Théo Marchand',
    role: 'Senior Stylist · Cutting',
    specialties: ['Precision Cuts', 'Curly Hair', 'Men’s Grooming'],
    bio: 'Paris-trained and obsessed with shape. Théo builds cuts that fall back into place no matter how you wake up.',
    rating: 4.8,
    reviews: 305,
    initials: 'TM',
    gradient: 'from-stone-300 to-rose-200',
  },
  {
    id: 'sofia',
    name: 'Sofia Reyes',
    role: 'Lead Esthetician',
    specialties: ['Facials', 'Skin Therapy', 'Brow Artistry'],
    bio: 'A licensed esthetician who treats skin like a long-term relationship. Calm hands, glowing results.',
    rating: 5.0,
    reviews: 268,
    initials: 'SR',
    gradient: 'from-emerald-200 to-teal-200',
  },
  {
    id: 'noor',
    name: 'Noor Haddad',
    role: 'Nail Artist & Massage',
    specialties: ['Gel Art', 'Spa Pedicures', 'Hot-Stone'],
    bio: 'Detail-driven and endlessly patient. Noor’s nail art has a quiet cult following across the city.',
    rating: 4.9,
    reviews: 197,
    initials: 'NH',
    gradient: 'from-fuchsia-200 to-rose-200',
  },
];

export const galleryItems = [
  { id: 1, title: 'Sunlit Balayage', tag: 'Hair', gradient: 'from-amber-200 via-rose-200 to-orange-200' },
  { id: 2, title: 'Soft Glam', tag: 'Makeup', gradient: 'from-rose-200 via-pink-200 to-fuchsia-200' },
  { id: 3, title: 'Almond Gel Set', tag: 'Nails', gradient: 'from-stone-200 via-rose-100 to-amber-100' },
  { id: 4, title: 'Glass Skin Facial', tag: 'Spa', gradient: 'from-emerald-100 via-teal-100 to-cyan-100' },
  { id: 5, title: 'Bridal Updo', tag: 'Hair', gradient: 'from-rose-100 via-amber-100 to-stone-200' },
  { id: 6, title: 'Sculpted Brows', tag: 'Brows', gradient: 'from-stone-300 via-rose-200 to-amber-200' },
];

export const testimonials = [
  { name: 'Priya N.', text: 'The Glow Ritual genuinely reset my whole week. I floated out of there.', rating: 5, service: 'Spa' },
  { name: 'Daniel K.', text: 'Théo gave me the first haircut I’ve actually loved in years. Booking again already.', rating: 5, service: 'Hair' },
  { name: 'Mariana L.', text: 'Amara’s balayage is unreal — three months later and it still looks fresh.', rating: 5, service: 'Colour' },
  { name: 'Grace W.', text: 'Soft lighting, kind people, perfect nails. My new monthly ritual.', rating: 5, service: 'Nails' },
];

export const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:30 PM',
  '2:00 PM', '3:30 PM', '5:00 PM', '6:30 PM',
];

// Loyalty tiers
export const loyaltyTiers = [
  { name: 'Petal', min: 0, perk: 'Birthday blow-out on us' },
  { name: 'Bloom', min: 300, perk: '10% off every service' },
  { name: 'Radiance', min: 800, perk: 'Priority booking + free monthly add-on' },
];

// Chatbot canned responses (keyword matched, fully client-side)
export const chatReplies: { keywords: string[]; reply: string }[] = [
  { keywords: ['hour', 'open', 'close', 'time'], reply: 'We’re open Mon–Tue 10–7, Wed–Fri 9–9, Sat 9–8 and Sun 11–5. Want me to find the next open slot?' },
  { keywords: ['book', 'appointment', 'reserve', 'schedule'], reply: 'Lovely! Head to our Book page to pick a service, stylist and time — confirmation is instant. Shall I tell you who’s available today?' },
  { keywords: ['price', 'cost', 'how much', 'pricing'], reply: 'Cuts start at $95, spa facials at $130, and gel manicures at $70. The full menu lives on our Services page. Anything specific?' },
  { keywords: ['balayage', 'colour', 'color', 'highlight'], reply: 'Amara is our colour director — balayage with gloss runs $285 over about 3 hours and includes a free toner refresh in 6 weeks.' },
  { keywords: ['facial', 'skin', 'spa', 'massage'], reply: 'Our Radiance Facial ($130) and signature Glow Ritual ($245) are guest favourites. Sofia would take wonderful care of you.' },
  { keywords: ['stylist', 'who', 'recommend'], reply: 'We have four artists — Amara (colour), Théo (cutting), Sofia (skin) and Noor (nails). Tell me what you’re after and I’ll match you!' },
  { keywords: ['park', 'parking', 'location', 'address', 'where'], reply: 'You’ll find us at 218 Maiden Lane, San Francisco. Validated parking is two doors down at the Union Square garage.' },
  { keywords: ['loyalty', 'points', 'reward', 'member'], reply: 'Every dollar earns a Lumière point. Reach 300 for 10% off everything, and 800 unlocks priority booking. You can track points on our Home page widget!' },
  { keywords: ['cancel', 'reschedule', 'change'], reply: 'No problem — cancellations are free up to 24 hours before. Just reply here or call (415) 555-0192 and we’ll sort it.' },
  { keywords: ['hi', 'hello', 'hey'], reply: 'Hi there, welcome to Lumière! I’m Lux, your booking assistant. Ask me about services, stylists, prices or availability ✨' },
];

export function matchReply(input: string): string {
  const lower = input.toLowerCase();
  for (const r of chatReplies) {
    if (r.keywords.some((k) => lower.includes(k))) return r.reply;
  }
  return 'Great question! I can help with services, pricing, stylists, hours and bookings. You can also call us at (415) 555-0192 or use the Book page for instant confirmation 💫';
}
