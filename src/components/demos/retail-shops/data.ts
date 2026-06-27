// Fernweh — Botanical goods boutique. All data mocked, no network.

export type Product = {
  id: string;
  name: string;
  tagline: string;
  category: 'Plants' | 'Planters' | 'Care' | 'Decor';
  price: number;
  rating: number;
  reviews: number;
  light: 'Low' | 'Medium' | 'Bright';
  petSafe: boolean;
  inStock: number;
  gradient: string;
  emoji: string;
  variants: { label: string; price: number }[];
  description: string;
};

export const products: Product[] = [
  {
    id: 'monstera-deliciosa',
    name: 'Monstera Deliciosa',
    tagline: 'The iconic split-leaf statement piece',
    category: 'Plants',
    price: 48,
    rating: 4.9,
    reviews: 342,
    light: 'Bright',
    petSafe: false,
    inStock: 18,
    gradient: 'from-emerald-400 to-green-700',
    emoji: '🌿',
    variants: [
      { label: 'Small · 4"', price: 48 },
      { label: 'Medium · 6"', price: 72 },
      { label: 'Large · 10"', price: 124 },
    ],
    description:
      'A fast-growing climber with dramatic fenestrated leaves. Thrives in bright, indirect light and forgives the occasional missed watering. Our most-loved plant for a reason.',
  },
  {
    id: 'snake-plant-laurentii',
    name: 'Snake Plant Laurentii',
    tagline: 'Practically unkillable, endlessly elegant',
    category: 'Plants',
    price: 34,
    rating: 4.8,
    reviews: 511,
    light: 'Low',
    petSafe: false,
    inStock: 40,
    gradient: 'from-lime-500 to-emerald-800',
    emoji: '🪴',
    variants: [
      { label: 'Small · 4"', price: 34 },
      { label: 'Medium · 6"', price: 52 },
    ],
    description:
      'Architectural, upright, and famously low-maintenance. Tolerates low light and irregular watering — perfect for first-time plant parents or dim corners.',
  },
  {
    id: 'calathea-orbifolia',
    name: 'Calathea Orbifolia',
    tagline: 'Pinstriped leaves that move with the light',
    category: 'Plants',
    price: 39,
    rating: 4.6,
    reviews: 188,
    light: 'Medium',
    petSafe: true,
    inStock: 12,
    gradient: 'from-teal-400 to-emerald-700',
    emoji: '🌱',
    variants: [
      { label: 'Small · 4"', price: 39 },
      { label: 'Medium · 6"', price: 58 },
    ],
    description:
      'A pet-safe prayer plant with silvery, pinstriped foliage that folds gently at dusk. Loves humidity and consistent moisture — a rewarding pick for the attentive.',
  },
  {
    id: 'zz-plant',
    name: 'ZZ Plant',
    tagline: 'Glossy, drought-proof, designer-approved',
    category: 'Plants',
    price: 36,
    rating: 4.9,
    reviews: 297,
    light: 'Low',
    petSafe: false,
    inStock: 25,
    gradient: 'from-green-500 to-teal-800',
    emoji: '🌿',
    variants: [
      { label: 'Small · 4"', price: 36 },
      { label: 'Medium · 6"', price: 56 },
    ],
    description:
      'Waxy emerald leaves that shrug off neglect, low light, and dry air. The ultimate set-and-forget plant for busy spaces and travellers.',
  },
  {
    id: 'terracotta-trio',
    name: 'Terracotta Trio Set',
    tagline: 'Hand-thrown pots in warm clay',
    category: 'Planters',
    price: 42,
    rating: 4.7,
    reviews: 134,
    light: 'Low',
    petSafe: true,
    inStock: 30,
    gradient: 'from-orange-300 to-amber-700',
    emoji: '🏺',
    variants: [
      { label: 'Natural Clay', price: 42 },
      { label: 'Whitewashed', price: 46 },
    ],
    description:
      'A set of three nested terracotta planters with matching drainage saucers. Breathable clay helps roots stay healthy and adds rustic warmth to any shelf.',
  },
  {
    id: 'speckled-ceramic',
    name: 'Speckled Ceramic Pot',
    tagline: 'Matte glaze with hand-flecked detail',
    category: 'Planters',
    price: 28,
    rating: 4.8,
    reviews: 209,
    light: 'Low',
    petSafe: true,
    inStock: 50,
    gradient: 'from-stone-300 to-stone-600',
    emoji: '🪨',
    variants: [
      { label: 'Oat', price: 28 },
      { label: 'Sage', price: 28 },
      { label: 'Charcoal', price: 28 },
    ],
    description:
      'A tactile, matte-glazed ceramic planter with a hand-speckled finish. Includes a cork base pad to protect your surfaces. Available in three calm tones.',
  },
  {
    id: 'plant-food',
    name: 'Slow-Release Plant Food',
    tagline: 'Six months of nutrients in one scoop',
    category: 'Care',
    price: 16,
    rating: 4.6,
    reviews: 421,
    light: 'Low',
    petSafe: true,
    inStock: 80,
    gradient: 'from-amber-300 to-yellow-700',
    emoji: '🧪',
    variants: [{ label: '250g jar', price: 16 }],
    description:
      'Gentle, organic, slow-release granules that feed your plants for up to six months. No burning, no fuss — just steady, balanced growth.',
  },
  {
    id: 'mister-brass',
    name: 'Brass Plant Mister',
    tagline: 'A fine mist, beautifully delivered',
    category: 'Care',
    price: 32,
    rating: 4.9,
    reviews: 156,
    light: 'Low',
    petSafe: true,
    inStock: 22,
    gradient: 'from-yellow-400 to-amber-800',
    emoji: '💧',
    variants: [{ label: 'Antique Brass', price: 32 }],
    description:
      'A pump-action solid brass mister that develops a lovely patina over time. Ideal for humidity-loving plants and a handsome object on its own.',
  },
  {
    id: 'macrame-hanger',
    name: 'Macramé Hanger',
    tagline: 'Hand-knotted cotton, made to drape',
    category: 'Decor',
    price: 24,
    rating: 4.7,
    reviews: 98,
    light: 'Low',
    petSafe: true,
    inStock: 35,
    gradient: 'from-stone-200 to-amber-500',
    emoji: '🪢',
    variants: [
      { label: 'Natural', price: 24 },
      { label: 'Ochre', price: 26 },
    ],
    description:
      'A hand-knotted cotton plant hanger that brings height and softness to your space. Holds pots up to 8 inches. Hardware included.',
  },
  {
    id: 'grow-light-arc',
    name: 'Arc Grow Light',
    tagline: 'Full-spectrum light, sculptural form',
    category: 'Decor',
    price: 89,
    rating: 4.5,
    reviews: 64,
    light: 'Bright',
    petSafe: true,
    inStock: 9,
    gradient: 'from-emerald-300 to-teal-600',
    emoji: '💡',
    variants: [
      { label: 'Brushed Black', price: 89 },
      { label: 'Warm White', price: 89 },
    ],
    description:
      'A full-spectrum LED grow light disguised as a minimalist arc lamp. A built-in timer keeps even the dimmest corner thriving year-round.',
  },
  {
    id: 'pilea-peperomioides',
    name: 'Pilea Peperomioides',
    tagline: 'The cheerful coin-leaf "pancake" plant',
    category: 'Plants',
    price: 29,
    rating: 4.8,
    reviews: 276,
    light: 'Medium',
    petSafe: true,
    inStock: 16,
    gradient: 'from-green-400 to-emerald-600',
    emoji: '🪙',
    variants: [
      { label: 'Small · 4"', price: 29 },
      { label: 'Medium · 6"', price: 44 },
    ],
    description:
      'Round, coin-shaped leaves on slender stems make this a playful, pet-safe favourite. Produces "pups" you can share with friends.',
  },
  {
    id: 'fiddle-leaf-fig',
    name: 'Fiddle Leaf Fig',
    tagline: 'The interior designer\'s darling',
    category: 'Plants',
    price: 68,
    rating: 4.4,
    reviews: 203,
    light: 'Bright',
    petSafe: false,
    inStock: 7,
    gradient: 'from-emerald-500 to-green-900',
    emoji: '🌳',
    variants: [
      { label: 'Medium · 6"', price: 68 },
      { label: 'Large · 10"', price: 138 },
    ],
    description:
      'Bold, violin-shaped leaves and real vertical presence. Rewards a consistent routine and a bright, stable spot with show-stopping growth.',
  },
];

