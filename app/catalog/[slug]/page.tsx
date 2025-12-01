import { notFound } from 'next/navigation';
import { categories, sampleProducts } from '@/lib/data';
import { ProductGrid } from '@/components/product/product-grid';
import { trackPageView } from '@/lib/analytics';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) return notFound();
  trackPageView(`category:${params.slug}`);
  const products = sampleProducts.filter((p) => p.category === category.slug);
  return (
    <div className="container space-y-6 py-10">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.2em] text-gold-400">{category.name}</p>
        <h1 className="text-3xl font-semibold">{category.description}</h1>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
