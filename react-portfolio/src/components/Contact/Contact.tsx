import { useState } from 'react';
import { toast } from 'sonner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { trackContactSubmission } from '../../utils/analytics';

const RATE_LIMIT_MS = 30000;
const MIN_MESSAGE_LENGTH = 10;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const contactInfo = [
    {
      icon: 'fa-map-marker-alt',
      title: 'Location',
      href: 'https://maps.google.com/?q=1+UTSA+Circle,+San+Antonio,+TX+78249',
      text: '1 UT San Antonio Circle, San Antonio, TX 78249',
      external: true
    },
    {
      icon: 'fa-envelope',
      title: 'Email',
      href: 'mailto:mohammadsadegh.sirjani@utsa.edu',
      text: 'mohammadsadegh.sirjani@utsa.edu',
      external: false
    },
    {
      icon: 'fa-university',
      title: 'Institution',
      href: 'https://utsa.edu',
      text: 'University of Texas at San Antonio',
      external: true
    }
  ];

  const formFields = [
    { id: 'name', name: 'name', type: 'text', placeholder: 'Your Name' },
    { id: 'email', name: 'email', type: 'email', placeholder: 'Your Email' },
    { id: 'subject', name: 'subject', type: 'text', placeholder: 'Subject' },
    { id: 'message', name: 'message', type: 'textarea', placeholder: 'Your Message', rows: 5 }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;

    if (timeSinceLastSubmit < RATE_LIMIT_MS && lastSubmitTime > 0) {
      const remainingSeconds = Math.ceil((RATE_LIMIT_MS - timeSinceLastSubmit) / 1000);
      toast.error(`Please wait ${remainingSeconds} seconds before sending another message`);
      return;
    }

    if (isSubmitting) return;

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (formData.message.trim().length < MIN_MESSAGE_LENGTH) {
      toast.error(`Message must be at least ${MIN_MESSAGE_LENGTH} characters long`);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        trackContactSubmission();
        setLastSubmitTime(now);
        toast.success("Message sent successfully!");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
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
            {contactInfo.map((item, idx) => (
              <div key={idx} className="contact-item">
                <span className={`fas ${item.icon}`}></span>
                <div>
                  <h4>{item.title}</h4>
                  <p>
                    <a
                      href={item.href}
                      {...(item.external && { target: '_blank', rel: 'noopener' })}
                    >
                      {item.text}
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="contact-form">
            <h3>Send a Message</h3>
            <form id="contact-form" action="https://formspree.io/f/xblywejw" method="POST" onSubmit={handleSubmit}>
              {formFields.map((field) => (
                <div key={field.id} className="form-group">
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.id}
                      name={field.name}
                      placeholder={field.placeholder}
                      rows={field.rows}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      required
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      required
                    />
                  )}
                </div>
              ))}
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin /> Sending...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} /> Send Message
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
