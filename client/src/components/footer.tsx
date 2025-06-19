import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

export function Footer() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest('POST', '/api/newsletter', { email });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Thank you for subscribing!",
        description: "You'll receive updates on new products and special offers.",
      });
      setEmail('');
    },
    onError: (error: any) => {
      const message = error.message?.includes('409') 
        ? "Email already subscribed!" 
        : "Failed to subscribe. Please try again.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    },
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      newsletterMutation.mutate(email);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerLinks = {
    quickLinks: [
      { label: "Home", action: () => scrollToSection('home') },
      { label: "Products", action: () => scrollToSection('products') },
      { label: "About", action: () => scrollToSection('about') },
      { label: "Contact", action: () => scrollToSection('contact') },
    ],
    customerService: [
      { label: "FAQ", href: "#" },
      { label: "Shipping Info", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Size Guide", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ];

  return (
    <footer className="py-16 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-indigo-600 mb-4">Hasib's Shop</h3>
            <p className="text-gray-600 mb-4">
              Bringing you premium products with modern design and exceptional quality. Your satisfaction is our priority.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="glass w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white hover:bg-opacity-30 transition-all"
                >
                  <social.icon className="w-5 h-5 text-gray-600" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={link.action}
                    className="text-gray-600 hover:text-indigo-600 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Customer Service</h4>
            <ul className="space-y-2">
              {footerLinks.customerService.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Stay Updated</h4>
            <p className="text-gray-600 mb-4">
              Subscribe to get updates on new products and special offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-card border-0 focus:ring-2 focus:ring-indigo-500"
                required
              />
              <Button
                type="submit"
                disabled={newsletterMutation.isPending}
                className="glass-button text-white px-6 py-2 rounded-lg font-medium w-full border-0"
              >
                {newsletterMutation.isPending ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 border-opacity-30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              &copy; 2024 Hasib's Shop. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-600 hover:text-indigo-600 text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
