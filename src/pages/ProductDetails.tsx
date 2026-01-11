import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Star, Minus, Plus, Check, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import { getProductById, getProductsByCategory, Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(Number(id));
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = getProductsByCategory(product.categorySlug)
    .filter(p => p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} has been added to your cart.`,
    });
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge variant="secondary">{product.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-accent text-accent'
                        : 'text-muted'
                    }`}
                  />
                ))}
              </div>
              <span className="text-foreground font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-foreground">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <Badge className="accent-gradient border-0">{discount}% OFF</Badge>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <span className="text-success font-medium">In Stock</span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <span className="text-destructive font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Key Features</h3>
              <ul className="grid grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-success flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={!product.inStock}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={!product.inStock}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 gap-2 ${product.inStock ? 'btn-accent-gradient' : ''}`}
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-border pt-12">
            <h2 className="text-2xl font-display font-bold text-foreground mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
