import React from "react";
import '../styles/getinvolved.css'
import women from '../assets/women.jpg'

import img1 from "../assets/mobilitydev1.jpg";
import img2 from "../assets/hearing.jpg";
import img3 from "../assets/women.jpg";
import basic from "../assets/baco1.jpg";
import community from "../assets/device4.jpg";
import championImg from "../assets/chair1.webp"
import story from "../assets/family.png";
import school from "../assets/device2.jpeg";
import ngo from "../assets/ngo.jpeg"

const skillsData = [
    {
      title: "Community Outreach",
      description:
        "Help us raise awareness about the importance of assistive technology in the community. By organizing workshops, information sessions, and local events, you can help educate individuals and families on available resources and support systems. Your role can significantly enhance community knowledge and engagement.",
      image: img1,
    },
    {
      title: "Technical Support",
      description:
        "If you have technical skills, you can assist in setting up and maintaining our online platform. Your expertise will ensure that users have a seamless experience when accessing resources, forums, and our marketplace. Join us to help create a more accessible digital space for everyone.",
      image: img2,
    },
    {
      title: "Advocacy and Awareness",
      description:
        "Become an advocate for assistive technology by sharing your knowledge and experiences through our community forum and social media. Your voice can help drive change and support policy development that benefits individuals with disabilities. Together, we can make a louder impact.",
      image: img3,
    },
  ];

  const supportOptions = [
    {
      title: "Basic Support",
      price: "$1.00-$15.00",
      description: [
        "Provides access to essential resources for one individual",
        "Supports community outreach initiatives",
        "Contributes to awareness campaigns",
      ],
      icon: basic,
      highlighted: false,
    },
    {
      title: "Community Builder",
      price: "$16.00-$50.00",
      description: [
        "Supplies low-cost assistive technology for two individuals",
        "Funds training workshops for caregivers",
        "Enhances our online resource hub",
      ],
      icon:community,
      highlighted: true, // Mark this as recommended
    },
    {
      title: "Technology Champion",
      price: "$100.00-above",
      description: [
        "Facilitates the development of new assistive technology solutions",
        "Supports the maintenance of our online platform",
        "Provides scholarships for training programs",
      ],
      icon: championImg,
      highlighted: false,
    },
  ];

  const partnerships = [
    {
      title: "Corporate Partnerships",
      description:
        "Businesses can partner with us to support our initiatives through funding, resources, and expertise. Together, we can drive impactful change and enhance the lives of individuals with disabilities.",
      image: img1,
    },
    {
      title: "NGO Collaborations",
      description:
        "Non-governmental organizations can collaborate with us to share knowledge, resources, and best practices in assistive technology. By working together, we can ensure that our efforts reach those who need it most.",
      image: img2,
    },
    {
      title: "Academic Partnerships",
      description:
        "Educational institutions can partner with us to conduct research, develop new technologies, and offer training programs. This collaboration will foster innovation and create sustainable solutions for assistive technology access.",
      image: img3,
    },
  ];

  const events = [
    {
      title: "Community Forum: Share Your Story",
      date: "March 4, 2025",
      description:
        "We invite you to participate in our upcoming community forum where individuals with disabilities...",
      image: story,
      link: "#",
    },
    {
      title: "Webinar: Innovations in Assistive Technology",
      date: "March 4, 2025",
      description:
        "Attend our free webinar to discover the latest innovations in assistive technology. Experts will...",
      image: school,
      link: "#",
    },
    {
      title: "Assistive Technology Awareness Week",
      date: "March 4, 2025",
      description:
        "Join us for a week-long series of events focused on raising awareness about assistive...",
      image: ngo,
      link: "#",
    },
  ];

function GetInvolved () {
  return (
    <div className="Involved">
        <div className="join-us-banner" >
            <img src= {women}/>
            <div className="banner-content">
              <h1>Join Us in Making a Difference</h1>
              <p>Your support can empower individuals with disabilities across Africa.</p>
            </div>
        </div>
    <section className="lend-your-skills">
      <h2>Lend Your Skills</h2>
      <p>
        Become a vital part of our mission by volunteering your time and expertise 
        to improve access to assistive technology.
      </p>
      <div>
        {skillsData.map((skill, index) => (
          <div key={index} className="skill-item">
            <img src={skill.image} alt={skill.title} />
            <div className="skill-content">
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
    <section className="support-mission">
      <h2>Support Our Mission</h2>
      <p>
        Every contribution, big or small, helps us provide vital assistive technologies to those in need.
      </p>
      <div className="support-options">
        {supportOptions.map((option, index) => (
          <div
            key={index}
            className={`support-card ${option.highlighted ? "highlighted" : ""}`}
          >
            {option.highlighted && <div className="recommended">Recommended</div>}
            <img src={option.icon} alt={option.title} className="support-icon" />
            <h3>{option.title}</h3>
            <p className="price">{option.price}</p>
            <button className="select-button">SELECT</button>
            <ul>
              {option.description.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
    <section className="collaborate-section">
      <h2>Collaborate for Change</h2>
      <p>
        Join us in our mission to improve access to assistive technology through strategic partnerships.
      </p>
      <div className="partnership-container">
        {partnerships.map((partner, index) => (
          <div key={index} className="partnership-card">
            <img src={partner.image} alt={partner.title} className="partner-image" />
            <h3>{partner.title}</h3>
            <p>{partner.description}</p>
          </div>
        ))}
      </div>
    </section>
    <section className="events-section">
      <h2>Upcoming Events and Workshops</h2>
      <p>
        Join us for our upcoming initiatives aimed at enhancing awareness and access to assistive technology.
      </p>
      <div className="events-list">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <img src={event.image} alt={event.title} className="event-image" />
            <div className="event-details">
              <h3>{event.title}</h3>
              <p className="event-date">{event.date}</p>
              <p>{event.description}</p>
              <a href={event.link} className="read-more">Read more...</a>
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
};

export default GetInvolved;
