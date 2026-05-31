import { Mic, Phone, Calendar, MessageSquare, CheckCircle, Clock } from 'lucide-react';

const capabilities = [
  { icon: Phone,        title: 'Answers incoming calls',   desc: 'AI picks up every call, greets the caller, and handles common requests — no missed calls ever.', color: 'text-primary-400', bg: 'bg-primary-500/10' },
  { icon: Calendar,     title: 'Books appointments',       desc: 'Checks real-time availability and books directly into your calendar system.', color: 'text-glow-400', bg: 'bg-glow-500/10' },
  { icon: MessageSquare,'title': 'Answers FAQs verbally',  desc: 'Prices, hours, directions, policies — handled naturally by voice.', color: 'text-accent-400', bg: 'bg-accent-500/10' },
  { icon: Clock,        title: 'Routes complex calls',     desc: 'When a query needs a human, it transfers gracefully with a summary of what was discussed.', color: 'text-orange-400', bg: 'bg-orange-500/10' },
];

const callExamples = [
  { caller: 'Patient calls dental clinic:', transcript: '"Hi, I\'d like to book a check-up for next Tuesday afternoon." → Bot checks calendar, offers slots, confirms booking.' },
  { caller: 'Customer calls salon:', transcript: '"What\'s the price for a full colour and how long does it take?" → Bot answers instantly with correct pricing.' },
  { caller: 'Caller asks for directions:', transcript: '"How do I get to you from the town centre?" → Bot gives directions and sends a text with a maps link.' },
];

const RestaurantAnalyticsModal = () => (
  <div className="space-y-8 text-slate-300">
    {/* Intro */}
    <div className="flex items-start gap-5">
      <div className="w-14 h-14 rounded-2xl bg-accent-500/15 border border-accent-500/20
                      flex items-center justify-center flex-shrink-0">
        <Mic className="w-7 h-7 text-accent-400" />
      </div>
      <div>
        <p className="text-slate-300 leading-relaxed">
          Every missed call is a missed customer. Our Voice AI answers your phone 24/7,
          handles bookings, answers questions, and routes complex calls to your team —
          all in a natural, conversational voice that represents your brand.
        </p>
      </div>
    </div>

    {/* What it does */}
    <div>
      <h4 className="text-white font-semibold mb-4">What the Voice AI handles</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {capabilities.map((c) => (
          <div key={c.title} className="flex items-start gap-4 p-4 rounded-xl bg-white/03 border border-white/06">
            <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center flex-shrink-0`}>
              <c.icon className={`w-4 h-4 ${c.color}`} />
            </div>
            <div>
              <div className="text-white text-sm font-semibold mb-0.5">{c.title}</div>
              <div className="text-slate-500 text-xs leading-relaxed">{c.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Example calls */}
    <div>
      <h4 className="text-white font-semibold mb-4">Real call examples</h4>
      <div className="space-y-3">
        {callExamples.map((e) => (
          <div key={e.caller} className="p-4 rounded-xl bg-white/03 border border-white/06">
            <div className="text-xs text-slate-500 font-medium mb-2">{e.caller}</div>
            <div className="text-sm text-slate-200 leading-relaxed">{e.transcript}</div>
            <div className="flex items-center gap-1.5 mt-2">
              <CheckCircle className="w-3.5 h-3.5 text-accent-400" />
              <span className="text-xs text-accent-400">Handled without human involvement</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Call transcription */}
    <div className="p-5 rounded-xl bg-accent-500/05 border border-accent-500/15">
      <h4 className="text-white font-semibold mb-3">Every call is transcribed & logged</h4>
      <p className="text-slate-400 text-sm leading-relaxed mb-4">
        Full transcripts of every call appear in your admin panel. Review what customers are asking,
        spot recurring issues, and use the data to improve your service.
      </p>
      <div className="flex flex-wrap gap-2">
        {['Full transcripts', 'Caller intent summary', 'Booking confirmations', 'Missed call alerts', 'Call volume analytics'].map((f) => (
          <span key={f} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                                    bg-white/05 border border-white/08 text-xs text-slate-300">
            <CheckCircle className="w-3 h-3 text-accent-400" />
            {f}
          </span>
        ))}
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-3 gap-4 p-5 rounded-xl bg-gradient-to-r from-accent-500/08 to-primary-500/08 border border-white/06">
      {[
        { v: '100%', l: 'Calls answered' },
        { v: '24/7', l: 'No holidays, no sick days' },
        { v: '70%', l: 'Calls resolved without human' },
      ].map((s) => (
        <div key={s.l} className="text-center">
          <div className="text-2xl font-bold text-accent-400 mb-1">{s.v}</div>
          <div className="text-slate-500 text-xs">{s.l}</div>
        </div>
      ))}
    </div>

    {/* Works for */}
    <div>
      <h4 className="text-white font-semibold mb-3">Best suited for</h4>
      <div className="flex flex-wrap gap-2">
        {['Dental & medical clinics', 'Salons & spas', 'Gyms & fitness studios', 'Restaurants (reservations)', 'Law firms', 'Auto garages'].map((t) => (
          <span key={t} className="px-3 py-1.5 rounded-full bg-white/05 border border-white/08 text-xs text-slate-300">
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default RestaurantAnalyticsModal;
