import {lazy, Suspense, useState, useEffect} from 'react';
import type {LazyExoticComponent, ComponentType} from 'react';
import {ThemeProvider} from './context/ThemeContext';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import AnimatedSection from './components/AnimatedSection/AnimatedSection';
import SkeletonLoader from './components/SkeletonLoader/SkeletonLoader';
import DeferredIdle from './components/DeferredIdle/DeferredIdle';
import DeferredToaster from './components/DeferredToaster/DeferredToaster';
import LazyGlobalSearch from './components/LazyGlobalSearch/LazyGlobalSearch';
import PageShell from './components/PageShell/PageShell';
import type {RouteKey} from './constants/siteNav';
import {routeKeyForPath} from './constants/siteNav';
import {subscribeRoute} from './utils/router';

const ReadingProgress = lazy(
  () => import('./components/ReadingProgress/ReadingProgress'),
);
const PullToRefresh = lazy(
  () => import('./components/PullToRefresh/PullToRefresh'),
);
const QuickActions = lazy(
  () => import('./components/QuickActions/QuickActions'),
);
const OfflineIndicator = lazy(
  () => import('./components/OfflineIndicator/OfflineIndicator'),
);

const Biography = lazy(() => import('./components/Biography/Biography'));
const Education = lazy(() => import('./components/Education/Education'));
const ResearchPage = lazy(() => import('./components/Research/ResearchPage'));
const Publications = lazy(
  () => import('./components/Publications/Publications'),
);
const PublicationsPage = lazy(
  () => import('./components/Publications/PublicationsPage'),
);
const Teaching = lazy(() => import('./components/Teaching/Teaching'));
const News = lazy(() => import('./components/News/News'));
const Awards = lazy(() => import('./components/Awards/Awards'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const NotFound = lazy(() => import('./components/NotFound/NotFound'));

type LazyComponent = LazyExoticComponent<ComponentType>;

const DEFAULT_SECTION_DELAY = 100;

const SITE_TITLE =
  'Mohammad Sadegh Sirjani - Ph.D. Student in Computer Science | TinyAI & Embedded Systems Researcher';

const PAGE_TITLES: Record<RouteKey, string> = {
  home: SITE_TITLE,
  research: 'Mohammad Sadegh Sirjani | Research',
  education: 'Mohammad Sadegh Sirjani | Education',
  publications: 'Mohammad Sadegh Sirjani | Publications',
  teaching: 'Mohammad Sadegh Sirjani | Teaching',
  news: 'Mohammad Sadegh Sirjani | News',
  awards: 'Mohammad Sadegh Sirjani | Awards',
};

const PAGE_COMPONENTS: Record<Exclude<RouteKey, 'home'>, LazyComponent> = {
  research: ResearchPage,
  education: Education,
  publications: PublicationsPage,
  teaching: Teaching,
  news: News,
  awards: Awards,
};

const SectionLoader = () => (
  <div style={{padding: '2rem 0'}}>
    <div className="container">
      <SkeletonLoader type="publication" count={3} />
    </div>
  </div>
);

const getRouteKey = () => routeKeyForPath(window.location.pathname);

function App() {
  const [routeKey, setRouteKey] = useState<RouteKey | null>(getRouteKey);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => subscribeRoute(() => setRouteKey(getRouteKey())), []);

  useEffect(() => {
    document.title = routeKey ? PAGE_TITLES[routeKey] : SITE_TITLE;
  }, [routeKey]);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '');
    if (routeKey === 'home' && hash) {
      let attempts = 0;
      const tryScroll = () => {
        const el = document.getElementById(hash);
        if (el) {
          const navbar = document.querySelector('.navbar') as HTMLElement;
          const offset = navbar ? navbar.offsetHeight + 24 : 24;
          window.scrollTo({
            top: el.getBoundingClientRect().top + window.scrollY - offset,
            behavior: 'smooth',
          });
        } else if (attempts < 50) {
          attempts += 1;
          setTimeout(tryScroll, 100);
        }
      };
      tryScroll();
    } else {
      window.scrollTo({top: 0, behavior: 'auto'});
    }
  }, [routeKey]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
        e.preventDefault();
        document
          .querySelectorAll('.fade-in-section')
          .forEach(el => el.classList.add('is-visible'));
        const hiddenPubs = document.querySelectorAll<HTMLElement>(
          '.publication-item.hidden-for-show-more',
        );
        hiddenPubs.forEach(el => el.setAttribute('data-print-hidden', 'true'));
        hiddenPubs.forEach(el => el.classList.remove('hidden-for-show-more'));
        window.print();
        window.addEventListener(
          'afterprint',
          () => {
            document
              .querySelectorAll<HTMLElement>('[data-print-hidden]')
              .forEach(el => {
                el.classList.add('hidden-for-show-more');
                el.removeAttribute('data-print-hidden');
              });
          },
          {once: true},
        );
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderMain = () => {
    if (routeKey === null) {
      return (
        <Suspense fallback={<div style={{minHeight: '60vh'}} />}>
          <NotFound />
        </Suspense>
      );
    }

    if (routeKey === 'home') {
      return (
        <main id="main-content" role="main" aria-label="Main content">
          <ErrorBoundary>
            <Hero />
          </ErrorBoundary>
          <ErrorBoundary>
            <AnimatedSection delay={0}>
              <Suspense fallback={<SectionLoader />}>
                <Biography />
              </Suspense>
            </AnimatedSection>
          </ErrorBoundary>
          <ErrorBoundary>
            <AnimatedSection delay={DEFAULT_SECTION_DELAY}>
              <Suspense fallback={<SectionLoader />}>
                <News scrollable />
              </Suspense>
            </AnimatedSection>
          </ErrorBoundary>
          <ErrorBoundary>
            <AnimatedSection delay={DEFAULT_SECTION_DELAY}>
              <Suspense fallback={<SectionLoader />}>
                <Publications />
              </Suspense>
            </AnimatedSection>
          </ErrorBoundary>
        </main>
      );
    }

    const PageComponent = PAGE_COMPONENTS[routeKey];
    return (
      <main id="main-content" role="main" aria-label="Main content">
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <PageShell>
              <PageComponent />
            </PageShell>
          </Suspense>
        </ErrorBoundary>
      </main>
    );
  };

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <DeferredIdle>
          <Suspense fallback={null}>
            <PullToRefresh />
          </Suspense>
        </DeferredIdle>
        <ErrorBoundary>
          <Navbar onSearchClick={() => setIsSearchOpen(true)} />
        </ErrorBoundary>
        <LazyGlobalSearch
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
        <DeferredIdle>
          <Suspense fallback={null}>
            <ReadingProgress />
          </Suspense>
        </DeferredIdle>
        {renderMain()}
        <ErrorBoundary>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </ErrorBoundary>
        <DeferredIdle>
          <Suspense fallback={null}>
            <QuickActions />
          </Suspense>
        </DeferredIdle>
        <DeferredIdle>
          <Suspense fallback={null}>
            <OfflineIndicator />
          </Suspense>
        </DeferredIdle>
        <DeferredToaster
          position="top-center"
          toastOptions={{
            className: 'custom-toast',
            duration: 4000,
            success: {className: 'custom-toast toast-success'},
            error: {className: 'custom-toast toast-error'},
          }}
        />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
