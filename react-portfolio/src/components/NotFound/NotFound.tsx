import { useEffect } from 'react';
import './NotFound.css';

const NotFound = () => {
  useEffect(() => {
    // Check if we're on a 404 page (GitHub Pages redirects all routes to index.html)
    // This is a fallback for handling unknown hash routes
    const hash = window.location.hash;
    if (hash && !isValidRoute(hash)) {
      // Show 404 content
      document.title = '404 - Page Not Found | Mohammad Sadegh Sirjani';
    }
  }, []);

  const isValidRoute = (hash: string): boolean => {
    const validRoutes = [
      '#home',
      '#biography', 
      '#education',
      '#research',
      '#publications',
      '#teaching',
      '#news',
      '#awards',
      '#contact'
    ];
    return validRoutes.includes(hash.toLowerCase()) || hash === '';
  };

  const goHome = () => {
    window.location.hash = '#home';
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
