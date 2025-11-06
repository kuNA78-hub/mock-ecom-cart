export interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  brand: string;
  category: string;
  inStock: boolean;
  stockQuantity: number;
  features: string[];
  specifications: { [key: string]: string };
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
  itemTotal: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
}

export interface Receipt {
  orderId: string;
  timestamp: string;
  customerInfo: CustomerInfo;
  items: CartItem[];
  total: number;
  status: string;
}