import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Cart as CartType } from '../types';

interface NavbarProps {
  cart: CartType;
  onCartUpdate: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cart, onCartUpdate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', emoji: '🏠' },
    { path: '/products', label: 'All Products', emoji: '🛍️' },
    { path: '/deals', label: 'Christmas Deals', emoji: '🎄' },
    { path: '/categories', label: 'Categories', emoji: '📦' },
    { path: '/about', label: 'About', emoji: '🎅' },
    { path: '/contact', label: 'Contact', emoji: '📞' }
  ];

  const categories = [
    { name: 'Electronics', emoji: '📱', count: 8 },
    { name: 'Audio', emoji: '🎧', count: 3 },
    { name: 'Wearables', emoji: '⌚', count: 2 },
    { name: 'Gaming', emoji: '🎮', count: 2 },
    { name: 'Photography', emoji: '📷', count: 1 }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo" onClick={() => navigate('/')}>
          <span className="logo-emoji">🛍️</span>
          <span className="logo-text">Vibe Commerce</span>
          <span className="christmas-badge">🎄</span>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-menu">
          {navItems.map((item) => (
            <button
              key={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <span className="nav-emoji">{item.emoji}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
          
          {/* Categories Dropdown */}
          <div className="nav-dropdown">
            <button className="nav-item dropdown-trigger">
              <span className="nav-emoji">📦</span>
              <span className="nav-label">Categories</span>
              <span className="dropdown-arrow">▼</span>
            </button>
            <div className="dropdown-menu">
              {categories.map((category) => (
                <button
                  key={category.name}
                  className="dropdown-item"
                  onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
                >
                  <span className="category-emoji">{category.emoji}</span>
                  <span className="category-name">{category.name}</span>
                  <span className="category-count">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Search & Cart */}
        <div className="nav-right">
          {/* Search Bar */}
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search products... 🎁" 
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>

          {/* Cart Button */}
          <button 
            className="cart-btn nav-cart-btn"
            onClick={() => navigate('/cart')}
          >
            <span className="cart-emoji">🛒</span>
            <span className="cart-text">Cart</span>
            {cart.items.length > 0 && (
              <span className="cart-badge">
                {cart.items.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>

          {/* User Menu */}
          <div className="user-menu">
            <button className="user-btn">
              <span className="user-emoji">👤</span>
            </button>
            <div className="user-dropdown">
              <button className="user-dropdown-item">My Account</button>
              <button className="user-dropdown-item">Order History</button>
              <button className="user-dropdown-item">Wishlist</button>
              <button className="user-dropdown-item">Settings</button>
              <button className="user-dropdown-item logout">Logout</button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <button
              key={item.path}
              className={`mobile-nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => {
                navigate(item.path);
                setIsMenuOpen(false);
              }}
            >
              <span className="mobile-nav-emoji">{item.emoji}</span>
              <span className="mobile-nav-label">{item.label}</span>
            </button>
          ))}
          
          {/* Mobile Categories */}
          <div className="mobile-categories">
            <h4>Categories</h4>
            {categories.map((category) => (
              <button
                key={category.name}
                className="mobile-category-item"
                onClick={() => {
                  navigate(`/category/${category.name.toLowerCase()}`);
                  setIsMenuOpen(false);
                }}
              >
                <span className="mobile-category-emoji">{category.emoji}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Christmas Offer Banner */}
      <div className="nav-banner">
        <div className="banner-content">
          <span className="banner-emoji">🎅</span>
          <span className="banner-text">Christmas Sale: Up to 60% OFF + Free Shipping! 🎄</span>
          <button className="banner-cta">Shop Now</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;