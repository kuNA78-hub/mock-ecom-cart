import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { productAPI, cartAPI } from '../api';

interface ProductGridProps {
  onCartUpdate: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onCartUpdate }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const productsData = await productAPI.getProducts();
      setProducts(productsData);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent navigation when clicking add to cart
    
    try {
      await cartAPI.addToCart(productId);
      onCartUpdate();
      
      // Show visual feedback
      const button = event.target as HTMLButtonElement;
      const originalText = button.innerHTML;
      button.innerHTML = '✅ Added!';
      button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      
      setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = 'linear-gradient(135deg, #dc2626, #ea580c)';
      }, 1500);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding product to cart');
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading festive products...</p>
      </div>
    );
  }

  return (
    <div className="product-grid-container">
      {/* Christmas Hero Section */}
      <div className="christmas-hero">
        <h1 className="hero-title">🎄 Christmas Sale Extravaganza! 🎁</h1>
        <p className="hero-subtitle">Discover magical deals and festive offers</p>
      </div>

      {/* Products Grid */}
      <div className="product-grid-section">
        <h2 className="section-title">Featured Products</h2>
        <p className="section-subtitle">Perfect gifts for your loved ones this Christmas</p>
        
        <div className="product-grid">
          {products.map(product => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => handleProductClick(product.id)}
            >
              {/* Christmas Ribbon for Special Offers */}
              {product.price < 50 && (
                <div className="christmas-ribbon">HOT DEAL</div>
              )}
              
              {product.price > 200 && (
                <div className="christmas-ribbon premium">PREMIUM</div>
              )}

              <div className="product-image">
                <img 
                  src={product.image} 
                  alt={product.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="image-fallback">
                  {product.name.charAt(0)}
                </div>
              </div>

              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                <div className="product-footer">
                  <div className="product-price">${product.price.toFixed(2)}</div>
                  <button 
                    className="add-to-cart-btn"
                    onClick={(e) => handleAddToCart(product.id, e)}
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;