import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Check, Tag, PartyPopper } from 'lucide-react';
import { subscribe, getCart, getSubtotal, setQty, removeItem, clearCart, type CartItem } from './cartStore';

const PROMO = 'GROW10';

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promo, setPromo] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [step, setStep] = useState<'cart' | 'checkout' | 'done'>('cart');

  // checkout form
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', zip: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const refresh = () => setItems([...getCart()]);
  useEffect(() => {
    refresh();
    return subscribe(refresh);
  }, []);

  const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);
  const shipping = subtotal === 0 || subtotal >= 50 ? 0 : 7;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = Math.max(0, subtotal - discount + shipping);

  const applyPromo = () => {
    if (promo.trim().toUpperCase() === PROMO) {
      setPromoApplied(true); setPromoError('');
    } else {
      setPromoApplied(false); setPromoError('That code is not valid. Try GROW10.');
    }
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!/^\d{4,6}$/.test(form.zip)) e.zip = 'Enter a valid ZIP';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStep('done');
    clearCart();
  };

  // ---------- DONE ----------
  if (step === 'done') {
    return (
      <div className="bg-stone-50 min-h-screen pt-32 pb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto text-center rounded-3xl bg-white border border-stone-200 p-10 shadow-sm"
        >
          <div className="w-16 h-16 rounded-full bg-lime-200 text-emerald-800 flex items-center justify-center mx-auto mb-5">
            <PartyPopper className="w-8 h-8" />
          </div>
          <h1 className="font-display text-3xl font-bold text-emerald-900">Order confirmed!</h1>
          <p className="text-stone-500 mt-3">
            Thanks {form.name.split(' ')[0] || 'friend'} — a confirmation is on its way to{' '}
            <span className="text-emerald-700 font-medium">{form.email}</span>. Your plants will be lovingly packed and shipped within 1–2 days. 🌿
          </p>
          <p className="mt-4 text-sm text-stone-400">Order #FW-{Math.floor(100000 + Math.random() * 899999)}</p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/demo/retail-shops/shop" className="px-6 py-3 rounded-full bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition-colors">Keep shopping</a>
            <a href="/demo/retail-shops/" className="px-6 py-3 rounded-full border border-stone-200 text-stone-700 font-medium hover:bg-stone-100 transition-colors">Back home</a>
          </div>
        </motion.div>
      </div>
    );
  }

  // ---------- EMPTY ----------
  if (items.length === 0) {
    return (
      <div className="bg-stone-50 min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-lg mx-auto text-center rounded-3xl bg-white border border-stone-200 p-12">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-5">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="font-display text-2xl font-bold text-emerald-900">Your cart is empty</h1>
          <p className="text-stone-500 mt-2">Let's find some green friends for your home.</p>
          <a href="/demo/retail-shops/shop" className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition-colors">
            Browse the shop <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  // ---------- CART + CHECKOUT ----------
  return (
    <div className="bg-stone-50 min-h-screen pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold text-emerald-900 mb-2">
          {step === 'cart' ? 'Your cart' : 'Checkout'}
        </h1>
        <p className="text-stone-500 mb-8">
          {step === 'cart' ? `${items.reduce((n, i) => n + i.qty, 0)} items` : 'Just a few details and your plants are on their way.'}
        </p>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          {/* LEFT */}
          <div>
            {step === 'cart' ? (
              <div className="space-y-4">
                <AnimatePresence>
                  {items.map((it) => (
                    <motion.div
                      layout
                      key={it.id + it.variant}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -30 }}
                      className="flex gap-4 rounded-3xl bg-white border border-stone-200 p-4"
                    >
                      <div className={`w-20 h-20 shrink-0 rounded-2xl bg-gradient-to-br ${it.gradient} flex items-center justify-center text-4xl`}>
                        {it.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-2">
                          <div>
                            <p className="font-semibold text-stone-800">{it.name}</p>
                            <p className="text-sm text-stone-400">{it.variant}</p>
                          </div>
                          <button onClick={() => removeItem(it.id, it.variant)} className="text-stone-400 hover:text-rose-500 transition-colors" aria-label="Remove">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="flex justify-between items-end mt-3">
                          <div className="flex items-center rounded-full border border-stone-200">
                            <button onClick={() => setQty(it.id, it.variant, it.qty - 1)} className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-emerald-700" aria-label="Decrease"><Minus className="w-3.5 h-3.5" /></button>
                            <span className="w-8 text-center text-sm font-medium">{it.qty}</span>
                            <button onClick={() => setQty(it.id, it.variant, it.qty + 1)} className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-emerald-700" aria-label="Increase"><Plus className="w-3.5 h-3.5" /></button>
                          </div>
                          <span className="font-semibold text-emerald-800">${(it.price * it.qty).toFixed(2)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div className="flex justify-between pt-2">
                  <a href="/demo/retail-shops/shop" className="text-sm text-emerald-700 hover:underline">← Continue shopping</a>
                  <button onClick={() => clearCart()} className="text-sm text-stone-400 hover:text-rose-500">Clear cart</button>
                </div>
              </div>
            ) : (
              <form onSubmit={placeOrder} className="rounded-3xl bg-white border border-stone-200 p-6 space-y-4">
                <Field label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} error={errors.name} placeholder="Jamie Rivera" />
                <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} error={errors.email} placeholder="jamie@email.com" type="email" />
                <Field label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} error={errors.address} placeholder="22 Fern Street" />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} error={errors.city} placeholder="Portland" />
                  <Field label="ZIP" value={form.zip} onChange={(v) => setForm({ ...form, zip: v })} error={errors.zip} placeholder="97214" />
                </div>
                <div className="rounded-2xl bg-stone-50 border border-stone-200 p-4 text-sm text-stone-500 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" /> This is a demo — no real payment is taken.
                </div>
                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={() => setStep('cart')} className="px-5 py-3 rounded-full border border-stone-200 text-stone-700 font-medium hover:bg-stone-100">Back</button>
                  <button type="submit" className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition-colors">
                    Place order · ${total.toFixed(2)}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT — summary */}
          <div className="rounded-3xl bg-white border border-stone-200 p-6 lg:sticky lg:top-36">
            <h2 className="font-display text-lg font-semibold text-emerald-900 mb-4">Order summary</h2>

            {step === 'cart' && (
              <div className="mb-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      value={promo}
                      onChange={(e) => setPromo(e.target.value)}
                      placeholder="Promo code"
                      className="w-full pl-9 pr-3 py-2.5 rounded-full border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>
                  <button onClick={applyPromo} className="px-4 py-2.5 rounded-full bg-stone-800 text-white text-sm font-medium hover:bg-stone-900">Apply</button>
                </div>
                {promoApplied && <p className="text-xs text-emerald-600 mt-1.5">✓ GROW10 applied — 10% off!</p>}
                {promoError && <p className="text-xs text-rose-500 mt-1.5">{promoError}</p>}
                {!promoApplied && !promoError && <p className="text-xs text-stone-400 mt-1.5">Try code GROW10 for 10% off.</p>}
              </div>
            )}

            <div className="space-y-2.5 text-sm border-t border-stone-100 pt-4">
              <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              {promoApplied && <Row label="Discount (10%)" value={`-$${discount.toFixed(2)}`} green />}
              <Row label="Shipping" value={shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`} />
              {shipping > 0 && (
                <p className="text-xs text-amber-600">Add ${(50 - subtotal).toFixed(2)} more for free shipping.</p>
              )}
            </div>
            <div className="flex justify-between items-center border-t border-stone-100 mt-4 pt-4">
              <span className="font-semibold text-stone-800">Total</span>
              <span className="font-display text-2xl font-bold text-emerald-800">${total.toFixed(2)}</span>
            </div>

            {step === 'cart' && (
              <button
                onClick={() => setStep('checkout')}
                className="w-full mt-5 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition-colors"
              >
                Checkout <ArrowRight className="w-4 h-4" />
              </button>
            )}
            <p className="text-xs text-center text-stone-400 mt-3">🔒 Secure checkout · 30-day plant guarantee</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, green }: { label: string; value: string; green?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-stone-500">{label}</span>
      <span className={green ? 'text-emerald-600 font-medium' : 'text-stone-700'}>{value}</span>
    </div>
  );
}

function Field({
  label, value, onChange, error, placeholder, type = 'text',
}: { label: string; value: string; onChange: (v: string) => void; error?: string; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 ${error ? 'border-rose-300' : 'border-stone-200'}`}
      />
      {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
    </div>
  );
}
