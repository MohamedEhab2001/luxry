import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { ProductModel } from '@/lib/models/Product';
import { sampleProducts } from '@/lib/data';

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  try {
    await connectToDatabase();
    const product = await ProductModel.findOne({ id: slug }).lean();
    if (product) return NextResponse.json({ product });
  } catch (err) {
    // ignore
  }
  const fallback = sampleProducts.find((p) => p.id === slug);
  if (!fallback) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ product: fallback });
}
