import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import '../styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { title: 'Home', path: '/' },
    { title: 'About Us', path: '/about' },
    { title: 'Technologies', path: '/technologies' },
    { title: 'Community', path: '/community' },
    { title: 'Resources', path: '/resources' }
  ];

  const supportLinks = [
    { title: 'Contact Support', path: '/support' },
    { title: 'FAQ', path: '/faq' },
    { title: 'Accessibility Guide', path: '/accessibility' },
    { title: 'Donate', path: '/donate' }
  ];

  const legalLinks = [
    { title: 'Privacy Policy', path: '/privacy' },
    { title: 'Terms of Service', path: '/terms' },
    { title: 'Cookie Policy', path: '/cookies' }
  ];

  return (
    <footer className="access-africa-footer">
      <div className="footer-container">
        <div className="footer-columns">
          <div className="footer-column about-column">
            <h3>WeHereForYou</h3>
            <p>Empowering individuals with disabilities through innovative assistive technologies across Africa.</p>
            <div className="social-icons">
              <a href="https://facebook.com/accessafrica" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://twitter.com/accessafrica" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com/company/accessafrica" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href="https://instagram.com/accessafrica" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.path}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.path}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.path}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column newsletter-column">
            <h4>Stay Connected</h4>
            <p>Subscribe to our newsletter for updates</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                required 
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} WeHereForYou. All Rights Reserved.</p>
          <p>Bridging Technology and Accessibility</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
