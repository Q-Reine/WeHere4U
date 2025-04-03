import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './components/Home';
import Marketplace from './components/Marketplace';
import Resources from './components/Resources';
import Community from './components/Community';
import GetInvolved from './components/GetInvolved';
import Login from './components/Login';
import SinglePage from './components/SinglePage';
import ProductPage from './components/ProductPage';
import Cart from './UComponents/Cart';
import DashboardLayout from './Dashboard/DashboardLayout';
import DashboardView from './Dashboard/DashboardView';
import UserManagement from './Dashboard/UserManagement';
import AssistiveDevices from './Dashboard/AssistiveDevices';
import ServiceProviders from './Dashboard/ServiceProviders';
import ResourceHub from './Dashboard/ResourceHub';
import Settings from './Dashboard/Settings';
import Ulayout from './UComponents/Ulayout';
import Store from './UComponents/Store';
import Orders from './UComponents/orders';
import OrderDetails from './UComponents/order-details';
import Profile from './UComponents/profile';
import Help from './UComponents/help';
import UserHome from './UComponents/home';
import LocationModal from './UComponents/location-modal';
import './App.css';

// Authentication guard component - FIXED VERSION
const RequireAuth = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  
  // Check if user is authenticated and has correct role
  const token = localStorage.getItem('userToken');
  const userRole = localStorage.getItem('userRole');
  
  // If no token exists, redirect to login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // If roles specified and user doesn't have permission
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Redirect based on role - using pathname to avoid infinite loop
    if (location.pathname.startsWith('/dashboard') && userRole !== 'admin') {
      return <Navigate to="/user/home" state={{ from: location }} replace />;
    } else if (location.pathname.startsWith('/user') && userRole !== 'user') {
      return <Navigate to="/dashboard" state={{ from: location }} replace />;
    }
  }
  
  // User authenticated and authorized
  return children;
};

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [location, setLocation] = useState('Masoro, Gasabo, Kigali City');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  
  // Check authentication status on app load
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('userToken');
      const role = localStorage.getItem('userRole');
      
      if (token) {
        setIsAuthenticated(true);
        setUserRole(role);
      } else {
        setIsAuthenticated(false);
        setUserRole(null);
      }
    };
    
    checkAuthStatus();
    // Set up an event listener for storage changes
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  // Toggle cart visibility
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  // Handle order click
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  // Handle product view
  const handleViewProduct = (product) => {
    console.log("Viewing product:", product);
    // Add navigation logic here
  };

  // Handle view all
  const handleViewAll = (section) => {
    console.log("View all for:", section);
    // Add navigation logic here
    if (section === 'orders') {
      // Navigate to orders page
      window.location.href = '/user/orders';
    } else if (section === 'products') {
      // Navigate to store page
      window.location.href = '/user/store';
    }
  };

  // Handle login success
  const handleLoginSuccess = (userData) => {
    // Store user data
    localStorage.setItem('userToken', userData.token);
    localStorage.setItem('userRole', userData.role);
    localStorage.setItem('userData', JSON.stringify(userData));
    
    setIsAuthenticated(true);
    setUserRole(userData.role);
    
    // Return redirect path based on role
    return userData.role === 'admin' ? '/dashboard' : '/user/home';
  };
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    
    setIsAuthenticated(false);
    setUserRole(null);
    
    window.location.href = '/login';
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Marketplace" element={<Marketplace />} />
          <Route path="Resources" element={<Resources />} />
          <Route path="Community" element={<Community />} />
          <Route path="GetInvolved" element={<GetInvolved />} />
          <Route path="login" element={
            isAuthenticated ? (
              <Navigate to={userRole === 'admin' ? '/dashboard' : '/user/home'} replace />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          } />
          <Route path="SinglePage/:id" element={<SinglePage />} />
          <Route path="view" element={<ProductPage />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route path="/dashboard" element={
          <RequireAuth allowedRoles={['admin']}>
            <DashboardLayout onLogout={handleLogout} />
          </RequireAuth>
        }>
          <Route index element={<DashboardView />} />
          <Route path="usermanagement" element={<UserManagement />} />
          <Route path="devices" element={<AssistiveDevices />} />
          <Route path="providers" element={<ServiceProviders />} />
          <Route path="savedresources" element={<ResourceHub />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* User Protected Routes */}
        <Route path="/user" element={
          <RequireAuth allowedRoles={['user']}>
            <Ulayout 
              cartItems={cartItems}
              toggleCart={toggleCart}
              location={location}
              showLocationModal={showLocationModal}
              setShowLocationModal={setShowLocationModal}
              showCart={showCart}
              setShowCart={setShowCart}
              setLocation={setLocation}
              setCartItems={setCartItems}
              onLogout={handleLogout}
            />
          </RequireAuth>
        }>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={
            <UserHome 
              onViewProduct={handleViewProduct} 
              onViewAll={handleViewAll} 
            />
          } />
          <Route path="store" element={<Store />} />
          <Route path="orders" element={<Orders onOrderClick={handleOrderClick} />} />
          <Route path="orders/:id" element={<OrderDetails order={selectedOrder} />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
          <Route path="cart" element={
            <Cart 
              items={cartItems} 
              setItems={setCartItems} 
              onClose={() => setShowCart(false)}
            />
          } />
        </Route>

        {/* Catch all - redirect to home or login */}
        <Route path="*" element={
          isAuthenticated ? (
            userRole === 'admin' ? 
              <Navigate to="/dashboard" replace /> : 
              <Navigate to="/user/home" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        } />
      </Routes>
      
      {/* Location Modal - outside of routes */}
      {showLocationModal && (
        <LocationModal 
          currentLocation={location} 
          onLocationChange={setLocation} 
          onClose={() => setShowLocationModal(false)} 
        />
      )}
      
      {/* Cart Modal - outside of routes */}
      {showCart && (
        <Cart 
          items={cartItems} 
          setItems={setCartItems} 
          onClose={() => setShowCart(false)} 
        />
      )}
    </BrowserRouter>
  );
}

export default App;