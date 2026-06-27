// Mock data for Verdant Physio & Health Clinic demo
// Brand: Verdant — "Move well. Live well."

export const brand = {
  name: 'Verdant',
  tagline: 'Move well. Live well.',
  phone: '(415) 555-0192',
  email: 'hello@verdantphysio.com',
  address: '218 Cedarbrook Ave, Suite 4, Bayfield',
  hours: [
    { day: 'Mon – Thu', time: '7:30am – 7:00pm' },
    { day: 'Friday', time: '7:30am – 5:00pm' },
    { day: 'Saturday', time: '9:00am – 1:00pm' },
    { day: 'Sunday', time: 'Closed' },
  ],
};

export type Treatment = {
  id: string;
  name: string;
  category: 'Rehab' | 'Sports' | 'Massage' | 'Wellness';
  blurb: string;
  duration: string;
  price: number;
  icon: string; // lucide icon name handled in component
};

export const treatments: Treatment[] = [
  {
    id: 'sports-injury',
    name: 'Sports Injury Assessment',
    category: 'Sports',
    blurb: 'A thorough biomechanical assessment to diagnose the root cause and build a return-to-play plan.',
    duration: '60 min',
    price: 120,
    icon: 'Activity',
  },
  {
    id: 'post-op-rehab',
    name: 'Post-Operative Rehab',
    category: 'Rehab',
    blurb: 'Guided recovery after surgery — restoring strength, range of motion and confidence at your pace.',
    duration: '50 min',
    price: 110,
    icon: 'HeartPulse',
  },
  {
    id: 'manual-therapy',
    name: 'Manual Therapy',
    category: 'Rehab',
    blurb: 'Hands-on joint mobilisation and soft-tissue work to relieve pain and restore movement.',
    duration: '45 min',
    price: 95,
    icon: 'Hand',
  },
  {
    id: 'sports-massage',
    name: 'Deep Tissue Sports Massage',
    category: 'Massage',
    blurb: 'Targeted massage to release tension, speed recovery and keep you performing at your best.',
    duration: '60 min',
    price: 90,
    icon: 'Waves',
  },
  {
    id: 'dry-needling',
    name: 'Dry Needling',
    category: 'Sports',
    blurb: 'Fine-needle therapy to release stubborn trigger points and chronic muscle tightness.',
    duration: '30 min',
    price: 70,
    icon: 'Syringe',
  },
  {
    id: 'pilates',
    name: 'Clinical Pilates (1:1)',
    category: 'Wellness',
    blurb: 'Personalised, low-impact strengthening focused on core stability and posture.',
    duration: '50 min',
    price: 85,
    icon: 'Flower2',
  },
  {
    id: 'back-neck',
    name: 'Back & Neck Pain Program',
    category: 'Rehab',
    blurb: 'A structured program to ease persistent back and neck pain and prevent it returning.',
    duration: '50 min',
    price: 100,
    icon: 'PersonStanding',
  },
  {
    id: 'wellness-massage',
    name: 'Relaxation Massage',
    category: 'Massage',
    blurb: 'A calming full-body massage to reduce stress and ease everyday muscle tension.',
    duration: '60 min',
    price: 80,
    icon: 'Leaf',
  },
];

export type Practitioner = {
  id: string;
  name: string;
  role: string;
  credentials: string;
  specialties: string[];
  bio: string;
  initials: string;
  hue: string; // tailwind gradient classes
};

