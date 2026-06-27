import { motion } from 'framer-motion';
import { ArrowRight, Star, Truck, ShieldCheck, Sparkles, Leaf } from 'lucide-react';
import { products, collections, testimonials, storeInfo } from './data';
import { addToCart } from './cartStore';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const featured = products.slice(0, 4);

  return (
    <div className="bg-stone-50 text-stone-800">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900">
        {/* decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-96 h-96 rounded-full bg-lime-400/10 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 text-emerald-100 text-xs font-medium mb-5 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" /> New season · 12 botanicals in stock
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Bring the <span className="text-lime-300">outside</span> in.
            </h1>
            <p className="mt-5 text-lg text-emerald-100/90 max-w-md leading-relaxed">
              {storeInfo.tagline}. Hand-picked plants, hand-thrown pots, and everything you need to keep them thriving.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/demo/retail-shops/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-lime-300 text-emerald-950 font-semibold hover:bg-lime-200 transition-colors shadow-lg shadow-lime-400/20"
              >
                Shop the collection <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/demo/retail-shops/shop?cat=Plants"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-emerald-400/40 text-white font-medium hover:bg-emerald-700/40 transition-colors"
              >
                Browse plants
              </a>
            </div>
            <div className="mt-8 flex items-center gap-6 text-emerald-100/80 text-sm">
              <span className="flex items-center gap-2"><Truck className="w-4 h-4" /> Free shipping $50+</span>
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> 30-day plant guarantee</span>
            </div>
          </motion.div>

          {/* Hero plant collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {featured.map((p, i) => (
              <motion.div
                key={p.id}
                animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0] }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
                className={`rounded-3xl bg-gradient-to-br ${p.gradient} aspect-square flex flex-col items-center justify-center text-white shadow-xl ${i % 2 ? 'mt-8' : ''}`}
              >
                <span className="text-6xl drop-shadow-lg">{p.emoji}</span>
                <span className="mt-3 text-xs font-medium px-3 py-1 rounded-full bg-black/20 backdrop-blur">
                  {p.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Collections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-emerald-900">Shop by collection</h2>
            <p className="text-stone-500 mt-1">Curated edits to find your perfect match.</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {collections.map((c, i) => (
            <motion.a
              key={c.title}
              href={c.href}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-3xl overflow-hidden p-6 h-44 flex flex-col justify-end text-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient}`} />
              <span className="absolute top-4 right-4 text-4xl">{c.emoji}</span>
              <div className="relative">
                <h3 className="font-display text-xl font-semibold">{c.title}</h3>
                <p className="text-sm text-white/85 mt-1">{c.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium mt-2 group-hover:gap-2 transition-all">
                  Shop now <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl font-bold text-emerald-900">Bestsellers</h2>
              <p className="text-stone-500 mt-1">Loved by thousands of plant parents.</p>
            </div>
            <a href="/demo/retail-shops/shop" className="hidden sm:inline-flex items-center gap-1 text-emerald-700 font-medium hover:gap-2 transition-all">
              View all <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p, i) => (
              <motion.div
                key={p.id}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group rounded-3xl border border-stone-200 overflow-hidden bg-white hover:shadow-xl transition-shadow flex flex-col"
              >
                <a href={`/demo/retail-shops/product/${p.id}`} className={`relative aspect-square bg-gradient-to-br ${p.gradient} flex items-center justify-center`}>
                  <span className="text-7xl drop-shadow-md group-hover:scale-110 transition-transform">{p.emoji}</span>
                  {p.petSafe && (
                    <span className="absolute top-3 left-3 text-xs px-2 py-1 rounded-full bg-white/90 text-emerald-800 font-semibold">🐾 Pet-safe</span>
                  )}
                </a>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-1 text-amber-500 text-xs mb-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {p.rating}
                    <span className="text-stone-400">({p.reviews})</span>
                  </div>
                  <a href={`/demo/retail-shops/product/${p.id}`} className="font-semibold text-stone-800 hover:text-emerald-700">{p.name}</a>
                  <p className="text-sm text-stone-500 flex-1 mt-0.5">{p.tagline}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-display text-lg font-bold text-emerald-800">${p.price}</span>
                    <button
                      onClick={() =>
                        addToCart({
                          id: p.id,
                          name: p.name,
                          variant: p.variants[0].label,
                          price: p.variants[0].price,
                          emoji: p.emoji,
                          gradient: p.gradient,
                        })
                      }
                      className="px-3 py-1.5 rounded-full bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Fernweh */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Leaf, title: 'Grown with care', desc: 'Every plant is nursery-raised, acclimatised and inspected before it ships.' },
            { icon: Truck, title: 'Carbon-neutral delivery', desc: 'Double-boxed, plastic-free packaging with offset shipping on every order.' },
            { icon: ShieldCheck, title: '30-day promise', desc: 'If your plant arrives unhappy, we replace it — no questions asked.' },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-3xl bg-white border border-stone-200 p-7"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-emerald-900">{f.title}</h3>
              <p className="text-sm text-stone-500 mt-2 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-emerald-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-white text-center mb-10">Loved by plant parents</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-3xl bg-emerald-800/60 border border-emerald-700/50 p-7 text-emerald-50"
              >
                <div className="flex gap-0.5 text-amber-400 mb-3">
                  {[...Array(5)].map((_, s) => <Star key={s} className="w-4 h-4 fill-amber-400" />)}
                </div>
                <p className="text-sm leading-relaxed text-emerald-100/90">“{t.quote}”</p>
                <div className="flex items-center gap-3 mt-5">
                  <span className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center text-lg">{t.emoji}</span>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-xs text-emerald-300">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl bg-gradient-to-r from-lime-200 to-emerald-200 p-10 sm:p-14 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-emerald-900">Ready to grow your jungle?</h2>
          <p className="text-emerald-800/80 mt-3 max-w-xl mx-auto">Free shipping on orders over $50. Your future plant family is one click away.</p>
          <a href="/demo/retail-shops/shop" className="inline-flex items-center gap-2 mt-6 px-7 py-3 rounded-full bg-emerald-800 text-white font-semibold hover:bg-emerald-900 transition-colors">
            Start shopping <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
