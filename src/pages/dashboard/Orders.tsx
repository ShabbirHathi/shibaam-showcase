import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import { useOrders } from '@/context/OrderContext';

const Orders: React.FC = () => {
  const { user } = useUser();
  const { getOrdersByUser } = useOrders();

  const orders = user ? getOrdersByUser(user.id) : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-success/10 text-success';
      case 'shipped':
      case 'out_for_delivery':
        return 'bg-info/10 text-info';
      default:
        return 'bg-warning/10 text-warning';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">My Orders</h1>
        <p className="text-muted-foreground mt-1">Track and manage your orders</p>
      </div>

      {orders.length > 0 ? (
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                    Order ID
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                    Date
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                    Items
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                    Total
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map((order) => (
                  <tr key={order.orderId} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-medium text-foreground">{order.orderId}</span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{order.orderDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {order.items.slice(0, 3).map((item, i) => (
                            <div
                              key={i}
                              className="w-8 h-8 rounded-lg overflow-hidden border-2 border-card"
                            >
                              <img
                                src={item.image}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {order.items.length} item{order.items.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-foreground">
                      ₹{order.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status.replace('_', ' ').replace(/^\w/, c => c.toUpperCase())}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/dashboard/orders/${order.orderId}`}>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-border">
            {orders.map((order) => (
              <Link
                key={order.orderId}
                to={`/dashboard/orders/${order.orderId}`}
                className="block p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-foreground">{order.orderId}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status.replace('_', ' ').replace(/^\w/, c => c.toUpperCase())}
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex -space-x-2">
                    {order.items.slice(0, 3).map((item, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-lg overflow-hidden border-2 border-card"
                      >
                        <img
                          src={item.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{order.orderDate}</span>
                  <span className="font-medium text-foreground">
                    ₹{order.totalAmount.toLocaleString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-card rounded-xl p-12 shadow-card text-center">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">No orders yet</h2>
          <p className="text-muted-foreground mb-6">Start shopping to see your orders here</p>
          <Link to="/products">
            <Button className="btn-accent-gradient">Browse Products</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Orders;
