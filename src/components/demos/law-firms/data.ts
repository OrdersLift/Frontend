// Mock data for Ashford & Vane LLP — fictional law firm demo

export const BRAND = {
  name: 'Ashford & Vane',
  suffix: 'LLP',
  tagline: 'Counsel of Consequence',
  phone: '+1 (212) 555-0190',
  email: 'intake@ashfordvane.com',
  address: '1 Liberty Plaza, 38th Floor, New York, NY 10006',
  founded: 1987,
  hours: 'Mon–Fri 8:00am – 6:00pm · After-hours by appointment',
};

export const STATS = [
  { value: '38', label: 'Years of practice', suffix: 'yrs' },
  { value: '4,200', label: 'Matters resolved', suffix: '+' },
  { value: '$2.1', label: 'Recovered for clients', suffix: 'B' },
  { value: '98', label: 'Client satisfaction', suffix: '%' },
];

export type PracticeArea = {
  slug: string;
  name: string;
  icon: string; // lucide icon name handled in component map
  short: string;
  description: string;
  services: string[];
  startingFee: string;
  matterType: string; // used for booking routing
};

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    slug: 'family',
    name: 'Family Law',
    icon: 'Heart',
    short: 'Divorce, custody, and the matters closest to home.',
    description:
      'Compassionate, discreet representation through divorce, child custody, support, and prenuptial agreements. We protect what matters most while keeping conflict and cost in check.',
    services: ['Divorce & separation', 'Child custody & support', 'Prenuptial agreements', 'Adoption', 'Domestic mediation'],
    startingFee: '$350/hr',
    matterType: 'Family Law',
  },
  {
    slug: 'corporate',
    name: 'Corporate & Commercial',
    icon: 'Building2',
    short: 'Formation, contracts, and growth — done right.',
    description:
      'From incorporation to M&A, we counsel founders, boards, and established enterprises on the deals and structures that drive their business forward, with risk managed at every turn.',
    services: ['Entity formation', 'Mergers & acquisitions', 'Commercial contracts', 'Governance & compliance', 'Venture financing'],
    startingFee: '$475/hr',
    matterType: 'Corporate & Commercial',
  },
  {
    slug: 'property',
    name: 'Real Estate & Property',
    icon: 'Home',
    short: 'Closings, leases, and disputes — clear title, no surprises.',
    description:
      'Residential and commercial transactions, landlord-tenant matters, zoning, and property litigation handled with precision so your investment is secured from contract to closing.',
    services: ['Purchase & sale closings', 'Commercial leasing', 'Title disputes', 'Zoning & land use', 'Landlord-tenant matters'],
    startingFee: '$300/hr',
    matterType: 'Real Estate & Property',
  },
  {
    slug: 'criminal',
    name: 'Criminal Defense',
    icon: 'Scale',
    short: 'A vigorous defense when your liberty is on the line.',
    description:
      'Former prosecutors now in your corner. We defend against state and federal charges — from DUI to white-collar — with relentless preparation and trial-tested advocacy.',
    services: ['DUI & traffic offenses', 'White-collar defense', 'Drug charges', 'Assault & violent crimes', 'Appeals & post-conviction'],
    startingFee: 'Flat fees available',
    matterType: 'Criminal Defense',
  },
  {
    slug: 'estate',
    name: 'Estate Planning & Probate',
    icon: 'ScrollText',
    short: 'Wills, trusts, and a legacy that holds up.',
    description:
      'Thoughtful planning today spares your family burden tomorrow. We draft wills and trusts, minimize tax exposure, and guide executors through probate with care.',
    services: ['Wills & living trusts', 'Powers of attorney', 'Estate & gift tax planning', 'Probate administration', 'Trust litigation'],
    startingFee: '$1,500 flat',
    matterType: 'Estate Planning & Probate',
  },
  {
    slug: 'injury',
    name: 'Personal Injury',
    icon: 'ShieldCheck',
    short: 'Hurt by negligence? You pay nothing unless we win.',
    description:
      'Auto accidents, medical malpractice, and premises liability — we pursue full and fair compensation on a contingency basis so the costs of recovery never fall on you.',
    services: ['Auto & truck accidents', 'Medical malpractice', 'Slip & fall', 'Product liability', 'Wrongful death'],
    startingFee: 'No fee unless we win',
    matterType: 'Personal Injury',
  },
];

export type Attorney = {
  name: string;
  title: string;
  initials: string;
  accent: string; // tailwind gradient classes
  bar: string;
  focus: string[];
  bio: string;
  education: string[];
  email: string;
};

