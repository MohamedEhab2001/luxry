import { Product, Category } from '@/types';

export const categories: Category[] = [
  { slug: 'table-lamps', name: 'Table Lamps', description: 'Compact statements for desks and consoles.' },
  { slug: 'floor-lamps', name: 'Floor Lamps', description: 'Sculptural floor pieces to anchor rooms.' },
  { slug: 'limited-editions', name: 'Limited Editions', description: 'Numbered drops with artisanal finishes.' },
];

export const sampleProducts: Product[] = [
  {
    id: 'aurora-table',
    title: 'Aurora Table Lamp',
    category: 'table-lamps',
    description: 'Hand-polished brass armature with smoked glass diffuser.',
    price: 420,
    discount: 40,
    images: ['/images/aurora-1.jpg', '/images/aurora-2.jpg'],
    lifestyleImages: ['/images/aurora-lifestyle.jpg'],
    videoUrl: 'https://example.com/aurora.mp4',
    stock: 12,
    status: 'In Stock',
    sku: 'AUR-TBL-01',
    variants: [
      { color: 'Brass', size: 'Standard', bulbType: 'E26', sku: 'AUR-TBL-01', stock: 6 },
      { color: 'Onyx', size: 'Standard', bulbType: 'E26', sku: 'AUR-TBL-02', stock: 6 }
    ],
    badges: ['Bestseller'],
    edition: { label: 'Signature Series', number: null },
    shippingClass: 'standard',
    bulbsIncluded: true,
    lifestyleCopy: 'Built for modern workspaces with a warm gold glow.',
  },
  {
    id: 'pillar-floor',
    title: 'Pillar Floor Lamp',
    category: 'floor-lamps',
    description: 'Architectural column silhouette with dimmable LED core.',
    price: 780,
    discount: 120,
    images: ['/images/pillar-1.jpg', '/images/pillar-2.jpg'],
    lifestyleImages: ['/images/pillar-lifestyle.jpg'],
    videoUrl: 'https://example.com/pillar.mp4',
    stock: 8,
    status: 'In Stock',
    sku: 'PIL-FLR-01',
    variants: [
      { color: 'Brushed Steel', size: 'Tall', bulbType: 'Integrated LED', sku: 'PIL-FLR-01', stock: 4 },
      { color: 'Matte Black', size: 'Tall', bulbType: 'Integrated LED', sku: 'PIL-FLR-02', stock: 4 }
    ],
    badges: ['Statement'],
    edition: { label: 'Atelier', number: null },
    shippingClass: 'freight',
    bulbsIncluded: true,
    lifestyleCopy: 'A sculptural anchor point for lounges and lobbies.',
  },
  {
    id: 'eclipse-limited',
    title: 'Eclipse Limited',
    category: 'limited-editions',
    description: 'Numbered marble base with floating opal disc diffuser.',
    price: 1250,
    discount: 200,
    images: ['/images/eclipse-1.jpg', '/images/eclipse-2.jpg'],
    lifestyleImages: ['/images/eclipse-lifestyle.jpg'],
    videoUrl: 'https://example.com/eclipse.mp4',
    stock: 3,
    status: 'Preorder',
    sku: 'ECL-LTD-01',
    variants: [
      { color: 'Carrara', size: 'Limited', bulbType: 'G9', sku: 'ECL-LTD-01', stock: 2 },
      { color: 'Nero', size: 'Limited', bulbType: 'G9', sku: 'ECL-LTD-02', stock: 1 }
    ],
    badges: ['Limited', 'Numbered'],
    edition: { label: 'Limited', number: 50 },
    shippingClass: 'white-glove',
    bulbsIncluded: false,
    lifestyleCopy: 'Editioned piece for curated interiors.',
  }
];

export const samplePromoCodes = [
  { code: 'WELCOME10', discountType: 'percentage', amount: 10, minimum: 200 },
  { code: 'FREESHIP', discountType: 'shipping', amount: 0, minimum: 150 },
];
