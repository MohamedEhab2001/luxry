import mongoose, { Schema, model, models } from 'mongoose';

const OrderItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    sku: String,
    title: String,
    price: Number,
    quantity: Number,
    variant: {
      color: String,
      size: String,
      bulbType: String,
    },
  },
  { _id: false }
);

const StatusSchema = new Schema(
  {
    label: String,
    note: String,
    at: { type: Date, default: Date.now },
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [OrderItemSchema],
    subtotal: Number,
    discount: Number,
    shippingFee: Number,
    total: Number,
    address: {
      label: String,
      name: String,
      phone: String,
      street: String,
      city: String,
      country: String,
      postalCode: String,
    },
    shippingClass: String,
    promoCode: String,
    paymentMethod: String,
    statusHistory: [StatusSchema],
  },
  { timestamps: true }
);

export type OrderDocument = mongoose.InferSchemaType<typeof OrderSchema>;
export const OrderModel = models.Order || model('Order', OrderSchema);
