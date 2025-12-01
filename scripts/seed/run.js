import connect from "./db.js";
import { categories } from "./data/categories.js";
import { products } from "./data/products.js";
import { promoCodes } from "./data/promoCodes.js";
import { shippingRates } from "./data/shippingRates.js";
import { users, orders } from "./data/usersAndOrders.js";

async function seedCollection(collection, documents, key) {
  if (!documents.length) return;

  for (const doc of documents) {
    const filter = key ? { [key]: doc[key] } : { _id: doc._id };
    await collection.updateOne(filter, { $set: doc }, { upsert: true });
  }
}

async function run() {
  const { client, db } = await connect();
  try {
    console.info("🌱 Seeding started...");

    await seedCollection(db.collection("categories"), categories, "slug");
    console.info(`✔️  Categories upserted: ${categories.length}`);

    await seedCollection(db.collection("products"), products, "slug");
    console.info(`✔️  Products upserted: ${products.length}`);

    await seedCollection(db.collection("shipping_rates"), shippingRates, "name");
    console.info(`✔️  Shipping rates upserted: ${shippingRates.length}`);

    await seedCollection(db.collection("promo_codes"), promoCodes, "code");
    console.info(`✔️  Promo codes upserted: ${promoCodes.length}`);

    await seedCollection(db.collection("users"), users, "email");
    console.info(`✔️  Users upserted: ${users.length}`);

    await seedCollection(db.collection("orders"), orders);
    console.info(`✔️  Orders upserted: ${orders.length}`);

    console.info("✅ Seeding completed.");
  } catch (error) {
    console.error("❌ Seeding failed", error);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

run();
