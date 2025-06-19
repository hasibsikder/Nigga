import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';

interface ProductShowcaseProps {
  onAddToCart: (product: Product) => void;
  searchQuery: string;
}

export function ProductShowcase({ onAddToCart, searchQuery }: ProductShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['/api/products'],
  });

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product: Product) => {
      const matchesCategory = activeFilter === 'all' || product.category === activeFilter;
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a: Product, b: Product) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-high':
        filtered.sort((a: Product, b: Product) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'newest':
        filtered.sort((a: Product, b: Product) => b.id - a.id);
        break;
      default:
        // Keep original order for featured
        break;
    }

    return filtered;
  }, [products, activeFilter, sortBy, searchQuery]);

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
        toast({
          title: "Removed from wishlist",
          description: "Product removed from your wishlist.",
        });
      } else {
        newWishlist.add(productId);
        toast({
          title: "Added to wishlist",
          description: "Product added to your wishlist.",
        });
      }
      return newWishlist;
    });
  };

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'home', label: 'Home & Living' },
  ];

  if (isLoading) {
    return (
      <section id="products" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden shadow-lg animate-pulse">
                <div className="w-full h-48 bg-gray-200"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our carefully selected collection of premium products designed to enhance your lifestyle
          </p>
        </div>

        {/* Filter/Search Bar */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={activeFilter === category.value ? "default" : "ghost"}
                  onClick={() => setActiveFilter(category.value)}
                  className={
                    activeFilter === category.value
                      ? "glass-button text-white px-6 py-2 rounded-full font-medium border-0"
                      : "glass px-6 py-2 rounded-full font-medium text-gray-700 hover:bg-white hover:bg-opacity-30 transition-all border-0"
                  }
                >
                  {category.label}
                </Button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="search-glass w-48 border-0 focus:ring-2 focus:ring-indigo-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredAndSortedProducts.map((product: Product) => (
            <div key={product.id} className="glass-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 product-card">
              <div className="relative">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-2 right-2 p-2 rounded-full glass hover:bg-white hover:bg-opacity-30"
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      wishlist.has(product.id) 
                        ? 'text-red-500 fill-current' 
                        : 'text-gray-400'
                    }`} 
                  />
                </Button>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < Math.floor(parseFloat(product.rating || "0")) 
                            ? 'fill-current' 
                            : ''
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm ml-2">({product.rating})</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-indigo-600">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through ml-2">${product.originalPrice}</span>
                    )}
                  </div>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="glass-button text-white px-4 py-2 rounded-full font-medium text-sm border-0"
                    disabled={!product.inStock}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
