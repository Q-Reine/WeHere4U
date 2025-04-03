
import React, { useState } from 'react';
import { LineChart, Line,BarChart,Bar, PieChart, Pie, Cell,  XAxis,  YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../Dashboard/dashboardstyles/admindash.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data - replace with actual API calls in production
  const userGrowthData = [
    { month: 'Jan', users: 120 },
    { month: 'Feb', users: 150 },
    { month: 'Mar', users: 200 },
    { month: 'Apr', users: 320 },
    { month: 'May', users: 450 },
    { month: 'Jun', users: 520 },
  ];

  const deviceCategoryData = [
    { name: 'Mobility', count: 423 },
    { name: 'Vision', count: 345 },
    { name: 'Hearing', count: 290 },
    { name: 'Cognitive', count: 178 },
    { name: 'Communication', count: 156 },
  ];

  const regionData = [
    { name: 'East Africa', value: 35 },
    { name: 'West Africa', value: 25 },
    { name: 'North Africa', value: 15 },
    { name: 'Southern Africa', value: 20 },
    { name: 'Central Africa', value: 5 },
  ];

  const serviceProviderData = [
    { month: 'Jan', providers: 12 },
    { month: 'Feb', providers: 19 },
    { month: 'Mar', providers: 23 },
    { month: 'Apr', providers: 25 },
    { month: 'May', providers: 32 },
    { month: 'Jun', providers: 38 },
  ];

  const recentUsers = [
    { id: 1, name: 'Kwame Mensah', location: 'Ghana', disability: 'Visual impairment', dateJoined: '12 Mar 2025' },
    { id: 2, name: 'Amina Diop', location: 'Senegal', disability: 'Mobility', dateJoined: '10 Mar 2025' },
    { id: 3, name: 'Tendai Mutasa', location: 'Zimbabwe', disability: 'Hearing', dateJoined: '8 Mar 2025' },
    { id: 4, name: 'Fatima Wanjiru', location: 'Kenya', disability: 'Cognitive', dateJoined: '5 Mar 2025' },
  ];

  const recentDevices = [
    { id: 1, name: 'Affordable Wheelchair', category: 'Mobility', price: '$120', provider: 'MobilityForAll' },
    { id: 2, name: 'Screen Reader Software', category: 'Vision', price: '$45', provider: 'AfriTech' },
    { id: 3, name: 'Hearing Aid - Basic', category: 'Hearing', price: '$75', provider: 'HearClear' },
    { id: 4, name: 'Communication Board', category: 'Communication', price: '$30', provider: 'SpeakUp' },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const metrics = [
    { title: 'Total Users', value: '1,250', change: '+15%', icon: '👥' },
    { title: 'Active Devices', value: '3,840', change: '+8%', icon: '🔧' },
    { title: 'Service Providers', value: '38', change: '+20%', icon: '🏥' },
    { title: 'Monthly Visitors', value: '5.2K', change: '+25%', icon: '👀' },
  ];

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Assistive Technology Platform</h1>
        <div className="header-actions">
          <div className="search-box">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="admin-profile">
            <span className="admin-name">Admin</span>
            <div className="admin-avatar">A</div>
          </div>
        </div>
      </header>

      <div className="dashboard-container">
        <aside className="sidebar">
          <nav className="main-nav">
            <ul>
              <li className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Dashboard Overview</li>
              <li className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>Users Management</li>
              <li className={activeTab === 'devices' ? 'active' : ''} onClick={() => setActiveTab('devices')}>Assistive Devices</li>
              <li className={activeTab === 'providers' ? 'active' : ''} onClick={() => setActiveTab('providers')}>Service Providers</li>
              <li className={activeTab === 'resources' ? 'active' : ''} onClick={() => setActiveTab('resources')}>Resource Hub</li>
              <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>Settings</li>
            </ul>
          </nav>
          <div className="sidebar-footer">
            <p>Making Africa accessible, one tech solution at a time</p>
          </div>
        </aside>

        <main className="content">
          {activeTab === 'overview' && (
            <>
              <div className="dashboard-metrics">
                {metrics.map((metric, index) => (
                  <div className="metric-card" key={index}>
                    <div className="metric-icon">{metric.icon}</div>
                    <div className="metric-info">
                      <h3>{metric.title}</h3>
                      <p className="metric-value">{metric.value}</p>
                      <p className="metric-change">{metric.change}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="charts-container">
                <div className="chart-card">
                  <h3>User Growth</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={userGrowthData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="users" stroke="#0088FE" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="chart-card">
                  <h3>Devices by Category</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={deviceCategoryData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#00C49F" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="charts-container">
                <div className="chart-card">
                  <h3>User Distribution by Region</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={regionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {regionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="chart-card">
                  <h3>Service Provider Growth</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={serviceProviderData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="providers" stroke="#FF8042" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="tables-container">
                <div className="table-card">
                  <h3>Recent Users</h3>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Disability Type</th>
                        <th>Date Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map(user => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.location}</td>
                          <td>{user.disability}</td>
                          <td>{user.dateJoined}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="table-footer">
                    <button className="view-all-btn">View All Users</button>
                  </div>
                </div>

                <div className="table-card">
                  <h3>Recently Added Devices</h3>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Device Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Provider</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentDevices.map(device => (
                        <tr key={device.id}>
                          <td>{device.name}</td>
                          <td>{device.category}</td>
                          <td>{device.price}</td>
                          <td>{device.provider}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="table-footer">
                    <button className="view-all-btn">View All Devices</button>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* Placeholder for other tabs */}
          {activeTab !== 'overview' && (
            <div className="tab-placeholder">
              <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management</h2>
              <p>This section is under development.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;