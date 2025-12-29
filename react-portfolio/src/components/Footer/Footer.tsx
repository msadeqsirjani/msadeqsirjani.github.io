import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faGraduationCap, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faOrcid, faResearchgate } from '@fortawesome/free-brands-svg-icons';
import { useScrollManager } from '../../hooks/useScrollManager';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [scrollVisible, setScrollVisible] = useState(false);

  useScrollManager((_scrollY, scrollPercent) => {
    setScrollVisible(scrollPercent >= 80);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'research', label: 'Research' },
    { id: 'publications', label: 'Publications' },
    { id: 'contact', label: 'Contact' }
  ];

  const socialLinks = [
    { href: 'mailto:mohammadsadegh.sirjani@utsa.edu', icon: faEnvelope, label: 'Email' },
    { href: 'https://scholar.google.com/citations?user=EI5DizMAAAAJ&hl=en', icon: faGraduationCap, label: 'Google Scholar' },
    { href: 'https://www.linkedin.com/in/msadeqsirjani', icon: faLinkedin, label: 'LinkedIn' },
    { href: 'https://github.com/msadeqsirjani', icon: faGithub, label: 'GitHub' },
    { href: 'https://orcid.org/0009-0000-5146-0216', icon: faOrcid, label: 'ORCID' },
    { href: 'https://www.researchgate.net/profile/Mohammad-Sadegh-Sirjani', icon: faResearchgate, label: 'ResearchGate' }
  ];

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Mohammad Sadegh Sirjani</h3>
              <p>Ph.D. Student in Computer Science</p>
              <p>University of Texas at San Antonio</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                {quickLinks.map(link => (
                  <li key={link.id}>
                    <a href={`#${link.id}`} onClick={(e) => scrollToSection(e, link.id)}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-section">
              <h4>Connect & Follow</h4>
              <div className="footer-social">
                {socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener"
                    data-tooltip={link.label}
                  >
                    <FontAwesomeIcon icon={link.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {currentYear} Mohammad Sadegh Sirjani. All rights reserved.</p>
            <p className="last-updated">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </div>
      </footer>

      <button
        className={`scroll-to-top ${scrollVisible ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        data-tooltip="Back to top"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </>
  );
};

export default Footer;
