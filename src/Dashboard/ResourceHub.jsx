import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import '../Dashboard/dashboardstyles/resourcehub.css';

const ResourceHub = () => {
  // Resource utilization data over time
  const [resourceUtilizationData] = useState([
    { month: 'Jan', computing: 65, storage: 45, network: 58 },
    { month: 'Feb', computing: 70, storage: 48, network: 60 },
    { month: 'Mar', computing: 75, storage: 52, network: 63 },
    { month: 'Apr', computing: 82, storage: 56, network: 67 },
    { month: 'May', computing: 78, storage: 61, network: 70 },
    { month: 'Jun', computing: 85, storage: 65, network: 72 }
  ]);

  // Resource allocation data
  const [resourceAllocationData] = useState([
    { name: 'Computing', value: 45 },
    { name: 'Storage', value: 25 },
    { name: 'Network', value: 15 },
    { name: 'Security', value: 10 },
    { name: 'Monitoring', value: 5 }
  ]);

  // Resource efficiency data
  const [resourceEfficiencyData] = useState([
    { resource: 'Computing', efficiency: 85, benchmark: 80 },
    { resource: 'Storage', efficiency: 72, benchmark: 75 },
    { resource: 'Network', efficiency: 88, benchmark: 82 },
    { resource: 'Security', efficiency: 91, benchmark: 85 },
    { resource: 'Monitoring', efficiency: 78, benchmark: 79 }
  ]);

  // Resources list data
  const [resourcesData] = useState([
    { id: 1, name: 'Cloud Servers', type: 'Computing', status: 'Available', utilization: '72%' },
    { id: 2, name: 'Object Storage', type: 'Storage', status: 'Available', utilization: '65%' },
    { id: 3, name: 'VPN Service', type: 'Network', status: 'Maintenance', utilization: '0%' },
    { id: 4, name: 'Database Cluster', type: 'Computing', status: 'Available', utilization: '88%' },
    { id: 5, name: 'Load Balancers', type: 'Network', status: 'Available', utilization: '56%' },
    { id: 6, name: 'Backup Storage', type: 'Storage', status: 'Available', utilization: '41%' }
  ]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  const [resourceFilter, setResourceFilter] = useState('All');

  const handleFilterChange = (e) => {
    setResourceFilter(e.target.value);
  };

  const getFilteredResources = () => {
    if (resourceFilter === 'All') {
      return resourcesData;
    }
    return resourcesData.filter(resource => resource.type === resourceFilter);
  };

  const getStatusClass = (status) => {
    return status === 'Available' ? 'status-available' : 'status-maintenance';
  };

  const getUtilizationClass = (utilization) => {
    const value = parseInt(utilization);
    if (value === 0) return '';
    if (value < 50) return 'utilization-low';
    if (value < 80) return 'utilization-medium';
    return 'utilization-high';
  };

  return (
    <div className="resource-hub-container">
      <div className="dashboard-header">
        <h2>Resource Hub</h2>
        <div className="dashboard-actions">
          <select 
            value={resourceFilter} 
            onChange={handleFilterChange}
            className="resource-filter"
          >
            <option value="All">All Resources</option>
            <option value="Computing">Computing</option>
            <option value="Storage">Storage</option>
            <option value="Network">Network</option>
          </select>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="charts-container">
          <div className="chart-card utilization-chart">
            <h3>Resource Utilization Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={resourceUtilizationData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => [`${value}%`, 'Utilization']} />
                <Legend />
                <Line type="monotone" dataKey="computing" stroke="#0088FE" activeDot={{ r: 8 }} name="Computing" />
                <Line type="monotone" dataKey="storage" stroke="#00C49F" name="Storage" />
                <Line type="monotone" dataKey="network" stroke="#FFBB28" name="Network" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card allocation-chart">
            <h3>Resource Allocation</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={resourceAllocationData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {resourceAllocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="charts-container">
          <div className="chart-card efficiency-chart">
            <h3>Resource Efficiency</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius={80} data={resourceEfficiencyData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="resource" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                <Radar name="Efficiency" dataKey="efficiency" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Benchmark" dataKey="benchmark" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Legend />
                <Tooltip formatter={(value) => [`${value}%`]} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card resources-table-container">
            <h3>Available Resources</h3>
            <table className="resources-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Utilization</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredResources().map((resource) => (
                  <tr key={resource.id}>
                    <td>{resource.name}</td>
                    <td>{resource.type}</td>
                    <td className={getStatusClass(resource.status)}>{resource.status}</td>
                    <td className={getUtilizationClass(resource.utilization)}>{resource.utilization}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceHub;