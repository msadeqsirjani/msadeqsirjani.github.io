import { trackCVDownload, trackExternalLink } from '../../utils/analytics';

const Hero = () => {
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
              <a href="/assets/docs/cv/msadeqsirjani-cv.pdf" className="btn btn-primary" download onClick={() => trackCVDownload()}>
                <i className="fas fa-download"></i> Download CV
              </a>
              <a href="#contact" className="btn btn-secondary">
                <i className="fas fa-envelope"></i> Contact
              </a>
            </div>

            <div className="social-links">
              <a href="mailto:mohammadsadegh.sirjani@utsa.edu" className="social-link" aria-label="Email" data-tooltip="Email">
                <i className="fas fa-envelope"></i>
              </a>
              <a href="https://scholar.google.com/citations?user=EI5DizMAAAAJ&hl=en" className="social-link" aria-label="Google Scholar" target="_blank" rel="noopener" data-tooltip="Google Scholar" onClick={() => trackExternalLink('https://scholar.google.com/citations?user=EI5DizMAAAAJ&hl=en', 'Google Scholar')}>
                <i className="fas fa-graduation-cap"></i>
              </a>
              <a href="https://www.linkedin.com/in/msadeqsirjani" className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener" data-tooltip="LinkedIn" onClick={() => trackExternalLink('https://www.linkedin.com/in/msadeqsirjani', 'LinkedIn')}>
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://github.com/msadeqsirjani" className="social-link" aria-label="GitHub" target="_blank" rel="noopener" data-tooltip="GitHub" onClick={() => trackExternalLink('https://github.com/msadeqsirjani', 'GitHub')}>
                <i className="fab fa-github"></i>
              </a>
              <a href="https://orcid.org/0009-0000-5146-0216" className="social-link" aria-label="ORCID" target="_blank" rel="noopener" data-tooltip="ORCID" onClick={() => trackExternalLink('https://orcid.org/0009-0000-5146-0216', 'ORCID')}>
                <i className="fab fa-orcid"></i>
              </a>
              <a href="https://www.researchgate.net/profile/Mohammad-Sadegh-Sirjani" className="social-link" aria-label="ResearchGate" target="_blank" rel="noopener" data-tooltip="ResearchGate" onClick={() => trackExternalLink('https://www.researchgate.net/profile/Mohammad-Sadegh-Sirjani', 'ResearchGate')}>
                <i className="fab fa-researchgate"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
