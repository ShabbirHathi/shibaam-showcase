import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    
    addToCart(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group-hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {discount > 0 && (
            <Badge className="absolute top-3 left-3 accent-gradient border-0 text-xs font-semibold">
              {discount}% OFF
            </Badge>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge variant="secondary" className="text-sm">Out of Stock</Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              {product.category}
            </p>
            <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
              {product.name}
            </h3>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-foreground">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={product.inStock ? 'btn-accent-gradient' : ''}
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