export const categories = ['All', 'Plants', 'Planters', 'Care', 'Decor'] as const;

export const collections = [
  {
    title: 'Beginner Botanicals',
    desc: 'Forgiving, thriving, impossible to disappoint.',
    emoji: '🌱',
    gradient: 'from-emerald-400 to-teal-600',
    href: '/demo/retail-shops/shop?cat=Plants',
  },
  {
    title: 'Pet-Safe Picks',
    desc: 'Greenery the whole household can love.',
    emoji: '🐾',
    gradient: 'from-lime-400 to-green-600',
    href: '/demo/retail-shops/shop',
  },
  {
    title: 'Pots & Planters',
    desc: 'Hand-thrown clay and matte ceramics.',
    emoji: '🏺',
    gradient: 'from-orange-400 to-amber-700',
    href: '/demo/retail-shops/shop?cat=Planters',
  },
  {
    title: 'Care & Tools',
    desc: 'Everything to keep them happy.',
    emoji: '💧',
    gradient: 'from-amber-300 to-yellow-600',
    href: '/demo/retail-shops/shop?cat=Care',
  },
];

export const testimonials = [
  {
    name: 'Maya R.',
    role: 'Plant parent of 23',
    quote:
      'Every plant arrived in perfect condition, double-boxed and clearly loved. The care card was a sweet touch — my Calathea is thriving.',
    emoji: '🌿',
  },
  {
    name: 'Devon T.',
    role: 'First-time grower',
    quote:
      'I knew nothing about plants. The shop assistant chat steered me to a ZZ plant and a snake plant — both still alive three months on!',
    emoji: '🪴',
  },
  {
    name: 'Priya & Sam',
    role: 'New homeowners',
    quote:
      'We furnished an entire reading nook from Fernweh. The terracotta trio and macramé hanger pulled the whole room together.',
    emoji: '🪢',
  },
];

