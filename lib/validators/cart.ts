import { z } from 'zod';

export const cartItemSchema = z.object({
  productId: z.string(),
  sku: z.string(),
  quantity: z.number().min(1),
  title: z.string(),
  price: z.number().min(0),
  image: z.string().optional(),
  variant: z
    .object({ color: z.string().optional(), size: z.string().optional(), bulbType: z.string().optional(), sku: z.string(), stock: z.number() })
    .optional(),
  maxQuantity: z.number().min(1),
});

export const updateCartSchema = z.object({
  sku: z.string(),
  quantity: z.number().min(0),
});
