import { ObjectId } from "mongodb";

export const users = [
  {
    _id: new ObjectId("66b000000000000000000010"),
    email: "demo@luxry.test",
    passwordHash: "$2a$10$demoHashGoesHere",
    role: "customer",
    firstName: "Demo",
    lastName: "Customer",
    createdAt: new Date().toISOString()
  },
  {
    _id: new ObjectId("66b000000000000000000011"),
    email: "admin@luxry.test",
    passwordHash: "$2a$10$adminHashGoesHere",
    role: "admin",
    firstName: "Ada",
    lastName: "Admin",
    createdAt: new Date().toISOString()
  }
];

export const orders = [
  {
    _id: new ObjectId("66c000000000000000000100"),
    userId: users[0]._id,
    status: "paid",
    currency: "USD",
    subtotal: 480,
    shipping: 28,
    discount: 72,
    total: 436,
    shippingAddress: {
      name: "Demo Customer",
      line1: "123 Luxry Way",
      city: "Portland",
      state: "OR",
      postalCode: "97205",
      country: "US"
    },
    lineItems: [
      {
        productId: new ObjectId("66a000000000000000000001"),
        variantSku: "AR-PM-090",
        quantity: 2,
        price: 240,
        title: "Aurora Runner",
        variantTitle: "Polar Midnight 9"
      }
    ],
    createdAt: new Date().toISOString()
  }
];
