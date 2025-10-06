import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Biography from './components/Biography/Biography';
import Education from './components/Education/Education';
import ResearchInterests from './components/Research/ResearchInterests';
import ResearchExperience from './components/Research/ResearchExperience';
import Publications from './components/Publications/Publications';
import Teaching from './components/Teaching/Teaching';
import News from './components/News/News';
import Awards from './components/Awards/Awards';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ReadingProgress from './components/ReadingProgress/ReadingProgress';
import PullToRefresh from './components/PullToRefresh/PullToRefresh';
import QuickActions from './components/QuickActions/QuickActions';

function App() {
  return (
    <>
      <PullToRefresh />
      <Navbar />
      <ReadingProgress />
      <main id="main-content" role="main" aria-label="Main content">
        <Hero />
        <Biography />
        <Education />
        <ResearchInterests />
        <ResearchExperience />
        <Publications />
        <Teaching />
        <News />
        <Awards />
        <Contact />
      </main>
      <Footer />
      <QuickActions />
    </>
  );
}

export default App;
