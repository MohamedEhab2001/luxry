import mongoose, { Schema, model, models } from 'mongoose';

const AddressSchema = new Schema(
  {
    label: String,
    name: String,
    phone: String,
    street: String,
    city: String,
    country: String,
    postalCode: String,
  },
  { timestamps: true }
);

export type AddressDocument = mongoose.InferSchemaType<typeof AddressSchema>;
export const AddressModel = models.Address || model('Address', AddressSchema);
export default AddressSchema;
