import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Minus, Plus, Truck, ShieldCheck, Leaf, ArrowLeft, Check } from 'lucide-react';
import { products } from './data';
import { addToCart } from './cartStore';

export default function ProductPage({ id }: { id: string }) {
  const product = products.find((p) => p.id === id) ?? products[0];
  const [variant, setVariant] = useState(product.variants[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    addToCart(
      { id: product.id, name: product.name, variant: variant.label, price: variant.price, emoji: product.emoji, gradient: product.gradient },
      qty,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="bg-stone-50 text-stone-800 min-h-screen pt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <a href="/demo/retail-shops/shop" className="inline-flex items-center gap-1 text-sm text-emerald-700 hover:gap-2 transition-all mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to shop
        </a>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`relative rounded-3xl bg-gradient-to-br ${product.gradient} aspect-square flex items-center justify-center shadow-xl`}
          >
            <span className="text-[10rem] drop-shadow-lg">{product.emoji}</span>
            {product.petSafe && (
              <span className="absolute top-5 left-5 text-sm px-3 py-1.5 rounded-full bg-white/90 text-emerald-800 font-semibold">🐾 Pet-safe</span>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-sm font-medium text-emerald-700">{product.category}</span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-emerald-900 mt-1">{product.name}</h1>
            <p className="text-stone-500 mt-1">{product.tagline}</p>

            <div className="flex items-center gap-2 mt-3 text-sm">
              <span className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-amber-400" /> {product.rating}
              </span>
              <span className="text-stone-400">{product.reviews} reviews</span>
              <span className="text-stone-300">·</span>
              <span className="text-stone-500">{product.light} light</span>
            </div>

            <p className="font-display text-3xl font-bold text-emerald-800 mt-5">${variant.price}</p>

            <p className="text-stone-600 leading-relaxed mt-5">{product.description}</p>

            {/* Variants */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-stone-700 mb-2">Choose an option</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.label}
                    onClick={() => setVariant(v)}
                    className={`px-4 py-2 rounded-xl text-sm border transition-colors ${
                      variant.label === v.label
                        ? 'bg-emerald-700 text-white border-emerald-700'
                        : 'bg-white border-stone-200 text-stone-700 hover:border-emerald-300'
                    }`}
                  >
                    {v.label} · ${v.price}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty + add */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-full border border-stone-200 bg-white">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-stone-600 hover:text-emerald-700" aria-label="Decrease">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-medium">{qty}</span>
                <button onClick={() => setQty((q) => Math.min(product.inStock, q + 1))} className="w-10 h-10 flex items-center justify-center text-stone-600 hover:text-emerald-700" aria-label="Increase">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className={`flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-colors ${
                  added ? 'bg-lime-500 text-emerald-950' : 'bg-emerald-700 text-white hover:bg-emerald-800'
                }`}
              >
                {added ? <><Check className="w-5 h-5" /> Added to cart</> : <>Add {qty} · ${(variant.price * qty).toFixed(0)}</>}
              </button>
            </div>

            <p className="text-sm text-stone-500 mt-3">
              {product.inStock > 12 ? 'In stock — ships in 1–2 days' : `Hurry — only ${product.inStock} left in stock`}
            </p>

            {/* perks */}
            <div className="mt-7 grid grid-cols-3 gap-3 text-center">
              {[
                { icon: Truck, label: 'Free $50+' },
                { icon: ShieldCheck, label: '30-day promise' },
                { icon: Leaf, label: 'Care card incl.' },
              ].map((f) => (
                <div key={f.label} className="rounded-2xl bg-white border border-stone-200 py-3 px-2">
                  <f.icon className="w-5 h-5 mx-auto text-emerald-700 mb-1" />
                  <p className="text-xs text-stone-600">{f.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-emerald-900 mb-6">You might also like</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <a
                  key={p.id}
                  href={`/demo/retail-shops/product/${p.id}`}
                  className="group rounded-3xl border border-stone-200 overflow-hidden bg-white hover:shadow-lg transition-shadow"
                >
                  <div className={`aspect-square bg-gradient-to-br ${p.gradient} flex items-center justify-center`}>
                    <span className="text-6xl group-hover:scale-110 transition-transform">{p.emoji}</span>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <span className="font-medium text-stone-800">{p.name}</span>
                    <span className="font-bold text-emerald-800">${p.price}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
