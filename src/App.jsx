import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import Usidebar from './UComponents/Usidebar';
import Store from './UComponents/Store';
import Orders from './UComponents/orders';
import OrderDetails from './UComponents/order-details';
import Profile from './UComponents/profile';
import Help from './UComponents/help';
import UserHome from './UComponents/home';
import LocationModal from './UComponents/location-modal';
import './App.css';

// Authentication guard with role checking
const RequireAuth = ({ children, allowedRoles = [] }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const token = localStorage.getItem('userToken');
        
        if (!token) {
          setIsAuthenticated(false);
          setIsChecking(false);
          return;
        }
        
        // Verify token with your backend
        const response = await axios.get('http://localhost:3001/api/verify-token', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.data.success) {
          setIsAuthenticated(true);
          setUserRole(response.data.user.role);
        } else {
          // Token invalid or expired
          localStorage.removeItem('userToken');
          localStorage.removeItem('userRole');
          localStorage.removeItem('userData');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth verification error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsChecking(false);
      }
    };
    
    verifyAuth();
  }, [location.pathname]);
  
  // Show loading while checking authentication
  if (isChecking) {
    return <div className="loading">Verifying authentication...</div>;
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Check if user has required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    if (userRole === 'admin') {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/user/home" replace />;
    }
  }
  
  // User is authenticated and has required role
  return children;
};

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [location, setLocation] = useState('Masoro, Gasabo, Kigali City');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    return <Navigate to="/" replace />;
  };

  // Toggle cart visibility
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  // Handle order click
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  // Handle login success
  const handleLoginSuccess = (role) => {
    // Return the appropriate redirect path
    return role === 'admin' ? '/dashboard' : '/user/home';
  };

  // Shared state for user components
  const userContextValue = {
    cartItems,
    setCartItems,
    location,
    setLocation,
    showLocationModal,
    setShowLocationModal,
    showCart,
    setShowCart,
    toggleCart
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
          <Route path="login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="SinglePage/:id" element={<SinglePage />} />
          <Route path="view" element={<ProductPage />} />
        </Route>

        {/* Redirect Root */}
        <Route
          path="/"
          element={
            localStorage.getItem('userToken') ? (
              localStorage.getItem('userRole') === 'admin' ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/user/home" replace />
              )
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Admin dashboard routes - protected */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth allowedRoles={['admin']}>
              <DashboardLayout onLogout={handleLogout} />
            </RequireAuth>
          }
        >
          <Route index element={<DashboardView />} />
          <Route path="usermanagement" element={<UserManagement />} />
          <Route path="devices" element={<AssistiveDevices />} />
          <Route path="providers" element={<ServiceProviders />} />
          <Route path="savedresources" element={<ResourceHub />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* User dashboard routes - protected */}
        <Route
          path="/user"
          element={
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
              />
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to="/user/home" replace />} />
          <Route path="home" element={<UserHome />} />
          <Route path="store" element={<Store />} />
          <Route path="orders" element={<Orders onOrderClick={handleOrderClick} />} />
          <Route path="orders/:id" element={<OrderDetails order={selectedOrder} />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
          <Route path="cart" element={<Cart items={cartItems} setItems={setCartItems} />} />
          <Route path="*" element={<Navigate to="/user/home" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;