'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import Cookies from 'js-cookie';
import { CartItem } from '@/types';
import useSWR from 'swr';
import { trackAddToCart } from '@/lib/analytics';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => Promise<void>;
  updateItem: (sku: string, quantity: number) => Promise<void>;
  removeItem: (sku: string) => Promise<void>;
  clear: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { data, mutate } = useSWR('/api/cart', fetcher, { fallbackData: { items: [] } });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items: (data?.items as CartItem[]) || [],
      addItem: async (item) => {
        trackAddToCart(item.sku, item.quantity);
        await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        });
        mutate();
      },
      updateItem: async (sku, quantity) => {
        await fetch('/api/cart', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sku, quantity }),
        });
        mutate();
      },
      removeItem: async (sku) => {
        await fetch('/api/cart', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sku }),
        });
        mutate();
      },
      clear: async () => {
        Cookies.remove('cart');
        mutate({ items: [] });
      },
    }),
    [data?.items, mutate],
  );

  if (!hydrated) return null;

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('Cart context missing');
  return ctx;
}
