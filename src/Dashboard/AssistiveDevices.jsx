import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, 
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';
import '../Dashboard/dashboardstyles/assistivedevice.css';

// Sample device data - replace with actual API call
const devicesData = [
  { id: 1, name: 'Standard Wheelchair', category: 'Mobility', price: 250, available: 45, region: 'West Africa', manufacturer: 'AccessMobility', rating: 4.5 },
  { id: 2, name: 'Digital Hearing Aid', category: 'Hearing', price: 180, available: 60, region: 'East Africa', manufacturer: 'HearClear', rating: 4.3 },
  { id: 3, name: 'Braille Reader', category: 'Visual', price: 320, available: 25, region: 'Southern Africa', manufacturer: 'VisionTech', rating: 4.7 },
  { id: 4, name: 'Communication Tablet', category: 'Communication', price: 210, available: 50, region: 'North Africa', manufacturer: 'ComAssist', rating: 4.2 },
  { id: 5, name: 'Mobility Cane', category: 'Visual', price: 45, available: 120, region: 'East Africa', manufacturer: 'VisionTech', rating: 4.4 },
  { id: 6, name: 'Adaptive Keyboard', category: 'Communication', price: 85, available: 70, region: 'West Africa', manufacturer: 'ComAssist', rating: 4.1 },
  { id: 7, name: 'Powered Wheelchair', category: 'Mobility', price: 650, available: 15, region: 'Southern Africa', manufacturer: 'AccessMobility', rating: 4.8 },
  { id: 8, name: 'Hearing Amplifier', category: 'Hearing', price: 95, available: 80, region: 'North Africa', manufacturer: 'HearClear', rating: 4.0 },
  { id: 9, name: 'Screen Reader Software', category: 'Visual', price: 175, available: 100, region: 'West Africa', manufacturer: 'VisionTech', rating: 4.6 },
  { id: 10, name: 'Speech Generating Device', category: 'Communication', price: 290, available: 35, region: 'East Africa', manufacturer: 'ComAssist', rating: 4.5 },
];

// Category distribution data
const categoryData = [
  { name: 'Mobility', value: 35 },
  { name: 'Visual', value: 25 },
  { name: 'Hearing', value: 20 },
  { name: 'Communication', value: 15 },
  { name: 'Cognitive', value: 5 },
];

// Region distribution data
const regionData = [
  { name: 'West Africa', value: 40 },
  { name: 'East Africa', value: 30 },
  { name: 'Southern Africa', value: 20 },
  { name: 'North Africa', value: 10 },
];

// Monthly sales data
const monthlySalesData = [
  { month: 'Sep', sales: 85, revenue: 15200 },
  { month: 'Oct', sales: 105, revenue: 18500 },
  { month: 'Nov', sales: 120, revenue: 21000 },
  { month: 'Dec', sales: 150, revenue: 26500 },
  { month: 'Jan', sales: 170, revenue: 31000 },
  { month: 'Feb', sales: 190, revenue: 34500 },
  { month: 'Mar', sales: 210, revenue: 38000 },
];

// User satisfaction data (for radar chart)
const satisfactionData = [
  { aspect: 'Affordability', score: 4.2 },
  { aspect: 'Durability', score: 4.5 },
  { aspect: 'Ease of Use', score: 4.3 },
  { aspect: 'Maintenance', score: 3.9 },
  { aspect: 'Availability', score: 3.7 },
  { aspect: 'Customer Support', score: 4.1 },
];

