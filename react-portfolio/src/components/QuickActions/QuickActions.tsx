import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faEnvelope, faDownload, faCalendar } from '@fortawesome/free-solid-svg-icons';

const QuickActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      href: 'mailto:mohammadsadegh.sirjani@utsa.edu',
      icon: faEnvelope,
      tooltip: 'Send Email'
    },
    {
      href: '/assets/docs/cv/msadeqsirjani-cv.pdf',
      icon: faDownload,
      tooltip: 'Download CV',
      download: true
    },
    {
      href: 'https://calendly.com/msadeqsirjani/meeting',
      icon: faCalendar,
      tooltip: 'Schedule Meeting',
      external: true
    }
  ];

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
        {actions.map((action, idx) => (
          <a
            key={idx}
            href={action.href}
            className="quick-action-btn"
            data-tooltip={action.tooltip}
            {...(action.download && { download: true })}
            {...(action.external && { target: '_blank', rel: 'noopener' })}
          >
            <FontAwesomeIcon icon={action.icon} aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
