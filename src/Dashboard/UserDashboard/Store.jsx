import { useState } from "react"
import { Search, ShoppingCart, Eye } from 'lucide-react'
import "../UserDashboard/userdashboardstyles/store.css"
// import photo from './Screenshot 2025-03-01 223501.png'
// import photo2 from './Screenshot 2025-03-01 223549.png'

const Store = ({ onAddToCart }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = [
    { id: "all", name: "All" },
    { id: "mobility", name: "Mobility" },
    { id: "vision", name: "Vision" },
    { id: "hearing", name: "Hearing" },
    { id: "learning", name: "Learning" },
    { id: "communication", name: "Communication" },
  ]

  const products = [
    {
      id: 1,
      name: 'Smart Tablet for Learning',
      category: 'learning',
      price: 120000,
      images: [ photo, photo2,
    ],
      description: 'Specially designed tablet with educational apps for children with learning disabilities. Features high contrast display and simplified interface.',
      features: [
        'High contrast display',
        'Simplified interface',
        'Educational apps pre-installed',
        'Durable case for protection',
        'Long battery life'
      ]
    },
    {
      id: 2,
      name: 'Adjustable Smart Chair',
      category: 'mobility',
      price: 350000,
      images: [
        photo,photo
      ],
      description: 'Ergonomic chair with adjustable height and support for proper posture. Designed for students with mobility challenges.',
      features: [
        'Adjustable height',
        'Ergonomic design',
        'Proper posture support',
        'Durable construction',
        'Easy to move'
      ]
    },
    {
      id: 3,
      name: 'High Contrast Reading Glasses',
      category: 'vision',
      price: 85000,
      images: [
        '/placeholder.svg?height=300&width=300',
        '/placeholder.svg?height=300&width=300'
      ],
      description: 'Glasses designed to enhance contrast for people with visual impairments. Helps with reading and daily activities.',
      features: [
        'Enhanced contrast',
        'Anti-glare coating',
        'Lightweight frame',
        'Adjustable fit',
        'Includes protective case'
      ]
    },
    {
      id: 4,
      name: 'Digital Hearing Aid',
      category: 'hearing',
      price: 275000,
      images: [
        '/placeholder.svg?height=300&width=300',
        '/placeholder.svg?height=300&width=300'
      ],
      description: 'Advanced digital hearing aid with noise cancellation technology. Improves classroom learning experience.',
      features: [
        'Noise cancellation',
        'Digital sound processing',
        'Rechargeable battery',
        'Water resistant',
        'Classroom mode'
      ]
    },
    {
      id: 5,
      name: 'Communication Board',
      category: 'communication',
      price: 65000,
      images: [
        '/placeholder.svg?height=300&width=300',
        '/placeholder.svg?height=300&width=300'
      ],
      description: 'Visual communication board for non-verbal individuals. Includes common phrases and customizable options.',
      features: [
        'Visual symbols',
        'Customizable options',
        'Durable construction',
        'Portable design',
        'Includes carrying case'
      ]
    },
    {
      id: 6,
      name: 'Prosthetic Leg',
      category: 'mobility',
      price: 450000,
      images: [
        '/placeholder.svg?height=300&width=300',
        '/placeholder.svg?height=300&width=300'
      ],
      description: 'Lightweight prosthetic leg with adjustable fitting. Designed for children and young adults.',
      features: [
        'Lightweight materials',
        'Adjustable fitting',
        'Durable construction',
        'Natural movement',
        'Grows with the user'
      ]
    }
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "all" || product.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (product) => {
    onAddToCart(product)
    setNotificationMessage(`${product.name} added to cart`)
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  const viewProductDetails = (product) => {
    setSelectedProduct(product)
    setCurrentImageIndex(0);
  }

  const closeProductDetails = () => {
    setSelectedProduct(null)
  }

  const handleImageNavigation = (direction, e) => {
    e.stopPropagation();
    if (!selectedProduct) return;
    
    const imagesLength = selectedProduct.images.length;
    if (direction === 'next') {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesLength);
    } else {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imagesLength) % imagesLength);
    }
  };

  return (
    <div className="store">
      <h2>Assistive Devices Store</h2>

      <div className="search-bar">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search for assistive devices..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search for assistive devices"
        />
      </div>

      <div className="categories">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-btn ${activeCategory === category.id ? "active" : ""}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image-container">
                <img 
                  src={product.images[0] || "/placeholder.svg"} 
                  alt={product.name} 
                  className="product-image"
                />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">{product.price.toLocaleString()} RWF</p>
                <div className="product-actions">
                  <button 
                    className="view-details-btn"
                    onClick={() => viewProductDetails(product)}
                    aria-label={`View details for ${product.name}`}
                  >
                    <Eye className="btn-icon" />
                    View Details
                  </button>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product)}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <ShoppingCart className="btn-icon" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No products found matching your search.</p>
          </div>
        )}
      </div>

      {showNotification && <div className="notification">{notificationMessage}</div>}

      {selectedProduct && (
        <div className="product-details-modal">
          <div className="modal-content">
            <button className="close-modal-btn" onClick={closeProductDetails}>×</button>
            <div className="product-details">
              <div className="product-details-image-gallery">
                <div className="main-image-container">
                  <img 
                    src={selectedProduct.images[currentImageIndex] || "/placeholder.svg"} 
                    alt={selectedProduct.name} 
                    className="main-image"
                  />
                  {selectedProduct.images.length > 1 && (
                    <>
                      <button 
                        className="image-nav-btn prev-btn" 
                        onClick={(e) => handleImageNavigation('prev', e)}
                        aria-label="Previous image"
                      >
                        ‹
                      </button>
                      <button 
                        className="image-nav-btn next-btn" 
                        onClick={(e) => handleImageNavigation('next', e)}
                        aria-label="Next image"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>
                {selectedProduct.images.length > 1 && (
                  <div className="thumbnail-container">
                    {selectedProduct.images.map((image, index) => (
                      <div 
                        key={index} 
                        className={`thumbnail ${currentImageIndex === index ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <img src={image || "/placeholder.svg"} alt={`${selectedProduct.name} thumbnail ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="product-details-info">
                <h2>{selectedProduct.name}</h2>
                <p className="product-details-price">{selectedProduct.price.toLocaleString()} RWF</p>
                <p className="product-details-description">{selectedProduct.description}</p>
                
                <div className="product-features">
                  <h3>Features</h3>
                  <ul>
                    {selectedProduct.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <button 
                  className="add-to-cart-btn full-width"
                  onClick={() => {
                    addToCart(selectedProduct);
                    closeProductDetails();
                  }}
                >
                  <ShoppingCart className="btn-icon" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Store