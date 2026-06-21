import { useState, useEffect } from 'react';
import './CookieConsent.css';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setTimeout(() => setShowBanner(true), 1000);
    } else if (consent === 'accepted') {
      loadAnalytics();
    }
  }, []);

  const loadAnalytics = () => {
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
          <h3>Cookie Notice</h3>
          <p>
            We use cookies to analyze site traffic and improve your experience. 
            Your data is anonymized and we respect your privacy.
          </p>
        </div>
        <div className="cookie-consent-actions">
          <button type="button" 
            onClick={handleAccept} 
            className="btn btn-primary"
            aria-label="Accept cookies"
          >
            Accept
          </button>
          <button type="button" 
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
