import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ProductGrid from './components/ProductGrid';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import Receipt from './components/Receipt';
import SnowFall from './components/SnowFall';
import { Cart as CartType, Receipt as ReceiptType } from './types';
import { cartAPI } from './api';
import './App.css';

// Header Component
const Header: React.FC<{ cartItemCount: number }> = ({ cartItemCount }) => {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <div className="container">
        <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          🛍️ Vibe Commerce
        </h1>
        <nav className="app-nav">
          <button
            onClick={() => navigate('/cart')}
            className="nav-btn cart-nav-btn"
          >
            🛒 Cart
            {cartItemCount > 0 && (
              <span className="cart-count">{cartItemCount}</span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

// Main App Component
const App: React.FC = () => {
  const [cart, setCart] = useState<CartType>({ items: [], total: 0 });
  const [receipt, setReceipt] = useState<ReceiptType | null>(null);

  const refreshCart = async () => {
    try {
      const cartData = await cartAPI.getCart();
      setCart(cartData);
    } catch (error) {
      console.error('Error fetching cart:', error);
      // Set empty cart on error
      setCart({ items: [], total: 0 });
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const cartItemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="App">
        <SnowFall />
        <Header cartItemCount={cartItemCount} />

        <main className="app-main">
          <Routes>
            <Route path="/" element={<ProductGrid onCartUpdate={refreshCart} />} />
            <Route path="/product/:productId" element={<ProductDetails onCartUpdate={refreshCart} />} />
            <Route path="/cart" element={
              <div className="cart-section">
                <Cart cart={cart} onCartUpdate={refreshCart} />
                {cart.items.length > 0 && (
                  <button 
                    className="checkout-btn"
                    onClick={() => window.location.href = '/checkout'}
                  >
                    Proceed to Checkout
                  </button>
                )}
              </div>
            } />
            <Route path="/checkout" element={
              <CheckoutForm 
                onBack={() => window.location.href = '/cart'}
                onSuccess={(receiptData) => {
                  setReceipt(receiptData);
                  refreshCart();
                }}
              />
            } />
          </Routes>
        </main>

        {receipt && (
          <Receipt 
            receipt={receipt}
            onClose={() => {
              setReceipt(null);
              window.location.href = '/';
            }}
          />
        )}
      </div>
    </Router>
  );
};

export default App;