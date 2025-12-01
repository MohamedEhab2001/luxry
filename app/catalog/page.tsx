import Link from 'next/link';
import { categories, sampleProducts } from '@/lib/data';
import { ProductGrid } from '@/components/product/product-grid';
import { trackPageView } from '@/lib/analytics';

export default function CatalogPage() {
  trackPageView('catalog');
  return (
    <div className="container space-y-10 py-10">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.2em] text-gold-400">Catalog</p>
        <h1 className="text-3xl font-semibold">Lighting families</h1>
        <p className="text-zinc-500">Table lamps, floor lamps, and limited editions built for interiors.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.slug} href={`/catalog/${category.slug}`} className="card-surface p-6 hover:border-gold-500">
            <div className="text-sm uppercase tracking-[0.2em] text-zinc-500">{category.name}</div>
            <p className="text-sm text-zinc-400">{category.description}</p>
          </Link>
        ))}
      </div>

      <ProductGrid products={sampleProducts} />
    </div>
  );
}
