import { useEffect } from 'react';
import './NotFound.css';

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Publications', href: '#publications' },
  { label: 'Research Experience', href: '#research' },
  { label: 'Contact', href: '#contact' },
];

const NotFound = () => {
  useEffect(() => {
    document.title = '404 - Page Not Found | Mohammad Sadegh Sirjani';
  }, []);

  return (
    <main className="nf-page">
      <div className="nf-container">
        <h1 className="nf-code">404</h1>
        <h2 className="nf-title">Page not found</h2>
        <p className="nf-desc">
          The page you're looking for doesn't exist or may have been moved.<br />
          Check the URL, or navigate back to the portfolio.
        </p>

        <div className="nf-actions">
          <a className="nf-btn nf-btn-primary" href="#home">
            &#8592; Back to portfolio
          </a>
          <a className="nf-btn nf-btn-secondary" href="#contact">
            Contact me
          </a>
        </div>

        <div className="nf-divider" />

        <p className="nf-links-label">Quick Links</p>
        <ul className="nf-links-list">
          {quickLinks.map(({ label, href }) => (
            <li key={href}>
              <a href={href}>
                {label}
                <span className="nf-arrow">&#8594;</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default NotFound;
