import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Order, OrderItem, mockOrders } from '@/data/orders';

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrdersByUser: (userId: number) => Order[];
  getOrderById: (orderId: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const getOrdersByUser = (userId: number): Order[] => {
    return orders.filter(order => order.userId === userId);
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(order => order.orderId === orderId);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrdersByUser, getOrderById }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
