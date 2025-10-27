import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faGraduationCap, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faOrcid, faResearchgate } from '@fortawesome/free-brands-svg-icons';
import { useScrollManager } from '../../hooks/useScrollManager';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [scrollVisible, setScrollVisible] = useState(false);

  // Use centralized scroll manager
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
                <li><a href="#home" onClick={(e) => scrollToSection(e, 'home')}>Home</a></li>
                <li><a href="#research" onClick={(e) => scrollToSection(e, 'research')}>Research</a></li>
                <li><a href="#publications" onClick={(e) => scrollToSection(e, 'publications')}>Publications</a></li>
                <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Connect & Follow</h4>
              <div className="footer-social">
                <a href="mailto:mohammadsadegh.sirjani@utsa.edu" target="_blank" rel="noopener" data-tooltip="Email">
                  <FontAwesomeIcon icon={faEnvelope} />
                </a>
                <a href="https://scholar.google.com/citations?user=EI5DizMAAAAJ&hl=en" target="_blank" rel="noopener" data-tooltip="Google Scholar">
                  <FontAwesomeIcon icon={faGraduationCap} />
                </a>
                <a href="https://www.linkedin.com/in/msadeqsirjani" target="_blank" rel="noopener" data-tooltip="LinkedIn">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="https://github.com/msadeqsirjani" target="_blank" rel="noopener" data-tooltip="GitHub">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a href="https://orcid.org/0009-0000-5146-0216" target="_blank" rel="noopener" data-tooltip="ORCID">
                  <FontAwesomeIcon icon={faOrcid} />
                </a>
                <a href="https://www.researchgate.net/profile/Mohammad-Sadegh-Sirjani" target="_blank" rel="noopener" data-tooltip="ResearchGate">
                  <FontAwesomeIcon icon={faResearchgate} />
                </a>
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
