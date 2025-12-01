import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { UserModel } from './models/User';
import { connectToDatabase } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export async function registerUser(email: string, password: string, name?: string) {
  await connectToDatabase();
  const hashed = await bcrypt.hash(password, 10);
  const user = await UserModel.create({ email, passwordHash: hashed, name });
  return user;
}

export async function loginUser(email: string, password: string) {
  await connectToDatabase();
  const user = await UserModel.findOne({ email });
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  const token = jwt.sign({ sub: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  cookies().set('session', token, { httpOnly: true, sameSite: 'lax', path: '/' });
  return user;
}

export async function getCurrentUser() {
  const token = cookies().get('session')?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { sub: string };
    await connectToDatabase();
    const user = await UserModel.findById(decoded.sub);
    return user;
  } catch (err) {
    return null;
  }
}
