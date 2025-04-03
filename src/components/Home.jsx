import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import '../styles/home.css'
import imagepro2 from '../assets/imagepro2.jpg';
import home2 from '../assets/home2.JPG'
import baco from '../assets/baco.jpg'
import baco1 from '../assets/baco1.jpg'
import chair from '../assets/chair.webp'
import device5 from '../assets/device5.jpg'
import tablet from '../assets/tablet.jpeg'
import chair1 from '../assets/chair1.webp'
import learner from '../assets/learner.jpg'
import family from '../assets/family.png'
import ngo from '../assets/ngo.jpeg'
import img1 from '../assets/imagepro2.jpg'
const slides = [
  {
    id: 1, image:home2, title: "Bridging the Accessibility Gap",
    description:"Our mission is to eliminate barriers faced by people with disabilities in accessing assistive technologies. We believe that everyone deserves equal opportunities to participate in all aspects of life, including education, employment, and social activities.",
    button: "Learn More",
  },
  {
    id: 2, image:baco, title: "Raising Awareness and Education",
    description:"We focus on increasing awareness about the importance of assistive technology in enhancing the quality of life for individuals with disabilities. Through workshops and outreach programs, we aim to educate communities and stakeholders about available resources.",
    button: "Get Involved",
  },

  {
    id: 3, image:baco1, title: "Building a Supportive Community",
    description:"Our platform fosters a strong community where individuals, caregivers, and organizations can share experiences, solutions, and support. Together, we can create a more inclusive environment for all.",
    button: "Join Us",
  },
 
];


const products = [
  {
    id: 1, name: "Smart Wheelchair", price: "$1,500.00", image:chair, },
  { id: 2, name: "Communication Device", price: "$750.00", image:device5, },
  { id: 3, name: "Accessible Learning Tablet", price: "$300.00", image:tablet },
];

const stories = [
  {
    id: 1, image: learner, title: "Empowering Young Learners",
    description:
      "Hear from educators who have seen firsthand the difference assistive technology can make in the lives of students with disabilities. Their stories highlight improved engagement and academic success.",
  },
  {
    id: 2,  image: family, title: "Supporting Families",
    description:
      "Families share their journeys of navigating the challenges of disability. Our resources have provided them with hope, support, and the tools needed to thrive.",
  },
  {
    id: 3,  image: ngo,title: "NGOs Leading Change",
    description:
      "Non-governmental organizations discuss how partnerships with our platform have enhanced their outreach and impact in providing assistive technologies to underserved communities.",
  },
];


function Home() {

  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  const navigation = useNavigate();
  const handleNavigate = (id) => {
    navigation(`/SinglePage/${id}`)
  }

  return (
    <div className="home-content">
      <div className="home-1">
          <img src={imagepro2}/>
          <div className="home-1-1">
          <p>
            We connect individuals with disabilities in Africa to affordable and accessible assistive technologies, enabling them to thrive in education, work, and society.
          </p>
          <h2>
            Empowering Abilities, Connecting Lives.
          </h2>
        </div>
      </div>
      <div className="middle-content">
        <div className="current-slide">
          <button onClick={prevSlide} className="arrow left">
            <FaChevronLeft size={24} />
          </button>
          <div className="slide" key={slides[current].id}>
            <img src={slides[current].image} alt="Slide" className="slide-image" />
            <div className="slide-section">
              <h2>{slides[current].title}</h2>
              <p>{slides[current].description}</p>
              <button className="slide-button">{slides[current].button}</button>
            </div>
          </div>
          <button onClick={nextSlide} className="arrow right">
          <FaChevronRight size={24} />
          </button>
        </div>
        <div className="next-slide">
          {slides.map((_, index) => (
            <span   key={index}
              className={`h-2 w-2 rounded-full ${
              index === current ? "bg-black" : "bg-gray-400"
            }`}>
            </span>
          ))}
        </div>
      </div>
      <div className="markeplace-content">
        <h1>Assistive Technology Marketplace</h1>
        <p>
        Discover a range of affordable assistive technologies designed to enhance mobility, communication, and daily living for individuals with disabilities.
        </p>
        <div className="assistive-products">
          {products.map((product) => (
            <div key={product.id} className="products">
              <img src={product.image} alt={product.name} className="products-1"/>
              <h2>{product.name}</h2>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
        <button type="button" className="button11" onClick={() => handleNavigate(cardData.id)}>View</button>
      </div>
      <div className="blog-updates">
        <h2>Insights and Updates</h2>
        <p>
        Stay informed with the latest developments in assistive technology, policy changes, and community efforts aimed at empowering individuals with disabilities.
        </p>
        <div className="blog">
          <img src={chair1} alt="Assistive Tech" />
          <div className="blog-content">
            <h3>New Assistive Tech Policies in Africa</h3>
            <p>March 4, 2025</p>
            <p>
            Recent policy changes across several African nations aim to improve access to assistive...
            </p>
            <a href="#">Read more...</a>
          </div>
        </div>
      </div>
      <div className="story-section">
        <h2>Real Stories, Real Impact</h2>
        <p>
        Explore the transformative stories from our community members who have
        benefited from our services and resources.
        </p>
        <div className="story-cards">
          {stories.map((story) => (
            <div key={story.id} className="story-card">
              <img src={story.image} alt={story.title} />
              <h3>{story.title}</h3>
              <p>{story.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
