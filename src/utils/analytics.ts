type GtagFunction = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFunction;
    dataLayer?: unknown[];
  }
}

const GA_MEASUREMENT_ID = 'G-P3MSKYZ3TB';

export const initAnalytics = () => {
  if (import.meta.env.PROD) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure',
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
  }
};

export const trackPageView = (url: string) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: url,
    });
  }
};

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

export const trackPublicationDownload = (publicationTitle: string) => {
  trackEvent('download', 'Publication', publicationTitle);
};

export const trackCVDownload = () => {
  trackEvent('download', 'CV', 'msadeqsirjani-cv.pdf');
};

export const trackExternalLink = (label: string) => {
  trackEvent('click', 'External Link', label);
};

export const trackContactSubmission = () => {
  trackEvent('submit', 'Contact Form', 'Contact Page');
};

export const trackCitationCopy = (format: string, publicationTitle: string) => {
  trackEvent('copy', 'Citation', `${format} - ${publicationTitle}`);
};

export const trackSearch = (searchTerm: string) => {
  trackEvent('search', 'Publications', searchTerm);
};

export const trackFilter = (filterType: string, filterValue: string) => {
  trackEvent('filter', 'Publications', `${filterType}: ${filterValue}`);
};
