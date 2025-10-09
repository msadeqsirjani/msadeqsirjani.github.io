import { useState, useEffect } from 'react';
import './OfflineIndicator.css';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowMessage(true);
      // Hide the "back online" message after 3 seconds
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

  // Don't show anything if online and no recent status change
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
            <i className="fas fa-wifi-slash"></i>
            <span>You're offline. Some features may be unavailable.</span>
          </>
        ) : (
          <>
            <i className="fas fa-wifi"></i>
            <span>Back online!</span>
          </>
        )}
      </div>
    </div>
  );
};

export default OfflineIndicator;
