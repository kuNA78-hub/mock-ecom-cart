import React, { useState } from 'react';
import { CustomerInfo, Receipt } from '../types';
import { checkoutAPI } from '../api';

interface CheckoutFormProps {
  onBack: () => void;
  onSuccess: (receipt: Receipt) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onBack, onSuccess }) => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const receipt = await checkoutAPI.checkout(customerInfo);
      onSuccess(receipt);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Error during checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <div className="checkout-form-container">
      <form className="checkout-form-improved" onSubmit={handleSubmit}>
        <div className="checkout-header">
          <h2>🎄 Checkout</h2>
          <p>Please enter your information to complete the purchase</p>
        </div>
        
        <div className="form-group-improved">
          <label 
            htmlFor="name" 
            className={`form-label ${focusedField === 'name' || customerInfo.name ? 'focused' : ''}`}
          >
            Full Name
          </label>
          <div className="input-container">
            <input
              type="text"
              id="name"
              name="name"
              value={customerInfo.name}
              onChange={handleChange}
              onFocus={() => handleFocus('name')}
              onBlur={handleBlur}
              required
              placeholder=" "
              className="form-input-improved"
            />
            <span className="input-icon">👤</span>
            <div className="input-border"></div>
          </div>
          {customerInfo.name && (
            <div className="input-feedback positive">✓ Valid name</div>
          )}
        </div>

        <div className="form-group-improved">
          <label 
            htmlFor="email" 
            className={`form-label ${focusedField === 'email' || customerInfo.email ? 'focused' : ''}`}
          >
            Email Address
          </label>
          <div className="input-container">
            <input
              type="email"
              id="email"
              name="email"
              value={customerInfo.email}
              onChange={handleChange}
              onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
              required
              placeholder=" "
              className="form-input-improved"
            />
            <span className="input-icon">📧</span>
            <div className="input-border"></div>
          </div>
          {customerInfo.email && (
            <div className={`input-feedback ${customerInfo.email.includes('@') ? 'positive' : 'warning'}`}>
              {customerInfo.email.includes('@') ? '✓ Valid email format' : '⚠ Should contain @'}
            </div>
          )}
        </div>

        <div className="form-actions-improved">
          <button type="button" className="back-btn-improved" onClick={onBack}>
            ← Back to Cart
          </button>
          <button 
            type="submit" 
            className="submit-btn-improved" 
            disabled={loading || !customerInfo.name || !customerInfo.email}
          >
            {loading ? (
              <>
                <span className="loading-spinner-btn"></span>
                Processing...
              </>
            ) : (
              <>
                <span className="btn-icon">🎁</span>
                Complete Purchase
              </>
            )}
          </button>
        </div>

        <div className="security-notice-mini">
          <span className="security-icon">🔒</span>
          <span>Your information is secure and encrypted</span>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;