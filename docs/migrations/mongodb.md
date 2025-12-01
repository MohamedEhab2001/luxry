# MongoDB schema evolution

Use the following versioned change sets as guidance for keeping environments aligned. Apply them with ad-hoc scripts or a migration runner such as `migrate-mongo`.

## v1.1.0 – Variant structure and product status
- Add a `status` field to products with allowed values `active`, `draft`, or `archived`.
- Promote variant dimensions to an embedded `dimensions` object (`weightKg`, `lengthCm`, `widthCm`, `heightCm`).
- Normalize variant identifiers by storing the SKU under `variants.sku` and using it in the orders `variantSku` field.
- Backfill existing products by setting `status: "active"` where missing and wrapping any existing dimensional fields into `dimensions`.
- Create an index on `products.status` and `products.variants.sku` for faster catalog queries.

## v1.2.0 – Limited editions and media metadata
- Introduce `limitedEdition` object on products with `isLimited`, `dropName`, `totalUnits`, and `releaseDate`.
- Add `media.gallery` (array of URLs) and optional `media.video` or `media.model3d` fields.
- Backfill `limitedEdition` as `{ isLimited: false, dropName: null, totalUnits: null, releaseDate: null }` for existing products.
- Update any merchandising UI code to respect `limitedEdition.isLimited` flags for badges and purchase limits.

## v1.3.0 – Orders lifecycle
- Add `status` to orders with values such as `paid`, `fulfilled`, `cancelled`, or `refunded`.
- Ensure order line items reference products by `_id` and variants by `variantSku`.
- Create indexes on `orders.status`, `orders.userId`, and `orders.createdAt`.
