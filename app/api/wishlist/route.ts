import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { UserModel } from '@/lib/models/User';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ wishlist: [] });
  return NextResponse.json({ wishlist: user.wishlist || [] });
}

export async function POST(request: Request) {
  const { productId } = await request.json();
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectToDatabase();
  if (!user.wishlist?.includes(productId)) {
    user.wishlist = [...(user.wishlist || []), productId];
    await user.save();
  }
  return NextResponse.json({ wishlist: user.wishlist });
}
