import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { ReviewModel } from '@/lib/models/Review';

export async function GET() {
  try {
    await connectToDatabase();
    const reviews = await ReviewModel.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ reviews });
  } catch (err) {
    return NextResponse.json({ reviews: [] });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  try {
    await connectToDatabase();
    const review = await ReviewModel.create(body);
    return NextResponse.json({ review });
  } catch (err) {
    return NextResponse.json({ error: 'Unable to create review' }, { status: 400 });
  }
}
