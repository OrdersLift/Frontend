// Knowledge base for the main OrdersLift marketing-site assistant.
// (The demo sites auto-extract their knowledge from each demo's data.ts;
//  OrdersLift's own content lives in JSX components, so it's summarised here.
//  Keep this in sync if the marketing copy changes substantially.)

export const ordersliftKnowledge = {
  brand: 'OrdersLift',
  tagline: 'The Complete AI Platform — Built for Every Business, Worldwide.',
  what_we_do:
    'OrdersLift is an AI web agency that builds a complete digital presence for local businesses and maintains it for 2 years free. Each client gets a full platform — not just a website.',
  three_pillars: [
    {
      name: 'Full Custom Website',
      detail:
        'A bespoke website tailored to your brand and industry, with an admin panel so you control menus, services, bookings and content without touching code. Mobile-first, SEO-optimised, fast-loading and accessible.',
    },
    {
      name: 'AI Customer Chatbot',
      detail:
        'A 24/7 chatbot trained on your specific business — services, prices, hours, FAQs. Voice and text capable, with WhatsApp & SMS integration and handoff to a human when needed.',
    },
    {
      name: 'Internal RAG Bot',
      detail:
        'A private knowledge engine for your team. Connect your databases, documents, Google Drive, Notion or POS and ask questions in plain English ("How much did we make last week?"). Your data stays yours.',
    },
  ],
  also_included: ['Analytics dashboard', 'Managed hosting', '2 years free maintenance'],
  pricing: {
    note: 'No hidden fees. Pricing is always discussed and agreed upfront. Every plan includes a free discovery call; final pricing depends on business size and requirements.',
    plans: [
      {
        name: 'Starter',
        type: 'One-time payment',
        price: 'Custom',
        includes: [
          'Custom website design & build',
          'Admin panel',
          'AI customer chatbot (basic)',
          'Standard delivery/service integrations',
          'Analytics dashboard',
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
          'Advanced AI chatbot (voice + text)',
          'Internal RAG bot',
          'WhatsApp & SMS automation',
          'Predictive analytics',
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
          'Multi-location support',
          'Custom RAG data sources',
          'Voice AI phone agent',
          'CRM & POS deep integration',
          'Dedicated account manager',
          'SLA with guaranteed uptime',
          'Custom reporting & BI',
        ],
      },
    ],
  },
  industries: [
    'Restaurants', 'Dental Clinics', 'Gyms & Fitness', 'Auto Garages', 'Salons & Spas',
    'Law Firms', 'Hotels & B&Bs', 'Retail Shops', 'Real Estate', 'Clinics & Physio',
  ],
  stats: {
    businesses_powered: '100+',
    countries_served: '3',
    free_maintenance: '2 years',
    support: '24/7 AI',
  },
  demos:
    'Live, interactive demo websites are available under the "Demo" menu — one per industry (restaurants, dental clinics, gyms, auto garages, salons, law firms, hotels, retail, real estate, physio clinics).',
  contact:
    'To start a project or get a custom quote, use the "Get Started" / "Start Your Project" button or the contact section on the site. Every project begins with a free discovery call.',
};
