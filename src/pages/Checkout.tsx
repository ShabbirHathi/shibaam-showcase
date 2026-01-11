import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';
import { useOrders } from '@/context/OrderContext';
import { Order } from '@/data/orders';
import { toast } from '@/hooks/use-toast';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  const { user } = useUser();
  const { addOrder } = useOrders();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = getCartTotal();
  const shipping = subtotal > 1000 ? 0 : 99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (formData.phone.length < 10) newErrors.phone = 'Invalid phone number';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Invalid pincode';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    // Generate order
    const orderId = `ORD${Date.now().toString().slice(-8)}`;
    const today = new Date();
    const estimatedDelivery = new Date(today);
    estimatedDelivery.setDate(today.getDate() + 7);

    const newOrder: Order = {
      orderId,
      userId: user?.id || 0,
      items: items.map(({ product, quantity }) => ({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
      })),
      totalAmount: total,
      status: 'placed',
      orderDate: today.toISOString().split('T')[0],
      estimatedDelivery: estimatedDelivery.toISOString().split('T')[0],
      shippingAddress: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
      trackingHistory: [
        {
          status: 'placed',
          date: `${today.toLocaleDateString('en-IN')} ${today.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`,
          description: 'Order confirmed and payment received',
        },
      ],
    };

    addOrder(newOrder);
    clearCart();
    
    toast({
      title: "Order placed successfully!",
      description: `Your order ${orderId} has been confirmed.`,
    });

    navigate('/order-success', { state: { orderId } });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>

        <h1 className="text-3xl font-display font-bold text-foreground mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-xl p-6 shadow-card space-y-6">
              <h2 className="text-xl font-semibold text-foreground">Shipping Information</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={errors.fullName ? 'border-destructive' : ''}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-destructive">{errors.fullName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={errors.phone ? 'border-destructive' : ''}
                />
                {errors.phone && (
                  <p className="text-xs text-destructive">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your street address"
                  className={errors.address ? 'border-destructive' : ''}
                />
                {errors.address && (
                  <p className="text-xs text-destructive">{errors.address}</p>
                )}
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className={errors.city ? 'border-destructive' : ''}
                  />
                  {errors.city && (
                    <p className="text-xs text-destructive">{errors.city}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className={errors.state ? 'border-destructive' : ''}
                  />
                  {errors.state && (
                    <p className="text-xs text-destructive">{errors.state}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                    className={errors.pincode ? 'border-destructive' : ''}
                  />
                  {errors.pincode && (
                    <p className="text-xs text-destructive">{errors.pincode}</p>
                  )}
                </div>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full btn-accent-gradient">
              Place Order • ₹{total.toLocaleString()}
            </Button>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl p-6 shadow-card sticky top-24">
              <h2 className="text-xl font-semibold text-foreground mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">Qty: {quantity}</p>
                      <p className="text-sm font-medium text-foreground">
                        ₹{(product.price * quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-border pt-3">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
