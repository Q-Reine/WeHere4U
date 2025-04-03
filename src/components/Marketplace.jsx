import React from "react";
import "../styles/marketplace.css"; 
import mobilitydev1 from "../assets/mobilitydev1.jpg"; 
import communicationDevices from "../assets/device5.jpg";
import dailyLivingAids from "../assets/women.jpg";
import visionHearingSupport from "../assets/hearing.jpg";
import chair from '../assets/chair.webp';
import VoiceDevice from '../assets/device3.jpeg';
import mobilitydev3 from '../assets/mobilitydev3.jpg';
import mobility from "../assets/mobilitydev4.jpg";
import communication from "../assets/hearing1.jpg";
import cooking from "../assets/baco1.jpg";
import mobilityImg from "../assets/mobilitydev2.jpg";
import financialImg from "../assets/learner.jpg";
import technologyImg from "../assets/home2.jpg";


const categories = [
  {
    id: 1,
    image: mobilitydev1,
    title: "Mobility Aids",
    description: "Enhancing movement and independence.",
    buttonText: "Explore Mobility Aids",
  },
  {
    id: 2,
    image: communicationDevices,
    title: "Communication Devices",
    description: "Bridging the gap in communication.",
    buttonText: "Discover Communication Devices",
  },
  {
    id: 3,
    image: dailyLivingAids,
    title: "Daily Living Aids",
    description: "Facilitating everyday tasks with ease.",
    buttonText: "View Daily Living Aids",
  },
  {
    id: 4,
    image: visionHearingSupport,
    title: "Vision and Hearing Support",
    description: "Improving sensory experiences.",
    buttonText: "Check Vision and Hearing Support",
  },
];

const products = [
    {
      id: 1,
      name: "Smart Wheelchair",
      price: "$1,200.00",
      description:
        "This advanced smart wheelchair features state-of-the-art navigation and comfort, empowering users to move freely and independently. Its lightweight design and intuitive controls make it a favorite among our customers.",
      image: chair,
    },
    {
      id: 2,
      name: "Voice-Activated Communication Device",
      price: "$250.00",
      description:
        "Designed for individuals with speech impairments, this voice-activated device allows for effortless communication. With customizable phrases and easy-to-use features, it enhances social interaction.",
      image:VoiceDevice
    },
    {
      id: 3,
      name: "Adaptive Kitchen Tools",
      price: "$75.00",
      description:
        "Our adaptive kitchen tools are specially designed to assist individuals with limited dexterity. These tools make cooking easier and more enjoyable, allowing everyone to participate in meal preparation.",
      image: mobilitydev3
    },
  ];

  const testimonials = [
    {
      id: 1,
      title: "Life-Changing Mobility",
      description:
        "The smart wheelchair has greatly improved my mobility and independence. I can now navigate my environment with ease.",
      image: mobility,
    },
    {
      id: 2,
      title: "Enhanced Communication",
      description:
        "The hearing - activated communication device has made a world of difference for my child. It's easy to use and has boosted their confidence immensely.",
      image: communication,
    },
    {
      id: 3,
      title: "Cooking with Confidence",
      description:
        "The adaptive kitchen tools have transformed my cooking experience. I feel empowered and more involved in meal preparation now.",
      image: cooking,
    },
  ];

  const guides = [
    {
      id: 1,
      title: "Choosing the Right Mobility Aid",
      date: "March 4, 2025",
      description:
        "Selecting the right mobility aid can be daunting. This guide provides essential considerations,...",
      image: mobilityImg,
    },
    {
      id: 2,
      title: "Financial Assistance for Assistive Devices",
      date: "March 4, 2025",
      description:
        "Many individuals may face financial barriers when purchasing assistive devices. This post...",
      image: financialImg,
    },
    {
      id: 3,
      title: "Understanding Assistive Technology",
      date: "March 4, 2025",
      description:
        "This post explains what assistive technology is, the various types available, and how they can...",
      image: technologyImg,
    },
  ];

function Marketplace () {
  return (
    <div className="Marketplace-content">
        <div className="assistive-section">
            <div className="assistive-grid">
                {categories.map((category) => (
                    <div key={category.id} className="assistive-card">
                        <img src={category.image} alt={category.title} />
                        <div className="overlay">
                            <h2>{category.title}</h2>
                            <p>{category.description}</p>
                            <button>{category.buttonText}</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="marketplace-container">
            <h1>Best-Selling Assistive Technologies</h1>
            <p>Top picks chosen by our community for their effectiveness and affordability.</p>
            <div className="product-list">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} className="product-image" />
                        <div className="product-info">
                            <h2>{product.name}</h2>
                            <p className="product-price">{product.price}</p>
                            <p className="product-description">{product.description}</p>
                            <div className="quantity-selector">
                                <span>Quantity</span>
                                <button className="quantity-btn">−</button>
                                <input type="number" value="1" disabled />
                                <button className="quantity-btn">+</button>
                            </div>
                            <button className="coming-soon-btn" disabled>Coming soon</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="user-experiences-container">
      <h1>User Experiences</h1>
      <p>Hear from our satisfied customers about how our products have changed their lives.</p>

      <div className="testimonial-list">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <img src={testimonial.image} alt={testimonial.title} className="testimonial-image" />
            <h2>{testimonial.title}</h2>
            <p className="testimonial-description">{testimonial.description}</p>
            <button className="read-more-btn">Read More</button>
          </div>
        ))}
      </div>
    </div>
    <div className="buying-guide-container">
      <h1>Informed Buying Guide</h1>
      <p>Helpful resources to guide you in choosing the right assistive technology for your needs.</p>

      <div className="guide-list">
        {guides.map((guide) => (
          <div key={guide.id} className="guide-card">
            <img src={guide.image} alt={guide.title} className="guide-image" />
            <h2>{guide.title}</h2>
            <p className="guide-date">{guide.date}</p>
            <p className="guide-description">{guide.description}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Marketplace;
