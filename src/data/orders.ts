export type OrderStatus = 'placed' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered';

export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  orderId: string;
  userId: number;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  orderDate: string;
  estimatedDelivery: string;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  trackingHistory: {
    status: OrderStatus;
    date: string;
    description: string;
  }[];
}

export const mockOrders: Order[] = [
  {
    orderId: "ORD20250001",
    userId: 1,
    items: [
      {
        productId: 3,
        name: "Cordless Drill Machine 20V",
        price: 3499,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&h=500&fit=crop"
      },
      {
        productId: 1,
        name: "Professional Tool Set - 150 Piece",
        price: 4999,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=500&h=500&fit=crop"
      }
    ],
    totalAmount: 8498,
    status: "shipped",
    orderDate: "2025-01-05",
    estimatedDelivery: "2025-01-15",
    shippingAddress: {
      fullName: "Demo User",
      email: "user@shibaam.com",
      phone: "+91 9876543210",
      address: "123 Main Street, Apartment 4B",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001"
    },
    trackingHistory: [
      {
        status: "placed",
        date: "2025-01-05 10:30 AM",
        description: "Order confirmed and payment received"
      },
      {
        status: "packed",
        date: "2025-01-06 02:15 PM",
        description: "Items packed and ready for dispatch"
      },
      {
        status: "shipped",
        date: "2025-01-07 09:00 AM",
        description: "Package handed to courier - Tracking: SHIP123456"
      }
    ]
  },
  {
    orderId: "ORD20250002",
    userId: 1,
    items: [
      {
        productId: 10,
        name: "Telescopic Ladder - 12.5 Feet",
        price: 6999,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=500&fit=crop"
      }
    ],
    totalAmount: 6999,
    status: "delivered",
    orderDate: "2024-12-20",
    estimatedDelivery: "2024-12-28",
    shippingAddress: {
      fullName: "Demo User",
      email: "user@shibaam.com",
      phone: "+91 9876543210",
      address: "123 Main Street, Apartment 4B",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001"
    },
    trackingHistory: [
      {
        status: "placed",
        date: "2024-12-20 11:00 AM",
        description: "Order confirmed and payment received"
      },
      {
        status: "packed",
        date: "2024-12-21 10:30 AM",
        description: "Items packed and ready for dispatch"
      },
      {
        status: "shipped",
        date: "2024-12-22 08:45 AM",
        description: "Package handed to courier - Tracking: SHIP789012"
      },
      {
        status: "out_for_delivery",
        date: "2024-12-27 07:00 AM",
        description: "Package out for delivery"
      },
      {
        status: "delivered",
        date: "2024-12-27 04:30 PM",
        description: "Package delivered successfully"
      }
    ]
  },
  {
    orderId: "ORD20250003",
    userId: 1,
    items: [
      {
        productId: 13,
        name: "Persian Style Area Rug - 5x8 ft",
        price: 7999,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=500&h=500&fit=crop"
      },
      {
        productId: 15,
        name: "Shag Rug - Cream White 4x6 ft",
        price: 3999,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&h=500&fit=crop"
      }
    ],
    totalAmount: 15997,
    status: "out_for_delivery",
    orderDate: "2025-01-08",
    estimatedDelivery: "2025-01-12",
    shippingAddress: {
      fullName: "Demo User",
      email: "user@shibaam.com",
      phone: "+91 9876543210",
      address: "123 Main Street, Apartment 4B",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001"
    },
    trackingHistory: [
      {
        status: "placed",
        date: "2025-01-08 03:00 PM",
        description: "Order confirmed and payment received"
      },
      {
        status: "packed",
        date: "2025-01-09 11:00 AM",
        description: "Items packed and ready for dispatch"
      },
      {
        status: "shipped",
        date: "2025-01-09 05:30 PM",
        description: "Package handed to courier - Tracking: SHIP345678"
      },
      {
        status: "out_for_delivery",
        date: "2025-01-11 08:00 AM",
        description: "Package out for delivery in your area"
      }
    ]
  }
];

export const getOrdersByUserId = (userId: number): Order[] => {
  return mockOrders.filter(order => order.userId === userId);
};

export const getOrderById = (orderId: string): Order | undefined => {
  return mockOrders.find(order => order.orderId === orderId);
};

export const getActiveOrders = (userId: number): Order[] => {
  return mockOrders.filter(
    order => order.userId === userId && order.status !== 'delivered'
  );
};

export const getPurchasedProducts = (userId: number): OrderItem[] => {
  const deliveredOrders = mockOrders.filter(
    order => order.userId === userId && order.status === 'delivered'
  );
  return deliveredOrders.flatMap(order => order.items);
};
