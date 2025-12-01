import mongoose, { Schema, model, models } from 'mongoose';

const ReviewSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
  },
  { timestamps: true }
);

export type ReviewDocument = mongoose.InferSchemaType<typeof ReviewSchema>;
export const ReviewModel = models.Review || model('Review', ReviewSchema);
