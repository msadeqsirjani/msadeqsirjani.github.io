# Analytics Setup Guide

This project includes privacy-friendly Google Analytics integration.

## Setup Instructions

### 1. Get Your Google Analytics ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property for your website
3. Get your **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Update Analytics Configuration

Open `src/utils/analytics.ts` and replace the placeholder:

```typescript
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 ID
```

**Example:**
```typescript
const GA_MEASUREMENT_ID = 'G-ABC123DEF4'; // Your actual ID
```

### 3. Deploy

Analytics only runs in production mode. After deployment, verify it's working:

1. Open Google Analytics dashboard
2. Go to **Realtime** → **Overview**
3. Visit your deployed site
4. You should see your visit appear in real-time

## Privacy Features

The analytics implementation includes these privacy enhancements:

✅ **IP Anonymization** - Anonymizes visitor IP addresses
✅ **No Ad Personalization** - Disables ad personalization signals
✅ **No Google Signals** - Disables cross-device tracking
✅ **Secure Cookies** - Uses SameSite and Secure flags
✅ **Production Only** - Only runs on deployed site, not in development

## Tracked Events

The following events are automatically tracked:

### Downloads
- **CV Download** - When users download your CV
- **Publication PDF** - When users download publication PDFs

### External Links
- **Social Links** - Google Scholar, LinkedIn, GitHub, ORCID, ResearchGate
- **Publication Links** - External publication URLs

### User Interactions
- **Citation Copy** - When users copy citations (BibTeX, APA, MLA, Chicago, IEEE)
- **Contact Form** - When users submit the contact form
- **Search** - When users search publications (available for future implementation)
- **Filters** - When users filter publications (available for future implementation)

## Viewing Analytics Data

### Google Analytics Dashboard

1. **Realtime** - See current visitors
2. **Reports** → **Engagement** → **Events** - See all tracked events
3. **Reports** → **Acquisition** → **Traffic acquisition** - See traffic sources
4. **Reports** → **User** → **Demographics** - See visitor demographics

### Custom Reports

Create custom reports to track:
- Most downloaded publications
- Most copied citation formats
- Most clicked social links
- Contact form conversion rate

## Testing

To test analytics in development:

1. Change `import.meta.env.PROD` to `true` in `src/utils/analytics.ts` (temporarily)
2. Run `npm run preview` to test the production build
3. Open browser DevTools → Network tab
4. Look for requests to `google-analytics.com`
5. Remember to revert the change before committing

## GDPR Compliance

This setup is privacy-friendly but you should:

1. Add a **Privacy Policy** page
2. Inform users about analytics in your privacy policy
3. Consider adding a cookie consent banner (optional but recommended)

## Alternative: Privacy-Focused Analytics

If you prefer not to use Google Analytics, consider these alternatives:

- **Plausible** - Simple, privacy-friendly, EU-hosted
- **Umami** - Open-source, self-hosted
- **Fathom** - Privacy-first, GDPR compliant
- **Simple Analytics** - Privacy-focused, no cookies

## Need Help?

- [Google Analytics Help](https://support.google.com/analytics)
- [GA4 Property Setup](https://support.google.com/analytics/answer/9304153)
- [Event Tracking Guide](https://developers.google.com/analytics/devguides/collection/ga4/events)
