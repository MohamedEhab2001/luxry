import { ObjectId } from "mongodb";

export const products = [
  {
    _id: new ObjectId("66a000000000000000000001"),
    name: "Aurora Runner",
    slug: "aurora-runner",
    categorySlug: "sneakers",
    brand: "Luxry Labs",
    description: "Performance knit sneaker with gradient sole and limited-release colorways.",
    status: "active",
    tags: ["performance", "limited-edition"],
    limitedEdition: {
      isLimited: true,
      dropName: "Polar Midnight",
      totalUnits: 500,
      releaseDate: "2024-11-15"
    },
    media: {
      gallery: [
        "https://cdn.example.com/products/aurora-runner/hero.jpg",
        "https://cdn.example.com/products/aurora-runner/side.jpg"
      ],
      model3d: "https://cdn.example.com/products/aurora-runner/model.glb"
    },
    variants: [
      {
        sku: "AR-PM-080",
        title: "Polar Midnight 8",
        size: "8",
        color: "Polar Midnight",
        price: 240,
        compareAtPrice: 280,
        inventory: 40,
        dimensions: { weightKg: 0.9 },
        barcode: "123456789080"
      },
      {
        sku: "AR-PM-090",
        title: "Polar Midnight 9",
        size: "9",
        color: "Polar Midnight",
        price: 240,
        compareAtPrice: 280,
        inventory: 30,
        dimensions: { weightKg: 0.92 },
        barcode: "123456789090"
      }
    ]
  },
  {
    _id: new ObjectId("66a000000000000000000002"),
    name: "Stratus Tote",
    slug: "stratus-tote",
    categorySlug: "bags",
    brand: "Maison Éclat",
    description: "Featherlight ripstop tote with magnetic closure and modular straps.",
    status: "active",
    tags: ["carry-on", "modular"],
    limitedEdition: {
      isLimited: false,
      dropName: null,
      totalUnits: null,
      releaseDate: null
    },
    media: {
      gallery: [
        "https://cdn.example.com/products/stratus-tote/hero.jpg",
        "https://cdn.example.com/products/stratus-tote/detail.jpg"
      ],
      video: "https://cdn.example.com/products/stratus-tote/promo.mp4"
    },
    variants: [
      {
        sku: "ST-NV-OS",
        title: "Navy / One Size",
        size: "One Size",
        color: "Navy",
        price: 320,
        compareAtPrice: null,
        inventory: 100,
        dimensions: { weightKg: 0.65, lengthCm: 38, widthCm: 10, heightCm: 35 },
        barcode: "223456789000"
      },
      {
        sku: "ST-SN-OS",
        title: "Sand / One Size",
        size: "One Size",
        color: "Sand",
        price: 320,
        compareAtPrice: null,
        inventory: 120,
        dimensions: { weightKg: 0.65, lengthCm: 38, widthCm: 10, heightCm: 35 },
        barcode: "323456789000"
      }
    ]
  }
];
