import React from "react";
import { useState } from "react";
import bannerImage from "../assets/mobilitydev2.jpg"; 
import "../styles/community.css"; 

import img1 from "../assets/mobilitydev3.jpg";
import img2 from "../assets/family.png";
import img3 from "../assets/image pro.webp";


const topics = [
    {
      image: img1,
      title: "Accessibility Innovations",
      description:
        "Explore the latest advancements in assistive technology that are transforming lives. Discuss how these innovations can be adapted for local needs and share your thoughts on what improvements are necessary.",
    },
    {
      image: img2,
      title: "Financial Aid Resources",
      description:
        "Discuss available financial assistance options for purchasing assistive technologies. Share your experiences with funding applications and learn from others who have successfully navigated the process.",
    },
    {
      image: img3,
      title: "Success in Employment",
      description:
        "Share stories and strategies related to gaining employment with assistive technology. This topic aims to inspire and provide practical tips for job seekers and employers alike.",
    },
  ];
  const journeys = [
    {
      image: img1,
      title: "From Challenges to Triumph",
      description:
        "Hear how one individual's determination and the right assistive technology led to a successful career in their dream job.",
      buttonText: "Read More",
    },
    {
      image: img2,
      title: "Empowering Education",
      description:
        "Discover the story of a student who overcame barriers in education with the help of innovative assistive devices, inspiring others to pursue their academic goals.",
      buttonText: "Learn Their Story",
    },
    {
      image: img3,
      title: "Building Community Connections",
      description:
        "Explore how a support group formed around assistive technology led to lasting friendships and enhanced social participation for its members.",
      buttonText: "See Their Journey",
    },
  ];

  const guidelines = [
    {
      image: img1,
      title: "Constructive Feedback",
      date: "March 4, 2025",
      description:
        "When providing feedback, aim to be constructive and supportive. Focus on offering solutions or...",
      link: "#",
    },
    {
      image: img2,
      title: "Privacy and Safety",
      date: "March 4, 2025",
      description:
        "Protect your privacy and that of others by not sharing personal information. Be cautious about...",
      link: "#",
    },
    {
      image: img3,
      title: "Respect and Inclusivity",
      date: "March 4, 2025",
      description:
        "Our community thrives when everyone feels respected and included. Always engage with an open mind...",
      link: "#",
    },
  ];

function Community() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        alert("Your message has been submitted!");
        setFormData({ name: "", email: "", message: "" });
      };
    
  return (
    <div className="forum-content">
    <section className="connect-banner">
      <img src= {bannerImage}/>
      <div className="banner-overlay">
        <h1>Connect and Share</h1>
        <p>Empowering voices through shared experiences</p>
      </div>
    </section>
    <section className="engage-section">
      <h2>Engage with Others</h2>
      <p>Join the conversation on pressing issues and share your insights.</p>
      <div className="engage-list">
        {topics.map((topic, index) => (
          <div key={index} className="engage-item">
            <img src={topic.image} alt={topic.title} />
            <div className="engage-text">
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
    <section className="journeys-section">
      <h2>Transformative Journeys</h2>
      <p>
        Read inspiring testimonials from individuals who have successfully
        navigated challenges with assistive technology.
      </p>
      <div className="journeys-list">
        {journeys.map((journey, index) => (
          <div key={index} className="journey-card">
            <img src={journey.image} alt={journey.title} />
            <h3>{journey.title}</h3>
            <p>{journey.description}</p>
            <button>{journey.buttonText}</button>
          </div>
        ))}
      </div>
    </section>
    <section className="forum-etiquette">
      <h2>Forum Etiquette</h2>
      <p className="subtitle">
        Guidelines to ensure a respectful and constructive community environment.
      </p>
      <div className="guidelines-list">
        {guidelines.map((guide, index) => (
          <div key={index} className="guideline-card">
            <img src={guide.image} alt={guide.title} />
            <div className="guideline-content">
              <h3>{guide.title}</h3>
              <p className="date">{guide.date}</p>
              <p>{guide.description}</p>
              <a href={guide.link} className="read-more">
                Read more...
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
    <section className="expert-insights">
      <h2>Expert Insights</h2>
      <p className="subtitle">
        Get answers to your pressing questions from seasoned professionals in
        assistive technology.
      </p>
      <form onSubmit={handleSubmit} className="insights-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </section>
    </div>
    
  );
}

export default Community;
