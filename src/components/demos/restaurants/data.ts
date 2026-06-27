// Saffron & Ember — fictional fusion restaurant in Lisbon
// All data mocked. No network calls.

export const brand = {
  name: 'Saffron & Ember',
  tagline: 'Fire-kissed fusion, plated with soul.',
  cuisine: 'Indo-Mediterranean wood-fire kitchen',
  city: 'Lisbon, Portugal',
  address: 'Rua das Brasas 14, Alfama, Lisbon',
  phone: '+351 21 555 0188',
  email: 'ola@saffronember.pt',
  emoji: '🔥',
};

export const hours = [
  { day: 'Monday', time: 'Closed' },
  { day: 'Tuesday', time: '17:30 – 23:00' },
  { day: 'Wednesday', time: '17:30 – 23:00' },
  { day: 'Thursday', time: '17:30 – 23:30' },
  { day: 'Friday', time: '17:30 – 00:30' },
  { day: 'Saturday', time: '12:30 – 00:30' },
  { day: 'Sunday', time: '12:30 – 22:00' },
];

export type Dish = {
  id: string;
  name: string;
  desc: string;
  price: number;
  category: string;
  tags: string[];      // e.g. 'vegan', 'gf', 'spicy', 'nuts', 'dairy'
  allergens: string[]; // human readable
  emoji: string;
  signature?: boolean;
};

export const categories = [
  { id: 'small', label: 'Small Plates' },
  { id: 'fire', label: 'From the Fire' },
  { id: 'large', label: 'Large Plates' },
  { id: 'sweet', label: 'Sweet' },
  { id: 'drinks', label: 'Drinks' },
];

export const menu: Dish[] = [
  {
    id: 'd1', name: 'Charred Tandoori Cauliflower', category: 'small',
    desc: 'Whole roasted cauliflower, smoked yoghurt, pomegranate, mint oil.',
    price: 11.5, tags: ['vegetarian', 'gf', 'spicy'], allergens: ['Dairy'],
    emoji: '🥦', signature: true,
  },
  {
    id: 'd2', name: 'Saffron Arancini', category: 'small',
    desc: 'Crisp risotto spheres, aged manchego, harissa aioli.',
    price: 9.0, tags: ['vegetarian'], allergens: ['Gluten', 'Dairy', 'Egg'],
    emoji: '🟡',
  },
  {
    id: 'd3', name: 'Spiced Lamb Croquettes', category: 'small',
    desc: 'Slow-braised lamb, garam masala, tamarind glaze.',
    price: 12.0, tags: ['spicy'], allergens: ['Gluten', 'Dairy'],
    emoji: '🥩',
  },
  {
    id: 'd4', name: 'Ember Octopus', category: 'fire',
    desc: 'Wood-fired Atlantic octopus, burnt-lemon labneh, dukkah.',
    price: 18.5, tags: ['gf', 'nuts'], allergens: ['Dairy', 'Nuts', 'Molluscs'],
    emoji: '🐙', signature: true,
  },
  {
    id: 'd5', name: 'Coal-Roasted Aubergine', category: 'fire',
    desc: 'Whole smoky aubergine, tahini, date molasses, pul biber.',
    price: 13.0, tags: ['vegan', 'gf'], allergens: ['Sesame'],
    emoji: '🍆', signature: true,
  },
  {
    id: 'd6', name: 'Flame-Grilled Piri Tiger Prawns', category: 'fire',
    desc: 'Head-on prawns, saffron-piri butter, charred lime.',
    price: 19.5, tags: ['gf', 'spicy'], allergens: ['Crustaceans', 'Dairy'],
    emoji: '🦐',
  },
  {
    id: 'd7', name: 'Butter Chicken Cataplana', category: 'large',
    desc: 'Lisbon cataplana of velvet butter chicken, charred naan.',
    price: 22.0, tags: [], allergens: ['Gluten', 'Dairy', 'Nuts'],
    emoji: '🍗', signature: true,
  },
  {
    id: 'd8', name: 'Black Lentil & Coconut Dal', category: 'large',
    desc: '24-hour simmered dal makhani, coconut cream, crispy shallots.',
    price: 16.0, tags: ['vegan', 'gf'], allergens: [],
    emoji: '🫘',
  },
  {
    id: 'd9', name: 'Goan-Spiced Seabass', category: 'large',
    desc: 'Whole seabass, green recheado masala, coconut-lime rice.',
    price: 26.0, tags: ['gf', 'spicy'], allergens: ['Fish'],
    emoji: '🐟',
  },
  {
    id: 'd10', name: 'Cardamom Burnt Basque Cheesecake', category: 'sweet',
    desc: 'Caramelised crust, cardamom, salted-honey drizzle.',
    price: 8.5, tags: ['vegetarian'], allergens: ['Dairy', 'Egg', 'Gluten'],
    emoji: '🍰', signature: true,
  },
  {
    id: 'd11', name: 'Rose & Pistachio Kulfi', category: 'sweet',
    desc: 'Set rose kulfi, crushed pistachio, raspberry dust.',
    price: 7.0, tags: ['vegetarian', 'gf', 'nuts'], allergens: ['Dairy', 'Nuts'],
    emoji: '🌹',
  },
  {
    id: 'd12', name: 'Mango Lassi Old Fashioned', category: 'drinks',
    desc: 'Bourbon, mango, turmeric bitters, smoked clove.',
    price: 12.0, tags: ['gf'], allergens: [],
    emoji: '🥭',
  },
  {
    id: 'd13', name: 'Tamarind Margarita', category: 'drinks',
    desc: 'Mezcal, tamarind, chilli salt, charred lime.',
    price: 11.5, tags: ['vegan', 'gf', 'spicy'], allergens: [],
    emoji: '🍹',
  },
  {
    id: 'd14', name: 'Saffron Lemonade (NA)', category: 'drinks',
    desc: 'House saffron syrup, lemon, soda. Zero alcohol.',
    price: 5.5, tags: ['vegan', 'gf'], allergens: [],
    emoji: '🍋',
  },
];

