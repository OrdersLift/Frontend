import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, CheckCircle2, ArrowRight, Clock } from 'lucide-react';
import { useCart, cartStore, cartTotal, cartCount } from './cartStore';

const SERVICE_RATE = 0.0; // collection, no service
const PACKAGING = 1.5;

export default function OrderView() {
  const cart = useCart();
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('ASAP (30 min)');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const subtotal = cartTotal(cart);
  const packaging = cart.length ? PACKAGING : 0;
  const total = subtotal + packaging;
  const count = cartCount(cart);

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (name.trim().length < 2) errs.name = 'Please enter your name';
    if (!/^[+\d][\d\s]{6,}$/.test(phone.trim())) errs.phone = 'Enter a valid phone number';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setOrderId('SE-' + Math.floor(1000 + Math.random() * 9000));
    setPlaced(true);
    cartStore.clear();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (placed) {
    return (
      <div className="bg-[#140d07] min-h-screen pt-32 pb-24 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto rounded-3xl bg-[#1a120b] border border-emerald-500/30 p-8 text-center"
        >
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.15 }}>
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
          </motion.div>
          <h1 className="font-serif text-3xl font-bold text-amber-50 mt-5">Order confirmed!</h1>
          <p className="text-amber-100/70 mt-2">
            Thanks {name.split(' ')[0]} — your order <span className="font-semibold text-amber-300">{orderId}</span> is in the kitchen.
          </p>
          <div className="mt-6 rounded-2xl bg-amber-500/10 p-4 flex items-center justify-center gap-2 text-amber-200">
            <Clock className="w-5 h-5" /> Ready for collection: <span className="font-semibold">{time}</span>
          </div>
          <p className="text-sm text-amber-100/50 mt-4">
            We'll text {phone} when it's ready. Collect at Rua das Brasas 14, Alfama.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href="/demo/restaurants/menu" className="rounded-full bg-gradient-to-r from-amber-500 to-rose-600 px-6 py-3 font-semibold text-white">Order more</a>
            <a href="/demo/restaurants/" className="rounded-full border border-amber-400/40 px-6 py-3 font-semibold text-amber-100 hover:bg-amber-400/10">Back home</a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#140d07] min-h-screen pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl font-bold text-amber-50">Your Order</h1>
        <p className="text-amber-100/60 mt-2">Collection from Alfama. {count} item{count !== 1 ? 's' : ''}.</p>

        {cart.length === 0 ? (
          <div className="mt-12 rounded-3xl bg-[#1a120b] border border-amber-500/20 p-12 text-center">
            <ShoppingBag className="w-12 h-12 text-amber-500/40 mx-auto" />
            <p className="mt-4 text-amber-100/70">Your basket is empty.</p>
            <a href="/demo/restaurants/menu" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 px-6 py-3 font-semibold text-white">
              Browse the menu <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <div className="mt-8 grid lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
            {/* line items */}
            <div className="space-y-3">
              <AnimatePresence>
                {cart.map((l) => (
                  <motion.div
                    key={l.dish.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-4 rounded-2xl bg-[#1a120b] border border-amber-500/15 p-4"
                  >
                    <div className="w-14 h-14 rounded-xl grid place-items-center bg-gradient-to-br from-amber-600/20 to-rose-700/20 text-2xl shrink-0">
                      {l.dish.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-amber-50 truncate">{l.dish.name}</p>
                      <p className="text-sm text-amber-300">€{l.dish.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => cartStore.setQty(l.dish.id, l.qty - 1)} className="grid place-items-center w-8 h-8 rounded-full bg-amber-500/10 text-amber-200 hover:bg-amber-500/20" aria-label="Decrease">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center font-semibold text-amber-50">{l.qty}</span>
                      <button onClick={() => cartStore.setQty(l.dish.id, l.qty + 1)} className="grid place-items-center w-8 h-8 rounded-full bg-amber-500/10 text-amber-200 hover:bg-amber-500/20" aria-label="Increase">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="w-16 text-right font-semibold text-amber-50">€{(l.qty * l.dish.price).toFixed(2)}</p>
                    <button onClick={() => cartStore.remove(l.dish.id)} className="text-rose-400/70 hover:text-rose-400 p-1" aria-label="Remove">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              <button onClick={() => cartStore.clear()} className="text-sm text-amber-100/50 hover:text-rose-400 transition">Clear basket</button>
            </div>

            {/* summary + checkout */}
            <form onSubmit={placeOrder} className="rounded-3xl bg-[#1a120b] border border-amber-500/20 p-6 lg:sticky lg:top-40">
              <h2 className="font-serif text-xl font-bold text-amber-50">Checkout</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-amber-100/70"><span>Subtotal</span><span>€{subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-amber-100/70"><span>Packaging</span><span>€{packaging.toFixed(2)}</span></div>
                <div className="flex justify-between text-lg font-bold text-amber-50 pt-2 border-t border-amber-500/20 mt-2"><span>Total</span><span>€{total.toFixed(2)}</span></div>
              </div>

              <div className="mt-5 space-y-3">
                <div>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-amber-500/10 text-amber-50 placeholder-amber-200/40 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-400/50"
                  />
                  {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    className="w-full bg-amber-500/10 text-amber-50 placeholder-amber-200/40 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-400/50"
                  />
                  {errors.phone && <p className="text-rose-400 text-xs mt-1">{errors.phone}</p>}
                </div>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-amber-500/10 text-amber-50 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-400/50"
                >
                  {['ASAP (30 min)', '18:30', '19:30', '20:30', '21:30'].map((t) => (
                    <option key={t} value={t} className="bg-[#1a120b]">{t}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="mt-5 w-full rounded-full bg-gradient-to-r from-amber-500 to-rose-600 px-6 py-3 font-semibold text-white shadow-lg shadow-rose-900/30 hover:brightness-110 transition">
                Place order · €{total.toFixed(2)}
              </button>
              <p className="text-[11px] text-amber-100/40 text-center mt-3">Demo only — no real payment is taken.</p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
