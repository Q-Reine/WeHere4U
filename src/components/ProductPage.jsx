import React from 'react';
import '../styles/productpage.css'
import { FaCheck, FaStar, FaRegStar } from 'react-icons/fa';

const ProductPage = () => {
  // Sample product data - in a real app, this would come from an API or props
  const product = {
    name: "Ergonomic Assistive Mouse",
    price: 99.99,
    rating: 4.5,
    reviews: 2345,
    image: "/images/assistive-mouse.jpg", // Replace with your actual image path
    description: "Experience excellence with our Ergonomic Assistive Mouse. Trusted by thousands of satisfied customers, this premium product delivers exceptional performance and unmatched quality.",
    features: [
      "Premium quality materials",
      "Expert craftsmanship",
      "Long-lasting durability",
      "Industry-leading warranty"
    ],
    testimonials: [
      {
        text: "This is absolutely the best product I've ever used. The quality is outstanding!",
        author: "Sarah M."
      }
    ]
  };

  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="star half-filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="star" />);
      }
    }
    
    return stars;
  };

  return (
    <div className="product-page-container">
      <div className="product-card">
        <div className="product-image-container">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>

        <div className="product-details">
          <h1 className="product-title">{product.name}</h1>
          
          <div className="product-rating">
            {renderStars(product.rating)}
            <span className="rating-text">
              ({product.rating} based on {product.reviews.toLocaleString()} reviews)
            </span>
          </div>
          
          <div className="product-price">${product.price.toFixed(2)}</div>
          
          <section className="product-about">
            <h2>About This Product</h2>
            <p>{product.description}</p>
          </section>
          
          <section className="product-features">
            <h3>Key Features:</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>
                  <FaCheck className="feature-check" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>
          
          <section className="product-testimonials">
            <h3>What Our Customers Say</h3>
            {product.testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial">
                <p>"{testimonial.text}"</p>
                <p className="testimonial-author">- {testimonial.author}</p>
              </div>
            ))}
          </section>
          
          <button className="add-to-cart-button">ADD TO CART</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;