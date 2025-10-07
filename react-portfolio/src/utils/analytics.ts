// Privacy-friendly analytics utility
// Supports Google Analytics with privacy enhancements

type GtagFunction = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFunction;
    dataLayer?: unknown[];
  }
}

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = 'G-P3MSKYZ3TB';

export const initAnalytics = () => {
  if (import.meta.env.PROD) {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };

    window.gtag('js', new Date());

    // Configure with privacy-friendly settings
    window.gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true, // Anonymize IP addresses
      cookie_flags: 'SameSite=None;Secure', // Cookie security
      allow_google_signals: false, // Disable Google Signals
      allow_ad_personalization_signals: false, // Disable ad personalization
    });
  }
};

// Track page views
export const trackPageView = (url: string) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: url,
    });
  }
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track publication downloads
export const trackPublicationDownload = (publicationTitle: string) => {
  trackEvent('download', 'Publication', publicationTitle);
};

// Track CV downloads
export const trackCVDownload = () => {
  trackEvent('download', 'CV', 'msadeqsirjani-cv.pdf');
};

// Track external link clicks
export const trackExternalLink = (_url: string, label: string) => {
  trackEvent('click', 'External Link', label);
};

// Track contact form submissions
export const trackContactSubmission = () => {
  trackEvent('submit', 'Contact Form', 'Contact Page');
};

// Track citation copies
export const trackCitationCopy = (format: string, publicationTitle: string) => {
  trackEvent('copy', 'Citation', `${format} - ${publicationTitle}`);
};

// Track search usage
export const trackSearch = (searchTerm: string) => {
  trackEvent('search', 'Publications', searchTerm);
};

// Track filter usage
export const trackFilter = (filterType: string, filterValue: string) => {
  trackEvent('filter', 'Publications', `${filterType}: ${filterValue}`);
};
