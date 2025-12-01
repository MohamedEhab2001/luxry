export function trackPageView(name: string) {
  if (typeof window === 'undefined') return;
  console.debug('[analytics] page', name);
}

export function trackAddToCart(sku: string, quantity: number) {
  if (typeof window === 'undefined') return;
  console.debug('[analytics] add_to_cart', { sku, quantity });
}

export function trackCheckoutStart(amount: number) {
  if (typeof window === 'undefined') return;
  console.debug('[analytics] checkout_start', { amount });
}
