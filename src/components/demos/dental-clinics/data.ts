// Lumina Dental — mock data (no network calls)

export const brand = {
  name: 'Lumina Dental',
  tagline: 'Calm, modern dentistry you can trust',
  phone: '(415) 555-0192',
  email: 'hello@luminadental.com',
  address: '288 Bayview Ave, Suite 4, San Francisco, CA',
  hours: [
    { day: 'Mon – Thu', time: '8:00 AM – 6:00 PM' },
    { day: 'Friday', time: '8:00 AM – 4:00 PM' },
    { day: 'Saturday', time: '9:00 AM – 2:00 PM' },
    { day: 'Sunday', time: 'Closed' },
  ],
};

export const navLinks = [
  { name: 'Home', href: '/demo/dental-clinics/' },
  { name: 'Treatments', href: '/demo/dental-clinics/treatments' },
  { name: 'Our Dentists', href: '/demo/dental-clinics/dentists' },
  { name: 'FAQ', href: '/demo/dental-clinics/faq' },
  { name: 'Book', href: '/demo/dental-clinics/book' },
];

export type Treatment = {
  id: string;
  name: string;
  category: string;
  icon: string; // lucide name handled in component map
  blurb: string;
  priceFrom: number;
  priceTo: number;
  duration: string;
};

export const treatments: Treatment[] = [
  {
    id: 'cleaning',
    name: 'Professional Cleaning & Checkup',
    category: 'Preventive',
    icon: 'sparkles',
    blurb: 'Gentle scale, polish and a full oral health exam to keep things healthy.',
    priceFrom: 89,
    priceTo: 140,
    duration: '45 min',
  },
  {
    id: 'whitening',
    name: 'Teeth Whitening',
    category: 'Cosmetic',
    icon: 'sun',
    blurb: 'In-chair professional whitening for a brighter smile in a single visit.',
    priceFrom: 299,
    priceTo: 450,
    duration: '60 min',
  },
  {
    id: 'filling',
    name: 'Tooth-Colored Filling',
    category: 'Restorative',
    icon: 'shield',
    blurb: 'Discreet composite fillings that blend naturally with your tooth.',
    priceFrom: 150,
    priceTo: 320,
    duration: '40 min',
  },
  {
    id: 'implant',
    name: 'Dental Implant',
    category: 'Restorative',
    icon: 'anchor',
    blurb: 'A permanent, natural-feeling replacement for a missing tooth.',
    priceFrom: 1800,
    priceTo: 3200,
    duration: '90 min',
  },
  {
    id: 'ortho',
    name: 'Clear Aligners (Ortho)',
    category: 'Orthodontics',
    icon: 'align-center',
    blurb: 'Nearly invisible aligners to straighten teeth on your schedule.',
    priceFrom: 2400,
    priceTo: 4500,
    duration: 'Consult',
  },
  {
    id: 'rootcanal',
    name: 'Root Canal Therapy',
    category: 'Restorative',
    icon: 'activity',
    blurb: 'Comfortable, modern endodontic care to save a damaged tooth.',
    priceFrom: 700,
    priceTo: 1300,
    duration: '75 min',
  },
];

export type Dentist = {
  id: string;
  name: string;
  role: string;
  initials: string;
  accent: string; // tailwind gradient classes
  bio: string;
  focus: string[];
  years: number;
};

export const dentists: Dentist[] = [
  {
    id: 'dr-okafor',
    name: 'Dr. Amara Okafor',
    role: 'Lead Dentist & Founder',
    initials: 'AO',
    accent: 'from-teal-400 to-emerald-500',
    bio: 'Amara founded Lumina to make dentistry feel calm and unhurried. She has a gentle touch and a love for cosmetic work.',
    focus: ['Cosmetic', 'Whitening', 'Veneers'],
    years: 14,
  },
  {
    id: 'dr-lindqvist',
    name: 'Dr. Erik Lindqvist',
    role: 'Implant & Restorative Specialist',
    initials: 'EL',
    accent: 'from-sky-400 to-cyan-500',
    bio: 'Erik handles our most complex restorative cases. Patients describe his implant work as life-changing.',
    focus: ['Implants', 'Crowns', 'Root Canals'],
    years: 18,
  },
  {
    id: 'dr-mehta',
    name: 'Dr. Priya Mehta',
    role: 'Orthodontist',
    initials: 'PM',
    accent: 'from-violet-400 to-fuchsia-500',
    bio: 'Priya designs clear-aligner journeys that fit busy lives. She loves seeing the first reveal of a finished smile.',
    focus: ['Clear Aligners', 'Braces', 'Bite Correction'],
    years: 11,
  },
  {
    id: 'dr-reyes',
    name: 'Dr. Marco Reyes',
    role: 'Family & Preventive Dentist',
    initials: 'MR',
    accent: 'from-amber-400 to-orange-500',
    bio: 'Marco is wonderful with nervous patients and kids. He believes the best dentistry prevents problems before they start.',
    focus: ['Preventive', 'Kids', 'Fillings'],
    years: 9,
  },
];

