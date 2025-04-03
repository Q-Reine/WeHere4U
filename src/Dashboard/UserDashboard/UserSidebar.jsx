
import React from "react"
import { Store, ShoppingBag, Settings, User, Home, Sun, Moon, HelpCircle, ShoppingCart } from "lucide-react"
import "../UserDashboard/userdashboardstyles/usersidebar.css"

const UserSidebar = ({ activeItem, setActiveItem, cartCount, toggleCart }) => {
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

  return (
    <div className="sidebar1">
      <div className="sidebar-content1">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${activeItem === item.id ? "active" : ""}`}
            onClick={() => setActiveItem(item.id)}
            aria-label={item.label}
          >
            <item.icon className="sidebar-icon" />
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
        <button className="sidebar-item cart-item" onClick={toggleCart} aria-label="Shopping Cart">
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
      </div>
    </div>
  )
}

export default UserSidebar