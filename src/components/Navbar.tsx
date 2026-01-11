import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Package } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const { isLoggedIn, user } = useUser();
  const location = useLocation();
  const cartCount = getCartCount();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md shadow-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center">
              <Package className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Shibaam</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  isActive(link.to) ? 'text-accent' : 'text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center accent-gradient border-0 text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            {isLoggedIn ? (
              <Link to="/dashboard">
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button size="sm" className="btn-primary-gradient">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center accent-gradient border-0 text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col gap-4">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.to) ? 'text-accent' : 'text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {isLoggedIn ? (
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <User className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button size="sm" className="w-full btn-primary-gradient">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
