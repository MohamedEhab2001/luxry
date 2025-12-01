import mongoose, { Schema, model, models } from 'mongoose';

const PromoCodeSchema = new Schema(
  {
    code: { type: String, unique: true },
    discountType: { type: String, enum: ['percentage', 'fixed', 'shipping'] },
    amount: Number,
    minimum: { type: Number, default: 0 },
    expiresAt: Date,
  },
  { timestamps: true }
);

export type PromoCodeDocument = mongoose.InferSchemaType<typeof PromoCodeSchema>;
export const PromoCodeModel = models.PromoCode || model('PromoCode', PromoCodeSchema);
