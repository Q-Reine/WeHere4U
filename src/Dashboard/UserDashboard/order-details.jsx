import React from 'react';
import { ArrowLeft, Truck, Calendar, MapPin, CreditCard, Package, CheckCircle, XCircle, Phone } from 'lucide-react';
import '../UserDashboard/userdashboardstyles/order-details.css';

const OrderDetails = ({ order, onBack }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-RW', options);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'processing':
        return 'status-processing';
      case 'completed':
        return 'status-completed';
      case 'failed':
        return 'status-failed';
      default:
        return '';
    }
  };

  const handleCancelOrder = () => {
    alert('Your order cancellation request has been submitted. Our team will contact you shortly.');
    onBack();
  };

  const handleContactSupport = () => {
    alert('Connecting you to customer support...');
  };

  return (
    <div className="order-details">
      <div className="order-details-header">
        <button 
          className="back-button"
          onClick={onBack}
          aria-label="Go back to orders"
        >
          <ArrowLeft className="back-icon" />
          <span>Back to Orders</span>
        </button>
        <h2>Order Details</h2>
      </div>
      
      <div className="order-info-card">
        <div className="order-info-header">
          <div>
            <h3>{order.id}</h3>
            <p className="order-date">Ordered on {formatDate(order.date)}</p>
          </div>
          <div className={`order-status ${getStatusClass(order.status)}`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </div>
        </div>
        
        {order.status === 'processing' && (
          <div className="tracking-info">
            <div className="tracking-header">
              <Truck className="tracking-icon" />
              <h4>Delivery Information</h4>
            </div>
            <div className="tracking-details">
              <div className="tracking-item">
                <span className="tracking-label">Tracking Number:</span>
                <span className="tracking-value">{order.trackingNumber}</span>
              </div>
              <div className="tracking-item">
                <span className="tracking-label">Estimated Delivery:</span>
                <span className="tracking-value">{formatDate(order.estimatedDelivery)}</span>
              </div>
              <div className="tracking-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '40%' }}></div>
                </div>
                <div className="progress-steps">
                  <div className="progress-step completed">
                    <div className="step-dot"></div>
                    <span>Order Placed</span>
                  </div>
                  <div className="progress-step completed">
                    <div className="step-dot"></div>
                    <span>Processing</span>
                  </div>
                  <div className="progress-step">
                    <div className="step-dot"></div>
                    <span>Shipped</span>
                  </div>
                  <div className="progress-step">
                    <div className="step-dot"></div>
                    <span>Delivered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {order.status === 'completed' && (
          <div className="delivery-info">
            <div className="delivery-header">
              <CheckCircle className="delivery-icon" />
              <h4>Delivery Information</h4>
            </div>
            <div className="delivery-details">
              <div className="delivery-item">
                <span className="delivery-label">Delivered on:</span>
                <span className="delivery-value">{formatDate(order.deliveryDate)}</span>
              </div>
              <div className="delivery-item">
                <span className="delivery-label">Tracking Number:</span>
                <span className="delivery-value">{order.trackingNumber}</span>
              </div>
            </div>
          </div>
        )}
        
        {order.status === 'failed' && (
          <div className="failed-info">
            <div className="failed-header">
              <XCircle className="failed-icon" />
              <h4>Order Failed</h4>
            </div>
            <div className="failed-details">
              <div className="failed-reason">
                <span className="failed-label">Reason:</span>
                <span className="failed-value">{order.reason}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="order-details-section">
        <h3>Items</h3>
        <div className="order-items-list">
          {order.items.map((item, index) => (
            <div className="order-item-card" key={index}>
              <div className="item-details">
                <Package className="item-icon" />
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p className="item-quantity">Quantity: {item.quantity}</p>
                </div>
              </div>
              <div className="item-price">
                {item.price.toLocaleString()} RWF
              </div>
            </div>
          ))}
        </div>
        <div className="order-summary">
          <div className="summary-item">
            <span>Subtotal</span>
            <span>{order.total.toLocaleString()} RWF</span>
          </div>
          <div className="summary-item">
            <span>Delivery Fee</span>
            <span>0 RWF</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>{order.total.toLocaleString()} RWF</span>
          </div>
        </div>
      </div>
      
      <div className="order-details-section">
        <h3>Delivery Information</h3>
        <div className="info-card">
          <div className="info-item">
            <MapPin className="info-icon" />
            <div>
              <span className="info-label">Delivery Address</span>
              <span className="info-value">{order.deliveryLocation}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="order-details-section">
        <h3>Payment Information</h3>
        <div className="info-card">
          <div className="info-item">
            <CreditCard className="info-icon" />
            <div>
              <span className="info-label">Payment Method</span>
              <span className="info-value">{order.paymentMethod}</span>
            </div>
          </div>
        </div>
      </div>
      
      {order.status === 'processing' && (
        <div className="action-buttons">
          <button 
            className="cancel-order-btn"
            onClick={handleCancelOrder}
            aria-label="Cancel this order"
          >
            <XCircle className="action-icon" />
            Cancel Order
          </button>
          <button 
            className="contact-support-btn"
            onClick={handleContactSupport}
            aria-label="Contact customer support"
          >
            <Phone className="action-icon" />
            Contact Support
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;