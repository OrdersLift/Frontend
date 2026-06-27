// ===== Ironclad Auto Works — mock data =====

export const brand = {
  name: 'Ironclad Auto Works',
  short: 'Ironclad',
  tagline: 'Built to last. Fixed to perfection.',
  phone: '(0161) 555-0147',
  email: 'service@ironcladauto.co',
  address: 'Unit 7, Forge Industrial Estate, Manchester M40 2JX',
  hours: [
    { day: 'Mon – Fri', time: '7:30 — 18:00' },
    { day: 'Saturday', time: '8:00 — 14:00' },
    { day: 'Sunday', time: 'Closed' },
  ],
  founded: 2009,
  stats: [
    { label: 'Vehicles serviced', value: '42,000+' },
    { label: 'Master techs', value: '11' },
    { label: 'Years on the road', value: '15' },
    { label: 'Avg. review', value: '4.9★' },
  ],
};

export interface ServiceItem {
  id: string;
  name: string;
  desc: string;
  price: number;        // base estimate in GBP
  unit?: string;
  duration: string;     // labour time
  icon: string;         // lucide icon name
  category: 'Essentials' | 'Repairs' | 'Tyres & Wheels' | 'Diagnostics';
  popular?: boolean;
}

export const services: ServiceItem[] = [
  {
    id: 'mot',
    name: 'MOT Test',
    desc: 'Full DVSA-standard MOT inspection. Same-day certificate, free retest within 10 days.',
    price: 45,
    duration: '45 min',
    icon: 'ClipboardCheck',
    category: 'Essentials',
    popular: true,
  },
  {
    id: 'interim-service',
    name: 'Interim Service',
    desc: 'Oil & filter change plus a 32-point safety check. Recommended every 6 months / 6k miles.',
    price: 99,
    duration: '1.5 hrs',
    icon: 'Droplet',
    category: 'Essentials',
  },
  {
    id: 'full-service',
    name: 'Full Service',
    desc: 'Comprehensive 65-point service: oil, all filters, fluids, brakes & full report.',
    price: 189,
    duration: '3 hrs',
    icon: 'Wrench',
    category: 'Essentials',
    popular: true,
  },
  {
    id: 'brakes',
    name: 'Brake Pads & Discs',
    desc: 'Replace worn pads and discs with OEM-grade parts. Per axle, including bedding-in.',
    price: 159,
    unit: 'per axle',
    duration: '2 hrs',
    icon: 'Disc',
    category: 'Repairs',
  },
  {
    id: 'clutch',
    name: 'Clutch Replacement',
    desc: 'Full clutch kit fitting with flywheel inspection. Most makes & models.',
    price: 540,
    duration: '5 hrs',
    icon: 'Cog',
    category: 'Repairs',
  },
  {
    id: 'timing-belt',
    name: 'Timing Belt / Cambelt',
    desc: 'Belt + tensioner kit replacement. Critical at manufacturer intervals.',
    price: 320,
    duration: '4 hrs',
    icon: 'RotateCw',
    category: 'Repairs',
  },
  {
    id: 'battery',
    name: 'Battery Fit & Test',
    desc: 'Supply and fit a heavy-duty battery, plus charging-system health check.',
    price: 110,
    duration: '30 min',
    icon: 'BatteryCharging',
    category: 'Repairs',
  },
  {
    id: 'tyres',
    name: 'Tyre Replacement',
    desc: 'Premium & mid-range tyres fitted, balanced and disposed of. Price per tyre.',
    price: 85,
    unit: 'per tyre',
    duration: '20 min',
    icon: 'CircleDot',
    category: 'Tyres & Wheels',
    popular: true,
  },
  {
    id: 'alignment',
    name: '4-Wheel Alignment',
    desc: 'Laser-guided geometry correction. Saves your tyres and your fuel.',
    price: 65,
    duration: '1 hr',
    icon: 'Crosshair',
    category: 'Tyres & Wheels',
  },
  {
    id: 'aircon',
    name: 'Air-Con Regas',
    desc: 'Recharge, leak test and anti-bacterial clean. Cool again in under an hour.',
    price: 75,
    duration: '1 hr',
    icon: 'Snowflake',
    category: 'Diagnostics',
  },
  {
    id: 'diagnostics',
    name: 'Engine Diagnostics',
    desc: 'Plug-in fault-code read with our master scan tool + written diagnosis.',
    price: 49,
    duration: '1 hr',
    icon: 'Gauge',
    category: 'Diagnostics',
  },
  {
    id: 'ev-health',
    name: 'EV / Hybrid Health Check',
    desc: 'Battery state-of-health report, high-voltage safety check and software scan.',
    price: 89,
    duration: '1.5 hrs',
    icon: 'Zap',
    category: 'Diagnostics',
  },
];

