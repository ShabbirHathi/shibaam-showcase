import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const { isLoggedIn } = useUser();
  const orderId = location.state?.orderId || 'ORD00000000';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center space-y-6 animate-fade-in">
          {/* Success Icon */}
          <div className="w-24 h-24 mx-auto rounded-full bg-success/10 flex items-center justify-center">
            <CheckCircle className="w-14 h-14 text-success" />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <h1 className="text-3xl font-display font-bold text-foreground">
              Order Placed Successfully!
            </h1>
            <p className="text-muted-foreground">
              Thank you for shopping with Shibaam. Your order has been confirmed.
            </p>
          </div>

          {/* Order ID */}
          <div className="bg-card rounded-xl p-6 shadow-card">
            <p className="text-sm text-muted-foreground mb-1">Order ID</p>
            <p className="text-2xl font-bold text-foreground">{orderId}</p>
            <p className="text-sm text-muted-foreground mt-4">
              A confirmation email has been sent to your registered email address.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4">
            {isLoggedIn ? (
              <Link to="/dashboard/orders">
                <Button className="w-full btn-accent-gradient gap-2" size="lg">
                  Track Your Order
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button className="w-full btn-accent-gradient gap-2" size="lg">
                  Login to Track Order
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            )}
            <Link to="/">
              <Button variant="outline" className="w-full gap-2" size="lg">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
