import {useMemo, useState} from 'react';
import Icon from '../Icon/Icon';
import {
  faEnvelope,
  faGraduationCap,
  faArrowUp,
  faMapMarkerAlt,
  faUniversity,
} from '@fortawesome/free-solid-svg-icons';
import {
  faLinkedin,
  faGithub,
  faOrcid,
  faResearchgate,
} from '@fortawesome/free-brands-svg-icons';
import {useScrollManager} from '../../hooks/useScrollManager';
import {ROUTE_PATHS} from '../../constants/siteNav';
import {navLinkProps} from '../../utils/router';

const BUILD_TIMESTAMP = Number(__BUILD_TIMESTAMP__);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [scrollVisible, setScrollVisible] = useState(false);

  const lastUpdated = useMemo(() => {
    const ts =
      Number.isFinite(BUILD_TIMESTAMP) && BUILD_TIMESTAMP > 0
        ? BUILD_TIMESTAMP
        : Date.now();
    return new Date(ts).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }, []);

  useScrollManager((_scrollY, scrollPercent) => {
    setScrollVisible(scrollPercent >= 80);
  });

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const quickLinks: {
    id: string;
    label: string;
    path: string;
    anchor?: string;
  }[] = [
    {id: 'home', label: 'Home', path: ROUTE_PATHS.home},
    {id: 'research', label: 'Research', path: ROUTE_PATHS.research},
    {id: 'publications', label: 'Publications', path: ROUTE_PATHS.publications},
  ];

  const contactInfo = [
    {
      icon: faMapMarkerAlt,
      href: 'https://maps.google.com/?q=1+UTSA+Circle,+San+Antonio,+TX+78249',
      text: '1 UT San Antonio Circle, San Antonio, TX 78249',
      external: true,
    },
    {
      icon: faUniversity,
      href: 'https://utsa.edu',
      text: 'University of Texas at San Antonio',
      external: true,
    },
  ];

  const socialLinks = [
    {
      href: 'mailto:mohammadsadegh.sirjani@utsa.edu',
      icon: faEnvelope,
      label: 'Email',
    },
    {
      href: 'https://scholar.google.com/citations?user=EI5DizMAAAAJ&hl=en',
      icon: faGraduationCap,
      label: 'Google Scholar',
    },
    {
      href: 'https://www.linkedin.com/in/msadeqsirjani',
      icon: faLinkedin,
      label: 'LinkedIn',
    },
    {href: 'https://github.com/msadeqsirjani', icon: faGithub, label: 'GitHub'},
    {
      href: 'https://orcid.org/0009-0000-5146-0216',
      icon: faOrcid,
      label: 'ORCID',
    },
    {
      href: 'https://www.researchgate.net/profile/Mohammad-Sadegh-Sirjani',
      icon: faResearchgate,
      label: 'ResearchGate',
    },
  ];

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Mohammad Sadegh Sirjani</h3>
              <p>Ph.D. Student in Computer Science</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                {quickLinks.map(link => (
                  <li key={link.id}>
                    <a {...navLinkProps(link.path, link.anchor)}>
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
                    aria-label={link.label}
                    data-tooltip={link.label}
                  >
                    <Icon icon={link.icon} />
                  </a>
                ))}
              </div>
              <ul className="footer-contact">
                {contactInfo.map((item, idx) => (
                  <li key={idx}>
                    <span className="footer-contact-icon" aria-hidden="true">
                      <Icon icon={item.icon} />
                    </span>
                    <a
                      href={item.href}
                      {...(item.external && {
                        target: '_blank',
                        rel: 'noopener',
                      })}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              &copy; {currentYear} Mohammad Sadegh Sirjani. All rights reserved.
            </p>
            <p className="last-updated">Last updated: {lastUpdated}</p>
          </div>
        </div>
      </footer>

      <button
        type="button"
        className={`scroll-to-top ${scrollVisible ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        data-tooltip="Back to top"
      >
        <Icon icon={faArrowUp} />
      </button>
    </>
  );
};

export default Footer;
