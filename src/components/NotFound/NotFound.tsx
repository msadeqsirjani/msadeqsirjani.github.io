import {useEffect} from 'react';
import './NotFound.css';
import {ROUTE_PATHS} from '../../constants/siteNav';
import {navLinkProps} from '../../utils/router';

const quickLinks: {label: string; path: string; anchor?: string}[] = [
  {label: 'About', path: ROUTE_PATHS.home, anchor: 'biography'},
  {label: 'Publications', path: ROUTE_PATHS.publications},
  {label: 'Research', path: ROUTE_PATHS.research},
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
          The page you're looking for doesn't exist or may have been moved.
          <br />
          Check the URL, or navigate back to the portfolio.
        </p>

        <div className="nf-actions">
          <a
            className="nf-btn nf-btn-primary"
            {...navLinkProps(ROUTE_PATHS.home)}
          >
            &#8592; Back to portfolio
          </a>
        </div>

        <div className="nf-divider" />

        <p className="nf-links-label">Quick Links</p>
        <ul className="nf-links-list">
          {quickLinks.map(({label, path, anchor}) => (
            <li key={label}>
              <a {...navLinkProps(path, anchor)}>
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
