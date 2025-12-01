'use client';

import { notFound } from 'next/navigation';
import { sampleProducts } from '@/lib/data';
import { ProductGallery } from '@/components/product/product-gallery';
import { Button } from '@/components/ui/button';
import { useCart } from '@/components/cart/cart-provider';
import { trackPageView } from '@/lib/analytics';

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const product = sampleProducts.find((p) => p.id === params.slug);
  if (!product) return notFound();
  trackPageView(`product:${params.slug}`);
  return (
    <div className="container grid gap-10 py-10 lg:grid-cols-2">
      <ProductGallery images={product.images} />
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-gold-400">{product.category}</p>
          <h1 className="text-3xl font-semibold">{product.title}</h1>
          <p className="text-sm text-zinc-400">SKU: {product.sku}</p>
          <div className="flex items-center gap-3 text-xl font-semibold text-gold-400">
            <span>${(product.price - (product.discount ?? 0)).toFixed(2)}</span>
            {product.discount ? <span className="text-sm text-zinc-500 line-through">${product.price}</span> : null}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 p-4 space-y-3">
          <div className="flex gap-2 flex-wrap text-xs">
            {product.variants.map((variant) => (
              <span key={variant.sku} className="rounded-full border border-zinc-700 px-3 py-1 text-zinc-300">
                {variant.color} {variant.size} · {variant.stock} in stock
              </span>
            ))}
          </div>
          <VariantPicker productId={product.id} />
        </div>

        <p className="text-zinc-400 leading-relaxed">{product.description}</p>
        <p className="text-sm text-zinc-500">{product.lifestyleCopy}</p>
      </div>
    </div>
  );
}

function VariantPicker({ productId }: { productId: string }) {
  const { addItem } = useCart();
  const product = sampleProducts.find((p) => p.id === productId)!;
  const variant = product.variants[0];
  return (
    <Button
      onClick={() =>
        addItem({
          productId: product.id,
          sku: variant.sku,
          quantity: 1,
          title: product.title,
          price: product.price - (product.discount ?? 0),
          image: product.images[0],
          variant,
          maxQuantity: variant.stock,
        })
      }
    >
      Add to cart
    </Button>
  );
}
