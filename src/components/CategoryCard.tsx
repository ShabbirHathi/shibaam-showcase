import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Category } from '@/data/categories';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      to={`/products?category=${category.slug}`}
      className="group block relative overflow-hidden rounded-2xl aspect-[4/3]"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">
            {category.name}
          </h3>
          <p className="text-white/80 text-sm line-clamp-2">
            {category.description}
          </p>
          <div className="flex items-center gap-2 text-accent text-sm font-medium">
            <span>{category.productCount} Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
