import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import '../Dashboard/dashboardstyles/usermanagement.css';

// Sample user data - replace with actual API call
const usersData = [
  { id: 1, name: 'Kwame Nkrumah', email: 'kwame@example.com', country: 'Ghana', disability: 'Visual', joinDate: '2024-10-05', lastActive: '2025-03-18', status: 'Active' },
  { id: 2, name: 'Amina Diallo', email: 'amina@example.com', country: 'Senegal', disability: 'Mobility', joinDate: '2024-11-12', lastActive: '2025-03-15', status: 'Active' },
  { id: 3, name: 'David Okafor', email: 'david@example.com', country: 'Nigeria', disability: 'Hearing', joinDate: '2024-09-22', lastActive: '2025-03-10', status: 'Active' },
  { id: 4, name: 'Fatima Abebe', email: 'fatima@example.com', country: 'Ethiopia', disability: 'Cognitive', joinDate: '2024-12-01', lastActive: '2025-03-05', status: 'Inactive' },
  { id: 5, name: 'Samuel Mwangi', email: 'samuel@example.com', country: 'Kenya', disability: 'Mobility', joinDate: '2024-08-15', lastActive: '2025-03-17', status: 'Active' },
  { id: 6, name: 'Nala Tutu', email: 'nala@example.com', country: 'South Africa', disability: 'Visual', joinDate: '2024-10-30', lastActive: '2025-02-28', status: 'Inactive' },
  { id: 7, name: 'Ibrahim Diop', email: 'ibrahim@example.com', country: 'Senegal', disability: 'Hearing', joinDate: '2024-11-05', lastActive: '2025-03-12', status: 'Active' },
  { id: 8, name: 'Zainab Mensah', email: 'zainab@example.com', country: 'Ghana', disability: 'Multiple', joinDate: '2024-09-10', lastActive: '2025-03-01', status: 'Active' },
  { id: 9, name: 'Kofi Addo', email: 'kofi@example.com', country: 'Ghana', disability: 'Mobility', joinDate: '2024-12-15', lastActive: '2025-02-20', status: 'Inactive' },
  { id: 10, name: 'Aisha Mohammed', email: 'aisha@example.com', country: 'Nigeria', disability: 'Visual', joinDate: '2024-08-22', lastActive: '2025-03-14', status: 'Active' },
];

// Country distribution data
const countryData = [
  { name: 'Nigeria', value: 30 },
  { name: 'Ghana', value: 25 },
  { name: 'Kenya', value: 20 },
  { name: 'South Africa', value: 15 },
  { name: 'Ethiopia', value: 10 },
  { name: 'Senegal', value: 5 },
  { name: 'Other', value: 5 },
];

// Disability type distribution data
const disabilityData = [
  { name: 'Mobility', value: 40 },
  { name: 'Visual', value: 30 },
  { name: 'Hearing', value: 20 },
  { name: 'Cognitive', value: 5 },
  { name: 'Multiple', value: 5 },
];

