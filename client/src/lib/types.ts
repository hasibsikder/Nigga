export interface CartItem {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  quantity: number;
}

export interface OrderFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: string;
  notes?: string;
  items: string;
  subtotal: string;
  tax: string;
  total: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}
