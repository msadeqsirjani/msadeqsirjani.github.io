import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faEnvelope, faDownload, faCalendar } from '@fortawesome/free-solid-svg-icons';

const QuickActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="quick-actions">
      <div
        className="quick-action-toggle"
        id="quickActionToggle"
        onClick={() => setIsOpen(!isOpen)}
        data-tooltip={!isOpen ? 'Quick Actions' : undefined}
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faPlus} aria-hidden="true" />
      </div>
      <div className={`quick-action-menu ${isOpen ? 'active' : ''}`} id="quickActionMenu">
        <a href="mailto:mohammadsadegh.sirjani@utsa.edu" className="quick-action-btn" data-tooltip="Send Email">
          <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
        </a>
        <a href="/assets/docs/cv/msadeqsirjani-cv.pdf" className="quick-action-btn" download data-tooltip="Download CV">
          <FontAwesomeIcon icon={faDownload} aria-hidden="true" />
        </a>
        <a href="https://calendly.com/msadeqsirjani/meeting" className="quick-action-btn" target="_blank" rel="noopener" data-tooltip="Schedule Meeting">
          <FontAwesomeIcon icon={faCalendar} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};

export default QuickActions;
