// Tiny client-side cart store shared across components on a page.
// Uses a module-level array + subscriber pattern. Persists to localStorage
// so the cart survives page navigation within the demo.

export type CartItem = {
  id: string;
  name: string;
  variant: string;
  price: number;
  emoji: string;
  gradient: string;
  qty: number;
};

const STORAGE_KEY = 'fernweh-cart-v1';

let cart: CartItem[] = [];
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === 'undefined') return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) cart = JSON.parse(raw);
  } catch {
    cart = [];
  }
}

function persist() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {
    /* ignore */
  }
}

function emit() {
  persist();
  listeners.forEach((l) => l());
}

export function subscribe(fn: () => void) {
  load();
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getCart(): CartItem[] {
  load();
  return cart;
}

export function getCount(): number {
  load();
  return cart.reduce((n, i) => n + i.qty, 0);
}

export function getSubtotal(): number {
  load();
  return cart.reduce((n, i) => n + i.qty * i.price, 0);
}

function key(id: string, variant: string) {
  return `${id}__${variant}`;
}

export function addToCart(item: Omit<CartItem, 'qty'>, qty = 1) {
  load();
  const k = key(item.id, item.variant);
  const existing = cart.find((c) => key(c.id, c.variant) === k);
  if (existing) {
    existing.qty += qty;
  } else {
    cart = [...cart, { ...item, qty }];
  }
  emit();
}

export function setQty(id: string, variant: string, qty: number) {
  load();
  const k = key(id, variant);
  if (qty <= 0) {
    cart = cart.filter((c) => key(c.id, c.variant) !== k);
  } else {
    cart = cart.map((c) => (key(c.id, c.variant) === k ? { ...c, qty } : c));
  }
  emit();
}

export function removeItem(id: string, variant: string) {
  setQty(id, variant, 0);
}

export function clearCart() {
  load();
  cart = [];
  emit();
}
