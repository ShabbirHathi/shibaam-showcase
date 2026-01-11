import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Headphones, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { categories } from '@/data/categories';
import { getFeaturedProducts } from '@/data/products';

const Home: React.FC = () => {
  const featuredProducts = getFeaturedProducts();

  const features = [
    { icon: <Truck className="w-6 h-6" />, title: 'Free Shipping', description: 'On orders above ₹1000' },
    { icon: <Shield className="w-6 h-6" />, title: 'Secure Payment', description: '100% protected payments' },
    { icon: <Headphones className="w-6 h-6" />, title: '24/7 Support', description: 'Dedicated support team' },
    { icon: <RefreshCw className="w-6 h-6" />, title: 'Easy Returns', description: '7-day return policy' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              Quality Tools &<br />
              <span className="text-accent">Home Essentials</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Your trusted partner for premium hardware, sanitary products, ladders, and beautiful home furnishings. Built to last.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/products">
                <Button size="lg" className="btn-accent-gradient text-base px-8">
                  Shop Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="text-base px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Shop by Category
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our wide range of products across different categories
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Featured Products
              </h2>
              <p className="text-muted-foreground">
                Top-rated products loved by our customers
              </p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="gap-2">
                View All Products
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                About Shibaam
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Shibaam has been a trusted name in quality hardware and home essentials for over a decade. We pride ourselves on offering premium products that combine durability, functionality, and style.
                </p>
                <p>
                  From professional-grade tools to beautiful home furnishings, our carefully curated selection meets the needs of homeowners, contractors, and businesses alike.
                </p>
                <p>
                  Our commitment to quality and customer satisfaction has made us a preferred choice for thousands of customers across India.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">10K+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">500+</div>
                  <div className="text-sm text-muted-foreground">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">10+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&h=800&fit=crop"
                  alt="Shibaam Store"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-xl accent-gradient flex items-center justify-center shadow-accent">
                <div className="text-center text-accent-foreground">
                  <div className="text-2xl font-bold">4.8</div>
                  <div className="text-xs">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Browse our collection and find the perfect tools and products for your next project.
          </p>
          <Link to="/products">
            <Button size="lg" className="btn-accent-gradient text-base px-8">
              Explore Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
