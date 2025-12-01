'use client';

import Image from 'next/image';
import { useState } from 'react';

export function ProductGallery({ images, showControls = true }: { images: string[]; showControls?: boolean }) {
  const [active, setActive] = useState(0);

  return (
    <div className="relative bg-surface">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={images[active] || '/images/placeholder.jpg'}
          alt="Product image"
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 400px, 100vw"
        />
      </div>
      {showControls && (
        <div className="flex gap-2 overflow-x-auto px-3 pb-3 pt-2">
          {images.map((img, idx) => (
            <button
              key={img}
              className={`h-14 w-16 overflow-hidden rounded-lg border ${
                idx === active ? 'border-gold-500' : 'border-zinc-700'
              }`}
              onClick={() => setActive(idx)}
            >
              <Image src={img} alt="Thumbnail" width={120} height={90} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
