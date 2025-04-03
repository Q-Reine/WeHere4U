
import React, { useState } from 'react';
import { MapPin, X } from 'lucide-react';
import "../styles/userlocation.css";

const UserLocation = ({ currentLocation, onLocationChange, onClose }) => {
  const [selectedLocation, setSelectedLocation] = useState(currentLocation);
  const [customLocation, setCustomLocation] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const popularLocations = [
    'Masoro, Gasabo, Kigali City',
    'Nyamirambo, Nyarugenge, Kigali City',
    'Kimironko, Gasabo, Kigali City',
    'Gikondo, Kicukiro, Kigali City',
    'Remera, Gasabo, Kigali City',
    'Kacyiru, Gasabo, Kigali City'
  ];

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowCustomInput(false);
  };

  const handleCustomLocationChange = (e) => {
    setCustomLocation(e.target.value);
  };

  const handleCustomLocationSelect = () => {
    if (customLocation.trim()) {
      setSelectedLocation(customLocation);
      setShowCustomInput(false);
    }
  };

  const handleSaveLocation = () => {
    onLocationChange(selectedLocation);
  };

  return (
    <div className="location-modal-overlay">
      <div className="location-modal">
        <div className="modal-header">
          <h2>Select Delivery Location</h2>
          <button className="close-modal-btn" onClick={onClose}>
            <X className="close-icon" />
          </button>
        </div>
        
        <div className="modal-content">
          <div className="current-location">
            <MapPin className="location-icon" />
            <p>Current delivery location: <strong>{currentLocation}</strong></p>
          </div>
          
          <h3>Popular Locations</h3>
          <div className="location-options">
            {popularLocations.map((location, index) => (
              <button 
                key={index}
                className={`location-option ${selectedLocation === location ? 'selected' : ''}`}
                onClick={() => handleLocationSelect(location)}
              >
                {location}
              </button>
            ))}
            <button 
              className={`location-option custom ${showCustomInput ? 'selected' : ''}`}
              onClick={() => setShowCustomInput(true)}
            >
              + Add Custom Location
            </button>
          </div>
          
          {showCustomInput && (
            <div className="custom-location">
              <input 
                type="text" 
                placeholder="Enter your delivery address"
                value={customLocation}
                onChange={handleCustomLocationChange}
              />
              <button 
                className="add-custom-btn"
                onClick={handleCustomLocationSelect}
              >
                Add
              </button>
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button 
            className="save-btn"
            onClick={handleSaveLocation}
            disabled={!selectedLocation}
          >
            Save Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLocation;
