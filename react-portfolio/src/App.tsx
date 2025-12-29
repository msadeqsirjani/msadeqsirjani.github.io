import { lazy, Suspense, useState, useEffect } from 'react';
import type { LazyExoticComponent, ComponentType } from 'react';
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
const NotFound = lazy(() => import('./components/NotFound/NotFound'));

type LazyComponent = LazyExoticComponent<ComponentType<any>>;

interface LazySection {
  key: string;
  Component: LazyComponent;
  delay?: number;
}

const DEFAULT_SECTION_DELAY = 100;

const lazySections: LazySection[] = [
  { key: 'biography', Component: Biography, delay: 0 },
  { key: 'education', Component: Education },
  { key: 'research-interests', Component: ResearchInterests },
  { key: 'research-experience', Component: ResearchExperience },
  { key: 'publications', Component: Publications },
  { key: 'teaching', Component: Teaching },
  { key: 'news', Component: News },
  { key: 'awards', Component: Awards },
  { key: 'contact', Component: Contact },
];

const SectionLoader = () => (
  <div style={{ padding: '2rem 0' }}>
    <div className="container">
      <SkeletonLoader type="publication" count={3} />
    </div>
  </div>
);

function App() {
  const [show404, setShow404] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const validRoutes = [
      '',
      '#',
      '#home',
      '#biography',
      '#education',
      '#research',
      '#research-interests',
      '#publications',
      '#teaching',
      '#news',
      '#awards',
      '#contact',
    ];

    const checkRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const isValid = validRoutes.includes(hash);
      setShow404(!isValid && hash !== '');
    };

    checkRoute();
    window.addEventListener('hashchange', checkRoute);

    return () => window.removeEventListener('hashchange', checkRoute);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (show404) {
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
        {lazySections.map(({ key, Component, delay }) => (
          <ErrorBoundary key={key}>
            <AnimatedSection delay={delay ?? DEFAULT_SECTION_DELAY}>
              <Suspense fallback={<SectionLoader />}>
                <Component />
              </Suspense>
            </AnimatedSection>
          </ErrorBoundary>
        ))}
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