export const testimonials = [
  {
    name: 'Jordan P.',
    text: 'I used to dread the dentist. Lumina actually felt calming — soft lighting, no rush, and zero pain. Booked online in two minutes.',
    rating: 5,
  },
  {
    name: 'Sandra L.',
    text: 'Dr. Lindqvist replaced a tooth I lost years ago. It looks and feels completely real. Incredible work.',
    rating: 5,
  },
  {
    name: 'Wei C.',
    text: 'My clear aligners are almost done and the team checked in the whole way. Best dental experience I have had.',
    rating: 5,
  },
];

export const stats = [
  { label: 'Happy patients', value: '12,000+' },
  { label: 'Avg. rating', value: '4.9 / 5' },
  { label: 'Years caring', value: '14' },
  { label: 'Same-week slots', value: '92%' },
];

export const faqs = [
  {
    q: 'Do you accept my insurance?',
    a: 'We accept most major PPO plans including Delta Dental, Cigna, MetLife, Aetna and Guardian. We are happy to check your coverage and give you an estimate before any treatment — just ask at booking.',
    tags: ['insurance', 'coverage', 'cost', 'price', 'cover', 'pay', 'payment'],
  },
  {
    q: 'Will it hurt?',
    a: 'Comfort is our priority. We use gentle numbing, modern low-vibration tools, and offer pro-numbing gel and sedation options for anxious patients. Most cleanings and fillings are completely pain-free.',
    tags: ['pain', 'hurt', 'painful', 'anxious', 'nervous', 'scared', 'sedation', 'numb'],
  },
  {
    q: 'How should I prepare for my appointment?',
    a: 'Just brush as usual and bring your insurance card and a list of any medications. For a first visit, arrive 10 minutes early to complete a short health form. No need to fast.',
    tags: ['prepare', 'prep', 'first visit', 'before', 'ready', 'fast', 'eat'],
  },
  {
    q: 'What are your opening hours?',
    a: 'We are open Mon–Thu 8am–6pm, Friday 8am–4pm, and Saturday 9am–2pm. We are closed Sundays. Online booking is available 24/7.',
    tags: ['hours', 'open', 'time', 'when', 'weekend', 'saturday', 'sunday', 'close'],
  },
  {
    q: 'Do you take emergencies?',
    a: 'Yes. We reserve same-day emergency slots every weekday for things like severe pain, swelling, or a knocked-out tooth. Call us at (415) 555-0192 and we will fit you in.',
    tags: ['emergency', 'urgent', 'broken', 'knocked', 'swelling', 'bleeding', 'now', 'today'],
  },
  {
    q: 'How often should I get a checkup?',
    a: 'For most healthy adults we recommend a cleaning and checkup every 6 months. We will personalize this based on your gum health and history.',
    tags: ['often', 'how often', 'frequency', 'checkup', 'cleaning', 'visit'],
  },
  {
    q: 'Do you treat children?',
    a: 'Absolutely! Dr. Marco Reyes loves working with kids and makes early visits fun and stress-free. We recommend a first visit by age one or when the first tooth appears.',
    tags: ['child', 'children', 'kid', 'kids', 'baby', 'family', 'pediatric'],
  },
];

// Chatbot keyword responses (client-side only)
export const chatbotGreeting =
  "Hi! I'm Lumi, your Lumina Dental assistant. Ask me about insurance, pain, prep, hours, emergencies, or pricing — or tap a suggestion below.";

export const chatSuggestions = [
  'Do you take my insurance?',
  'Will it hurt?',
  'What are your hours?',
  'Do you take emergencies?',
];

export function matchChatReply(input: string): string {
  const text = input.toLowerCase();
  for (const f of faqs) {
    if (f.tags.some((t) => text.includes(t))) {
      return f.a;
    }
  }
  if (text.includes('book') || text.includes('appointment') || text.includes('schedule')) {
    return 'You can book online in under 2 minutes — pick a treatment, dentist, and time on our Book page. Want me to point you there?';
  }
  if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
    return "Hello! 😊 How can I help with your dental care today?";
  }
  if (text.includes('thank')) {
    return "You're very welcome! Anything else I can help with?";
  }
  return "Great question! For specifics like that, our front desk can help at (415) 555-0192, or you can book a quick consult online. You can also ask me about insurance, pain, prep, hours, or emergencies.";
}

export const timeSlots = ['8:00', '9:30', '11:00', '1:00', '2:30', '4:00'];
