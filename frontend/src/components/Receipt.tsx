import React from 'react';
import { Receipt as ReceiptType } from '../types';

interface ReceiptProps {
  receipt: ReceiptType;
  onClose: () => void;
}

const Receipt: React.FC<ReceiptProps> = ({ receipt, onClose }) => {
  return (
    <div className="receipt-modal">
      <div className="receipt-overlay" onClick={onClose}></div>
      <div className="receipt-content-christmas">
        {/* Christmas Header */}
        <div className="receipt-header-christmas">
          <div className="receipt-santa">🎅</div>
          <h2>Order Confirmed! 🎉</h2>
          <p className="receipt-greeting">Thank you for your purchase, {receipt.customerInfo.name}!</p>
          <div className="receipt-confetti">🎊</div>
        </div>

        {/* Order Details */}
        <div className="receipt-details-christmas">
          <div className="detail-row">
            <span className="detail-label">🎄 Order ID:</span>
            <span className="detail-value">{receipt.orderId}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">📅 Date:</span>
            <span className="detail-value">{new Date(receipt.timestamp).toLocaleString()}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">👤 Customer:</span>
            <span className="detail-value">{receipt.customerInfo.name}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">📧 Email:</span>
            <span className="detail-value">{receipt.customerInfo.email}</span>
          </div>
        </div>

        {/* Items List */}
        <div className="receipt-items-christmas">
          <h3 className="items-title">🎁 Items Purchased</h3>
          <div className="items-list">
            {receipt.items.map(item => (
              <div key={item.id} className="receipt-item-christmas">
                <div className="item-image-container">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="item-image"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="image-fallback-receipt hidden">📦</div>
                </div>
                <div className="item-details">
                  <div className="item-name">{item.name}</div>
                  <div className="item-quantity">Quantity: {item.quantity}</div>
                </div>
                <div className="item-total-receipt">
                  ${item.itemTotal.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total Section */}
        <div className="receipt-total-christmas">
          <div className="total-line"></div>
          <div className="total-amount">
            <span className="total-label">Total Amount:</span>
            <span className="total-value">${receipt.total.toFixed(2)}</span>
          </div>
          {receipt.total > 50 && (
            <div className="free-shipping-badge">
              🚚 FREE Shipping Applied!
            </div>
          )}
        </div>

        {/* Christmas Message */}
        <div className="christmas-message">
          <div className="message-icon">🎄</div>
          <div className="message-content">
            <strong>Merry Christmas! 🎅</strong>
            <p>Your gifts are being prepared by our elves and will arrive before Christmas!</p>
          </div>
        </div>

        {/* DELIVERY INFO SECTION - THIS WAS MISSING */}
        <div className="receipt-footer">
          <div className="delivery-info">
            <div className="delivery-item">
              <span className="delivery-icon">📦</span>
              <span>Estimated Delivery: Dec 24-26</span>
            </div>
            <div className="delivery-item">
              <span className="delivery-icon">🎀</span>
              <span>Free Gift Wrapping Included</span>
            </div>
          </div>
          
          <p className="receipt-note">
            This is a mock receipt. No actual payment was processed.
          </p>
        </div>

        {/* Print Button Only */}
        <div className="receipt-actions">
          <button className="receipt-print-btn" onClick={() => window.print()}>
            🖨️ Print Receipt
          </button>
        </div>

        {/* Christmas Decorations */}
        <div className="receipt-decoration top-left">❄️</div>
        <div className="receipt-decoration top-right">🌟</div>
        <div className="receipt-decoration bottom-left">🎄</div>
        <div className="receipt-decoration bottom-right">🦌</div>
      </div>
    </div>
  );
};

export default Receipt;