import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { ProductModel } from '@/lib/models/Product';
import { OrderModel } from '@/lib/models/Order';
import { applyPromo } from '@/lib/pricing';
import { calculateShippingFee } from '@/lib/shipping';
import { sampleProducts } from '@/lib/data';

export async function POST(request: Request) {
  const body = await request.json();
  const { items, city, promoCode, paymentMethod = 'COD', address } = body;
  if (!items?.length) return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });

  const subtotal = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
  const { discount } = applyPromo(promoCode, subtotal);
  const shippingFee = calculateShippingFee(city, subtotal - discount);
  const total = subtotal - discount + shippingFee;

  try {
    await connectToDatabase();
    for (const item of items) {
      const product = await ProductModel.findOne({ sku: item.sku });
      const available = product?.variants?.find((v: any) => v.sku === item.sku);
      const inStock = available?.stock ?? product?.stock ?? 0;
      if (inStock < item.quantity) {
        return NextResponse.json({ error: `Insufficient stock for ${item.sku}` }, { status: 422 });
      }
      if (product && available) {
        available.stock = Math.max(0, available.stock - item.quantity);
        product.stock = Math.max(0, (product.stock || 0) - item.quantity);
        await product.save();
      }
    }

    const order = await OrderModel.create({
      items,
      subtotal,
      discount,
      shippingFee,
      total,
      promoCode,
      paymentMethod,
      address,
      statusHistory: [{ label: 'Pending', at: new Date() }],
    });

    return NextResponse.json({ order });
  } catch (err) {
    // fallback with mock persistence
    const safeItems = items.map((item: any) => {
      const sample = sampleProducts.find((p) => p.sku === item.sku);
      if (sample && sample.variants.some((v) => v.sku === item.sku && v.stock < item.quantity)) {
        return null;
      }
      return item;
    });
    if (safeItems.includes(null)) return NextResponse.json({ error: 'Stock unavailable' }, { status: 422 });
    return NextResponse.json({
      order: {
        id: 'mock-order',
        subtotal,
        discount,
        shippingFee,
        total,
        statusHistory: [{ label: 'Pending', at: new Date() }],
      },
      warning: 'Database unavailable; order not persisted',
    });
  }
}
