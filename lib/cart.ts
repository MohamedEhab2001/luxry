import { cookies } from 'next/headers';
import { cartItemSchema, updateCartSchema } from './validators/cart';
import { CartItem } from '@/types';

const COOKIE_KEY = 'cart';

export function readCart(): CartItem[] {
  const data = cookies().get(COOKIE_KEY)?.value;
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function persistCart(items: CartItem[]) {
  cookies().set(COOKIE_KEY, JSON.stringify(items), { path: '/', maxAge: 60 * 60 * 24 * 7 });
}

export function addItemToCart(raw: unknown) {
  const parsed = cartItemSchema.safeParse(raw);
  if (!parsed.success) throw new Error('Invalid cart payload');
  const items = readCart();
  const idx = items.findIndex((i) => i.sku === parsed.data.sku);
  if (idx >= 0) {
    items[idx].quantity = Math.min(items[idx].quantity + parsed.data.quantity, items[idx].maxQuantity);
  } else {
    items.push(parsed.data);
  }
  persistCart(items);
  return items;
}

export function updateCartQuantity(raw: unknown) {
  const parsed = updateCartSchema.safeParse(raw);
  if (!parsed.success) throw new Error('Invalid update payload');
  const items = readCart();
  const item = items.find((i) => i.sku === parsed.data.sku);
  if (!item) throw new Error('Item not found');
  item.quantity = Math.min(parsed.data.quantity, item.maxQuantity);
  persistCart(items.filter((i) => i.quantity > 0));
  return readCart();
}

export function removeCartItem(sku: string) {
  const items = readCart().filter((i) => i.sku !== sku);
  persistCart(items);
  return items;
}
