import {useMemo, useState} from 'react';
import Icon from '../Icon/Icon';
import {faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {useScrollManager} from '../../hooks/useScrollManager';
import {getAccessibleScrollBehavior} from '../../utils/motion';

const BUILD_TIMESTAMP = Number(__BUILD_TIMESTAMP__);
const FALLBACK_TIMESTAMP = Date.now();

const Footer = () => {
  const [scrollVisible, setScrollVisible] = useState(false);

  const lastUpdated = useMemo(() => {
    const ts =
      Number.isFinite(BUILD_TIMESTAMP) && BUILD_TIMESTAMP > 0
        ? BUILD_TIMESTAMP
        : FALLBACK_TIMESTAMP;
    return new Date(ts).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }, []);

  useScrollManager((_scrollY, scrollPercent) => {
    setScrollVisible(scrollPercent >= 80);
  });

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: getAccessibleScrollBehavior()});
  };

  return (
    <>
      <footer className="footer">
        <p className="footer-meta">
          Last updated: <time>{lastUpdated}</time>
        </p>
      </footer>

      <button
        type="button"
        className={`scroll-to-top ${scrollVisible ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        data-tooltip="Back to top"
      >
        <Icon icon={faArrowUp} />
      </button>
    </>
  );
};

export default Footer;