export const practitioners: Practitioner[] = [
  {
    id: 'dr-amara',
    name: 'Dr. Amara Singh',
    role: 'Clinical Director & Physiotherapist',
    credentials: 'DPT, OCS',
    specialties: ['Post-Op Rehab', 'Manual Therapy', 'Back & Neck'],
    bio: 'With 14 years in orthopaedic rehab, Amara founded Verdant on a simple belief: recovery should feel reassuring, not rushed.',
    initials: 'AS',
    hue: 'from-emerald-400 to-teal-500',
  },
  {
    id: 'liam',
    name: 'Liam O’Connor',
    role: 'Sports Physiotherapist',
    credentials: 'MSc Sports Physio',
    specialties: ['Sports Injury', 'Dry Needling', 'Return-to-Play'],
    bio: 'Former pro rugby physio. Liam loves getting athletes — weekend warriors included — back to doing what they love.',
    initials: 'LO',
    hue: 'from-teal-400 to-cyan-500',
  },
  {
    id: 'mei',
    name: 'Mei Tanaka',
    role: 'Massage & Clinical Pilates',
    credentials: 'RMT, Pilates Cert.',
    specialties: ['Sports Massage', 'Pilates', 'Relaxation'],
    bio: 'Mei blends therapeutic massage with movement coaching to help you feel strong, mobile and calm.',
    initials: 'MT',
    hue: 'from-lime-400 to-emerald-500',
  },
  {
    id: 'noah',
    name: 'Noah Williams',
    role: 'Rehab Physiotherapist',
    credentials: 'DPT',
    specialties: ['Post-Op Rehab', 'Knee & Shoulder', 'Strength'],
    bio: 'Patient and methodical, Noah is the calm voice that guides you through every milestone of recovery.',
    initials: 'NW',
    hue: 'from-green-400 to-teal-500',
  },
];

// Symptom-to-treatment guidance picker data
export type GuidanceOption = {
  id: string;
  label: string;
  emoji: string;
  recommends: string[]; // treatment ids
  message: string;
};

export const guidanceOptions: GuidanceOption[] = [
  {
    id: 'sports',
    label: 'Pain from sport or exercise',
    emoji: '🏃',
    recommends: ['sports-injury', 'dry-needling', 'sports-massage'],
    message: 'Sounds like a sports-related strain. A Sports Injury Assessment will pinpoint the cause and get you a clear return-to-play plan.',
  },
  {
    id: 'surgery',
    label: 'Recovering after surgery',
    emoji: '🩹',
    recommends: ['post-op-rehab', 'manual-therapy'],
    message: 'Post-surgery recovery is a journey. Our Post-Operative Rehab program rebuilds strength and confidence safely, at your pace.',
  },
  {
    id: 'backneck',
    label: 'Ongoing back or neck pain',
    emoji: '🪑',
    recommends: ['back-neck', 'manual-therapy', 'pilates'],
    message: 'Persistent back and neck pain often responds beautifully to our structured program combined with hands-on manual therapy.',
  },
  {
    id: 'stress',
    label: 'Tension, stress or stiffness',
    emoji: '🌿',
    recommends: ['wellness-massage', 'sports-massage', 'pilates'],
    message: 'When everyday tension builds up, a therapeutic massage and gentle movement can do wonders for body and mind.',
  },
  {
    id: 'posture',
    label: 'Posture & core weakness',
    emoji: '🧘',
    recommends: ['pilates', 'back-neck'],
    message: 'Building core stability is the foundation of pain-free movement. Clinical Pilates is a great place to start.',
  },
];

export const timeSlots = [
  '8:00am', '9:00am', '10:00am', '11:30am',
  '1:00pm', '2:30pm', '4:00pm', '5:30pm',
];

export const testimonials = [
  {
    quote: 'After my ACL surgery I was terrified I’d never run again. Noah’s plan got me back on the trail in 6 months. I cannot thank Verdant enough.',
    name: 'Priya R.',
    detail: 'Post-op knee rehab',
  },
  {
    quote: 'Liam found the actual cause of my shoulder pain in one visit when two other clinics just guessed. Genuinely brilliant.',
    name: 'Marcus T.',
    detail: 'Sports injury',
  },
  {
    quote: 'The team is so warm and reassuring. I always leave feeling lighter — and stronger. The Pilates sessions changed my back for good.',
    name: 'Helen D.',
    detail: 'Clinical Pilates',
  },
];

