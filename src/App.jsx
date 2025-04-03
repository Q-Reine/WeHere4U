import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Marketplace from './components/Marketplace';
import Resources from './components/Resources';
import Community from './components/Community';
import GetInvolved from './components/GetInvolved';
import Login from './components/Login';
import UserLocation from './components/UserLocation';
import SinglePage from './components/SinglePage';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import Cart from './Dashboard/UserDashboard/Cart';
import DashboardLayout from './Dashboard/DashboardLayout';
import DashboardView from './Dashboard/DashboardView';
import UserManagement from './Dashboard/UserManagement';
import AssistiveDevices from './Dashboard/AssistiveDevices';
import ServiceProviders from './Dashboard/ServiceProviders';
import ResourceHub from './Dashboard/ResourceHub';
import Settings from './Dashboard/Settings';
import UserLayout from './Dashboard/UserDashboard/UserLayout';
import UserSidebar from './Dashboard/UserDashboard/UserSidebar';
import Store from './Dashboard/UserDashboard/Store';
import Orders from './Dashboard/UserDashboard/orders';
import OrderDetails from './Dashboard/UserDashboard/order-details';
import Profile from './Dashboard/UserDashboard/profile';
import Help from './Dashboard/UserDashboard/help';
import UserHomepage from './Dashboard/UserDashboard/UserHomepage';
import Sidebar from './components/Sidebar';
import LocationModal from './components/LocationModal';
import './App.css';

function App() {
  const [activeItem, setActiveItem] = useState('home');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [location, setLocation] = useState('Masoro, Gasabo, Kigali City');

  // Handle order click
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  // Toggle cart visibility
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <BrowserRouter>
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Ubufasha Assistive Devices</h1>
          <div className="dashboard-actions">
            <div className="cart-button" onClick={toggleCart}>
              <span className="cart-icon">🛒</span>
              {cartItems.length > 0 && (
                <span className="cart-count">{cartItems.length}</span>
              )}
            </div>
            <div className="location" onClick={() => setShowLocationModal(true)}>
              <span>Delivering to: {location}</span>
              <button className="change-location-btn">Change</button>
            </div>
          </div>
        </div>
        <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} cartCount={cartItems.length} toggleCart={toggleCart} />
        {showLocationModal && (
          <LocationModal 
            currentLocation={location} 
            onLocationChange={setLocation} 
            onClose={() => setShowLocationModal(false)} 
          />
        )}
      </div>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/> 
          <Route path='Marketplace' element={<Marketplace/>}/>
          <Route path='Resources' element={<Resources/>}/>
          <Route path='Community' element={<Community/>}/>
          <Route path='GetInvolved' element={<GetInvolved/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='SinglePage/:id' element={<SinglePage/>}/>
          <Route path='view' element={<ProductPage />}/>
        </Route>
        <Route path='/dashboard' element={<DashboardLayout/>}>
          <Route index element={<DashboardView/>}/>
          <Route path='usermanagement' element={<UserManagement/>}/>
          <Route path='devices' element={<AssistiveDevices/>}/>
          <Route path='providers' element={<ServiceProviders/>}/>
          <Route path='savedresources' element={<ResourceHub/>}/>
          <Route path='settings' element={<Settings/>}/>
        </Route>
        <Route path='/user' element={<UserLayout/>}>
          <Route index element={<UserSidebar/>}/>
          <Route path='store' element={<Store/>}/>
          <Route path='orders' element={<Orders onOrderClick={handleOrderClick}/>}/>
          <Route path='orders/:id' element={<OrderDetails order={selectedOrder} />}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='settings' element={<Settings/>}/>
          <Route path='help' element={<Help/>}/>
          <Route path='homepage' element={<UserHomepage/>}/>
          <Route path='cart' element={<Cart/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
