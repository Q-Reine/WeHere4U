"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Phone, Mail, MessageSquare } from "lucide-react"
import "./help.css"

const Help = () => {
  const [activeQuestion, setActiveQuestion] = useState(null)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [showNotification, setShowNotification] = useState(false)

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Submit form logic would go here
    setContactForm({
      name: "",
      email: "",
      message: "",
    })
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  const faqs = [
    {
      question: "How do I track my order?",
      answer:
        "You can track your order by going to the Orders section in your dashboard. Click on the specific order you want to track, and you will see the current status and delivery information.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods including Mobile Money (MTN Mobile Money, Airtel Money), Credit/Debit Cards, and Cash on Delivery within Kigali City.",
    },
    {
      question: "How can I return a product?",
      answer:
        "To return a product, please contact our customer support within 7 days of receiving your order. We will guide you through the return process and arrange for pickup or drop-off.",
    },
    {
      question: "Do you offer warranty on assistive devices?",
      answer:
        "Yes, most of our assistive devices come with a warranty. The warranty period varies by product, typically ranging from 6 months to 2 years. You can find the specific warranty information on the product page.",
    },
    {
      question: "How can I get help using my assistive device?",
      answer:
        "We offer training and support for all our assistive devices. You can schedule a training session by contacting our support team. We also have video tutorials available in the Help section.",
    },
    {
      question: "Do you deliver outside Kigali?",
      answer:
        "Yes, we deliver to all provinces in Rwanda. Delivery times and fees may vary based on your location. You can check the estimated delivery time during checkout.",
    },
  ]

  return (
    <div className="help">
      <h2>Help & Support</h2>

      <div className="help-sections">
        <div className="faq-section">
          <h3>Frequently Asked Questions</h3>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div className={`faq-item ${activeQuestion === index ? "active" : ""}`} key={index}>
                <button
                  className="faq-question"
                  onClick={() => toggleQuestion(index)}
                  aria-expanded={activeQuestion === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span>{faq.question}</span>
                  {activeQuestion === index ? <ChevronUp className="faq-icon" /> : <ChevronDown className="faq-icon" />}
                </button>
                <div className="faq-answer" id={`faq-answer-${index}`} aria-hidden={activeQuestion !== index}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-section">
          <h3>Contact Us</h3>

          <div className="contact-methods">
            <div className="contact-method">
              <Phone className="contact-icon" />
              <div>
                <h4>Phone Support</h4>
                <p>+250 78 123 4567</p>
                <p className="contact-hours">Monday to Friday, 8am - 6pm</p>
              </div>
            </div>

            <div className="contact-method">
              <Mail className="contact-icon" />
              <div>
                <h4>Email Support</h4>
                <p>support@ubufasha.rw</p>
                <p className="contact-hours">We respond within 24 hours</p>
              </div>
            </div>

            <div className="contact-method">
              <MessageSquare className="contact-icon" />
              <div>
                <h4>Live Chat</h4>
                <p>Available on our website</p>
                <p className="contact-hours">Monday to Saturday, 9am - 5pm</p>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <h4>Send us a Message</h4>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={contactForm.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {showNotification && <div className="notification">Message sent successfully</div>}
    </div>
  )
}

export default Help

