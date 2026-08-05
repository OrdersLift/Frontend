// Knowledge base for the main OrdersLift marketing-site assistant.
// (The demo sites auto-extract their knowledge from each demo's data.ts;
//  OrdersLift's own content lives in JSX components, so it's summarised here.
//  Keep this in sync if the marketing copy changes substantially.)

export const ordersliftKnowledge = {
  brand: 'OrdersLift',
  tagline: 'Restaurant websites, table booking and QR menus — built, hosted and maintained.',
  what_we_do:
    'OrdersLift works with restaurants only. We build or rebuild your restaurant website, add a commission-free table booking system and a QR digital menu you can update yourself, and put an AI assistant on it that answers guests 24/7. We host it and maintain it for 2 years free.',
  who_we_serve:
    'Restaurants of every kind — full-service restaurants, cafés and coffee shops, takeaways, fine dining, bars and pubs, pizzerias, food trucks, cloud kitchens, bakeries and dessert shops. We do not work outside hospitality.',
  services: [
    {
      name: 'Your Restaurant Website',
      detail:
        'Built new if you have no site, or rebuilt properly if yours is dated or painful on a phone. Comes with an admin panel so you change photos, hours and content yourself without touching code. Mobile-first, fast, and set up to be found on Google.',
    },
    {
      name: 'Table Booking System',
      detail:
        'Guests book straight from your website — no third-party platform and no commission per cover. You set covers, service times and how far ahead people can book. Every booking lands in one dashboard, and guests get an automatic confirmation and reminder, which cuts no-shows.',
    },
    {
      name: 'QR Digital Menu',
      detail:
        'One QR code per table, forever. Guests scan and the menu opens in their browser — no app to download. You change dishes, prices and photos from your phone and every table sees it instantly. Mark items sold out in one tap. No reprinting menus.',
    },
    {
      name: 'AI Assistant & Online Ordering',
      detail:
        'A chatbot trained on your menu, hours, allergens and location. It answers questions like "do you have gluten-free?" or "can I book for six on Friday?" at any hour, takes bookings and orders, and hands over to your team when it needs to. Direct online ordering is commission-free.',
    },
  ],
  also_included: ['Managed hosting', '2 years free maintenance', 'Covers & revenue analytics', 'Menu changes done for you'],
  automation_features: [
    'AI menu and booking bot, trained on your dishes and opening hours',
    'Ask your own numbers — covers, takings and best-selling dishes in plain English',
    'Delivery and order integrations (Deliveroo, Uber Eats, DoorDash, Just Eat) in one inbox',
    'Automatic booking reminders, new-menu announcements and birthday offers',
    'Covers, average spend per head, peak nights and profit per dish',
    'Voice agent that answers the phone and takes reservations when service is busy',
  ],
  pricing: {
    note: 'No hidden fees and no commission on your bookings or direct orders. Pricing is agreed upfront. Every plan starts with a free discovery call; final pricing depends on your covers and what you need.',
    plans: [
      {
        name: 'Starter',
        type: 'One-time payment',
        price: 'Custom',
        includes: [
          'Custom restaurant website',
          'Admin panel',
          'Table booking system',
          'QR digital menu',
          'AI menu chatbot (basic)',
          'Managed hosting (1st year)',
          '12 months free maintenance',
        ],
      },
      {
        name: 'Growth',
        type: 'Monthly subscription',
        price: 'Custom',
        popular: true,
        includes: [
          'Everything in Starter',
          'Advanced AI bot (voice + text)',
          'Commission-free online ordering',
          'WhatsApp & SMS booking reminders',
          'Covers & revenue analytics',
          'Managed hosting included',
          '24 months free maintenance',
          'Monthly AI model updates',
          'Priority support',
        ],
      },
      {
        name: 'Enterprise',
        type: 'Bespoke / fully custom pricing',
        price: 'Bespoke',
        includes: [
          'Everything in Growth',
          'Multi-site & group support',
          'Custom POS data sources',
          'Voice AI phone reservations',
          'Deep POS & till integration',
          'Dedicated account manager',
          'SLA with guaranteed uptime',
          'Custom reporting per site',
        ],
      },
    ],
  },
  timeline:
    'Usually 2–4 weeks from kick-off to launch. A single-site restaurant with a straightforward menu is often live in 2 weeks; groups, multiple sites or deeper POS integration take 4–6 weeks. You get a firm date after the discovery call.',
  existing_website:
    'If you already have a website we can either add table booking and the QR menu to it, or rebuild it if it is dated or slow. We say honestly which we would recommend on the call — there is no upsell.',
  commission:
    'We take no commission on bookings or on direct orders through your own site. You pay for the build, one-off or monthly, and nothing per cover.',
  stats: {
    restaurants_powered: '100+',
    countries_served: '3',
    free_maintenance: '2 years',
    bookings: '24/7 online bookings',
  },
  demos:
    'A live, interactive demo restaurant site is available under the "Demo" menu — a full multi-page restaurant website with online ordering, reservations and a built-in AI chat widget, exactly the kind of site we build.',
  contact:
    'To start a project or get a custom quote, use the "Get Started" / "Start Your Project" button or the contact section on the site. Every project begins with a free discovery call.',
};
