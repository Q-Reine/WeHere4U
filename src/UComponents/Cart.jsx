import React, { useState } from 'react';
import { X, Minus, Plus, CreditCard, ArrowLeft } from 'lucide-react';
import './Cart.css';

const Cart = ({ cartItems, onClose, onRemoveItem, onUpdateQuantity }) => {
  const [checkoutStep, setCheckoutStep] = useState('cart'); // cart, payment, confirmation
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    phoneNumber: ''
  });

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDeliveryFee = () => {
    return calculateSubtotal() > 100000 ? 0 : 5000;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateDeliveryFee();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setCheckoutStep('payment');
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Process payment logic would go here
    setCheckoutStep('confirmation');
  };

  const handleBackToCart = () => {
    setCheckoutStep('cart');
  };

  const renderCartItems = () => (
    <div className="cart-items">
      {cartItems.length > 0 ? (
        cartItems.map(item => (
          <div className="cart-item" key={item.id}>
            <div className="item-image">
              <img src={item.image || "/placeholder.svg"} alt={item.name} />
            </div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="item-price">{item.price.toLocaleString()} RWF</p>
              <div className="item-quantity">
                <button 
                  className="quantity-btn"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus className="quantity-icon" />
                </button>
                <span>{item.quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus className="quantity-icon" />
                </button>
              </div>
            </div>
            <button 
              className="remove-item-btn"
              onClick={() => onRemoveItem(item.id)}
              aria-label={`Remove ${item.name} from cart`}
            >
              <X className="remove-icon" />
            </button>
          </div>
        ))
      ) : (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button className="continue-shopping-btn" onClick={onClose}>
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );

  const renderOrderSummary = () => (
    <div className="order-summary">
      <h3>Order Summary</h3>
      <div className="summary-row">
        <span>Subtotal</span>
        <span>{calculateSubtotal().toLocaleString()} RWF</span>
      </div>
      <div className="summary-row">
        <span>Delivery Fee</span>
        <span>{calculateDeliveryFee().toLocaleString()} RWF</span>
      </div>
      <div className="summary-row total">
        <span>Total</span>
        <span>{calculateTotal().toLocaleString()} RWF</span>
      </div>
      {checkoutStep === 'cart' && (
        <button 
          className="checkout-btn"
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );

  const renderPaymentStep = () => (
    <div className="payment-step">
      <button className="back-btn" onClick={handleBackToCart}>
        <ArrowLeft className="back-icon" />
        Back to Cart
      </button>
      
      <h2>Payment Method</h2>
      
      <div className="payment-methods">
        <div className="payment-method-option">
          <input 
            type="radio" 
            id="credit-card" 
            name="payment-method" 
            value="credit-card"
            checked={paymentMethod === 'credit-card'}
            onChange={() => setPaymentMethod('credit-card')}
          />
          <label htmlFor="credit-card">Credit/Debit Card</label>
        </div>
        
        <div className="payment-method-option">
          <input 
            type="radio" 
            id="mobile-money" 
            name="payment-method" 
            value="mobile-money"
            checked={paymentMethod === 'mobile-money'}
            onChange={() => setPaymentMethod('mobile-money')}
          />
          <label htmlFor="mobile-money">Mobile Money</label>
        </div>
        
        <div className="payment-method-option">
          <input 
            type="radio" 
            id="cash" 
            name="payment-method" 
            value="cash"
            checked={paymentMethod === 'cash'}
            onChange={() => setPaymentMethod('cash')}
          />
          <label htmlFor="cash">Cash on Delivery</label>
        </div>
      </div>
      
      {paymentMethod === 'credit-card' && (
        <form className="payment-form" onSubmit={handlePaymentSubmit}>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input 
              type="text" 
              id="cardNumber" 
              name="cardNumber" 
              placeholder="1234 5678 9012 3456"
              value={paymentDetails.cardNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="cardName">Cardholder Name</label>
            <input 
              type="text" 
              id="cardName" 
              name="cardName" 
              placeholder="John Doe"
              value={paymentDetails.cardName}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input 
                type="text" 
                id="expiryDate" 
                name="expiryDate" 
                placeholder="MM/YY"
                value={paymentDetails.expiryDate}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input 
                type="text" 
                id="cvv" 
                name="cvv" 
                placeholder="123"
                value={paymentDetails.cvv}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <button type="submit" className="pay-btn">
            <CreditCard className="pay-icon" />
            Pay {calculateTotal().toLocaleString()} RWF
          </button>
        </form>
      )}
      
      {paymentMethod === 'mobile-money' && (
        <form className="payment-form" onSubmit={handlePaymentSubmit}>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input 
              type="tel" 
              id="phoneNumber" 
              name="phoneNumber" 
              placeholder="+250 78 123 4567"
              value={paymentDetails.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <p className="payment-note">
            You will receive a prompt on your phone to complete the payment.
          </p>
          
          <button type="submit" className="pay-btn">
            Continue to Mobile Money
          </button>
        </form>
      )}
      
      {paymentMethod === 'cash' && (
        <form className="payment-form" onSubmit={handlePaymentSubmit}>
          <p className="payment-note">
            You will pay in cash when your order is delivered to your address.
          </p>
          
          <button type="submit" className="pay-btn">
            Place Order
          </button>
        </form>
      )}
    </div>
  );

  const renderConfirmationStep = () => (
    <div className="confirmation-step">
      <div className="confirmation-message">
        <div className="confirmation-icon">✓</div>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your order. Your order has been placed and is being processed.</p>
        <p>Order number: <strong>ORD-{Math.floor(Math.random() * 10000)}</strong></p>
        <p>You will receive a confirmation email shortly.</p>
        
        <button className="continue-shopping-btn" onClick={onClose}>
          Continue Shopping
        </button>
      </div>
    </div>
  );

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>
          {checkoutStep === 'cart' && 'Your Cart'}
          {checkoutStep === 'payment' && 'Checkout'}
          {checkoutStep === 'confirmation' && 'Order Confirmation'}
        </h2>
        {checkoutStep === 'cart' && (
          <button className="close-cart-btn" onClick={onClose}>×</button>
        )}
      </div>
      
      <div className="cart-content">
        {checkoutStep === 'cart' && (
          <>
            {renderCartItems()}
            {cartItems.length > 0 && renderOrderSummary()}
          </>
        )}
        
        {checkoutStep === 'payment' && (
          <div className="payment-container">
            {renderPaymentStep()}
            {renderOrderSummary()}
          </div>
        )}
        
        {checkoutStep === 'confirmation' && renderConfirmationStep()}
      </div>
    </div>
  );
};

export default Cart;
