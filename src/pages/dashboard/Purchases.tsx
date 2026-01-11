import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import { useOrders } from '@/context/OrderContext';

const Purchases: React.FC = () => {
  const { user } = useUser();
  const { getOrdersByUser } = useOrders();

  const orders = user ? getOrdersByUser(user.id) : [];
  const deliveredOrders = orders.filter(o => o.status === 'delivered');
  
  // Get all purchased products with order info
  const purchasedProducts = deliveredOrders.flatMap(order =>
    order.items.map(item => ({
      ...item,
      orderId: order.orderId,
      orderDate: order.orderDate,
    }))
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Purchased Products</h1>
        <p className="text-muted-foreground mt-1">Products you've received from completed orders</p>
      </div>

      {purchasedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchasedProducts.map((product, index) => (
            <div
              key={`${product.orderId}-${product.productId}-${index}`}
              className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="aspect-square bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-foreground line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Qty: {product.quantity}</span>
                  <span className="font-medium text-foreground">
                    ₹{product.price.toLocaleString()}
                  </span>
                </div>
                <div className="pt-2 border-t border-border">
                  <Link
                    to={`/dashboard/orders/${product.orderId}`}
                    className="text-sm text-accent hover:underline"
                  >
                    Order: {product.orderId}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    Purchased on {product.orderDate}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-xl p-12 shadow-card text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">No purchases yet</h2>
          <p className="text-muted-foreground mb-6">
            Your delivered products will appear here
          </p>
          <Link to="/products">
            <Button className="btn-accent-gradient">Start Shopping</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Purchases;
