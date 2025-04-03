import React from 'react';
import { ShoppingBag, Clock, CheckCircle, XCircle, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import './home.css';

const Home = ({ onViewProduct, onViewAll }) => {
  const recentOrders = [
    {
      id: 'ORD-2023-001',
      date: '2023-04-15',
      item: 'Smart Tablet for Learning',
      status: 'processing'
    },
    {
      id: 'ORD-2023-005',
      date: '2023-04-12',
      item: 'Prosthetic Leg',
      status: 'processing'
    }
  ];
  
  const upcomingDeliveries = [
    {
      id: 'ORD-2023-001',
      item: 'Smart Tablet for Learning',
      estimatedDelivery: '2023-04-20'
    },
    {
      id: 'ORD-2023-005',
      item: 'Prosthetic Leg',
      estimatedDelivery: '2023-04-25'
    }
  ];
  
  const recommendedProducts = [
    {
      id: 7,
      name: 'Braille Keyboard',
      price: 95000,
      image: '/placeholder.svg?height=80&width=80'
    },
    {
      id: 8,
      name: 'Adaptive Stylus',
      price: 25000,
      image: '/placeholder.svg?height=80&width=80'
    },
    {
      id: 9,
      name: 'Voice Amplifier',
      price: 75000,
      image: '/placeholder.svg?height=80&width=80'
    }
  ];
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
        return <Clock className="status-icon processing" />;
      case 'completed':
        return <CheckCircle className="status-icon completed" />;
      case 'failed':
        return <XCircle className="status-icon failed" />;
      default:
        return null;
    }
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-RW', options);
  };
  
  return (
    <div className="home">
      <h2>Welcome, Mutoni!</h2>
      
      <div className="dashboard-grid">
        <div className="dashboard-card recent-orders">
          <div className="card-header">
            <h3>
              <ShoppingBag className="header-icon" />
              Recent Orders
            </h3>
            <button 
              className="view-all"
              onClick={() => onViewAll('orders')}
              aria-label="View all orders"
            >
              View All
              <ArrowRight className="arrow-icon" />
            </button>
          </div>
          
          <div className="order-list">
            {recentOrders.map(order => (
              <div className="order-item" key={order.id}>
                <div className="order-details">
                  <div className="order-id">{order.id}</div>
                  <div className="order-product">{order.item}</div>
                  <div className="order-date">{formatDate(order.date)}</div>
                </div>
                <div className="order-status">
                  {getStatusIcon(order.status)}
                  <span className={`status-text ${order.status}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="dashboard-card upcoming-deliveries">
          <div className="card-header">
            <h3>
              <Calendar className="header-icon" />
              Upcoming Deliveries
            </h3>
          </div>
          
          <div className="delivery-list">
            {upcomingDeliveries.map(delivery => (
              <div className="delivery-item" key={delivery.id}>
                <div className="delivery-details">
                  <div className="delivery-id">{delivery.id}</div>
                  <div className="delivery-product">{delivery.item}</div>
                </div>
                <div className="delivery-date">
                  <span className="date-label">Expected:</span>
                  <span className="date-value">{formatDate(delivery.estimatedDelivery)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="dashboard-card recommended">
          <div className="card-header">
            <h3>
              <TrendingUp className="header-icon" />
              Recommended for You
            </h3>
            <button 
              className="view-all"
              onClick={() => onViewAll('products')}
              aria-label="View all recommended products"
            >
              View All
              <ArrowRight className="arrow-icon" />
            </button>
          </div>
          
          <div className="product-list">
            {recommendedProducts.map((product) => (
              <div className="product-item" key={product.id}>
                <img 
                  src={product.image || "/placeholder.svg"} 
                  alt={product.name} 
                  className="product-image"
                />
                <div className="product-details">
                  <div className="product-name">{product.name}</div>
                  <div className="product-price">{product.price.toLocaleString()} RWF</div>
                </div>
                <button 
                  className="view-product-btn"
                  onClick={() => onViewProduct(product)}
                  aria-label={`View ${product.name}`}
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
