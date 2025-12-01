'use client';

import Link from 'next/link';
import { Product } from '@/types';
import { ProductGallery } from './product-gallery';

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <article key={product.id} className="card-surface flex flex-col overflow-hidden">
          <ProductGallery images={product.images} showControls={false} />
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              {product.badges?.map((badge) => (
                <span key={badge} className="text-[10px] uppercase tracking-widest text-gold-400 border border-gold-500/60 px-2 py-1 rounded-full">
                  {badge}
                </span>
              ))}
            </div>
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-sm text-zinc-400 line-clamp-2">{product.description}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-semibold text-gold-400">${(product.price - (product.discount ?? 0)).toFixed(0)}</span>
              {product.discount ? (
                <span className="text-sm text-zinc-500 line-through">${product.price}</span>
              ) : null}
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-zinc-500">{product.status}</span>
              <Link className="text-sm text-gold-400" href={`/product/${product.id}`}>
                View details
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
