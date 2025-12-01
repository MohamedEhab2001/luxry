import mongoose, { Schema, model, models } from 'mongoose';

const VariantSchema = new Schema(
  {
    color: String,
    size: String,
    bulbType: String,
    sku: { type: String, required: true },
    stock: { type: Number, default: 0 },
  },
  { _id: false }
);

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    images: [String],
    lifestyleImages: [String],
    videoUrl: String,
    stock: { type: Number, default: 0 },
    status: String,
    category: { type: String, index: true },
    sku: { type: String, unique: true },
    variants: [VariantSchema],
    badges: [String],
    edition: { label: String, number: Number },
    shippingClass: String,
    bulbsIncluded: { type: Boolean, default: false },
    lifestyleCopy: String,
  },
  { timestamps: true }
);

export type ProductDocument = mongoose.InferSchemaType<typeof ProductSchema>;
export const ProductModel = models.Product || model('Product', ProductSchema);
