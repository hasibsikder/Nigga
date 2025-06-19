import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/lib/types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  cartSummary: {
    subtotal: string;
    tax: string;
    total: string;
    itemCount: number;
  };
  onCheckout: () => void;
}

export function CartModal({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  cartSummary,
  onCheckout,
}: CartModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="modal-backdrop absolute inset-0" onClick={onClose}></div>
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md">
        <div className="glass-strong h-full flex flex-col shadow-2xl animate-slide-in">
          {/* Cart Header */}
          <div className="flex items-center justify-between p-6 border-b border-white border-opacity-20">
            <h2 className="text-2xl font-semibold text-gray-900">Shopping Cart</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="glass p-2 rounded-full hover:bg-white hover:bg-opacity-30 transition-all"
            >
              <X className="w-5 h-5 text-gray-700" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 text-lg">Your cart is empty</p>
                <p className="text-sm text-gray-500 mt-2">Add some products to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="glass-card rounded-xl p-4 flex items-center space-x-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">${item.price}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="glass w-8 h-8 rounded-full flex items-center justify-center p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="glass w-8 h-8 rounded-full flex items-center justify-center p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-600 transition-colors p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-white border-opacity-20">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({cartSummary.itemCount} items)</span>
                  <span className="font-medium">${cartSummary.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${cartSummary.tax}</span>
                </div>
                <div className="border-t border-white border-opacity-20 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-indigo-600">${cartSummary.total}</span>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={onCheckout}
                className="glass-button text-white w-full py-4 rounded-xl font-semibold text-lg mb-3 border-0"
              >
                Proceed to Checkout
              </Button>
              
              <Button
                variant="ghost"
                onClick={onClose}
                className="glass w-full py-3 rounded-xl font-medium text-gray-700 hover:bg-white hover:bg-opacity-30 transition-all border-0"
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
