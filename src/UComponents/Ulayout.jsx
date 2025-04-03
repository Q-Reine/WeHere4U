import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Usidebar from './Usidebar';
import './Ulayout.css'; // Make sure you have this CSS file

const Ulayout = ({ 
  cartItems, 
  toggleCart, 
  location, 
  showLocationModal, 
  setShowLocationModal, 
  onLogout, 
  setLocation
}) => {
  const [activeItem, setActiveItem] = React.useState('home');
  const navigate = useNavigate();

  // Handle sidebar item click
  const handleSidebarClick = (item) => {
    setActiveItem(item);
    navigate(`/user/${item}`);
  };

  return (
    <div className="user-dashboard-container">
      <div className="dashboard-header">
        <h1>Ubufasha Assistive Devices</h1>
        <div className="dashboard-actions">
          <div className="cart-button" onClick={toggleCart}>
            <span className="cart-icon">🛒</span>
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
          </div>
          <div className="location" onClick={() => setShowLocationModal(true)}>
            <span>Delivering to: {location}</span>
            <button className="change-location-btn">Change</button>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <Usidebar 
          activeItem={activeItem} 
          setActiveItem={handleSidebarClick} 
          cartCount={cartItems?.length || 0} 
          toggleCart={toggleCart}
          onLogout={onLogout}
        />
        
        <main className="content-area">
          {/* This is where the nested routes will render */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Ulayout;