
"use client"

import { useState } from "react"
import { Clock, CheckCircle, XCircle, ChevronRight } from "lucide-react"
import "../UserDashboard/userdashboardstyles/orders.css"

const Orders = ({ onOrderClick }) => {
  const [activeFilter, setActiveFilter] = useState("all")

  const orders = [
    {
      id: "ORD-2023-001",
      date: "2023-04-15",
      items: [{ name: "Smart Tablet for Learning", quantity: 1, price: 120000 }],
      status: "processing",
      total: 120000,
      paymentMethod: "Credit Card",
      deliveryLocation: "Nyamirambo, Nyarugenge, Kigali City",
      estimatedDelivery: "2023-04-20",
      trackingNumber: "TRK-12345",
    },
    {
      id: "ORD-2023-002",
      date: "2023-03-28",
      items: [
        { name: "Digital Hearing Aid", quantity: 1, price: 275000 },
        { name: "Hearing Aid Batteries", quantity: 2, price: 15000 },
      ],
      status: "completed",
      total: 305000,
      paymentMethod: "Mobile Money",
      deliveryLocation: "Kimironko, Gasabo, Kigali City",
      deliveryDate: "2023-04-02",
      trackingNumber: "TRK-12346",
    },
    {
      id: "ORD-2023-003",
      date: "2023-04-10",
      items: [{ name: "Adjustable Smart Chair", quantity: 1, price: 350000 }],
      status: "failed",
      total: 350000,
      paymentMethod: "Credit Card",
      deliveryLocation: "Masoro, Gasabo, Kigali City",
      reason: "Payment declined",
    },
    {
      id: "ORD-2023-004",
      date: "2023-04-05",
      items: [
        { name: "Communication Board", quantity: 1, price: 65000 },
        { name: "High Contrast Reading Glasses", quantity: 1, price: 85000 },
      ],
      status: "completed",
      total: 150000,
      paymentMethod: "Cash on Delivery",
      deliveryLocation: "Gikondo, Kicukiro, Kigali City",
      deliveryDate: "2023-04-08",
      trackingNumber: "TRK-12347",
    },
    {
      id: "ORD-2023-005",
      date: "2023-04-12",
      items: [{ name: "Prosthetic Leg", quantity: 1, price: 450000 }],
      status: "processing",
      total: 450000,
      paymentMethod: "Bank Transfer",
      deliveryLocation: "Masoro, Gasabo, Kigali City",
      estimatedDelivery: "2023-04-25",
      trackingNumber: "TRK-12348",
    },
  ]

  const filteredOrders = activeFilter === "all" ? orders : orders.filter((order) => order.status === activeFilter)

  const getStatusIcon = (status) => {
    switch (status) {
      case "processing":
        return <Clock className="status-icon processing" />
      case "completed":
        return <CheckCircle className="status-icon completed" />
      case "failed":
        return <XCircle className="status-icon failed" />
      default:
        return null
    }
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-RW", options)
  }

  return (
    <div className="orders">
      <h2>Your Orders</h2>

      <div className="order-filters">
        <button
          className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => setActiveFilter("all")}
        >
          All Orders
        </button>
        <button
          className={`filter-btn ${activeFilter === "processing" ? "active" : ""}`}
          onClick={() => setActiveFilter("processing")}
        >
          Processing
        </button>
        <button
          className={`filter-btn ${activeFilter === "completed" ? "active" : ""}`}
          onClick={() => setActiveFilter("completed")}
        >
          Completed
        </button>
        <button
          className={`filter-btn ${activeFilter === "failed" ? "active" : ""}`}
          onClick={() => setActiveFilter("failed")}
        >
          Failed
        </button>
      </div>

      <div className="orders-list">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              className="order-card"
              key={order.id}
              onClick={() => onOrderClick(order)}
              tabIndex="0"
              role="button"
              aria-label={`Order ${order.id}, status: ${order.status}`}
            >
              <div className="order-header">
                <div className="order-id-date">
                  <span className="order-id">{order.id}</span>
                  <span className="order-date">{formatDate(order.date)}</span>
                </div>
                <div className="order-status">
                  {getStatusIcon(order.status)}
                  <span className={`status-text ${order.status}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div className="order-item" key={index}>
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">x{item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="order-total">
                  <span className="total-label">Total:</span>
                  <span className="total-amount">{order.total.toLocaleString()} RWF</span>
                </div>
                <ChevronRight className="chevron-icon" />
              </div>
            </div>
          ))
        ) : (
          <div className="no-orders">
            <p>No orders found with the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
