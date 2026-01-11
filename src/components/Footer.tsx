import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Package className="w-6 h-6 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold">Shibaam</span>
            </Link>
            <p className="text-primary-foreground/80 text-sm">
              Your trusted partner for quality hardware, sanitary products, ladders, and home furnishings.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=hardware" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Hardware Items
                </Link>
              </li>
              <li>
                <Link to="/products?category=sanitary" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Pipe & Sanitary
                </Link>
              </li>
              <li>
                <Link to="/products?category=ladders" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Foldable Ladders
                </Link>
              </li>
              <li>
                <Link to="/products?category=rugs" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Rugs / Carpets
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/dashboard/orders" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  123 Industrial Area, Sector 5, Mumbai, Maharashtra 400001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-primary-foreground/80">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-primary-foreground/80">support@shibaam.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
          <p>© 2025 Shibaam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
