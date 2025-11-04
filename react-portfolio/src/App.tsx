import { lazy, Suspense } from 'react';
import * as React from 'react';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import ReadingProgress from './components/ReadingProgress/ReadingProgress';
import PullToRefresh from './components/PullToRefresh/PullToRefresh';
import QuickActions from './components/QuickActions/QuickActions';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import AnimatedSection from './components/AnimatedSection/AnimatedSection';
import SkeletonLoader from './components/SkeletonLoader/SkeletonLoader';
import CookieConsent from './components/CookieConsent/CookieConsent';
import OfflineIndicator from './components/OfflineIndicator/OfflineIndicator';
import GlobalSearch from './components/GlobalSearch/GlobalSearch';

// Lazy load components below the fold
const Biography = lazy(() => import('./components/Biography/Biography'));
const Education = lazy(() => import('./components/Education/Education'));
const ResearchInterests = lazy(() => import('./components/Research/ResearchInterests'));
const ResearchExperience = lazy(() => import('./components/Research/ResearchExperience'));
const Publications = lazy(() => import('./components/Publications/Publications'));
const Teaching = lazy(() => import('./components/Teaching/Teaching'));
const News = lazy(() => import('./components/News/News'));
const Awards = lazy(() => import('./components/Awards/Awards'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const Footer = lazy(() => import('./components/Footer/Footer'));

// Loading fallback component with skeleton
const SectionLoader = () => (
  <div style={{ padding: '2rem 0' }}>
    <div className="container">
      <SkeletonLoader type="publication" count={3} />
    </div>
  </div>
);

function App() {
  const [show404, setShow404] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  React.useEffect(() => {
    // Valid hash routes
    const validRoutes = [
      '', '#', '#home', '#biography', '#education', '#research',
      '#publications', '#teaching', '#news', '#awards', '#contact'
    ];

    const checkRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const isValid = validRoutes.includes(hash);
      setShow404(!isValid && hash !== '');
    };

    // Check on mount and hash change
    checkRoute();
    window.addEventListener('hashchange', checkRoute);

    return () => window.removeEventListener('hashchange', checkRoute);
  }, []);

  // Global search keyboard shortcut (Cmd/Ctrl + K)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Show 404 page for invalid routes
  if (show404) {
    const NotFound = lazy(() => import('./components/NotFound/NotFound'));
    return (
      <ErrorBoundary>
        <Navbar onSearchClick={() => setIsSearchOpen(true)} />
        <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
          <NotFound />
        </Suspense>
        <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <CookieConsent />
        <OfflineIndicator />
        <Toaster
          position="bottom-left"
          closeButton
          expand={false}
          toastOptions={{
            className: 'custom-toast',
          }}
        />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <a href="#main-content" className="skip-to-content">Skip to main content</a>
      <PullToRefresh />
      <ErrorBoundary>
        <Navbar onSearchClick={() => setIsSearchOpen(true)} />
      </ErrorBoundary>
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ReadingProgress />
      <main id="main-content" role="main" aria-label="Main content">
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>
        <ErrorBoundary>
          <AnimatedSection>
            <Suspense fallback={<SectionLoader />}>
              <Biography />
            </Suspense>
          </AnimatedSection>
        </ErrorBoundary>
        <ErrorBoundary>
          <AnimatedSection delay={100}>
            <Suspense fallback={<SectionLoader />}>
              <Education />
            </Suspense>
          </AnimatedSection>
        </ErrorBoundary>
        <ErrorBoundary>
          <AnimatedSection delay={100}>
            <Suspense fallback={<SectionLoader />}>
              <ResearchInterests />
            </Suspense>
          </AnimatedSection>
        </ErrorBoundary>
        <ErrorBoundary>
          <AnimatedSection delay={100}>
            <Suspense fallback={<SectionLoader />}>
              <ResearchExperience />
            </Suspense>
          </AnimatedSection>
        </ErrorBoundary>
        <ErrorBoundary>
          <AnimatedSection delay={100}>
            <Suspense fallback={<SectionLoader />}>
              <Publications />
            </Suspense>
          </AnimatedSection>
        </ErrorBoundary>
        <ErrorBoundary>
          <AnimatedSection delay={100}>
            <Suspense fallback={<SectionLoader />}>
              <Teaching />
            </Suspense>
          </AnimatedSection>
        </ErrorBoundary>
        <ErrorBoundary>
          <AnimatedSection delay={100}>
            <Suspense fallback={<SectionLoader />}>
              <News />
            </Suspense>
          </AnimatedSection>
        </ErrorBoundary>
        <ErrorBoundary>
          <AnimatedSection delay={100}>
            <Suspense fallback={<SectionLoader />}>
              <Awards />
            </Suspense>
          </AnimatedSection>
        </ErrorBoundary>
        <ErrorBoundary>
          <AnimatedSection delay={100}>
            <Suspense fallback={<SectionLoader />}>
              <Contact />
            </Suspense>
          </AnimatedSection>
        </ErrorBoundary>
      </main>
      <ErrorBoundary>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <QuickActions />
      </ErrorBoundary>
      <CookieConsent />
      <OfflineIndicator />
      <Toaster
        position="bottom-left"
        closeButton
        expand={false}
      />
    </ErrorBoundary>
  );
}

export default App;
