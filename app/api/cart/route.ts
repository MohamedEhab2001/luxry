import { NextResponse } from 'next/server';
import { addItemToCart, readCart, removeCartItem, updateCartQuantity } from '@/lib/cart';

export async function GET() {
  return NextResponse.json({ items: readCart() });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const items = addItemToCart(body);
    return NextResponse.json({ items });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid cart payload' }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const items = updateCartQuantity(body);
    return NextResponse.json({ items });
  } catch (err) {
    return NextResponse.json({ error: 'Update failed' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const items = removeCartItem(body.sku);
  return NextResponse.json({ items });
}