// Price range distribution
const priceRangeData = [
  { range: 'Under $50', count: 15 },
  { range: '$50-$100', count: 25 },
  { range: '$100-$200', count: 30 },
  { range: '$200-$500', count: 20 },
  { range: 'Over $500', count: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

function AssistiveDevices() {
  const [devices, setDevices] = useState(devicesData);
  const [filteredDevices, setFilteredDevices] = useState(devicesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');
  const [priceSort, setPriceSort] = useState('none');
  const [showDeviceForm, setShowDeviceForm] = useState(false);
  const [newDevice, setNewDevice] = useState({
    name: '',
    category: '',
    price: '',
    available: '',
    region: '',
    manufacturer: '',
    rating: 4.0
  });
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [activeTab, setActiveTab] = useState('inventory');

  // Apply filters when any filter changes
  useEffect(() => {
    let filtered = devices;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(device => 
        device.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        device.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'All') {
      filtered = filtered.filter(device => device.category === categoryFilter);
    }
    
    // Apply region filter
    if (regionFilter !== 'All') {
      filtered = filtered.filter(device => device.region === regionFilter);
    }
    
    // Apply sorting
    if (priceSort !== 'none') {
      filtered = [...filtered].sort((a, b) => {
        return priceSort === 'asc' ? a.price - b.price : b.price - a.price;
      });
    }
    
    setFilteredDevices(filtered);
  }, [searchTerm, categoryFilter, regionFilter, priceSort, devices]);

  // Get unique categories and regions for filter options
  const categories = ['All', ...new Set(devices.map(device => device.category))];
  const regions = ['All', ...new Set(devices.map(device => device.region))];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDevice({
      ...newDevice,
      [name]: name === 'price' || name === 'available' ? parseFloat(value) : value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDevice) {
      // Update existing device
      const updatedDevices = devices.map(device => 
        device.id === selectedDevice.id ? { ...newDevice, id: selectedDevice.id } : device
      );
      setDevices(updatedDevices);
      setSelectedDevice(null);
    } else {
      // Add new device
      const newId = Math.max(...devices.map(device => device.id)) + 1;
      const deviceToAdd = { ...newDevice, id: newId };
      setDevices([...devices, deviceToAdd]);
    }
    
    setNewDevice({
      name: '',
      category: '',
      price: '',
      available: '',
      region: '',
      manufacturer: '',
      rating: 4.0
    });
    setShowDeviceForm(false);
  };

  // Handle edit device
  const handleEditDevice = (device) => {
    setSelectedDevice(device);
    setNewDevice({
      name: device.name,
      category: device.category,
      price: device.price,
      available: device.available,
      region: device.region,
      manufacturer: device.manufacturer,
      rating: device.rating
    });
    setShowDeviceForm(true);
  };

  // Handle delete device
  const handleDeleteDevice = (deviceId) => {
    if (window.confirm('Are you sure you want to delete this device?')) {
      setDevices(devices.filter(device => device.id !== deviceId));
    }
  };

  // Calculate total inventory value
  const totalInventoryValue = devices.reduce((total, device) => total + (device.price * device.available), 0);
  
  // Calculate low stock items (less than 20 units)
  const lowStockItems = devices.filter(device => device.available < 20).length;

  return (
    <div className="assistive-devices">
      <div className="device-tabs">
        <button 
          className={`tab-button ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory Management
        </button>
        <button 
          className={`tab-button ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          Device Analytics
        </button>
        <button 
          className={`tab-button ${activeTab === 'satisfaction' ? 'active' : ''}`}
          onClick={() => setActiveTab('satisfaction')}
        >
          User Satisfaction
        </button>
      </div>

      {activeTab === 'inventory' && (
        <>
          <div className="device-stats">
            <div className="stats-card">
              <h3>Total Devices</h3>
              <p className="stat-number">850</p>
              <p className="stat-change positive">+8% from last month</p>
            </div>
            <div className="stats-card">
              <h3>Unique Products</h3>
              <p className="stat-number">{devices.length}</p>
              <p className="stat-change positive">+5% from last month</p>
            </div>
            <div className="stats-card">
              <h3>Inventory Value</h3>
              <p className="stat-number">${totalInventoryValue.toLocaleString()}</p>
              <p className="stat-change positive">+12% from last month</p>
            </div>
            <div className="stats-card">
              <h3>Low Stock Items</h3>
              <p className="stat-number">{lowStockItems}</p>
              <p className="stat-change negative">+3 from last month</p>
            </div>
          </div>

          <div className="device-management-controls">
            <h3>Device Inventory</h3>
            <div className="controls-top">
              <div className="search-filters">
                <input
                  type="text"
                  placeholder="Search device name or manufacturer"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <select 
                  value={categoryFilter} 
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="filter-select"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <select 
                  value={regionFilter} 
                  onChange={(e) => setRegionFilter(e.target.value)}
                  className="filter-select"
                >
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                <select 
                  value={priceSort} 
                  onChange={(e) => setPriceSort(e.target.value)}
                  className="filter-select"
                >
                  <option value="none">Sort by Price</option>
                  <option value="asc">Price (Low to High)</option>
                  <option value="desc">Price (High to Low)</option>
                </select>
              </div>
              <button className="add-device-btn" onClick={() => setShowDeviceForm(true)}>
                Add New Device
              </button>
            </div>

            {showDeviceForm && (
              <div className="device-form-container">
                <form onSubmit={handleSubmit} className="device-form">
                  <h3>{selectedDevice ? 'Edit Device' : 'Add New Device'}</h3>
                  <div className="form-group">
                    <label>Device Name:</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={newDevice.name} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Category:</label>
                    <select 
                      name="category" 
                      value={newDevice.category} 
                      onChange={handleInputChange} 
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Mobility">Mobility</option>
                      <option value="Visual">Visual</option>
                      <option value="Hearing">Hearing</option>
                      <option value="Communication">Communication</option>
                      <option value="Cognitive">Cognitive</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Price (USD):</label>
                    <input 
                      type="number" 
                      name="price" 
                      value={newDevice.price} 
                      onChange={handleInputChange} 
                      required 
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="form-group">
                    <label>Available Quantity:</label>
                    <input 
                      type="number" 
                      name="available" 
                      value={newDevice.available} 
                      onChange={handleInputChange} 
                      required 
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label>Region:</label>
                    <select 
                      name="region" 
                      value={newDevice.region} 
                      onChange={handleInputChange} 
                      required
                    >
                      <option value="">Select Region</option>
                      <option value="West Africa">West Africa</option>
                      <option value="East Africa">East Africa</option>
                      <option value="North Africa">North Africa</option>
                      <option value="Southern Africa">Southern Africa</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Manufacturer:</label>
                    <input 
                      type="text" 
                      name="manufacturer" 
                      value={newDevice.manufacturer} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="form-buttons">
                    <button type="submit" className="submit-btn">
                      {selectedDevice ? 'Update Device' : 'Add Device'}
                    </button>
                    <button 
                      type="button" 
                      className="cancel-btn" 
                      onClick={() => {
                        setShowDeviceForm(false);
                        setSelectedDevice(null);
                        setNewDevice({
                          name: '',
                          category: '',
                          price: '',
                          available: '',
                          region: '',
                          manufacturer: '',
                          rating: 4.0
                        });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="devices-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Device Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Available</th>
                    <th>Region</th>
                    <th>Manufacturer</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDevices.map(device => (
                    <tr key={device.id} className={device.available < 20 ? 'low-stock' : ''}>
                      <td>{device.id}</td>
                      <td>{device.name}</td>
                      <td>{device.category}</td>
                      <td>${device.price}</td>
                      <td>{device.available}</td>
                      <td>{device.region}</td>
                      <td>{device.manufacturer}</td>
                      <td>{device.rating.toFixed(1)}</td>
                      <td className="actions">
                        <button onClick={() => handleEditDevice(device)} className="edit-btn">
                          Edit
                        </button>
                        <button onClick={() => handleDeleteDevice(device.id)} className="delete-btn">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === 'analytics' && (
        <div className="analytics-content">
          <div className="charts-container">
            <div className="chart-card">
              <h3>Sales Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlySalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#8884d8" name="Units Sold" />
                  <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" name="Revenue ($)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-card">
              <h3>Device Categories</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="charts-container">
            <div className="chart-card">
              <h3>Regional Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={regionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Percentage" fill="#3a0ca3" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-card">
              <h3>Price Range Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={priceRangeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Number of Products" fill="#4361ee" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'satisfaction' && (
        <div className="satisfaction-content">
          <div className="chart-card full-width">
            <h3>User Satisfaction Metrics</h3>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={satisfactionData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="aspect" />
                <PolarRadiusAxis angle={30} domain={[0, 5]} />
                <Radar name="User Satisfaction" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Tooltip />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="satisfaction-cards">
            <div className="satisfaction-card">
              <h3>Most Popular Devices</h3>
              <ol className="ranked-list">
                <li>Powered Wheelchair (4.8)</li>
                <li>Braille Reader (4.7)</li>
                <li>Screen Reader Software (4.6)</li>
                <li>Standard Wheelchair (4.5)</li>
                <li>Speech Generating Device (4.5)</li>
              </ol>
            </div>
            <div className="satisfaction-card">
              <h3>User Feedback Summary</h3>
              <div className="feedback-item">
                <h4>Strengths</h4>
                <ul>
                  <li>Durability of mobility devices</li>
                  <li>Accuracy of visual aids</li>
                  <li>Battery life of electronic devices</li>
                </ul>
              </div>
              <div className="feedback-item">
                <h4>Areas for Improvement</h4>
                <ul>
                  <li>Availability in rural areas</li>
                  <li>Maintenance support</li>
                  <li>Price points for advanced devices</li>
                </ul>
              </div>
            </div>
            <div className="satisfaction-card">
              <h3>Recent Testimonials</h3>
              <div className="testimonial">
                <p>"The wheelchair has significantly improved my mobility and independence."</p>
                <p className="testimonial-author">- John, Ghana</p>
              </div>
              <div className="testimonial">
                <p>"The screen reader software has made it possible for me to continue my education."</p>
                <p className="testimonial-author">- Sarah, Kenya</p>
              </div>
              <div className="testimonial">
                <p>"The hearing aid's battery life could be better, but the sound quality is excellent."</p>
                <p className="testimonial-author">- Ibrahim, Nigeria</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssistiveDevices;