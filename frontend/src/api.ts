import axios from 'axios';
import { Product, Cart, CustomerInfo, Receipt } from './types';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const productAPI = {
  getProducts: (): Promise<Product[]> =>
    api.get('/products').then(response => response.data),
  
  getProduct: (id: string): Promise<Product> =>
    api.get(`/products/${id}`).then(response => response.data),
};

export const cartAPI = {
  getCart: (): Promise<Cart> =>
    api.get('/cart').then(response => response.data),
  
  addToCart: (productId: string, quantity: number = 1): Promise<any> => {
    // Send multiple requests for quantity > 1
    const requests = Array(quantity).fill(null).map(() => 
      api.post('/cart', { productId, quantity: 1 })
    );
    return Promise.all(requests).then(() => ({ success: true }));
  },
  
  removeFromCart: (cartItemId: string): Promise<any> =>
    api.delete(`/cart/${cartItemId}`).then(response => response.data),
  
  // New method to update quantity directly
  updateQuantity: (cartItemId: string, quantity: number): Promise<any> => {
    if (quantity <= 0) {
      return cartAPI.removeFromCart(cartItemId);
    }
    // For this mock API, we'll remove and re-add
    return api.delete(`/cart/${cartItemId}`).then(() => 
      cartAPI.addToCart(cartItemId, quantity)
    );
  }
};

export const checkoutAPI = {
  checkout: (customerInfo: CustomerInfo): Promise<Receipt> =>
    api.post('/checkout', { customerInfo }).then(response => response.data),
};