export const signatureIds = ['d1', 'd4', 'd7', 'd5', 'd10'];

export const testimonials = [
  {
    name: 'Marta Figueiredo', role: 'Time Out Lisboa',
    quote: 'The ember octopus alone is worth the trip across the Tejo. A fearless, joyful kitchen.',
    rating: 5,
  },
  {
    name: 'Daniel Roy', role: 'Regular since opening',
    quote: 'I have eaten the butter chicken cataplana more times than I will admit. Faultless.',
    rating: 5,
  },
  {
    name: 'Priya Anand', role: 'Food writer',
    quote: 'Indian soul, Portuguese fire, zero gimmicks. Book ahead — it fills fast.',
    rating: 5,
  },
];

export const story = {
  founded: 2019,
  chef: 'Chef Anaya Vaz',
  text:
    'Saffron & Ember was born when chef Anaya Vaz dragged her grandmother\'s Goan spice tins into a tiny Alfama wood-fire kitchen. We cook over live coals, ferment our own pickles, and treat every plate like the centre of the table. No fusion for the sake of it — just two coastlines that have always traded fire and spice.',
};

// Reservation availability mock — which slots are "full"
export const fullSlots = ['19:00', '20:30'];
export const timeSlots = ['12:30', '13:30', '17:30', '18:30', '19:00', '19:30', '20:30', '21:30'];

// Chatbot knowledge base — keyword matched
export const botReplies: { keywords: string[]; reply: string }[] = [
  {
    keywords: ['vegan', 'plant'],
    reply: 'Vegan picks: Coal-Roasted Aubergine 🍆, Black Lentil & Coconut Dal 🫘, and the Tamarind Margarita 🍹 are all fully plant-based.',
  },
  {
    keywords: ['gluten', 'celiac', 'coeliac', 'gf'],
    reply: 'Gluten-free favourites include the Charred Tandoori Cauliflower, Ember Octopus, Goan-Spiced Seabass and Rose & Pistachio Kulfi. Ask your server to flag the kitchen.',
  },
  {
    keywords: ['nut', 'peanut', 'pistachio', 'allerg'],
    reply: 'Dishes with nuts: Ember Octopus (dukkah), Butter Chicken Cataplana, and Rose & Pistachio Kulfi. Please tell us about any allergy — we take it seriously.',
  },
  {
    keywords: ['spicy', 'hot', 'heat'],
    reply: 'Bring the heat 🔥 — try the Spiced Lamb Croquettes, Flame-Grilled Piri Prawns, Goan-Spiced Seabass or the Tamarind Margarita.',
  },
  {
    keywords: ['hour', 'open', 'close', 'time'],
    reply: 'We\'re open Tue–Sun. Weeknights 17:30, weekends from 12:30. Closed Mondays. Fri/Sat we serve until 00:30!',
  },
  {
    keywords: ['book', 'reserv', 'table'],
    reply: 'You can reserve right here — head to the Reservations page. We hold tables for 15 minutes. Parties over 8? Email ola@saffronember.pt.',
  },
  {
    keywords: ['signature', 'best', 'recommend', 'popular'],
    reply: 'Our signatures: Ember Octopus 🐙, Butter Chicken Cataplana 🍗, Coal-Roasted Aubergine 🍆 and the Cardamom Basque Cheesecake 🍰.',
  },
  {
    keywords: ['where', 'location', 'address', 'park'],
    reply: 'We\'re at Rua das Brasas 14, Alfama, Lisbon — a short walk from Santa Apolónia station. Tram 28 stops nearby.',
  },
  {
    keywords: ['deliver', 'takeaway', 'order', 'online'],
    reply: 'Yes! Build an order on our Order Online page for collection. Most plates travel beautifully (the octopus especially).',
  },
];

export const botFallback =
  'Great question! I can help with dishes, allergens, vegan/GF options, opening hours and reservations. Try asking "what\'s vegan?" or "what are your hours?"';

export const botQuickReplies = ['What\'s vegan?', 'Gluten-free options?', 'Your hours?', 'Signature dishes?'];
