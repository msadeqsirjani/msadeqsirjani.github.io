import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import ReadingProgress from './components/ReadingProgress/ReadingProgress';
import PullToRefresh from './components/PullToRefresh/PullToRefresh';
import QuickActions from './components/QuickActions/QuickActions';

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
    <>
      <a href="#main-content" className="skip-to-content">Skip to main content</a>
      <PullToRefresh />
      <Navbar />
      <ReadingProgress />
      <main id="main-content" role="main" aria-label="Main content">
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <Biography />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Education />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ResearchInterests />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ResearchExperience />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Publications />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Teaching />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <News />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Awards />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <QuickActions />
    </>
  );
}

export default App;
