'use client';

import { useState } from 'react';
import { useCart } from '@/components/cart/cart-provider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { trackCheckoutStart } from '@/lib/analytics';
import { calculateShippingFee } from '@/lib/shipping';
import { applyPromo } from '@/lib/pricing';

const cities = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Doha'];

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const [city, setCity] = useState(cities[0]);
  const [promo, setPromo] = useState('');
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = applyPromo(promo, subtotal).discount;
  const shippingFee = calculateShippingFee(city, subtotal - discount);
  const total = subtotal - discount + shippingFee;

  const handleSubmit = async () => {
    trackCheckoutStart(total);
    await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city, promoCode: promo, items }),
    });
    clear();
    alert('Order created. COD and Instapay placeholders validated.');
  };

  return (
    <div className="container grid gap-8 py-10 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <div className="card-surface space-y-4 p-6">
          <div>
            <h1 className="text-2xl font-semibold">Checkout</h1>
            <p className="text-sm text-zinc-500">Guest checkout with address capture and shipping options.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input placeholder="Full name" />
            <Input placeholder="Email" type="email" />
            <Input placeholder="Phone" />
            <Input placeholder="City" list="cities" value={city} onChange={(e) => setCity(e.target.value)} />
            <datalist id="cities">
              {cities.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            <Input placeholder="Street" className="sm:col-span-2" />
            <Input placeholder="Postal Code" />
            <Input placeholder="Country" value="UAE" readOnly />
          </div>
        </div>

        <div className="card-surface space-y-3 p-6">
          <h2 className="text-lg font-semibold">Payment</h2>
          <div className="space-y-2 text-sm text-zinc-400">
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" defaultChecked /> Cash on Delivery (validated)
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" /> Instapay (placeholder)
            </label>
            <p className="text-xs text-zinc-500">Payment hooks ensure amounts and availability are revalidated server-side.</p>
          </div>
        </div>
      </div>

      <div className="card-surface space-y-4 p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-400">Subtotal</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-400">Promo</span>
          <div className="flex items-center gap-2">
            <Input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Code" className="w-32" />
            <span className="text-gold-400">-${discount.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-400">Shipping ({city})</span>
          <span>${shippingFee.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-zinc-800 pt-3 text-lg font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <Button onClick={handleSubmit} className="w-full">
          Place order
        </Button>
      </div>
    </div>
  );
}
