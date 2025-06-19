import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Hero } from '@/components/hero';
import { ProductShowcase } from '@/components/product-showcase';
import { About } from '@/components/about';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';
import { CartModal } from '@/components/cart-modal';
import { OrderModal } from '@/components/order-modal';
import { useCart } from '@/hooks/use-cart';
import { Product } from '@shared/schema';

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSummary,
  } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsOrderOpen(true);
  };

  const handleOrderComplete = () => {
    clearCart();
  };

  return (
    <div className="min-h-screen">
      <Navigation
        cartCount={cartSummary.itemCount}
        onCartOpen={handleOpenCart}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <Hero />
      
      <ProductShowcase
        onAddToCart={handleAddToCart}
        searchQuery={searchQuery}
      />
      
      <About />
      
      <Contact />
      
      <Footer />
      
      <CartModal
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        cartSummary={cartSummary}
        onCheckout={handleCheckout}
      />
      
      <OrderModal
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
        cartItems={cartItems}
        cartSummary={cartSummary}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
}
