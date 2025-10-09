import { useEffect } from 'react';
import './NotFound.css';

const NotFound = () => {
  useEffect(() => {
    document.title = '404 - Page Not Found | Mohammad Sadegh Sirjani';
  }, []);

  const goHome = () => {
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="not-found">
      <div className="not-found-content">
        <div className="not-found-icon">404</div>
        <h1>Page Not Found</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <p className="not-found-suggestion">
          It might have been moved or deleted, or you may have mistyped the URL.
        </p>
        <div className="not-found-actions">
          <button onClick={goHome} className="btn btn-primary">
            <i className="fas fa-home"></i> Go Home
          </button>
          <a href="#publications" className="btn btn-secondary">
            <i className="fas fa-book"></i> View Publications
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