export const ATTORNEYS: Attorney[] = [
  {
    name: 'Eleanor R. Ashford',
    title: 'Founding Partner',
    initials: 'EA',
    accent: 'from-amber-400 to-yellow-600',
    bar: 'NY · NJ · Federal',
    focus: ['Corporate & Commercial', 'Mergers & Acquisitions'],
    bio: 'Eleanor founded the firm in 1987 and has guided more than 200 transactions exceeding $50M. She is regularly named among the region’s top dealmakers.',
    education: ['J.D., Columbia Law School', 'B.A., Yale University'],
    email: 'e.ashford@ashfordvane.com',
  },
  {
    name: 'Marcus T. Vane',
    title: 'Founding Partner',
    initials: 'MV',
    accent: 'from-sky-400 to-indigo-600',
    bar: 'NY · CT · Federal',
    focus: ['Criminal Defense', 'White-Collar Litigation'],
    bio: 'A former Assistant District Attorney, Marcus has tried over 90 cases to verdict. Clients turn to him when the stakes — and the scrutiny — are highest.',
    education: ['J.D., NYU School of Law', 'B.A., Georgetown University'],
    email: 'm.vane@ashfordvane.com',
  },
  {
    name: 'Priya N. Kapoor',
    title: 'Partner, Family Law',
    initials: 'PK',
    accent: 'from-rose-400 to-pink-600',
    bar: 'NY · NJ',
    focus: ['Family Law', 'Mediation'],
    bio: 'Priya brings calm and clarity to life’s hardest transitions, resolving the majority of her matters without the cost and strain of a courtroom.',
    education: ['J.D., Fordham Law School', 'B.A., Wellesley College'],
    email: 'p.kapoor@ashfordvane.com',
  },
  {
    name: 'David O. Lindqvist',
    title: 'Senior Associate, Real Estate',
    initials: 'DL',
    accent: 'from-emerald-400 to-teal-600',
    bar: 'NY',
    focus: ['Real Estate & Property', 'Land Use'],
    bio: 'David has closed over $400M in commercial and residential transactions, prized by developers for spotting risk long before it reaches the table.',
    education: ['J.D., Cornell Law School', 'B.S., University of Michigan'],
    email: 'd.lindqvist@ashfordvane.com',
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'Ashford & Vane turned a deal I thought was dead into the best decision my company ever made. Sharp, responsive, and genuinely on your side.',
    author: 'Jonathan H.',
    matter: 'Corporate acquisition',
    rating: 5,
  },
  {
    quote:
      'During my divorce Priya was a steadying force. She protected my children and my future without ever escalating the conflict. I cannot recommend her enough.',
    author: 'Maria S.',
    matter: 'Family law',
    rating: 5,
  },
  {
    quote:
      'Marcus walked into that courtroom and you could feel the room change. The charges were dismissed. I owe him everything.',
    author: 'Confidential client',
    matter: 'Criminal defense',
    rating: 5,
  },
];

export const FAQS = [
  {
    q: 'How does the initial consultation work?',
    a: 'Your first consultation is a confidential 30-minute meeting — in person, by phone, or video — where we learn the facts of your matter, explain your options, and outline likely next steps. There is no obligation to retain us afterward.',
    tags: ['consultation', 'process', 'first', 'meeting', 'free'],
  },
  {
    q: 'Is the first consultation free?',
    a: 'Initial consultations for Personal Injury and Family Law matters are complimentary. For Corporate, Real Estate, Criminal, and Estate matters we charge a reduced flat consultation fee of $150, which is credited toward your engagement if you retain us.',
    tags: ['fee', 'cost', 'free', 'price', 'consultation'],
  },
  {
    q: 'How are your fees structured?',
    a: 'It depends on the matter. We offer hourly billing, flat fees (common for estate planning and many criminal matters), and contingency arrangements for personal injury — meaning you pay nothing unless we recover for you. We always provide a written engagement letter before any work begins.',
    tags: ['fee', 'cost', 'billing', 'hourly', 'contingency', 'flat', 'price', 'retainer'],
  },
  {
    q: 'What should I bring to my consultation?',
    a: 'Bring any documents relevant to your matter: contracts, court papers, correspondence, police reports, leases, or financial records. A written timeline of events is also extremely helpful. If you are unsure, bring what you have — we will guide you from there.',
    tags: ['bring', 'documents', 'prepare', 'paperwork', 'what'],
  },
  {
    q: 'How long will my case take?',
    a: 'Timelines vary widely. A straightforward will may take two weeks; a contested litigation matter can span a year or more. At your consultation we will give you a realistic estimate based on the specifics of your situation.',
    tags: ['long', 'time', 'timeline', 'how long', 'duration'],
  },
  {
    q: 'Is everything I tell you confidential?',
    a: 'Yes. From the moment you contact us about a potential matter, your communications are protected by attorney-client privilege and our duty of confidentiality. We take the privacy of every client with the utmost seriousness.',
    tags: ['confidential', 'privacy', 'privilege', 'secret', 'private'],
  },
  {
    q: 'Do you handle cases outside New York?',
    a: 'Our attorneys are admitted in New York, New Jersey, Connecticut, and various federal courts. For matters in other jurisdictions we maintain a trusted network of co-counsel and can refer or partner as appropriate.',
    tags: ['where', 'location', 'jurisdiction', 'state', 'outside'],
  },
];

