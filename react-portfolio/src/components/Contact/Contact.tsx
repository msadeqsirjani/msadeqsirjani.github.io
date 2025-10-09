import { useState } from 'react';
import Toastify from 'toastify-js';
import { trackContactSubmission } from '../../utils/analytics';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateEmail = (email: string): boolean => {
    // RFC 5322 compliant email regex (simplified)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    // Rate limiting: prevent spam submissions (30 seconds between submissions)
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;
    const rateLimitMs = 30000; // 30 seconds

    if (timeSinceLastSubmit < rateLimitMs && lastSubmitTime > 0) {
      const remainingSeconds = Math.ceil((rateLimitMs - timeSinceLastSubmit) / 1000);
      Toastify({
        text: `Please wait ${remainingSeconds} seconds before sending another message`,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "left",
        style: {
          background: "#ef4444",
        }
      }).showToast();
      return;
    }

    // Prevent double submission
    if (isSubmitting) {
      return;
    }

    // Validate email before submission
    if (!validateEmail(formData.email)) {
      Toastify({
        text: "Please enter a valid email address",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "left",
        style: {
          background: "#ef4444",
        }
      }).showToast();
      return;
    }

    // Validate message length
    if (formData.message.trim().length < 10) {
      Toastify({
        text: "Message must be at least 10 characters long",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "left",
        style: {
          background: "#ef4444",
        }
      }).showToast();
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        trackContactSubmission();
        setLastSubmitTime(now);
        Toastify({
          text: "Message sent successfully!",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "left",
          style: {
            background: "var(--accent-color)",
          }
        }).showToast();

        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        Toastify({
          text: "Failed to send message. Please try again.",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "left",
          style: {
            background: "#ef4444",
          }
        }).showToast();
      }
    } catch {
      Toastify({
        text: "An error occurred. Please try again.",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "left",
        style: {
          background: "#ef4444",
        }
      }).showToast();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title">Contact</h2>
        <div className="contact-container">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h4>Location</h4>
                <p>
                  <a href="https://maps.google.com/?q=1+UTSA+Circle,+San+Antonio,+TX+78249" target="_blank" rel="noopener">
                    1 UT San Antonio Circle, San Antonio, TX 78249
                  </a>
                </p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h4>Email</h4>
                <p>
                  <a href="mailto:mohammadsadegh.sirjani@utsa.edu">
                    mohammadsadegh.sirjani@utsa.edu
                  </a>
                </p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-university"></i>
              <div>
                <h4>Institution</h4>
                <p>
                  <a href="https://utsa.edu" target="_blank" rel="noopener">
                    University of Texas at San Antonio
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <h3>Send a Message</h3>
            <form id="contact-form" action="https://formspree.io/f/xblywejw" method="POST" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