export const faqs = [
  {
    q: 'What should I wear to my appointment?',
    a: 'Comfortable, loose clothing you can move in is ideal — think gym wear. For lower-limb assessments, shorts are helpful. We have private changing space if you need it.',
  },
  {
    q: 'Do I need a doctor’s referral?',
    a: 'No referral is needed to see us directly. However, if you’re claiming through certain insurers or compensation schemes, a referral may be required — we’re happy to advise.',
  },
  {
    q: 'What happens in my first session?',
    a: 'Your first visit is a full assessment: we listen to your history, examine your movement, explain what’s going on in plain language, and agree a treatment plan together. You’ll usually start treatment the same day.',
  },
  {
    q: 'How many sessions will I need?',
    a: 'Every body is different. Many people feel noticeably better within 3–4 sessions, but we’ll give you a realistic estimate after your first assessment — no endless open-ended plans.',
  },
  {
    q: 'Do you accept insurance?',
    a: 'Yes, we work with most major health insurers and can provide detailed receipts for reimbursement. Please bring your policy details to your first visit.',
  },
  {
    q: 'What are your opening hours?',
    a: 'We’re open Mon–Thu 7:30am–7:00pm, Friday until 5:00pm, and Saturday mornings 9:00am–1:00pm. We’re closed Sundays.',
  },
];

// Keyword-matched canned replies for the AI patient-FAQ chatbot
export type BotRule = { keywords: string[]; reply: string };

export const botRules: BotRule[] = [
  {
    keywords: ['hour', 'open', 'close', 'time', 'when'],
    reply: 'We’re open Mon–Thu 7:30am–7:00pm, Fri until 5:00pm, and Sat 9:00am–1:00pm. Closed Sundays. Want me to help you book a slot?',
  },
  {
    keywords: ['wear', 'clothes', 'clothing', 'bring', 'prepare', 'prep'],
    reply: 'Please wear comfortable, loose clothing you can move in (gym wear is perfect). Bring any relevant scans or insurance details. Arrive 5 mins early for your first visit.',
  },
  {
    keywords: ['price', 'cost', 'fee', 'how much', 'expensive'],
    reply: 'Sessions range from $70 (Dry Needling) to $120 (Sports Injury Assessment). You can see the full list on our Treatments page.',
  },
  {
    keywords: ['referral', 'doctor', 'gp'],
    reply: 'No doctor’s referral is needed to book with us directly! A referral is only sometimes required for certain insurance claims.',
  },
  {
    keywords: ['insurance', 'insurer', 'claim', 'reimburse'],
    reply: 'Yes — we work with most major health insurers and provide detailed receipts for reimbursement. Bring your policy details to your first visit.',
  },
  {
    keywords: ['first', 'expect', 'session', 'visit', 'appointment'],
    reply: 'Your first visit is a full assessment: we listen, examine your movement, explain things clearly, and agree a plan together. You’ll usually begin treatment the same day.',
  },
  {
    keywords: ['book', 'schedule', 'appointment', 'reserve'],
    reply: 'Lovely! Head to our Book page to pick a treatment, practitioner and time — it takes under a minute. Shall I point you there?',
  },
  {
    keywords: ['back', 'neck', 'spine'],
    reply: 'Our Back & Neck Pain Program combines hands-on manual therapy with a structured plan to ease pain and prevent it returning. Try our Symptom Finder on the home page too!',
  },
  {
    keywords: ['sport', 'running', 'injury', 'athlete', 'knee', 'shoulder'],
    reply: 'For sports injuries, Liam (our sports physio) runs a 60-min assessment to find the root cause and build a return-to-play plan. Want to book with him?',
  },
  {
    keywords: ['massage', 'relax', 'stress', 'tension'],
    reply: 'We offer both Deep Tissue Sports Massage and a calming Relaxation Massage. Both are great for easing tension and speeding recovery.',
  },
  {
    keywords: ['park', 'parking', 'location', 'address', 'where'],
    reply: 'You’ll find us at 218 Cedarbrook Ave, Suite 4, Bayfield. Free patient parking is available right out front.',
  },
];

export const botGreeting = 'Hi! I’m Sprout 🌱, Verdant’s care assistant. Ask me about hours, prices, what to bring, or booking — I’m here to help!';

export const botSuggestions = [
  'What should I wear?',
  'What are your hours?',
  'How much does it cost?',
  'Do I need a referral?',
];

export function matchBotReply(input: string): string {
  const text = input.toLowerCase();
  for (const rule of botRules) {
    if (rule.keywords.some((k) => text.includes(k))) return rule.reply;
  }
  return 'Great question! For specifics like that it’s best to call us on (415) 555-0192 or book a free 10-min phone consult. Anything else I can help with — hours, prices or what to bring?';
}
