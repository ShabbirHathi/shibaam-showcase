import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OrderTracker from '@/components/OrderTracker';
import { useOrders } from '@/context/OrderContext';

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderById } = useOrders();
  
  const order = orderId ? getOrderById(orderId) : undefined;

  if (!order) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Order Not Found</h1>
        <p className="text-muted-foreground mb-4">
          The order you're looking for doesn't exist.
        </p>
        <Link to="/dashboard/orders">
          <Button>Back to Orders</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            to="/dashboard/orders"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Link>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Order {order.orderId}
          </h1>
        </div>
        <span
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            order.status === 'delivered'
              ? 'bg-success/10 text-success'
              : order.status === 'shipped' || order.status === 'out_for_delivery'
              ? 'bg-info/10 text-info'
              : 'bg-warning/10 text-warning'
          }`}
        >
          {order.status.replace('_', ' ').replace(/^\w/, c => c.toUpperCase())}
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Order Tracking */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl p-6 shadow-card">
            <h2 className="text-xl font-semibold text-foreground mb-6">Order Tracking</h2>
            <OrderTracker
              currentStatus={order.status}
              trackingHistory={order.trackingHistory}
            />
          </div>

          {/* Products */}
          <div className="bg-card rounded-xl p-6 shadow-card">
            <h2 className="text-xl font-semibold text-foreground mb-6">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 bg-muted/50 rounded-lg"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    <p className="font-semibold text-foreground mt-1">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Info Sidebar */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-card rounded-xl p-6 shadow-card">
            <h2 className="text-lg font-semibold text-foreground mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Date</span>
                <span className="text-foreground">{order.orderDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Delivery</span>
                <span className="text-foreground">{order.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Items</span>
                <span className="text-foreground">{order.items.length}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-border text-base font-semibold">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">₹{order.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-card rounded-xl p-6 shadow-card">
            <h2 className="text-lg font-semibold text-foreground mb-4">Shipping Address</h2>
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="font-medium text-foreground">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} -{' '}
                {order.shippingAddress.pincode}
              </p>
              <p className="pt-2">{order.shippingAddress.phone}</p>
              <p>{order.shippingAddress.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
