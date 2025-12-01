import { NextResponse } from 'next/server';
import { registerUser } from '@/lib/auth';

export async function POST(request: Request) {
  const { email, password, name } = await request.json();
  if (!email || !password) return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
  try {
    const user = await registerUser(email, password, name);
    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ error: 'Unable to register' }, { status: 400 });
  }
}
