// ===== PULSE FORGE — mocked data =====

export const brand = {
  name: 'PULSE FORGE',
  tagline: 'Train Loud. Live Strong.',
  phone: '(415) 555-0192',
  email: 'sweat@pulseforge.fit',
  address: '88 Ironworks Ave, San Francisco, CA',
  hours: [
    { day: 'Mon – Fri', time: '5:00 AM – 11:00 PM' },
    { day: 'Saturday', time: '6:00 AM – 9:00 PM' },
    { day: 'Sunday', time: '7:00 AM – 8:00 PM' },
  ],
};

export const stats = [
  { label: 'Members Forged', value: '4,200+' },
  { label: 'Classes / Week', value: '120' },
  { label: 'Elite Coaches', value: '18' },
  { label: 'Avg. Rating', value: '4.9★' },
];

export const whyUs = [
  {
    icon: 'Flame',
    title: 'Built For Intensity',
    text: 'High-output zones, sled tracks, and 4,000 lbs of free weights. No fluff, just gains.',
  },
  {
    icon: 'HeartPulse',
    title: 'Coaching That Sticks',
    text: 'Every member gets a tailored plan and a coach who actually knows your name.',
  },
  {
    icon: 'Users',
    title: 'A Tribe, Not a Gym',
    text: 'Pack runs, lift nights and a community that drags you off the couch.',
  },
  {
    icon: 'Activity',
    title: 'Recovery Built In',
    text: 'Cold plunge, sauna, and mobility studio so you bounce back harder.',
  },
];

export const results = [
  { name: 'Jordan M.', metric: '-34 lbs', text: 'Dropped two pant sizes in 14 weeks. The coaches kept me honest.', emoji: '🔥' },
  { name: 'Priya S.', metric: '+45 lb squat', text: 'Went from never lifting to a bodyweight squat. Wild.', emoji: '🏋️' },
  { name: 'Andre W.', metric: 'First 10K', text: 'Endurance classes got me across my first race finish line.', emoji: '🏃' },
];

export interface ClassSlot {
  id: string;
  name: string;
  day: string;
  time: string;
  coach: string;
  duration: string;
  intensity: 'Low' | 'Medium' | 'High' | 'Brutal';
  spots: number;
  capacity: number;
  tag: string;
}

export const schedule: ClassSlot[] = [
  { id: 'c1', name: 'Forge HIIT', day: 'Mon', time: '6:00 AM', coach: 'Mara V.', duration: '45 min', intensity: 'High', spots: 4, capacity: 20, tag: 'Conditioning' },
  { id: 'c2', name: 'Iron Strength', day: 'Mon', time: '6:00 PM', coach: 'Deon K.', duration: '60 min', intensity: 'High', spots: 8, capacity: 16, tag: 'Strength' },
  { id: 'c3', name: 'Flow & Mobility', day: 'Tue', time: '7:30 AM', coach: 'Lena P.', duration: '50 min', intensity: 'Low', spots: 12, capacity: 18, tag: 'Recovery' },
  { id: 'c4', name: 'Sprint Engine', day: 'Tue', time: '5:30 PM', coach: 'Mara V.', duration: '40 min', intensity: 'Brutal', spots: 2, capacity: 14, tag: 'Cardio' },
  { id: 'c5', name: 'Power Lift', day: 'Wed', time: '6:30 AM', coach: 'Deon K.', duration: '60 min', intensity: 'High', spots: 6, capacity: 12, tag: 'Strength' },
  { id: 'c6', name: 'Box & Burn', day: 'Wed', time: '7:00 PM', coach: 'Cole R.', duration: '45 min', intensity: 'High', spots: 0, capacity: 22, tag: 'Boxing' },
  { id: 'c7', name: 'Forge HIIT', day: 'Thu', time: '6:00 AM', coach: 'Mara V.', duration: '45 min', intensity: 'High', spots: 10, capacity: 20, tag: 'Conditioning' },
  { id: 'c8', name: 'Core Crush', day: 'Thu', time: '12:00 PM', coach: 'Lena P.', duration: '30 min', intensity: 'Medium', spots: 7, capacity: 16, tag: 'Core' },
  { id: 'c9', name: 'Iron Strength', day: 'Fri', time: '6:00 PM', coach: 'Deon K.', duration: '60 min', intensity: 'High', spots: 3, capacity: 16, tag: 'Strength' },
  { id: 'c10', name: 'Sunrise Yoga', day: 'Sat', time: '8:00 AM', coach: 'Lena P.', duration: '60 min', intensity: 'Low', spots: 14, capacity: 20, tag: 'Recovery' },
  { id: 'c11', name: 'Pack Run', day: 'Sat', time: '9:30 AM', coach: 'Cole R.', duration: '50 min', intensity: 'Medium', spots: 18, capacity: 30, tag: 'Cardio' },
  { id: 'c12', name: 'Open Forge', day: 'Sun', time: '10:00 AM', coach: 'Mara V.', duration: '90 min', intensity: 'Medium', spots: 9, capacity: 25, tag: 'Open Gym' },
];

