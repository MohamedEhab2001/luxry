import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { OrderModel } from '@/lib/models/Order';

export async function GET() {
  try {
    const user = await getCurrentUser();
    await connectToDatabase();
    const query = user ? { user: user._id } : {};
    const orders = await OrderModel.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ orders });
  } catch (err) {
    return NextResponse.json({ orders: [], error: 'Unable to fetch orders' }, { status: 500 });
  }
}
