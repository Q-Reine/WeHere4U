import React from 'react';
import { Outlet } from 'react-router-dom';
import './Ulayout.css';

const Ulayout = ({ 
  cartItems, 
  toggleCart, 
  location, 
  setShowLocationModal,
  onLogout
}) => {
  return (
    <div className="user-dashboard-container">
      <header className="dashboard-header">
        <h1>User Dashboard</h1>
        
        <div className="dashboard-actions">
          <div className="location">
            <span>
              <i className="icon-location"></i> {location}
            </span>
            <button 
              className="change-location-btn"
              onClick={() => setShowLocationModal(true)}
            >
              Change
            </button>
          </div>
          
          <div className="cart-button" onClick={toggleCart}>
            <i className="cart-icon">🛒</i>
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
          </div>
        </div>
      </header>
      
      <div className="dashboard-content">
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Ulayout;