export const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const intensityColors: Record<string, string> = {
  Low: 'text-cyan-300 bg-cyan-500/10 ring-cyan-400/30',
  Medium: 'text-yellow-300 bg-yellow-500/10 ring-yellow-400/30',
  High: 'text-orange-300 bg-orange-500/10 ring-orange-400/30',
  Brutal: 'text-fuchsia-300 bg-fuchsia-500/10 ring-fuchsia-400/30',
};

export interface Tier {
  id: string;
  name: string;
  monthly: number;
  blurb: string;
  perks: string[];
  popular?: boolean;
  accent: string;
}

export const tiers: Tier[] = [
  {
    id: 'spark',
    name: 'Spark',
    monthly: 39,
    blurb: 'Gym floor + recovery zone access.',
    perks: ['24/7 gym floor access', 'Cold plunge & sauna', 'Fitness app workouts', '2 guest passes / yr'],
    accent: 'cyan',
  },
  {
    id: 'forge',
    name: 'Forge',
    monthly: 79,
    blurb: 'Unlimited classes + everything in Spark.',
    perks: ['Everything in Spark', 'Unlimited group classes', 'Monthly InBody scan', '1 coaching check-in / mo', '4 guest passes / yr'],
    popular: true,
    accent: 'lime',
  },
  {
    id: 'elite',
    name: 'Elite',
    monthly: 149,
    blurb: 'Personal coaching + premium perks.',
    perks: ['Everything in Forge', '4 PT sessions / mo', 'Custom nutrition plan', 'Priority class booking', 'Unlimited guest passes'],
    accent: 'fuchsia',
  },
];

export interface Trainer {
  name: string;
  role: string;
  emoji: string;
  specialty: string;
  bio: string;
  certs: string[];
  gradient: string;
}

export const trainers: Trainer[] = [
  {
    name: 'Mara Velasquez',
    role: 'Head Conditioning Coach',
    emoji: '⚡',
    specialty: 'HIIT & Engine Work',
    bio: 'Ex-national triathlete. Mara builds engines that do not quit.',
    certs: ['NASM-CPT', 'TRX Master', 'Precision Nutrition L1'],
    gradient: 'from-lime-400 to-emerald-500',
  },
  {
    name: 'Deon King',
    role: 'Strength Director',
    emoji: '🏋️',
    specialty: 'Powerlifting & Olympic Lifts',
    bio: '3x state powerlifting champ. Deon makes heavy feel light.',
    certs: ['USAW L2', 'CSCS', 'StrongFirst SFG'],
    gradient: 'from-orange-400 to-rose-500',
  },
  {
    name: 'Lena Park',
    role: 'Mobility & Recovery Lead',
    emoji: '🧘',
    specialty: 'Yoga, Mobility, Rehab',
    bio: 'Movement is medicine. Lena keeps the tribe injury-free.',
    certs: ['RYT-500', 'FRC Mobility Specialist', 'Pilates Cert'],
    gradient: 'from-cyan-400 to-sky-500',
  },
  {
    name: 'Cole Rivera',
    role: 'Combat & Endurance Coach',
    emoji: '🥊',
    specialty: 'Boxing & Distance',
    bio: 'Golden Gloves boxer turned ultra runner. Relentless.',
    certs: ['USA Boxing', 'RRCA Run Coach', 'NASM-CPT'],
    gradient: 'from-fuchsia-400 to-purple-500',
  },
];

// ===== AI Coach chatbot knowledge =====
export const chatGreeting =
  "Yo! I'm Forge, your AI coach 💪 Ask me about classes, hours, trial passes or memberships.";

export const chatQuick = ['Free trial?', 'Class schedule', 'Hours', 'Membership prices'];

export function botReply(input: string): string {
  const q = input.toLowerCase();
  if (/trial|free|pass|guest/.test(q))
    return "We offer a FREE 3-day trial pass — gym floor + 2 classes. Hit 'Join' or the booking page and pick any class to lock it in. No card needed 🔥";
  if (/hour|open|close|time/.test(q))
    return 'We are open Mon–Fri 5AM–11PM, Sat 6AM–9PM, Sun 7AM–8PM. The iron never sleeps.';
  if (/price|cost|member|plan|tier|how much/.test(q))
    return 'Memberships: Spark $39/mo (gym + recovery), Forge $79/mo (unlimited classes), Elite $149/mo (personal coaching). Check the Membership page to compare 💥';
  if (/class|schedule|book|timetable|when/.test(q))
    return 'We run 120 classes/week — HIIT, strength, boxing, yoga & more. Head to Classes to see the live timetable and grab a spot. Some fill fast!';
  if (/coach|trainer|who/.test(q))
    return 'Our crew: Mara (conditioning), Deon (strength), Lena (mobility) & Cole (combat). Meet them on the Trainers page.';
  if (/cancel|freeze|contract/.test(q))
    return 'No lock-in contracts. Cancel or freeze anytime in your app — zero drama.';
  if (/location|where|address|parking/.test(q))
    return 'Find us at 88 Ironworks Ave, San Francisco. Free member parking out back.';
  if (/hi|hey|hello|yo|sup/.test(q))
    return "Hey! Ready to train? Ask me about classes, trials, hours or memberships 💪";
  if (/thank/.test(q)) return 'Anytime! Now go move some weight 🏋️';
  return "I'm still learning! Try asking about trials, classes, hours, trainers or membership prices. Or call us at (415) 555-0192.";
}
