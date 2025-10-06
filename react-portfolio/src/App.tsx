import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import ReadingProgress from './components/ReadingProgress/ReadingProgress';
import PullToRefresh from './components/PullToRefresh/PullToRefresh';
import QuickActions from './components/QuickActions/QuickActions';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import AnimatedSection from './components/AnimatedSection/AnimatedSection';

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

// Loading fallback component
const SectionLoader = () => (
  <div style={{
    minHeight: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.6
  }}>
    <div className="loading-spinner"></div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <a href="#main-content" className="skip-to-content">Skip to main content</a>
      <PullToRefresh />
      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>
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
    </ErrorBoundary>
  );
}

export default App;
