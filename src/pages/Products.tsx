import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { categories } from '@/data/categories';

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  
  const selectedCategory = searchParams.get('category') || 'all';

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products;
    return products.filter(p => p.categorySlug === selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (slug: string) => {
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
  };

  const currentCategory = categories.find(c => c.slug === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="hero-gradient text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-display font-bold">
            {currentCategory ? currentCategory.name : 'All Products'}
          </h1>
          <p className="text-primary-foreground/80 mt-2">
            {currentCategory 
              ? currentCategory.description 
              : 'Browse our complete collection of quality products'
            }
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map(category => (
                    <button
                      key={category.slug}
                      onClick={() => handleCategoryChange(category.slug)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.slug
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted text-foreground'
                      }`}
                    >
                      {category.name}
                      <span className="text-xs ml-2 opacity-70">({category.productCount})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>

              {/* Mobile Filters */}
              {showFilters && (
                <div className="mt-4 p-4 bg-card rounded-lg border border-border animate-slide-up">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Categories</h3>
                    <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant={selectedCategory === 'all' ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => {
                        handleCategoryChange('all');
                        setShowFilters(false);
                      }}
                    >
                      All
                    </Badge>
                    {categories.map(category => (
                      <Badge
                        key={category.slug}
                        variant={selectedCategory === category.slug ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => {
                          handleCategoryChange(category.slug);
                          setShowFilters(false);
                        }}
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} products
              </p>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