// Monthly user growth data
const monthlyGrowthData = [
  { month: 'Sep', users: 120 },
  { month: 'Oct', users: 180 },
  { month: 'Nov', users: 240 },
  { month: 'Dec', users: 300 },
  { month: 'Jan', users: 380 },
  { month: 'Feb', users: 450 },
  { month: 'Mar', users: 520 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

function UserManagement() {
  const [users, setUsers] = useState(usersData);
  const [filteredUsers, setFilteredUsers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [countryFilter, setCountryFilter] = useState('All');
  const [disabilityFilter, setDisabilityFilter] = useState('All');
  const [showUserForm, setShowUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    country: '',
    disability: '',
    status: 'Active'
  });
  const [selectedUser, setSelectedUser] = useState(null);

  // Apply filters when any filter changes
  useEffect(() => {
    let filtered = users;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }
    
    // Apply country filter
    if (countryFilter !== 'All') {
      filtered = filtered.filter(user => user.country === countryFilter);
    }
    
    // Apply disability filter
    if (disabilityFilter !== 'All') {
      filtered = filtered.filter(user => user.disability === disabilityFilter);
    }
    
    setFilteredUsers(filtered);
  }, [searchTerm, statusFilter, countryFilter, disabilityFilter, users]);

  // Get unique countries and disabilities for filter options
  const countries = ['All', ...new Set(users.map(user => user.country))];
  const disabilities = ['All', ...new Set(users.map(user => user.disability))];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser) {
      // Update existing user
      const updatedUsers = users.map(user => 
        user.id === selectedUser.id ? { ...newUser, id: selectedUser.id } : user
      );
      setUsers(updatedUsers);
      setSelectedUser(null);
    } else {
      // Add new user
      const newId = Math.max(...users.map(user => user.id)) + 1;
      const today = new Date().toISOString().split('T')[0];
      const userToAdd = { 
        ...newUser, 
        id: newId, 
        joinDate: today, 
        lastActive: today 
      };
      setUsers([...users, userToAdd]);
    }
    
    setNewUser({
      name: '',
      email: '',
      country: '',
      disability: '',
      status: 'Active'
    });
    setShowUserForm(false);
  };

  // Handle edit user
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      country: user.country,
      disability: user.disability,
      status: user.status
    });
    setShowUserForm(true);
  };

  // Handle delete user
  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  return (
    <div className="user-management">
      <div className="user-stats">
        <div className="stats-card">
          <h3>Total Users</h3>
          <p className="stat-number">1,520</p>
          <p className="stat-change positive">+15% from last month</p>
        </div>
        <div className="stats-card">
          <h3>Active Users</h3>
          <p className="stat-number">1,250</p>
          <p className="stat-change positive">+12% from last month</p>
        </div>
        <div className="stats-card">
          <h3>New Users</h3>
          <p className="stat-number">85</p>
          <p className="stat-change positive">+8% from last month</p>
        </div>
        <div className="stats-card">
          <h3>Avg. Session Duration</h3>
          <p className="stat-number">18 min</p>
          <p className="stat-change positive">+5% from last month</p>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h3>User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#4361ee" name="Total Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3>User Distribution by Country</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={countryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {countryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="disability-chart">
        <h3>User Distribution by Disability Type</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={disabilityData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={80} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#3a0ca3" name="Percentage" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="user-management-controls">
        <h3>User Management</h3>
        <div className="controls-top">
          <div className="search-filters">
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <select 
              value={countryFilter} 
              onChange={(e) => setCountryFilter(e.target.value)}
              className="filter-select"
            >
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <select 
              value={disabilityFilter} 
              onChange={(e) => setDisabilityFilter(e.target.value)}
              className="filter-select"
            >
              {disabilities.map(disability => (
                <option key={disability} value={disability}>{disability}</option>
              ))}
            </select>
          </div>
          <button className="add-user-btn" onClick={() => setShowUserForm(true)}>
            Add New User
          </button>
        </div>

        {showUserForm && (
          <div className="user-form-container">
            <form onSubmit={handleSubmit} className="user-form">
              <h3>{selectedUser ? 'Edit User' : 'Add New User'}</h3>
              <div className="form-group">
                <label>Name:</label>
                <input 
                  type="text" 
                  name="name" 
                  value={newUser.name} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input 
                  type="email" 
                  name="email" 
                  value={newUser.email} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Country:</label>
                <input 
                  type="text" 
                  name="country" 
                  value={newUser.country} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Disability Type:</label>
                <select 
                  name="disability" 
                  value={newUser.disability} 
                  onChange={handleInputChange} 
                  required
                >
                  <option value="">Select Disability Type</option>
                  <option value="Visual">Visual</option>
                  <option value="Mobility">Mobility</option>
                  <option value="Hearing">Hearing</option>
                  <option value="Cognitive">Cognitive</option>
                  <option value="Multiple">Multiple</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status:</label>
                <select 
                  name="status" 
                  value={newUser.status} 
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="form-buttons">
                <button type="submit" className="submit-btn">
                  {selectedUser ? 'Update User' : 'Add User'}
                </button>
                <button 
                  type="button" 
                  className="cancel-btn" 
                  onClick={() => {
                    setShowUserForm(false);
                    setSelectedUser(null);
                    setNewUser({
                      name: '',
                      email: '',
                      country: '',
                      disability: '',
                      status: 'Active'
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Country</th>
                <th>Disability Type</th>
                <th>Join Date</th>
                <th>Last Active</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.country}</td>
                  <td>{user.disability}</td>
                  <td>{user.joinDate}</td>
                  <td>{user.lastActive}</td>
                  <td>
                    <span className={`status-badge ${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="actions">
                    <button onClick={() => handleEditUser(user)} className="edit-btn">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteUser(user.id)} className="delete-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;