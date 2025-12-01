# Step-by-step seeding guide

These instructions are self-contained to bootstrap a Luxry database with categories, products, variants, media, promo codes, shipping rates, and demo users/orders.

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Create local environment file**
   ```bash
   cp .env.example .env.local
   # Update MONGO_URI, JWT_SECRET, Instapay keys, and storage settings
   ```
3. **Run the seeder**
   ```bash
   npm run seed
   ```
4. **Verify inserts**
   - Confirm collections: `categories`, `products`, `shipping_rates`, `promo_codes`, `users`, and `orders`.
   - Ensure product documents include `variants`, `media`, and `limitedEdition` objects.
5. **Re-run safely**
   - The seeder uses upserts keyed by slug, code, or email so it can be run repeatedly without duplicating data.

## Seeded datasets
- **Categories**: Sneakers, Bags, Accessories with hero imagery.
- **Products**: Includes variants with dimensions, pricing, and limited-edition metadata plus gallery/video/3D media.
- **Shipping rates**: Domestic standard/express and international priority with regional rules.
- **Promo codes**: Percentage and free-shipping examples with redemption caps.
- **Users & orders**: Demo customer/admin and a paid order referencing product variants.
