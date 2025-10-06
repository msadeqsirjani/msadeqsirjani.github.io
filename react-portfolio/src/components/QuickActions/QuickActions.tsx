import { useState } from 'react';

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
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-plus'}`} aria-hidden="true"></i>
      </div>
      <div className={`quick-action-menu ${isOpen ? 'active' : ''}`} id="quickActionMenu">
        <a href="mailto:mohammadsadegh.sirjani@utsa.edu" className="quick-action-btn" data-tooltip="Send Email">
          <i className="fas fa-envelope" aria-hidden="true"></i>
        </a>
        <a href="/assets/docs/cv/msadeqsirjani-cv.pdf" className="quick-action-btn" download data-tooltip="Download CV">
          <i className="fas fa-download" aria-hidden="true"></i>
        </a>
        <a href="https://calendly.com/msadeqsirjani/meeting" className="quick-action-btn" target="_blank" rel="noopener" data-tooltip="Schedule Meeting">
          <i className="fas fa-calendar" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  );
};

export default QuickActions;
