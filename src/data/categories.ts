export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: 1,
    name: "Hardware Items",
    slug: "hardware",
    description: "Professional tools and hardware for all your construction and repair needs",
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=600&h=400&fit=crop",
    productCount: 4
  },
  {
    id: 2,
    name: "Pipe & Sanitary",
    slug: "sanitary",
    description: "Quality plumbing supplies, pipes, fittings, and bathroom fixtures",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=400&fit=crop",
    productCount: 4
  },
  {
    id: 3,
    name: "Foldable Ladders",
    slug: "ladders",
    description: "Safe and sturdy ladders for home and professional use",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    productCount: 4
  },
  {
    id: 4,
    name: "Rugs / Carpets",
    slug: "rugs",
    description: "Beautiful rugs and carpets to enhance your living spaces",
    image: "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=600&h=400&fit=crop",
    productCount: 4
  }
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(c => c.slug === slug);
};
