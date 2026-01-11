import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal > 1000 ? 0 : 99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Your cart is empty</h1>
          <p className="text-muted-foreground">Start shopping to add items to your cart</p>
          <Link to="/products">
            <Button className="btn-accent-gradient gap-2">
              Browse Products
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-card rounded-xl p-4 shadow-card flex gap-4 animate-fade-in"
              >
                {/* Image */}
                <Link to={`/product/${product.id}`} className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-foreground hover:text-accent transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <p className="text-lg font-bold text-foreground mt-2">
                    ₹{product.price.toLocaleString()}
                  </p>
                </div>

                {/* Quantity & Actions */}
                <div className="flex flex-col items-end justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(product.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl p-6 shadow-card sticky top-24">
              <h2 className="text-xl font-semibold text-foreground mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-foreground">
                  <span>Subtotal ({items.length} items)</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                {subtotal < 1000 && (
                  <p className="text-xs text-muted-foreground">
                    Add ₹{(1000 - subtotal).toLocaleString()} more for free shipping
                  </p>
                )}
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-lg font-bold text-foreground">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Link to="/checkout">
                <Button className="w-full btn-accent-gradient gap-2" size="lg">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <Link to="/products" className="block mt-4">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
