import { samplePromoCodes } from './data';

export function applyPromo(code: string, subtotal: number) {
  if (!code) return { discount: 0 };
  const promo = samplePromoCodes.find((p) => p.code.toLowerCase() === code.toLowerCase());
  if (!promo || subtotal < promo.minimum) return { discount: 0 };

  if (promo.discountType === 'percentage') return { discount: (subtotal * promo.amount) / 100 };
  if (promo.discountType === 'shipping') return { discount: 0 };
  return { discount: promo.amount };
}
