import Link from 'next/link';
import { ProductGrid } from '@/components/product/product-grid';
import { sampleProducts } from '@/lib/data';
import { trackPageView } from '@/lib/analytics';

export default function Home() {
  trackPageView('home');

  return (
    <div className="container space-y-12 py-12">
      <section className="rounded-3xl bg-gradient-to-br from-surface to-black/80 border border-zinc-800 p-10 shadow-glow">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <p className="text-gold-400 uppercase tracking-[0.2em] text-xs">New arrivals</p>
            <h1 className="text-4xl font-semibold">Illuminate with Character</h1>
            <p className="text-zinc-400 max-w-2xl">
              Explore sculptural lamps, limited editions, and hand-finished fixtures built for contemporary spaces.
            </p>
            <div className="flex items-center gap-3">
              <Link className="btn-primary" href="/catalog">
                Browse Catalog
              </Link>
              <Link className="btn-secondary" href="/catalog/limited-editions">
                Limited Editions
              </Link>
            </div>
          </div>
          <div className="relative h-48 w-full max-w-sm overflow-hidden rounded-2xl border border-gold-500/40 bg-[radial-gradient(circle_at_top_left,#d4af37_0,transparent_45%),radial-gradient(circle_at_bottom_right,#11131a_0,#0b0c10_45%)]" />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured Lamps</h2>
          <Link className="text-gold-400 text-sm" href="/catalog">
            View catalog
          </Link>
        </div>
        <ProductGrid products={sampleProducts.slice(0, 6)} />
      </section>
    </div>
  );
}
