"use client"
import React, { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Store, ShoppingBag, Settings, User, Home, Sun, Moon, HelpCircle, ShoppingCart, LogOut } from "lucide-react"
import "./Usidebar.css"

const Usidebar = ({ activeItem, setActiveItem, cartCount, toggleCart, onLogout }) => {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Set active item based on current path when component mounts or location changes
  useEffect(() => {
    const path = location.pathname.split('/').pop()
    if (path && path !== 'user') {
      setActiveItem(path)
    }
  }, [location, setActiveItem])

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "store", icon: Store, label: "Store" },
    { id: "orders", icon: ShoppingBag, label: "Orders" },
    { id: "profile", icon: User, label: "Profile" },
    { id: "settings", icon: Settings, label: "Settings" },
    { id: "help", icon: HelpCircle, label: "Help" },
  ]

  const [theme, setTheme] = React.useState("light")

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  const handleItemClick = (itemId) => {
    setActiveItem(itemId)
    
    // Special handling for cart
    if (itemId === "cart") {
      toggleCart()
      return
    }
    
    // Navigate to the selected page
    navigate(`/user/${itemId}`)
  }

  const handleLogout = () => {
    if (onLogout) {
      const redirectPath = onLogout()
      navigate(redirectPath)
    } else {
      // Fallback if onLogout not provided
      localStorage.removeItem('userRole')
      navigate('/')
    }
  }

  return (
    <div className="sidebar2">
      <div className="sidebar-content2">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item2 ${activeItem === item.id ? "active" : ""}`}
            onClick={() => handleItemClick(item.id)}
            aria-label={item.label}
          >
            <item.icon className="sidebar-icon" />
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
        <button 
          className="sidebar-item cart-item" 
          onClick={toggleCart} 
          aria-label="Shopping Cart"
        >
          <div className="cart-icon-container">
            <ShoppingCart className="sidebar-icon" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>
          <span className="sidebar-label">Cart</span>
        </button>
      </div>
      <div className="sidebar-footer">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? <Moon className="sidebar-icon" /> : <Sun className="sidebar-icon" />}
          <span className="sidebar-label">Theme</span>
        </button>
        <button
          className="sidebar-item2 logout-button"
          onClick={handleLogout}
          aria-label="Logout"
        >
          <LogOut className="sidebar-icon" />
          <span className="sidebar-label">Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Usidebar