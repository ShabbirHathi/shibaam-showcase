export interface Product {
  id: number;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  features: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  // Hardware Items
  {
    id: 1,
    name: "Professional Tool Set - 150 Piece",
    category: "Hardware Items",
    categorySlug: "hardware",
    price: 4999,
    originalPrice: 6499,
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=500&h=500&fit=crop",
    description: "Complete professional tool set with premium chrome vanadium steel tools. Perfect for home repair and professional use.",
    features: ["Chrome Vanadium Steel", "Ergonomic Handles", "Lifetime Warranty", "Carrying Case Included"],
    inStock: true,
    rating: 4.8,
    reviews: 234
  },
  {
    id: 2,
    name: "Heavy Duty Hammer - 16oz",
    category: "Hardware Items",
    categorySlug: "hardware",
    price: 599,
    image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&h=500&fit=crop",
    description: "Professional grade hammer with fiberglass handle for reduced vibration and maximum durability.",
    features: ["Fiberglass Handle", "Anti-vibration Grip", "Forged Steel Head", "Balanced Weight"],
    inStock: true,
    rating: 4.6,
    reviews: 156
  },
  {
    id: 3,
    name: "Cordless Drill Machine 20V",
    category: "Hardware Items",
    categorySlug: "hardware",
    price: 3499,
    originalPrice: 4299,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&h=500&fit=crop",
    description: "Powerful 20V cordless drill with lithium-ion battery and 2-speed transmission for versatile drilling.",
    features: ["20V Lithium-Ion", "2-Speed Transmission", "LED Work Light", "Quick-Change Chuck"],
    inStock: true,
    rating: 4.9,
    reviews: 412
  },
  {
    id: 4,
    name: "Screwdriver Set - 25 Piece",
    category: "Hardware Items",
    categorySlug: "hardware",
    price: 899,
    image: "https://images.unsplash.com/photo-1426927308491-6380b6a9936f?w=500&h=500&fit=crop",
    description: "Comprehensive screwdriver set with magnetic tips and comfortable cushion-grip handles.",
    features: ["Magnetic Tips", "Cushion Grip", "Multiple Sizes", "Storage Rack"],
    inStock: true,
    rating: 4.5,
    reviews: 89
  },

  // Pipe & Sanitary
  {
    id: 5,
    name: "PVC Pipe Set - 2 Inch (10 Pack)",
    category: "Pipe & Sanitary",
    categorySlug: "sanitary",
    price: 1299,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&h=500&fit=crop",
    description: "High-quality PVC pipes ideal for plumbing installations. Durable and corrosion-resistant.",
    features: ["Corrosion Resistant", "Easy Installation", "Standard Fittings", "10 Year Warranty"],
    inStock: true,
    rating: 4.7,
    reviews: 67
  },
  {
    id: 6,
    name: "Stainless Steel Kitchen Sink",
    category: "Pipe & Sanitary",
    categorySlug: "sanitary",
    price: 5999,
    originalPrice: 7499,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&h=500&fit=crop",
    description: "Premium double-bowl stainless steel kitchen sink with sound-deadening pads.",
    features: ["304 Stainless Steel", "Sound Deadening", "Scratch Resistant", "Accessories Included"],
    inStock: true,
    rating: 4.8,
    reviews: 198
  },
  {
    id: 7,
    name: "Basin Mixer Tap - Chrome",
    category: "Pipe & Sanitary",
    categorySlug: "sanitary",
    price: 2499,
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=500&h=500&fit=crop",
    description: "Modern chrome-finish basin mixer tap with ceramic disc technology for smooth operation.",
    features: ["Ceramic Disc", "Chrome Finish", "Water Saving", "Easy Install"],
    inStock: true,
    rating: 4.6,
    reviews: 124
  },
  {
    id: 8,
    name: "Toilet Flush System Complete",
    category: "Pipe & Sanitary",
    categorySlug: "sanitary",
    price: 1899,
    image: "https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?w=500&h=500&fit=crop",
    description: "Complete dual-flush toilet system for water efficiency. Easy to install and maintain.",
    features: ["Dual Flush", "Water Efficient", "Universal Fit", "ABS Construction"],
    inStock: false,
    rating: 4.4,
    reviews: 78
  },

  // Foldable Ladders
  {
    id: 9,
    name: "Aluminum Folding Ladder - 6 Step",
    category: "Foldable Ladders",
    categorySlug: "ladders",
    price: 3999,
    originalPrice: 4999,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop",
    description: "Lightweight aluminum folding ladder with anti-slip steps and safety locks.",
    features: ["Lightweight Aluminum", "Anti-Slip Steps", "Safety Locks", "150kg Capacity"],
    inStock: true,
    rating: 4.7,
    reviews: 145
  },
  {
    id: 10,
    name: "Telescopic Ladder - 12.5 Feet",
    category: "Foldable Ladders",
    categorySlug: "ladders",
    price: 6999,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=500&fit=crop",
    description: "Compact telescopic ladder that extends to 12.5 feet. Perfect for indoor and outdoor use.",
    features: ["Telescopic Design", "One-Button Retract", "Compact Storage", "EN131 Certified"],
    inStock: true,
    rating: 4.9,
    reviews: 267
  },
  {
    id: 11,
    name: "Multi-Purpose Articulating Ladder",
    category: "Foldable Ladders",
    categorySlug: "ladders",
    price: 8499,
    originalPrice: 9999,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500&h=500&fit=crop",
    description: "Versatile articulating ladder that converts to step ladder, extension ladder, or scaffold.",
    features: ["7 Configurations", "Heavy Duty Hinges", "Rubber Feet", "300lb Capacity"],
    inStock: true,
    rating: 4.8,
    reviews: 189
  },
  {
    id: 12,
    name: "Platform Step Ladder - 4 Step",
    category: "Foldable Ladders",
    categorySlug: "ladders",
    price: 2999,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=500&h=500&fit=crop",
    description: "Sturdy platform step ladder with wide steps and handrails for enhanced safety.",
    features: ["Wide Platform", "Safety Handrails", "Non-Slip Treads", "Folds Flat"],
    inStock: true,
    rating: 4.5,
    reviews: 92
  },

  // Rugs / Carpets
  {
    id: 13,
    name: "Persian Style Area Rug - 5x8 ft",
    category: "Rugs / Carpets",
    categorySlug: "rugs",
    price: 7999,
    originalPrice: 9999,
    image: "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=500&h=500&fit=crop",
    description: "Elegant Persian-style area rug with intricate patterns. Machine washable and stain-resistant.",
    features: ["Machine Washable", "Stain Resistant", "Non-Slip Backing", "Vibrant Colors"],
    inStock: true,
    rating: 4.6,
    reviews: 134
  },
  {
    id: 14,
    name: "Modern Geometric Carpet - 6x9 ft",
    category: "Rugs / Carpets",
    categorySlug: "rugs",
    price: 5499,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop",
    description: "Contemporary geometric design carpet perfect for modern living spaces.",
    features: ["Modern Design", "Soft Pile", "Easy Clean", "Hypoallergenic"],
    inStock: true,
    rating: 4.7,
    reviews: 167
  },
  {
    id: 15,
    name: "Shag Rug - Cream White 4x6 ft",
    category: "Rugs / Carpets",
    categorySlug: "rugs",
    price: 3999,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&h=500&fit=crop",
    description: "Luxuriously soft shag rug in cream white. Perfect for bedrooms and living areas.",
    features: ["Ultra Soft", "Thick Pile", "Cozy Feel", "Low Shedding"],
    inStock: true,
    rating: 4.8,
    reviews: 211
  },
  {
    id: 16,
    name: "Outdoor Patio Mat - 4x6 ft",
    category: "Rugs / Carpets",
    categorySlug: "rugs",
    price: 1999,
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=500&h=500&fit=crop",
    description: "Weather-resistant outdoor patio mat. UV protected and easy to clean with hose.",
    features: ["Weather Resistant", "UV Protected", "Easy Clean", "Reversible Design"],
    inStock: false,
    rating: 4.4,
    reviews: 56
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  return products.filter(p => p.categorySlug === categorySlug);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.rating >= 4.7).slice(0, 6);
};
