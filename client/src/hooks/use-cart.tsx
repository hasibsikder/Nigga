import { useState, useCallback, useMemo, useEffect } from 'react';
import { Product } from '@shared/schema';
import { useToast } from '@/components/ui/use-toast';

export type CartItem = {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  quantity: number;
  maxQuantity?: number; // Optional stock limit
};

const CART_STORAGE_KEY = 'shopping_cart';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  }, [cartItems]);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (existingItem.maxQuantity && newQuantity > existingItem.maxQuantity) {
          toast({
            title: 'Quantity limit reached',
            description: `You can't add more than ${existingItem.maxQuantity} of this item`,
            variant: 'destructive',
          });
          return prev;
        }

        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
      
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity,
        maxQuantity: product.stock,
      }];
    });

    toast({
      title: 'Added to cart',
      description: `${quantity} × ${product.name} added to your cart`,
    });
  }, [toast]);

  const removeFromCart = useCallback((productId: number) => {
    setCartItems(prev => {
      const item = prev.find(i => i.id === productId);
      if (!item) return prev;
      
      toast({
        title: 'Removed from cart',
        description: `${item.name} was removed from your cart`,
      });
      
      return prev.filter(item => item.id !== productId);
    });
  }, [toast]);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === productId) {
          if (item.maxQuantity && quantity > item.maxQuantity) {
            toast({
              title: 'Quantity limit reached',
              description: `Maximum ${item.maxQuantity} allowed for this item`,
              variant: 'destructive',
            });
            return item;
          }
          return { ...item, quantity };
        }
        return item;
      })
    );
  }, [removeFromCart, toast]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    toast({
      title: 'Cart cleared',
      description: 'All items have been removed from your cart',
    });
  }, [toast]);

  const cartSummary = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity,
      0
    );
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
    const total = subtotal + tax + shipping;

    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      shipping: shipping.toFixed(2),
      total: total.toFixed(2),
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      isEligibleForFreeShipping: subtotal > 50,
    };
  }, [cartItems]);

  const isInCart = useCallback((productId: number) => {
    return cartItems.some(item => item.id === productId);
  }, [cartItems]);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSummary,
    isInCart,
  };
}
