import { useSyncExternalStore } from 'react';
import type { Dish } from './data';

export type CartLine = { dish: Dish; qty: number };

const KEY = 'saffron-ember-cart';

let cart: CartLine[] = load();
const listeners = new Set<() => void>();

function load(): CartLine[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persist() {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(cart));
    } catch {
      /* ignore */
    }
  }
}

function emit() {
  persist();
  listeners.forEach((l) => l());
}

export const cartStore = {
  add(dish: Dish) {
    const line = cart.find((l) => l.dish.id === dish.id);
    if (line) {
      cart = cart.map((l) => (l.dish.id === dish.id ? { ...l, qty: l.qty + 1 } : l));
    } else {
      cart = [...cart, { dish, qty: 1 }];
    }
    emit();
  },
  setQty(id: string, qty: number) {
    if (qty <= 0) {
      cart = cart.filter((l) => l.dish.id !== id);
    } else {
      cart = cart.map((l) => (l.dish.id === id ? { ...l, qty } : l));
    }
    emit();
  },
  remove(id: string) {
    cart = cart.filter((l) => l.dish.id !== id);
    emit();
  },
  clear() {
    cart = [];
    emit();
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  snapshot() {
    return cart;
  },
};

const emptySnapshot: CartLine[] = [];

export function useCart() {
  return useSyncExternalStore(
    cartStore.subscribe,
    cartStore.snapshot,
    () => emptySnapshot,
  );
}

export function cartCount(lines: CartLine[]) {
  return lines.reduce((n, l) => n + l.qty, 0);
}

export function cartTotal(lines: CartLine[]) {
  return lines.reduce((n, l) => n + l.qty * l.dish.price, 0);
}
