import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import './OfflineIndicator.css';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowMessage(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showMessage) return null;

  return (
    <div
      className={`offline-indicator ${!isOnline ? 'offline' : 'online'} ${showMessage ? 'visible' : ''}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="offline-indicator-content">
        {!isOnline ? (
          <>
            <FontAwesomeIcon icon={faWifi} style={{ textDecoration: 'line-through' }} />
            <span className="offline-text-desktop">You're offline. Some features may be unavailable.</span>
            <span className="offline-text-mobile">You're offline</span>
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faWifi} />
            <span>Back online!</span>
          </>
        )}
      </div>
    </div>
  );
};

export default OfflineIndicator;
