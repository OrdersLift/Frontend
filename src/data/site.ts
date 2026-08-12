// Single source of copy for the marketing site. Sections import from here so
// the same claim is never worded two ways in two places.
//
// `accent` marks the words a heading renders in primary-500. Everything else
// stays white — colouring a whole heading is what makes a page look cheap.

export const brand = {
  name: 'OrdersLift',
  tagline: 'Elevate Every Order',
  email: 'hello@orderslift.com',
  phone: '+1 (555) 123-4567',
} as const;

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '#contact' },
] as const;

/** The Services dropdown in the header — mirrors the six service cards. */
export const servicesMenu = [
  { label: 'Marketing', href: '#services' },
  { label: 'Analytics & Insights', href: '#services' },
  { label: 'Menu Optimization', href: '#services' },
  { label: 'Inventory Insights', href: '#services' },
  { label: 'Reputation Management', href: '#services' },
  { label: 'Automation', href: '#services' },
] as const;

export const cta = {
  primary: { label: 'Book a Free Call', href: '#contact' },
  hero: { label: 'Book a Free Strategy Call', href: '#contact' },
  secondary: { label: 'See How It Works', href: '#how-it-works' },
  banner: { label: 'Book My Free Call', href: '#contact' },
} as const;

export const hero = {
  headline: 'We Don’t Just Market Your Restaurant.',
  headlineAccent: 'We Grow Your Business.',
  sub: 'Marketing, Analytics, and Automation solutions designed to get you more orders, more customers, and more profit.',
  proof: 'Trusted by Restaurant Owners Across USA',
  // Carries the figures, because they are pixels in the artwork rather than text.
  imageAlt:
    'A restaurant dashboard over a plated dish: total orders 3,287 up 32.6%, revenue $28,540 up 28.4%, new customers 1,642 up 41.2% versus last month',
  /** Cards that float over the hero photograph. `delta` is rendered green. */
  stats: [
    { label: 'Total Orders', value: '3,287', delta: '32.6%', note: 'vs last month' },
    { label: 'Revenue', value: '$28,540', delta: '28.4%', note: 'vs last month' },
    { label: 'New Customers', value: '1,642', delta: '41.2%', note: 'vs last month' },
    { label: 'Avg. Rating', value: '4.6', delta: '0.6', note: 'vs last month', stars: true },
  ],
} as const;

export const trustedBy = {
  eyebrow: 'Trusted by restaurants. Delivering real results.',
  logos: [
    { name: 'Spice Junction', sub: 'Indian Cuisine' },
    { name: 'Tandoori House', sub: 'Grill & Curry' },
    { name: 'Curry Leaves', sub: 'Indian Bistro' },
    { name: 'Biryani Palace', sub: 'Cuisine of India' },
    { name: 'Masala Street', sub: 'Kitchen' },
  ],
} as const;

/** `icon` is a lucide-react export name. */
export const services = {
  heading: 'Everything You Need to',
  headingAccent: 'Grow Your Restaurant',
  items: [
    {
      icon: 'Megaphone',
      title: 'Marketing',
      body: 'Data-driven campaigns that bring more customers to your restaurant.',
    },
    {
      icon: 'BarChart3',
      title: 'Analytics & Insights',
      body: 'Powerful dashboards and AI insights to track, analyze and grow your business.',
    },
    {
      icon: 'ClipboardList',
      title: 'Menu Optimization',
      body: 'Increase profit with data-backed menu engineering and pricing strategies.',
    },
    {
      icon: 'Package',
      title: 'Inventory Insights',
      body: 'Reduce waste and control costs with smart inventory tracking.',
    },
    {
      icon: 'Star',
      title: 'Reputation Management',
      body: 'Get more 5-star reviews and build a strong online reputation.',
    },
    {
      icon: 'Bot',
      title: 'Automation',
      body: 'Automate marketing, follow-ups and reports to save time and boost efficiency.',
    },
  ],
} as const;

// Each item pairs with media.results[i] — a single graphic that already shows
// the before and after states, so the card frames one image, not two.
export const results = {
  heading: 'Real Results.',
  headingAccent: 'Real Growth.',
  sub: 'Four Google Business Profiles, before and after we worked on them.',
  items: [
    {
      title: 'The Grill Spot',
      gain: '2.7 → 4.6 stars',
      why: 'Low visibility and thin reviews turned into a profile people trust',
      alt: 'The Grill Spot Google Business Profile before and after: rating rises from 2.7 to 4.6 with far more reviews and photos',
    },
    {
      title: 'Bella Napoli → Coastal Kitchen',
      gain: '+213% profile views',
      why: 'Complete listing, real photos, questions answered',
      alt: 'Restaurant Google Business Profile before and after: sparse listing replaced with full hours, photos and recent reviews',
    },
    {
      title: 'Spice Court → Bistro House',
      gain: '4.7 from 245 reviews',
      why: 'Steady review flow instead of a stale page',
      alt: 'Google Business Profile before and after showing a rise to 4.7 stars across 245 reviews',
    },
    {
      title: 'The Urban Plate',
      gain: '2.8 → 4.7 stars',
      why: 'Stronger profile, more reviews, more customers',
      alt: 'The Urban Plate Google Business Profile before and after: rating rises from 2.8 to 4.7 with 227 reviews',
    },
  ],
} as const;

export const work = {
  heading: 'The Work We',
  headingAccent: 'Actually Ship',
  sub: 'Live campaigns running for real restaurants — not mockups.',
  ads: { title: 'Meta ads', note: '12 creatives currently in market' },
  email: {
    title: 'Email & SMS',
    note: 'Campaigns that bring guests back',
    alts: [
      'Branded post-visit feedback email as a guest sees it in Gmail',
      'Grid of restaurant email templates for offers, feedback and reopenings',
      'Grid of review-request and loyalty email campaigns for restaurants',
    ],
  },
} as const;

export const howItWorks = {
  heading: 'How It Works',
  steps: [
    { icon: 'MessageCircle', title: 'Free Consultation', body: 'We understand your business and goals.' },
    { icon: 'SearchCheck', title: 'Data Analysis', body: 'We analyze your data and identify opportunities.' },
    { icon: 'Lightbulb', title: 'Strategy & Plan', body: 'We create a custom growth plan for your restaurant.' },
    { icon: 'Rocket', title: 'Execution', body: 'We implement and optimize for maximum results.' },
    { icon: 'TrendingUp', title: 'Track & Grow', body: 'We track performance and keep growing your business.' },
  ],
} as const;

export const ctaBanner = {
  heading: 'Ready to Grow Your Restaurant?',
  sub: 'Book a free strategy call and let’s scale your business together.',
  badges: ['No obligation', 'Custom strategy', '100% free'],
} as const;

export const footer = {
  blurb: 'Marketing, analytics and automation for restaurants that want more orders, more customers and more profit.',
  columns: [
    { title: 'Services', links: servicesMenu },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
        { label: 'Cookies', href: '/cookies' },
      ],
    },
  ],
} as const;
