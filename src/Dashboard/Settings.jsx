import React, { useState } from 'react';
import '../Dashboard/dashboardstyles/settings.css';

const Settings = () => {
  // State for various settings
  const [settings, setSettings] = useState({
    // Theme settings
    theme: 'light',
    accentColor: '#4f46e5',
    
    // Notification settings
    emailNotifications: true,
    pushNotifications: false,
    notificationFrequency: 'daily',
    
    // Data display settings
    dataRefreshRate: '5',
    showGridLines: true,
    defaultChart: 'bar',
    animateCharts: true,
    
    // Dashboard layout settings
    compactMode: false,
    showResourceMetrics: true,
    showProviderMetrics: true,
    defaultView: 'overview',
    
    // User preferences
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    language: 'en',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save settings to a backend
    console.log('Settings saved:', settings);
    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  // Success message state
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Color options for accent color
  const colorOptions = [
    { value: '#4f46e5', label: 'Indigo' },
    { value: '#2563eb', label: 'Blue' },
    { value: '#16a34a', label: 'Green' },
    { value: '#ea580c', label: 'Orange' },
    { value: '#dc2626', label: 'Red' },
    { value: '#9333ea', label: 'Purple' }
  ];

  // Reset settings to default
  const resetToDefault = () => {
    setSettings({
      theme: 'light',
      accentColor: '#4f46e5',
      emailNotifications: true,
      pushNotifications: false,
      notificationFrequency: 'daily',
      dataRefreshRate: '5',
      showGridLines: true,
      defaultChart: 'bar',
      animateCharts: true,
      compactMode: false,
      showResourceMetrics: true,
      showProviderMetrics: true,
      defaultView: 'overview',
      timezone: 'UTC',
      dateFormat: 'MM/DD/YYYY',
      language: 'en',
    });
  };

  return (
    <div className="settings-container">
      <div className="dashboard-header">
        <h2>Dashboard Settings</h2>
        <div className="dashboard-actions">
          <button 
            className="reset-button" 
            onClick={resetToDefault}
            title="Reset all settings to default values"
          >
            Reset to Default
          </button>
        </div>
      </div>

      {showSuccessMessage && (
        <div className="success-message">
          <span>✓</span> Settings saved successfully!
        </div>
      )}

      <div className="settings-content">
        <form onSubmit={handleSubmit}>
          <div className="settings-grid">
            {/* Appearance Section */}
            <div className="settings-section">
              <h3>Appearance</h3>
              
              <div className="form-group">
                <label htmlFor="theme">Theme</label>
                <select 
                  id="theme" 
                  name="theme" 
                  value={settings.theme} 
                  onChange={handleChange}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System Default</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="accentColor">Accent Color</label>
                <div className="color-picker">
                  {colorOptions.map(color => (
                    <div 
                      key={color.value}
                      className={`color-option ${settings.accentColor === color.value ? 'selected' : ''}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setSettings({...settings, accentColor: color.value})}
                      title={color.label}
                    ></div>
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    name="compactMode" 
                    checked={settings.compactMode} 
                    onChange={handleChange} 
                  />
                  <span className="checkmark"></span>
                  Compact Mode
                </label>
              </div>
            </div>

            {/* Data Display Settings */}
            <div className="settings-section">
              <h3>Data Display</h3>
              
              <div className="form-group">
                <label htmlFor="dataRefreshRate">Data Refresh Rate (minutes)</label>
                <input 
                  type="range" 
                  min="1" 
                  max="60" 
                  id="dataRefreshRate" 
                  name="dataRefreshRate" 
                  value={settings.dataRefreshRate} 
                  onChange={handleChange}
                />
                <span className="range-value">{settings.dataRefreshRate} min</span>
              </div>
              
              <div className="form-group">
                <label htmlFor="defaultChart">Default Chart Type</label>
                <select 
                  id="defaultChart" 
                  name="defaultChart" 
                  value={settings.defaultChart} 
                  onChange={handleChange}
                >
                  <option value="bar">Bar Chart</option>
                  <option value="line">Line Chart</option>
                  <option value="pie">Pie Chart</option>
                  <option value="radar">Radar Chart</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    name="showGridLines" 
                    checked={settings.showGridLines} 
                    onChange={handleChange} 
                  />
                  <span className="checkmark"></span>
                  Show Grid Lines on Charts
                </label>
              </div>
              
              <div className="form-group">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    name="animateCharts" 
                    checked={settings.animateCharts} 
                    onChange={handleChange} 
                  />
                  <span className="checkmark"></span>
                  Animate Charts
                </label>
              </div>
            </div>

            {/* Notifications Settings */}
            <div className="settings-section">
              <h3>Notifications</h3>
              
              <div className="form-group">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    name="emailNotifications" 
                    checked={settings.emailNotifications} 
                    onChange={handleChange} 
                  />
                  <span className="checkmark"></span>
                  Email Notifications
                </label>
              </div>
              
              <div className="form-group">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    name="pushNotifications" 
                    checked={settings.pushNotifications} 
                    onChange={handleChange} 
                  />
                  <span className="checkmark"></span>
                  Push Notifications
                </label>
              </div>
              
              <div className="form-group">
                <label htmlFor="notificationFrequency">Notification Frequency</label>
                <select 
                  id="notificationFrequency" 
                  name="notificationFrequency" 
                  value={settings.notificationFrequency} 
                  onChange={handleChange}
                  disabled={!settings.emailNotifications && !settings.pushNotifications}
                >
                  <option value="realtime">Real-time</option>
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
            </div>

            {/* Preferences Settings */}
            <div className="settings-section">
              <h3>Preferences</h3>
              
              <div className="form-group">
                <label htmlFor="language">Language</label>
                <select 
                  id="language" 
                  name="language" 
                  value={settings.language} 
                  onChange={handleChange}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="timezone">Timezone</label>
                <select 
                  id="timezone" 
                  name="timezone" 
                  value={settings.timezone} 
                  onChange={handleChange}
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">London</option>
                  <option value="Asia/Tokyo">Tokyo</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="dateFormat">Date Format</label>
                <select 
                  id="dateFormat" 
                  name="dateFormat" 
                  value={settings.dateFormat} 
                  onChange={handleChange}
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-footer">
            <button type="submit" className="save-button">Save Settings</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;