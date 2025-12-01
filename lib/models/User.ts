import mongoose, { Schema, model, models } from 'mongoose';
import AddressSchema from './Address';

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: String,
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    addresses: [AddressSchema],
  },
  { timestamps: true }
);

export type UserDocument = mongoose.InferSchemaType<typeof UserSchema>;
export const UserModel = models.User || model('User', UserSchema);
