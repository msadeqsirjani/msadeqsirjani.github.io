import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission is handled by Formspree
    const form = e.target as HTMLFormElement;
    form.submit();
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
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-paper-plane"></i> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
