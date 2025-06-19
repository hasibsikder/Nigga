import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { CartItem, OrderFormData } from '@/lib/types';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  cartSummary: {
    subtotal: string;
    tax: string;
    total: string;
    itemCount: number;
  };
  onOrderComplete: () => void;
}

export function OrderModal({
  isOpen,
  onClose,
  cartItems,
  cartSummary,
  onOrderComplete,
}: OrderModalProps) {
  const [formData, setFormData] = useState<Omit<OrderFormData, 'items' | 'subtotal' | 'tax' | 'total'>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    paymentMethod: 'cash',
    notes: '',
  });
  
  const { toast } = useToast();

  const orderMutation = useMutation({
    mutationFn: async (orderData: OrderFormData) => {
      const response = await apiRequest('POST', '/api/orders', orderData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Order placed successfully!",
        description: "We'll contact you soon to confirm your order details.",
      });
      onOrderComplete();
      onClose();
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        paymentMethod: 'cash',
        notes: '',
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderData: OrderFormData = {
      ...formData,
      items: JSON.stringify(cartItems),
      subtotal: cartSummary.subtotal,
      tax: cartSummary.tax,
      total: cartSummary.total,
    };
    
    orderMutation.mutate(orderData);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="modal-backdrop absolute inset-0" onClick={onClose}></div>
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="glass-strong rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in">
          {/* Order Form Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-semibold text-gray-900">Complete Your Order</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="glass p-2 rounded-full hover:bg-white hover:bg-opacity-30 transition-all"
            >
              <X className="w-5 h-5 text-gray-700" />
            </Button>
          </div>

          {/* Order Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <Input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="glass border-0 focus:ring-2 focus:ring-indigo-500"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <Input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="glass border-0 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Doe"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="glass border-0 focus:ring-2 focus:ring-indigo-500"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="glass border-0 focus:ring-2 focus:ring-indigo-500"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Shipping Address</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                  <Input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="glass border-0 focus:ring-2 focus:ring-indigo-500"
                    placeholder="123 Main Street"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <Input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="glass border-0 focus:ring-2 focus:ring-indigo-500"
                      placeholder="New York"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State/Province *</label>
                    <Input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="glass border-0 focus:ring-2 focus:ring-indigo-500"
                      placeholder="NY"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ZIP/Postal Code *</label>
                    <Input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      className="glass border-0 focus:ring-2 focus:ring-indigo-500"
                      placeholder="10001"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)} required>
                      <SelectTrigger className="glass border-0 focus:ring-2 focus:ring-indigo-500">
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-gray-700">Cash on Delivery</span>
                  <span className="text-green-600 text-sm">💵</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer opacity-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    disabled
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-gray-500">Credit/Debit Card (Coming Soon)</span>
                  <span className="text-gray-400 text-sm">💳</span>
                </label>
              </div>
            </div>

            {/* Order Notes */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Order Notes (Optional)</h3>
              <Textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="glass border-0 focus:ring-2 focus:ring-indigo-500"
                placeholder="Any special instructions for your order..."
                rows={3}
              />
            </div>

            {/* Order Summary */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3">
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
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4">
              <Button
                type="submit"
                disabled={orderMutation.isPending}
                className="glass-button text-white flex-1 py-4 rounded-xl font-semibold text-lg border-0"
              >
                {orderMutation.isPending ? (
                  'Placing Order...'
                ) : (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Place Order
                  </>
                )}
              </Button>
              <Button
                type="button"
                onClick={onClose}
                className="glass px-8 py-4 rounded-xl font-medium text-gray-700 hover:bg-white hover:bg-opacity-30 transition-all border-0"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