export const vehicleSizes = [
  { id: 'small', label: 'Small / City (e.g. Fiesta, Polo)', mult: 1.0 },
  { id: 'medium', label: 'Medium / Hatch (e.g. Golf, Focus)', mult: 1.15 },
  { id: 'large', label: 'Large / Estate (e.g. Passat, 5-Series)', mult: 1.35 },
  { id: 'suv', label: 'SUV / 4x4 (e.g. X5, Tiguan)', mult: 1.55 },
  { id: 'van', label: 'Van / Commercial (e.g. Transit)', mult: 1.7 },
];

export const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];

export const timeSlots = [
  '08:00', '09:30', '11:00', '13:00', '14:30', '16:00',
];

// ===== Mock job-tracking tickets =====
export interface JobStage {
  label: string;
  done: boolean;
  note?: string;
  time?: string;
}
export interface Ticket {
  ref: string;
  vehicle: string;
  reg: string;
  service: string;
  tech: string;
  bay: number;
  estReady: string;
  statusLabel: string;
  progress: number; // 0-100
  cost: number;
  stages: JobStage[];
}

export const tickets: Ticket[] = [
  {
    ref: 'IRN-4821',
    vehicle: '2019 Volkswagen Golf 1.5 TSI',
    reg: 'MA19 KLP',
    service: 'Full Service + Brake Discs (front)',
    tech: 'Danny R.',
    bay: 3,
    estReady: 'Today, 16:30',
    statusLabel: 'In the workshop',
    progress: 62,
    cost: 348,
    stages: [
      { label: 'Booked in', done: true, time: '08:05', note: 'Keys received, courtesy car offered.' },
      { label: 'Inspection complete', done: true, time: '09:20', note: 'Front discs scored — replacement approved by customer.' },
      { label: 'Work in progress', done: true, time: '11:40', note: 'Service done. Fitting front discs & pads.' },
      { label: 'Quality / road test', done: false },
      { label: 'Ready for collection', done: false },
    ],
  },
  {
    ref: 'IRN-4799',
    vehicle: '2021 Ford Transit Custom',
    reg: 'BV71 ZTR',
    service: 'MOT + Cambelt Replacement',
    tech: 'Priya S.',
    bay: 1,
    estReady: 'Tomorrow, 10:00',
    statusLabel: 'Awaiting parts',
    progress: 35,
    cost: 412,
    stages: [
      { label: 'Booked in', done: true, time: 'Yesterday 14:10' },
      { label: 'Inspection complete', done: true, time: 'Today 08:30', note: 'MOT passed. Cambelt kit ordered.' },
      { label: 'Awaiting parts', done: false, note: 'Genuine kit ETA tomorrow 08:00.' },
      { label: 'Work in progress', done: false },
      { label: 'Ready for collection', done: false },
    ],
  },
  {
    ref: 'IRN-4750',
    vehicle: '2017 BMW 320d M Sport',
    reg: 'LD17 OWN',
    service: 'Engine Diagnostics + Air-Con Regas',
    tech: 'Marcus T.',
    bay: 4,
    estReady: 'Ready now',
    statusLabel: 'Ready for collection',
    progress: 100,
    cost: 124,
    stages: [
      { label: 'Booked in', done: true, time: '08:00' },
      { label: 'Inspection complete', done: true, time: '08:45', note: 'Fault code P0299 — boost leak cleared.' },
      { label: 'Work in progress', done: true, time: '10:15' },
      { label: 'Quality / road test', done: true, time: '11:30', note: 'All systems nominal. A/C blowing cold.' },
      { label: 'Ready for collection', done: true, time: '11:45', note: 'Invoice sent. Collect any time before 18:00.' },
    ],
  },
];

