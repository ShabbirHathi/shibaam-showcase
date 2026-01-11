import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, Truck, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/context/OrderContext';

const Overview: React.FC = () => {
  const { user } = useUser();
  const { getCartCount } = useCart();
  const { getOrdersByUser } = useOrders();

  const orders = user ? getOrdersByUser(user.id) : [];
  const activeOrders = orders.filter(o => o.status !== 'delivered');
  const deliveredOrders = orders.filter(o => o.status === 'delivered');
  const purchasedProducts = deliveredOrders.flatMap(o => o.items);

  const stats = [
    {
      label: 'Total Orders',
      value: orders.length,
      icon: Package,
      color: 'bg-primary/10 text-primary',
      link: '/dashboard/orders',
    },
    {
      label: 'Active Orders',
      value: activeOrders.length,
      icon: Truck,
      color: 'bg-info/10 text-info',
      link: '/dashboard/orders',
    },
    {
      label: 'Purchased Products',
      value: purchasedProducts.length,
      icon: CheckCircle,
      color: 'bg-success/10 text-success',
      link: '/dashboard/purchases',
    },
    {
      label: 'Cart Items',
      value: getCartCount(),
      icon: ShoppingCart,
      color: 'bg-accent/10 text-accent',
      link: '/dashboard/cart',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">
          Welcome, {user?.name || 'User'}!
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's an overview of your account activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.link}
            className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow group"
          >
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-card rounded-xl p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Recent Orders</h2>
          <Link to="/dashboard/orders">
            <Button variant="ghost" size="sm" className="gap-2">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.slice(0, 3).map((order) => (
              <Link
                key={order.orderId}
                to={`/dashboard/orders/${order.orderId}`}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={order.items[0]?.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{order.orderId}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''} • ₹{order.totalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'delivered'
                        ? 'bg-success/10 text-success'
                        : order.status === 'shipped' || order.status === 'out_for_delivery'
                        ? 'bg-info/10 text-info'
                        : 'bg-warning/10 text-warning'
                    }`}
                  >
                    {order.status.replace('_', ' ').replace(/^\w/, c => c.toUpperCase())}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{order.orderDate}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No orders yet</p>
            <Link to="/products">
              <Button className="mt-4 btn-accent-gradient">Start Shopping</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;
