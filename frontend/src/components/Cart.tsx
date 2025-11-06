import React from 'react';
import { Cart as CartType } from '../types';
import { cartAPI } from '../api';

interface CartProps {
  cart: CartType;
  onCartUpdate: () => void;
}

const Cart: React.FC<CartProps> = ({ cart, onCartUpdate }) => {
  const handleRemoveItem = async (cartItemId: string) => {
    try {
      await cartAPI.removeFromCart(cartItemId);
      onCartUpdate();
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Error removing item from cart');
    }
  };

  const handleUpdateQuantity = async (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(cartItemId);
      return;
    }

    try {
      // For this mock API, we need to remove and re-add with new quantity
      const item = cart.items.find(item => item.id === cartItemId);
      if (item) {
        await cartAPI.removeFromCart(cartItemId);
        await cartAPI.addToCart(item.productId, newQuantity);
        onCartUpdate();
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Error updating quantity');
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-cart-christmas">
          <div className="empty-cart-emoji">🎄</div>
          <h2>Your Cart is Empty</h2>
          <p>Add some festive products to make your Christmas magical!</p>
          <button 
            className="continue-shopping-btn"
            onClick={() => window.location.href = '/'}
          >
            🎁 Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-christmas">
      <div className="cart-christmas-header">
        <h2>🎅 Your Christmas Shopping Cart</h2>
        <p>Review your festive selections before checkout</p>
      </div>

      <div className="cart-items">
        {cart.items.map(item => (
          <div key={item.id} className="christmas-cart-item">
            <div className="cart-item-image">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-badge">🎄</div>
            </div>
            
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-price">${item.price.toFixed(2)} each</div>
            </div>
            
            <div className="cart-item-controls">
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="quantity-display">{item.quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              
              <div className="item-total">
                ${item.itemTotal.toFixed(2)}
              </div>
              
              <button 
                className="remove-btn"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-total-section">
        <div className="cart-total">Total: ${cart.total.toFixed(2)}</div>
        {cart.total > 50 && (
          <div className="free-shipping-banner">
            🚚 You qualify for FREE shipping! 🎅
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;