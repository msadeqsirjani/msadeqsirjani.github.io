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
      <div className="not-found-container">
        <div className="not-found-left">
          <div className="not-found-icon">404</div>
        </div>
        <div className="not-found-right">
          <h1 className="not-found-title">PAGE NOT FOUND</h1>
          <p className="not-found-subtitle">
            LET'S GET YOU BACK TO <a href="#home" onClick={goHome} className="not-found-link">HOMEPAGE</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
