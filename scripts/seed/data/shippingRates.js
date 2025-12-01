export const shippingRates = [
  {
    name: "Domestic Standard",
    region: "US",
    minSubtotal: 0,
    maxSubtotal: 200,
    rate: 12,
    estimatedDays: "5-7",
    carrier: "Ground",
    status: "active"
  },
  {
    name: "Domestic Express",
    region: "US",
    minSubtotal: 0,
    maxSubtotal: null,
    rate: 28,
    estimatedDays: "2-3",
    carrier: "Air",
    status: "active"
  },
  {
    name: "International Priority",
    region: "Global",
    minSubtotal: 0,
    maxSubtotal: null,
    rate: 55,
    estimatedDays: "5-10",
    carrier: "DHL",
    status: "active"
  }
];
