import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import '../Dashboard/dashboardstyles/serviceproviders.css';

const ServiceProviders = () => {
  // Sample data for service providers
  const [providerData] = useState([
    { name: 'AWS', customers: 1200, revenue: 850000, satisfaction: 4.2 },
    { name: 'Azure', customers: 950, revenue: 720000, satisfaction: 4.0 },
    { name: 'GCP', customers: 780, revenue: 650000, satisfaction: 4.3 },
    { name: 'IBM Cloud', customers: 450, revenue: 380000, satisfaction: 3.9 },
    { name: 'Oracle Cloud', customers: 320, revenue: 290000, satisfaction: 3.7 },
  ]);

  // Data for the pie chart
  const marketShareData = [
    { name: 'AWS', value: 32 },
    { name: 'Azure', value: 25 },
    { name: 'GCP', value: 21 },
    { name: 'IBM Cloud', value: 13 },
    { name: 'Oracle Cloud', value: 9 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const [selectedMetric, setSelectedMetric] = useState('customers');

  const handleMetricChange = (e) => {
    setSelectedMetric(e.target.value);
  };

  const getBarChartData = () => {
    return providerData.map(provider => ({
      name: provider.name,
      value: provider[selectedMetric],
    }));
  };

  const formatYAxisTick = (value) => {
    if (selectedMetric === 'revenue') {
      return `$${(value / 1000).toFixed(0)}k`;
    }
    if (selectedMetric === 'satisfaction') {
      return value.toFixed(1);
    }
    return value;
  };

  return (
    <div className="service-providers-container">
      <div className="dashboard-header">
        <h2>Service Providers Dashboard</h2>
        <div className="dashboard-actions">
          <select 
            value={selectedMetric} 
            onChange={handleMetricChange}
            className="metric-selector"
          >
            <option value="customers">Total Customers</option>
            <option value="revenue">Revenue</option>
            <option value="satisfaction">Satisfaction Rating</option>
          </select>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="charts-container">
          <div className="chart-card bar-chart-container">
            <h3>{selectedMetric === 'customers' ? 'Customer Base' : 
                 selectedMetric === 'revenue' ? 'Revenue Performance' : 
                 'Satisfaction Ratings'}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={getBarChartData()}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={formatYAxisTick} />
                <Tooltip 
                  formatter={(value) => {
                    if (selectedMetric === 'revenue') {
                      return [`$${value.toLocaleString()}`, 'Revenue'];
                    }
                    if (selectedMetric === 'satisfaction') {
                      return [value.toFixed(1), 'Rating'];
                    }
                    return [value, 'Customers'];
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="value" 
                  fill={selectedMetric === 'customers' ? '#0088FE' : 
                        selectedMetric === 'revenue' ? '#00C49F' : 
                        '#FFBB28'} 
                  name={selectedMetric === 'customers' ? 'Total Customers' : 
                        selectedMetric === 'revenue' ? 'Revenue ($)' : 
                        'Satisfaction Rating'} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card pie-chart-container">
            <h3>Market Share</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={marketShareData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {marketShareData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Market Share']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="providers-table-container">
          <h3>Provider Details</h3>
          <table className="providers-table">
            <thead>
              <tr>
                <th>Provider</th>
                <th>Customers</th>
                <th>Revenue</th>
                <th>Satisfaction</th>
              </tr>
            </thead>
            <tbody>
              {providerData.map((provider) => (
                <tr key={provider.name}>
                  <td>{provider.name}</td>
                  <td>{provider.customers.toLocaleString()}</td>
                  <td>${provider.revenue.toLocaleString()}</td>
                  <td>{provider.satisfaction.toFixed(1)}/5.0</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviders;