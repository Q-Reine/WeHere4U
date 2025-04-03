import React, { useState, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Usidebar';
import LocationModal from './location-modal';
import CartContext from './CartContext'; // You'll need to create this context

const UserLayout = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [location, setLocation] = useState('Masoro, Gasabo, Kigali City');
  const navigate = useNavigate();
  
  // Use CartContext (you'll need to create this)
  const { cartItems, toggleCart } = useContext(CartContext);

  // Handle location change
  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
    setShowLocationModal(false);
  };

  // Handle sidebar item selection
  const handleSidebarItemClick = (item) => {
    setActiveItem(item);
    navigate(`/user/${item === 'home' ? '' : item}`);
  };

  return (
    <div className="dashboard">
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
      
      <main className="dashboard-content">
        <Outlet context={{ location }} />
      </main>
      
      <Sidebar 
        activeItem={activeItem} 
        setActiveItem={handleSidebarItemClick} 
        cartCount={cartItems.length} 
        toggleCart={toggleCart} 
      />
      
      {showLocationModal && (
        <LocationModal 
          currentLocation={location} 
          onLocationChange={handleLocationChange} 
          onClose={() => setShowLocationModal(false)} 
        />
      )}
    </div>
  );
};

export default UserLayout;