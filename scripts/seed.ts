import { connectToDatabase } from '../lib/db';
import { CategoryModel } from '../lib/models/Category';
import { ProductModel } from '../lib/models/Product';
import { PromoCodeModel } from '../lib/models/PromoCode';
import { UserModel } from '../lib/models/User';
import { sampleProducts, categories, samplePromoCodes } from '../lib/data';
import bcrypt from 'bcryptjs';

async function seed() {
  await connectToDatabase();
  await CategoryModel.deleteMany({});
  await ProductModel.deleteMany({});
  await PromoCodeModel.deleteMany({});
  await UserModel.deleteMany({});

  await CategoryModel.insertMany(categories);
  await ProductModel.insertMany(sampleProducts.map((p) => ({ ...p, id: p.id })));
  await PromoCodeModel.insertMany(samplePromoCodes);
  await UserModel.create({ email: 'demo@luxry.test', passwordHash: await bcrypt.hash('password', 10), name: 'Demo User' });

  console.log('Seed complete');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
