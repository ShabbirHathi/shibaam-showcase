import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, validateCredentials, getUserById } from '@/data/users';

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'shibaam_user';

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    if (stored) {
      const { userId } = JSON.parse(stored);
      return getUserById(userId) || null;
    }
    return null;
  });

  const isLoggedIn = user !== null;

  const login = (email: string, password: string): boolean => {
    const validUser = validateCredentials(email, password);
    if (validUser) {
      setUser(validUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify({ userId: validUser.id }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
