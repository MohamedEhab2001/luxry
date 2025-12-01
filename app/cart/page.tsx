'use client';

import Link from 'next/link';
import { useCart } from '@/components/cart/cart-provider';
import { Button } from '@/components/ui/button';
import { trackPageView } from '@/lib/analytics';

export default function CartPage() {
  const { items, updateItem, removeItem } = useCart();
  trackPageView('cart');
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container space-y-8 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Cart</h1>
        <Link href="/checkout" className="btn-primary">
          Checkout
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.length === 0 && <p className="text-zinc-500">Your cart is empty.</p>}
          {items.map((item) => (
            <div key={item.sku} className="card-surface flex items-center justify-between gap-4 p-4">
              <div>
                <div className="text-lg font-semibold">{item.title}</div>
                <div className="text-sm text-zinc-500">SKU: {item.sku}</div>
                {item.variant && (
                  <div className="text-xs text-zinc-500">Variant: {[item.variant.color, item.variant.size, item.variant.bulbType].filter(Boolean).join(' / ')}</div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  max={item.maxQuantity}
                  value={item.quantity}
                  className="w-16 rounded-lg border border-zinc-800 bg-surface px-2 py-1"
                  onChange={(e) => updateItem(item.sku, Math.min(Number(e.target.value), item.maxQuantity))}
                />
                <div className="font-semibold text-gold-400">${(item.price * item.quantity).toFixed(0)}</div>
                <Button variant="ghost" onClick={() => removeItem(item.sku)}>
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="card-surface space-y-3 p-6">
          <div className="flex items-center justify-between text-sm text-zinc-400">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-zinc-400">
            <span>Shipping (estimate)</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="flex items-center justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <Link href="/checkout" className="btn-primary block text-center">
            Proceed to checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
