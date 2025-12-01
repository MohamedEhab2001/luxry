import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { ProductModel } from '@/lib/models/Product';
import { sampleProducts } from '@/lib/data';

export async function GET() {
  try {
    await connectToDatabase();
    const products = await ProductModel.find().lean();
    if (products.length === 0) return NextResponse.json({ products: sampleProducts });
    return NextResponse.json({ products });
  } catch (err) {
    return NextResponse.json({ products: sampleProducts, error: 'Database unavailable, serving sample data.' });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  try {
    await connectToDatabase();
    const product = await ProductModel.create(body);
    return NextResponse.json({ product });
  } catch (err) {
    return NextResponse.json({ error: 'Unable to create product' }, { status: 400 });
  }
}