export const storeInfo = {
  name: 'Fernweh',
  tagline: 'Botanical goods for slow living',
  address: '14 Greenhouse Lane, Portland, OR 97214',
  phone: '(503) 555-0192',
  email: 'hello@fernweh.shop',
  hours: [
    { day: 'Mon – Fri', time: '10:00 – 19:00' },
    { day: 'Saturday', time: '09:00 – 18:00' },
    { day: 'Sunday', time: '11:00 – 16:00' },
  ],
  shipping: 'Free carbon-neutral shipping over $50 · Live plants guaranteed 30 days',
};

// AI shopping assistant — keyword matched, fully client-side.
export type ChatReply = { keywords: string[]; reply: string };

export const chatReplies: ChatReply[] = [
  {
    keywords: ['pet', 'cat', 'dog', 'safe', 'toxic'],
    reply:
      'Great question! Our pet-safe picks include the Calathea Orbifolia, Pilea Peperomioides, Speckled Ceramic Pots and all our Care tools. Avoid the Monstera, Snake Plant, ZZ Plant and Fiddle Leaf Fig around pets. 🐾',
  },
  {
    keywords: ['low light', 'dark', 'dim', 'no light', 'shade', 'low-light'],
    reply:
      'For low-light corners I always recommend the Snake Plant Laurentii ($34) and the ZZ Plant ($36) — both shrug off dim rooms beautifully. Want me to add one to your cart? 🌿',
  },
  {
    keywords: ['beginner', 'easy', 'kill', 'first', 'new', 'low maintenance', 'low-maintenance'],
    reply:
      'Welcome to the plant world! Start with a Snake Plant or ZZ Plant — practically unkillable. Pair it with our Slow-Release Plant Food ($16) and you are set for six months. 🌱',
  },
  {
    keywords: ['stock', 'available', 'in stock', 'sold out', 'inventory'],
    reply:
      'Most items are in stock! Low-stock alerts: Fiddle Leaf Fig (7 left), Arc Grow Light (9 left) and Calathea Orbifolia (12 left). Everything else is comfortably stocked. 📦',
  },
  {
    keywords: ['ship', 'shipping', 'delivery', 'deliver', 'free'],
    reply:
      'We offer free carbon-neutral shipping on orders over $50, and every live plant is guaranteed for 30 days. Plants ship double-boxed with a care card. 🚚',
  },
  {
    keywords: ['price', 'cost', 'cheap', 'budget', 'expensive', 'how much'],
    reply:
      'Plants range from $29 (Pilea) up to $138 for a large Fiddle Leaf Fig. Care tools start at $16. Tell me your budget and I will suggest something perfect! 💚',
  },
  {
    keywords: ['monstera', 'split leaf', 'split-leaf'],
    reply:
      'The Monstera Deliciosa is our bestseller — dramatic split leaves, $48 for a small. Loves bright indirect light. Note: not pet-safe. Shall I add it to your cart? 🌿',
  },
  {
    keywords: ['water', 'watering', 'care', 'how often'],
    reply:
      'Watering depends on the plant! Snake & ZZ plants: every 2–3 weeks. Calathea & Pilea: keep lightly moist. When in doubt, let the top inch of soil dry out first. Our Brass Mister helps too. 💧',
  },
  {
    keywords: ['hours', 'open', 'visit', 'store', 'location', 'address'],
    reply:
      'Our Portland storefront is at 14 Greenhouse Lane. Open Mon–Fri 10–7, Sat 9–6, Sun 11–4. Come say hi! 🪴',
  },
  {
    keywords: ['light', 'bright', 'sun', 'window'],
    reply:
      'For bright, sunny windows the Monstera, Fiddle Leaf Fig and our Arc Grow Light all shine. Got a darker spot instead? Just ask about low-light plants! ☀️',
  },
];

export const chatGreeting =
  "Hi! I'm Fern, your Fernweh plant assistant. 🌿 Ask me about pet-safe plants, low-light picks, stock, shipping or care tips!";

export const chatFallback =
  "I'm still a sprouting assistant! Try asking about pet-safe plants, low-light options, beginner picks, stock, shipping or watering tips. 🌱";

export const chatSuggestions = [
  'Pet-safe plants?',
  'Best for low light?',
  'What ships free?',
  "I'm a beginner",
];