export const testimonials = [
  {
    name: 'Sarah Whitmore',
    car: 'Audi A3 owner',
    quote:
      'Honest pricing and the live job tracker is genius — I knew exactly when my car was ready without chasing anyone.',
    rating: 5,
  },
  {
    name: 'Tom Beckett',
    car: 'Transit fleet manager',
    quote:
      'We run six vans through Ironclad. Never been let down, and the quotes are spot-on every time. No surprise bills.',
    rating: 5,
  },
  {
    name: 'Aisha Khan',
    car: 'Nissan Qashqai owner',
    quote:
      'Booked an MOT online in two minutes, got a courtesy car, and the report explained everything in plain English.',
    rating: 5,
  },
];

export const guarantees = [
  { icon: 'ShieldCheck', title: '12-Month Warranty', text: 'Every repair backed by a nationwide parts & labour guarantee.' },
  { icon: 'BadgePoundSterling', title: 'No Surprise Bills', text: 'We call for approval before any work beyond the quote.' },
  { icon: 'Car', title: 'Free Courtesy Cars', text: 'Stay mobile while we work — subject to availability.' },
  { icon: 'Award', title: 'Master Technicians', text: 'IMI-accredited techs across all makes, petrol, diesel & EV.' },
];

// ===== Chatbot canned answers =====
export interface ChatRule {
  keywords: string[];
  answer: string;
}
export const chatGreeting =
  "Hi, I'm Sparky 🔧 — the Ironclad service desk assistant. Ask me about MOTs, prices, bookings, or tracking your repair.";

export const chatRules: ChatRule[] = [
  {
    keywords: ['mot', 'test', 'certificate'],
    answer:
      'An MOT with us is £45 and takes around 45 minutes. If it fails, your retest within 10 days is free. Want me to point you to the booking page? → /demo/auto-garages/quote',
  },
  {
    keywords: ['price', 'cost', 'how much', 'quote', 'estimate'],
    answer:
      'You can get an instant tailored estimate using our Quote Builder — pick your services and vehicle size and we calculate it live. Head to /demo/auto-garages/quote.',
  },
  {
    keywords: ['book', 'booking', 'appointment', 'slot'],
    answer:
      'Bookings take about 2 minutes on our Quote & Book page. Choose a date and one of our slots (08:00–16:00). → /demo/auto-garages/quote',
  },
  {
    keywords: ['track', 'status', 'ready', 'progress', 'reference', 'ticket'],
    answer:
      'Pop your reference number (e.g. IRN-4821) into the Job Tracker to see live progress, your assigned tech and the estimated ready time. → /demo/auto-garages/track',
  },
  {
    keywords: ['hours', 'open', 'time', 'when'],
    answer:
      "We're open Mon–Fri 7:30–18:00, Saturday 8:00–14:00, and closed Sundays.",
  },
  {
    keywords: ['where', 'location', 'address', 'find'],
    answer:
      'You can find us at Unit 7, Forge Industrial Estate, Manchester M40 2JX. Plenty of free parking and a comfy waiting lounge.',
  },
  {
    keywords: ['brake', 'brakes', 'pads', 'discs'],
    answer:
      'Brake pads & discs start at £159 per axle with OEM-grade parts, fitted in about 2 hours. Add it to your quote for an exact figure.',
  },
  {
    keywords: ['tyre', 'tire', 'wheel', 'alignment'],
    answer:
      'Tyres are fitted, balanced and disposed of from £85 each, and a 4-wheel laser alignment is £65. We stock premium and mid-range brands.',
  },
  {
    keywords: ['ev', 'electric', 'hybrid', 'battery'],
    answer:
      'Yes — our techs are EV/Hybrid trained. A high-voltage health check is £89 and includes a battery state-of-health report.',
  },
  {
    keywords: ['courtesy', 'loan', 'car', 'lift'],
    answer:
      'We offer free courtesy cars (subject to availability) so you stay mobile while we work. Just ask when you book.',
  },
  {
    keywords: ['warranty', 'guarantee'],
    answer:
      'Every repair is covered by our 12-month nationwide parts & labour warranty. Drive away with total peace of mind.',
  },
  {
    keywords: ['human', 'person', 'call', 'phone', 'speak'],
    answer:
      "Of course — call our team on (0161) 555-0147 or email service@ironcladauto.co and a real human will be straight with you.",
  },
];

export const chatSuggestions = [
  'How much is an MOT?',
  'Track my repair',
  'Do you fix EVs?',
  'What are your hours?',
];
