const cityRates: Record<string, number> = {
  Dubai: 20,
  'Abu Dhabi': 25,
  Sharjah: 18,
  Doha: 35,
};

export function calculateShippingFee(city: string, subtotal: number) {
  if (subtotal >= 800) return 0;
  return cityRates[city] ?? 25;
}
