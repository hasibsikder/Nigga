import { Button } from '@/components/ui/button';
import { Star, Truck, ShoppingCart } from 'lucide-react';

export function Hero() {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-20 min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 glass rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 glass rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 glass rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Premium Products with
              <span className="text-indigo-600"> Modern Design</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover our collection of carefully curated products that blend functionality with exceptional design. Experience shopping reimagined.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={scrollToProducts}
                className="glass-button text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg border-0 hover:shadow-xl"
              >
                Shop Now
              </Button>
              <Button
                variant="ghost"
                onClick={scrollToAbout}
                className="glass px-8 py-4 rounded-full font-semibold text-lg text-gray-700 hover:bg-white hover:bg-opacity-30 transition-all border-0"
              >
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="glass-card rounded-3xl p-8 shadow-2xl">
              {/* Featured product showcase */}
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Premium watch on elegant surface" 
                  className="w-full h-64 object-cover rounded-2xl shadow-lg"
                />
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Premium Watch</h3>
                    <p className="text-indigo-600 font-bold text-lg">$299.99</p>
                  </div>
                  <Button 
                    className="glass-button text-white px-6 py-2 rounded-full font-medium border-0"
                    onClick={scrollToProducts}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    View Products
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 glass w-16 h-16 rounded-2xl flex items-center justify-center animate-float">
              <Star className="text-yellow-500 w-6 h-6 fill-current" />
            </div>
            <div className="absolute -bottom-4 -left-4 glass w-20 h-20 rounded-2xl flex items-center justify-center animate-float" style={{ animationDelay: '1.5s' }}>
              <Truck className="text-indigo-600 w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
