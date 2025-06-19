import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NavigationProps {
  cartCount: number;
  onCartOpen: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Navigation({ cartCount, onCartOpen, searchQuery, onSearchChange }: NavigationProps) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#products", label: "Products" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="nav-glass fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-indigo-600">Hasib's Shop</h1>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden md:block">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="search-glass pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm border-0"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              </div>
            </div>
            
            {/* Cart Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onCartOpen}
              className="glass p-2 rounded-full relative hover:bg-white hover:bg-opacity-30 transition-all"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="cart-badge absolute -top-2 -right-2 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden glass p-2 rounded-md"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 glass-strong">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 w-full text-left"
              >
                {link.label}
              </button>
            ))}
            <div className="px-3 py-2">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-glass w-full px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm border-0"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
