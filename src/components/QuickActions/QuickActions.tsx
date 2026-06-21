import { useState } from 'react';
import Icon from '../Icon/Icon';
import { faPlus, faTimes, faEnvelope, faDownload, faCalendar } from '@fortawesome/free-solid-svg-icons';

const QuickActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions: { href: string; icon: typeof faEnvelope; tooltip: string; external?: boolean; download?: boolean }[] = [
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
      <button type="button"
        className="quick-action-toggle"
        id="quickActionToggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close quick actions' : 'Open quick actions'}
        data-tooltip={!isOpen ? 'Quick Actions' : undefined}
      >
        <Icon icon={isOpen ? faTimes : faPlus} aria-hidden="true" />
      </button>
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
            <Icon icon={action.icon} aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
