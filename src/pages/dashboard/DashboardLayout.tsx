import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Truck,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useUser();
  const location = useLocation();

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Overview', exact: true },
    { to: '/dashboard/orders', icon: Package, label: 'My Orders' },
    { to: '/dashboard/purchases', icon: Truck, label: 'Purchased Products' },
    { to: '/dashboard/cart', icon: ShoppingCart, label: 'My Cart' },
    { to: '/dashboard/profile', icon: User, label: 'Profile' },
  ];

  const isActive = (path: string, exact: boolean = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-sidebar text-sidebar-foreground">
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <Package className="w-6 h-6 text-sidebar-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Shibaam</span>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-sidebar-border">
          <p className="text-sm text-sidebar-foreground/70">Welcome back,</p>
          <p className="font-semibold">{user?.name || 'User'}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.to, item.exact)
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'hover:bg-sidebar-accent/50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-sidebar text-sidebar-foreground animate-slide-in-right">
            <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
                  <Package className="w-5 h-5 text-sidebar-primary-foreground" />
                </div>
                <span className="font-bold">Shibaam</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                className="text-sidebar-foreground"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <nav className="p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.to, item.exact)
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'hover:bg-sidebar-accent/50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent/50"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </Button>
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-40 bg-card border-b border-border p-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <span className="font-semibold">Dashboard</span>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
