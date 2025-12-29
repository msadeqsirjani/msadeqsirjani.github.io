import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEnvelope, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faOrcid, faResearchgate } from '@fortawesome/free-brands-svg-icons';
import { trackCVDownload, trackExternalLink } from '../../utils/analytics';

const Hero = () => {
  const buttons = [
    { href: '/assets/docs/cv/msadeqsirjani-cv.pdf', icon: faDownload, label: 'Download CV', primary: true, download: true, onClick: trackCVDownload },
    { href: '#contact', icon: faEnvelope, label: 'Contact', primary: false }
  ];

  const socialLinks = [
    { href: 'mailto:mohammadsadegh.sirjani@utsa.edu', icon: faEnvelope, label: 'Email', tooltip: 'Email' },
    { href: 'https://scholar.google.com/citations?user=EI5DizMAAAAJ&hl=en', icon: faGraduationCap, label: 'Google Scholar', tooltip: 'Google Scholar' },
    { href: 'https://www.linkedin.com/in/msadeqsirjani', icon: faLinkedin, label: 'LinkedIn', tooltip: 'LinkedIn' },
    { href: 'https://github.com/msadeqsirjani', icon: faGithub, label: 'GitHub', tooltip: 'GitHub' },
    { href: 'https://orcid.org/0009-0000-5146-0216', icon: faOrcid, label: 'ORCID', tooltip: 'ORCID' },
    { href: 'https://www.researchgate.net/profile/Mohammad-Sadegh-Sirjani', icon: faResearchgate, label: 'ResearchGate', tooltip: 'ResearchGate' }
  ];

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-left">
            <div className="profile-image">
              <picture>
                <source
                  srcSet="/assets/img/profile.webp"
                  type="image/webp"
                  sizes="(max-width: 480px) 180px, (max-width: 768px) 200px, 280px"
                />
                <source
                  srcSet="/assets/img/profile.jpg"
                  type="image/jpeg"
                  sizes="(max-width: 480px) 180px, (max-width: 768px) 200px, 280px"
                />
                <img
                  src="/assets/img/profile.jpg"
                  alt="Mohammad Sadegh Sirjani - Ph.D. Student in Computer Science"
                  loading="eager"
                  width="280"
                  height="280"
                  decoding="async"
                />
              </picture>
            </div>
          </div>
          <div className="hero-right">
            <h1 className="hero-title">Mohammad Sadegh Sirjani</h1>
            <h2 className="hero-subtitle">Ph.D. Student in Computer Science</h2>
            <p className="hero-institution">University of Texas at San Antonio</p>
            <p className="hero-tagline">TinyAI & Embedded Systems Researcher</p>

            <div className="hero-buttons">
              {buttons.map((btn, idx) => (
                <a
                  key={idx}
                  href={btn.href}
                  className={`btn ${btn.primary ? 'btn-primary' : 'btn-secondary'}`}
                  {...(btn.download && { download: true })}
                  {...(btn.onClick && { onClick: () => btn.onClick() })}
                >
                  <FontAwesomeIcon icon={btn.icon} /> {btn.label}
                </a>
              ))}
            </div>

            <div className="social-links">
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="social-link"
                  aria-label={link.label}
                  data-tooltip={link.tooltip}
                  {...(!link.href.startsWith('mailto:') && {
                    target: '_blank',
                    rel: 'noopener',
                    onClick: () => trackExternalLink(link.label)
                  })}
                >
                  <FontAwesomeIcon icon={link.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