// Quick triage flow — maps answers to a recommended practice area
export type TriageOption = {
  label: string;
  area: string; // matterType
  note: string;
};

export const TRIAGE: TriageOption[] = [
  { label: 'Divorce, custody, or a family dispute', area: 'Family Law', note: 'Priya Kapoor leads our family practice and resolves most matters without litigation.' },
  { label: 'Starting, buying, or selling a business', area: 'Corporate & Commercial', note: 'Eleanor Ashford and our corporate team handle deals from formation to exit.' },
  { label: 'Buying, selling, or leasing property', area: 'Real Estate & Property', note: 'David Lindqvist has closed over $400M in transactions — your title is in good hands.' },
  { label: 'Arrested or under investigation', area: 'Criminal Defense', note: 'Speak to Marcus Vane urgently. Do not discuss your case with anyone else first.' },
  { label: 'Planning a will, trust, or estate', area: 'Estate Planning & Probate', note: 'We offer flat-fee estate plans starting at $1,500 with no hidden costs.' },
  { label: 'Injured by someone else’s negligence', area: 'Personal Injury', note: 'Contingency only — you pay nothing unless we win compensation for you.' },
];

export const MATTER_TYPES = PRACTICE_AREAS.map((p) => p.matterType);

export const TIME_SLOTS = ['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM', '4:00 PM'];

export const URGENCY = ['Routine — within a few weeks', 'Soon — within a week', 'Urgent — as soon as possible'];

// AI chatbot canned responses (keyword matched)
export const BOT_INTRO =
  'Welcome to Ashford & Vane. I’m Lexi, the firm’s virtual assistant. Ask me about our practice areas, fees, what to bring, or how to book a consultation.';

export const BOT_RESPONSES: { keywords: string[]; reply: string }[] = [
  { keywords: ['fee', 'cost', 'price', 'charge', 'how much', 'expensive', 'retainer'], reply: 'Our fees depend on the matter: hourly, flat-fee, or contingency. Personal injury is no-fee-unless-we-win. Family and personal injury consultations are free; others are a $150 flat fee credited to your engagement. Want me to point you to the booking page?' },
  { keywords: ['consult', 'book', 'appointment', 'schedule', 'meeting'], reply: 'You can book a confidential consultation right here — head to the Book a Consultation page and pick a matter type, date, and time. You’ll get an instant confirmation. Shall I tell you what to bring?' },
  { keywords: ['bring', 'document', 'prepare', 'paperwork'], reply: 'Bring anything relevant: contracts, court papers, correspondence, leases, police reports, or financial records, plus a short written timeline of events. If you’re unsure, bring what you have and we’ll guide you.' },
  { keywords: ['divorce', 'custody', 'family', 'child', 'prenup', 'marriage'], reply: 'Our Family Law practice is led by Priya Kapoor, who resolves most matters without litigation. She handles divorce, custody, support, and prenuptial agreements with discretion and care.' },
  { keywords: ['business', 'corporate', 'company', 'contract', 'merger', 'acquisition', 'startup', 'incorporate'], reply: 'Our Corporate & Commercial team handles formation, M&A, contracts, governance, and venture financing. Founding partner Eleanor Ashford has led over 200 transactions exceeding $50M.' },
  { keywords: ['property', 'real estate', 'lease', 'closing', 'landlord', 'tenant', 'zoning'], reply: 'Real Estate & Property matters — closings, leasing, title disputes, zoning — are handled by David Lindqvist, who has closed over $400M in transactions.' },
  { keywords: ['criminal', 'arrest', 'dui', 'charge', 'police', 'defense', 'investigation'], reply: 'If you’ve been arrested or are under investigation, contact us urgently and avoid discussing your case with anyone else. Marcus Vane, a former prosecutor, leads our criminal defense practice.' },
  { keywords: ['will', 'trust', 'estate', 'probate', 'inherit', 'power of attorney'], reply: 'Estate Planning & Probate — wills, trusts, powers of attorney, and probate administration. We offer flat-fee estate plans starting at $1,500.' },
  { keywords: ['injury', 'accident', 'hurt', 'malpractice', 'negligence', 'slip', 'fall'], reply: 'Personal Injury matters are handled on contingency — you pay nothing unless we recover for you. We cover auto accidents, medical malpractice, premises liability, and more.' },
  { keywords: ['confidential', 'privacy', 'private', 'privilege', 'secret'], reply: 'Absolutely. From your very first contact, your communications are protected by attorney-client privilege and our duty of confidentiality.' },
  { keywords: ['hour', 'open', 'time', 'when', 'location', 'address', 'where', 'phone', 'call', 'contact'], reply: 'We’re at 1 Liberty Plaza, 38th Floor, New York, open Mon–Fri 8am–6pm (after-hours by appointment). Call +1 (212) 555-0190 or email intake@ashfordvane.com.' },
  { keywords: ['long', 'time', 'duration', 'how long'], reply: 'Timelines vary — a simple will can take two weeks while contested litigation may span a year or more. We give you a realistic estimate at your consultation.' },
];
