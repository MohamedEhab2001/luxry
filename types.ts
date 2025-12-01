export type Variant = {
  color?: string;
  size?: string;
  bulbType?: string;
  sku: string;
  stock: number;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  discount?: number;
  images: string[];
  lifestyleImages?: string[];
  videoUrl?: string;
  stock: number;
  status: string;
  sku: string;
  variants: Variant[];
  badges?: string[];
  edition?: { label: string; number: number | null };
  shippingClass?: string;
  bulbsIncluded?: boolean;
  lifestyleCopy?: string;
};

export type Category = {
  slug: string;
  name: string;
  description?: string;
};

export type CartItem = {
  productId: string;
  sku: string;
  quantity: number;
  title: string;
  price: number;
  image?: string;
  variant?: Variant;
  maxQuantity: number;
};

export type Address = {
  _id?: string;
  label: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
};

export type UserProfile = {
  _id?: string;
  email: string;
  name?: string;
  password?: string;
  wishlist?: string[];
  addresses?: Address[];
};
