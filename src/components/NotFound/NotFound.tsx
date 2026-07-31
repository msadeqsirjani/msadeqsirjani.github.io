import './NotFound.css';
import {ROUTE_PATHS} from '../../constants/siteNav';
import {navLinkProps} from '../../utils/router';
import Icon from '../Icon/Icon';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';

const quickLinks: {label: string; path: string; anchor?: string}[] = [
  {label: 'About', path: ROUTE_PATHS.home, anchor: 'biography'},
  {label: 'Publications', path: ROUTE_PATHS.publications},
  {label: 'Research', path: ROUTE_PATHS.research},
];

const NotFound = () => {
  return (
    <main
      id="main-content"
      className="nf-page route-enter"
      role="main"
      aria-label="Page not found"
      tabIndex={-1}
    >
      <div className="nf-container">
        <p className="nf-error-label">404 error</p>
        <h1 className="section-title page-title nf-title">Page not found</h1>
        <p className="nf-desc">
          The page you're looking for does not exist or may have moved. Check
          the address, or return to the portfolio.
        </p>

        <div className="nf-actions">
          <a
            className="nf-btn nf-btn-primary"
            {...navLinkProps(ROUTE_PATHS.home)}
          >
            <Icon icon={faArrowLeft} aria-hidden="true" />
            Back to portfolio
          </a>
        </div>

        <nav className="nf-suggestions" aria-labelledby="nf-links-heading">
          <h2 id="nf-links-heading" className="nf-links-label">
            Explore
          </h2>
          <ul className="nf-links-list">
            {quickLinks.map(({label, path, anchor}) => (
              <li key={label}>
                <a {...navLinkProps(path, anchor)}>
                  {label}
                  <span className="nf-arrow" aria-hidden="true">
                    <Icon icon={faArrowRight} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
};

export default NotFound;
