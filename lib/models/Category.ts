import mongoose, { Schema, model, models } from 'mongoose';

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
  },
  { timestamps: true }
);

export type CategoryDocument = mongoose.InferSchemaType<typeof CategorySchema>;
export const CategoryModel = models.Category || model('Category', CategorySchema);
