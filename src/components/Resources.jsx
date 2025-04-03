import React from "react";
import { useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import "../styles/resources.css";
import accessibilityImg from "../assets/mobilitydev5.jpg";
import environmentImg from "../assets/women.jpg";
import technologyImg from "../assets/hearing1.jpg";
import learner from "../assets/learner.jpg"
import chair1 from "../assets/chair1.webp"
import empowderImg from "../assets/mobilitydev1.jpg"
import personalise from "../assets/device3.jpeg"
import organization from "../assets/organisation.jpeg"
import ngo from "../assets/ngo.jpeg"


const guides = [

  {
    id: 1,
    title: "Navigating Accessibility Features on Devices",
    date: "March 4, 2025",
    image: accessibilityImg,
  },
  {
    id: 2,
    title: "Adapting Your Environment for Better Accessibility",
    date: "March 4, 2025",
    image: environmentImg,
  },
  {
    id: 3,
    title: "Choosing the Right Assistive Technology",
    date: "March 4, 2025",
    image: technologyImg,
  },
];

const sections = [
    {
      img: learner,
      title: "Assistive Technology Needs Assessment",
      description:
        "Utilize our interactive needs assessment tool to evaluate your specific requirements for assistive technology. This tool guides you through a series of questions to help you identify the types of technologies that may be most beneficial for your lifestyle. It’s a straightforward way to pinpoint your needs and make informed choices about assistive devices.",
    },
    {
      img: chair1,
      title: "Personalized Technology Recommendations",
      description:
        "Based on your needs assessment, receive personalized recommendations for assistive technology solutions tailored to your situation. This tool takes into account your preferences, lifestyle, and specific challenges, ensuring you find the best options available. Explore various products and services that can enhance your daily activities.",
    },
    {
      img: personalise,
      title: "Budgeting for Assistive Technology",
      description:
        "Managing finances for assistive technology can be a challenge. This budgeting tool helps you create a financial plan that accommodates the costs of necessary devices and services. It offers tips on saving and finding financial assistance, making it easier for you to invest in the technology you need to thrive.",
    },
  ];

  const fundingOptions = [
    {
      img: accessibilityImg,
      title: "Government Grant Programs",
      description:
        "Learn about various government grant programs available for individuals seeking assistive technology. These grants can significantly offset costs, making it easier to access the tools you need. Our resource section provides links to application processes and eligibility criteria to help you navigate the funding landscape.",
    },
    {
      img: organization,
      title: "Nonprofit Funding Opportunities",
      description:
        "Many nonprofits offer funding for assistive technologies. This section provides a curated list of organizations that support individuals with disabilities by providing financial assistance for necessary equipment. Explore how to apply and the types of assistance available to ease your financial burden.",
    },
    {
      img: ngo,
      title: "Crowdfunding for Assistive Devices",
      description:
        "Crowdfunding can be an effective way to raise funds for assistive devices. This guide outlines how to set up a successful crowdfunding campaign, including tips on storytelling, reaching your audience, and leveraging social media to gather support. Turn your need into a community cause and find the support you deserve.",
    },
  ];

  const faqs = [
    {
      question: "What is assistive technology?",
      answer: "Assistive technology refers to devices, software, or equipment that help individuals with disabilities perform tasks that might otherwise be difficult or impossible.",
    },
    {
      question: "How can I access funding for assistive technology?",
      answer: "Funding options include government grants, nonprofit organizations, and crowdfunding platforms that support individuals in acquiring assistive technology solutions.",
    },
    {
      question: "Where can I find reliable assistive technology vendors?",
      answer: "Reliable vendors can be found through online marketplaces, specialized assistive technology stores, and recommendations from medical professionals or support organizations.",
    },
  ];


function Resources () {
    const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="resources-content">
        <div className="hero-content">
          <img src = {empowderImg}/>
          <div className="hero-1">
          <h1>Empowerment Through Knowledge</h1>
          <p>Your comprehensive guide to assistive technology resources</p>
          </div>
        </div>
    
    <div className="assistive-tech-guide">
      <h1>Understanding Assistive Technologies</h1>
      <p>Guides to enhance your knowledge and usage of assistive devices</p>

      <div className="guide-list">
        {guides.map((guide) => (
          <div key={guide.id} className="guide-card">
            <img src={guide.image} alt={guide.title} className="guide-image" />
            <h2>{guide.title}</h2>
            <p className="guide-date">{guide.date}</p>
          </div>
        ))}
      </div>
    </div>
    <section className="assess-section">
      <h2>Assess Your Needs</h2>
      <p className="subtitle">Tools to help you identify the right solutions for your situation</p>
      <div className="assess-container">
        {sections.map((item, index) => (
          <div key={index} className="assess-item">
            <img src={item.img} alt={item.title} />
            <div className="text-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
    <section className="funding-section">
      <h2>Funding Your Needs</h2>
      <p className="subtitle">Explore financial support options for assistive technology</p>
      <div className="funding-container">
        {fundingOptions.map((option, index) => (
          <div key={index} className="funding-card">
            <img src={option.img} alt={option.title} />
            <h3>{option.title}</h3>
            <p>{option.description}</p>
          </div>
        ))}
      </div>
    </section>
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <p className="subtitle">Find answers to your pressing questions about assistive technology</p>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? "open" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <span>{faq.question}</span>
              {openIndex === index ? <FaChevronDown /> : <FaChevronRight />}
            </div>
            {openIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </section>

    </div>
  );
}

export default Resources;
