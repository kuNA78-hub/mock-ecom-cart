import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { productAPI, cartAPI } from '../api';
import SnowFall from './SnowFall';

const ProductDetails: React.FC<{ onCartUpdate: () => void }> = ({ onCartUpdate }) => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const loadProduct = useCallback(async () => {
    if (!productId) return;
    
    try {
      setLoading(true);
      const productData = await productAPI.getProduct(productId);
      setProduct(productData);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      setIsProcessing(true);
      await cartAPI.addToCart(product.id, quantity);
      onCartUpdate();
      alert(`${quantity} ${product.name}(s) added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding product to cart');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBuyNow = async () => {
    if (!product) return;
    
    try {
      setIsProcessing(true);
      
      // Clear existing cart first to only have this product
      const currentCart = await cartAPI.getCart();
      
      // Remove all existing items from cart
      for (const item of currentCart.items) {
        await cartAPI.removeFromCart(item.id);
      }
      
      // Add the selected product with desired quantity
      await cartAPI.addToCart(product.id, quantity);
      
      // Update cart and redirect to checkout
      onCartUpdate();
      
      // Show success message and redirect to checkout
      setTimeout(() => {
        navigate('/checkout');
      }, 500);
      
    } catch (error) {
      console.error('Error in Buy Now:', error);
      alert('Error processing Buy Now. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} style={{ color: index < Math.floor(rating) ? '#fbbf24' : '#e4e5e9', fontSize: '1.2rem' }}>
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <SnowFall />
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-container">
        <SnowFall />
        <div className="error-content">
          <h2>😔 Product Not Found</h2>
          <p>The product you're looking for doesn't exist.</p>
          <button 
            className="back-home-btn"
            onClick={() => navigate('/')}
          >
            ← Back to Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details-modern">
      <SnowFall />
      
      <div className="breadcrumb">
        <button onClick={() => navigate('/')} className="breadcrumb-link">Home</button>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{product.name}</span>
      </div>

      <div className="product-layout">
        <div className="product-gallery">
          <div className="main-image-container">
            <img 
              src={product.image} 
              alt={product.name}
              className="main-product-image"
            />
            {!product.inStock && (
              <div className="out-of-stock-overlay">
                <span>Out of Stock</span>
              </div>
            )}
          </div>
        </div>

        <div className="product-info-sidebar">
          <div className="product-basic-info">
            <h1 className="product-title-modern">{product.name}</h1>
            
            <div className="rating-brand-section">
              <div className="rating-display">
                <div className="stars">
                  {renderStars(product.rating)}
                </div>
                <span className="rating-text">({product.reviewCount} reviews)</span>
              </div>
              <div className="brand-tag">Brand: <strong>{product.brand}</strong></div>
            </div>

            <div className="price-section">
              <span className="current-price">${product.price.toFixed(2)}</span>
            </div>

            <div className={`availability ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
              <span className="status-icon">
                {product.inStock ? '✅' : '❌'}
              </span>
              {product.inStock ? 
                `In Stock - ${product.stockQuantity} available` : 
                'Currently Unavailable'
              }
            </div>
          </div>

          {/* Add to Cart Section */}
          <div className="add-to-cart-sidebar">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <div className="quantity-controls">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1 || isProcessing}
                  className="quantity-btn"
                >
                  -
                </button>
                <span className="quantity-display">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.stockQuantity || isProcessing}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
            </div>

            <div className="cart-actions">
              <button 
                className="add-to-cart-primary"
                onClick={handleAddToCart}
                disabled={!product.inStock || isProcessing}
              >
                <span className="cart-icon">🛒</span>
                {isProcessing ? 'Processing...' : (product.inStock ? 'Add to Cart' : 'Out of Stock')}
              </button>
              
              <button 
                className="buy-now-primary"
                onClick={handleBuyNow}
                disabled={!product.inStock || isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Buy Now'}
              </button>
            </div>

            {/* DELIVERY INFO SECTION - THIS WAS MISSING */}
            <div className="delivery-info">
              <div className="delivery-item">
                <span className="delivery-icon">🚚</span>
                <span>Free delivery for orders above $50</span>
              </div>
              <div className="delivery-item">
                <span className="delivery-icon">↩️</span>
                <span>30-day return policy</span>
              </div>
              <div className="delivery-item">
                <span className="delivery-icon">🛡️</span>
                <span>2-year warranty included</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="product-tabs">
        <div className="tab-content">
          <section className="tab-section">
            <h2>✨ Key Features</h2>
            <div className="features-grid">
              {product.features.map((feature: string, index: number) => (
                <div key={index} className="feature-card">
                  <span className="feature-icon">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="tab-section">
            <h2>📋 Technical Specifications</h2>
            <div className="specs-grid">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="spec-item">
                  <span className="spec-label">{key}</span>
                  <span className="spec-value">{String(value)}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="tab-section">
            <h2>📖 About This Product</h2>
            <div className="description-content-modern">
              <p className="product-description-text">{product.description}</p>
              <div className="brand-highlight-modern">
                <h3>🏆 About {product.brand}</h3>
                <p>
                  {product.brand} is committed to delivering premium quality {product.category.toLowerCase()} 
                  that combines innovative technology with exceptional user experience. This product represents 
                  their dedication to excellence and customer satisfaction.
                </p>
              </div>
            </div>
          </section>

          <section className="tab-section">
            <h2>💬 Customer Reviews</h2>
            <div className="reviews-overview">
              <div className="overall-rating-modern">
                <div className="rating-score">{product.rating}</div>
                <div className="rating-stars-large">{renderStars(product.rating)}</div>
                <div className="total-reviews">{product.reviewCount} reviews</div>
              </div>
            </div>

            <div className="reviews-list-modern">
              {product.reviews.map((review, index: number) => (
                <div key={index} className="review-card">
                  <div className="review-header-modern">
                    <div className="reviewer-info">
                      <span className="reviewer-avatar">👤</span>
                      <span className="reviewer-name">{review.user}</span>
                    </div>
                    <div className="review-meta">
                      <div className="review-rating">{renderStars(review.rating)}</div>
                      <span className="review-date">{review.date}</span>
                    </div>
                  </div>
                  <p className="review-comment-modern">{review.comment}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;