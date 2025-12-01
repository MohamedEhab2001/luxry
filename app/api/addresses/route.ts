import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { UserModel } from '@/lib/models/User';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ addresses: [] });
  return NextResponse.json({ addresses: user.addresses || [] });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectToDatabase();
  user.addresses = [...(user.addresses || []), payload];
  await user.save();
  return NextResponse.json({ addresses: user.addresses });
}
