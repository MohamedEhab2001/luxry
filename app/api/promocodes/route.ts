import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { PromoCodeModel } from '@/lib/models/PromoCode';
import { samplePromoCodes } from '@/lib/data';

export async function GET() {
  try {
    await connectToDatabase();
    const codes = await PromoCodeModel.find().lean();
    if (codes.length === 0) return NextResponse.json({ codes: samplePromoCodes });
    return NextResponse.json({ codes });
  } catch (err) {
    return NextResponse.json({ codes: samplePromoCodes });
  }
}
