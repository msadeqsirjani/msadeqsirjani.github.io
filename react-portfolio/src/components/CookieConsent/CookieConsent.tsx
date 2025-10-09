import { useState, useEffect } from 'react';
import './CookieConsent.css';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000);
    } else if (consent === 'accepted') {
      // Load analytics if consent was previously given
      loadAnalytics();
    }
  }, []);

  const loadAnalytics = () => {
    // Dynamically import analytics to avoid loading it before consent
    import('../../utils/analytics').then(({ initAnalytics }) => {
      initAnalytics();
    });
  };

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
    loadAnalytics();
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-consent-banner" role="dialog" aria-live="polite" aria-label="Cookie consent">
      <div className="cookie-consent-content">
        <div className="cookie-consent-text">
          <h3>🍪 Cookie Notice</h3>
          <p>
            We use cookies to analyze site traffic and improve your experience. 
            Your data is anonymized and we respect your privacy.
          </p>
        </div>
        <div className="cookie-consent-actions">
          <button 
            onClick={handleAccept} 
            className="btn btn-primary"
            aria-label="Accept cookies"
          >
            Accept
          </button>
          <button 
            onClick={handleDecline} 
            className="btn btn-secondary"
            aria-label="Decline cookies"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
