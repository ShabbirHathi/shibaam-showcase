import React from 'react';
import { Check, Package, Truck, MapPin, Home } from 'lucide-react';
import { OrderStatus } from '@/data/orders';

interface TrackingStep {
  status: OrderStatus;
  label: string;
  icon: React.ReactNode;
}

const trackingSteps: TrackingStep[] = [
  { status: 'placed', label: 'Order Placed', icon: <Check className="w-5 h-5" /> },
  { status: 'packed', label: 'Packed', icon: <Package className="w-5 h-5" /> },
  { status: 'shipped', label: 'Shipped', icon: <Truck className="w-5 h-5" /> },
  { status: 'out_for_delivery', label: 'Out for Delivery', icon: <MapPin className="w-5 h-5" /> },
  { status: 'delivered', label: 'Delivered', icon: <Home className="w-5 h-5" /> },
];

const statusOrder: OrderStatus[] = ['placed', 'packed', 'shipped', 'out_for_delivery', 'delivered'];

interface OrderTrackerProps {
  currentStatus: OrderStatus;
  trackingHistory: { status: OrderStatus; date: string; description: string }[];
}

const OrderTracker: React.FC<OrderTrackerProps> = ({ currentStatus, trackingHistory }) => {
  const currentIndex = statusOrder.indexOf(currentStatus);

  const getStepState = (stepStatus: OrderStatus): 'completed' | 'active' | 'pending' => {
    const stepIndex = statusOrder.indexOf(stepStatus);
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  const getHistoryForStep = (stepStatus: OrderStatus) => {
    return trackingHistory.find(h => h.status === stepStatus);
  };

  return (
    <div className="space-y-0">
      {trackingSteps.map((step, index) => {
        const state = getStepState(step.status);
        const history = getHistoryForStep(step.status);
        const isLast = index === trackingSteps.length - 1;

        return (
          <div key={step.status} className="relative flex gap-4">
            {/* Timeline line */}
            {!isLast && (
              <div
                className={`absolute left-5 top-12 w-0.5 h-16 ${
                  state === 'completed' ? 'bg-success' : 'bg-border'
                }`}
              />
            )}

            {/* Icon */}
            <div
              className={`tracking-dot ${state} z-10`}
            >
              {step.icon}
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
              <h4
                className={`font-semibold ${
                  state === 'pending' ? 'text-muted-foreground' : 'text-foreground'
                }`}
              >
                {step.label}
              </h4>
              {history ? (
                <div className="mt-1 space-y-1">
                  <p className="text-sm text-muted-foreground">{history.date}</p>
                  <p className="text-sm text-foreground/80">{history.description}</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mt-1">Pending</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderTracker;
