# Luxry seeding toolkit

This repository contains MongoDB seed scripts, environment setup notes, and schema evolution guidance for Luxry.

## Quick start
1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and fill in connection/secrets.
3. Run `npm run seed` to upsert categories, products (with variants and media), shipping rates, promo codes, and demo users/orders.

Additional details are available in `docs/seed-instructions.md`, `docs/environment.md`, and `docs/migrations/mongodb.md`.
