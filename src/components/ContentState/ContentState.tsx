import type {ReactNode} from 'react';
import {
  faFolderOpen,
  faRotateRight,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import Icon from '../Icon/Icon';
import './ContentState.css';

interface ContentStateProps {
  variant: 'empty' | 'error';
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  headingLevel?: 2 | 3;
  compact?: boolean;
  details?: ReactNode;
}

const ContentState = ({
  variant,
  title,
  message,
  actionLabel,
  onAction,
  headingLevel = 2,
  compact = false,
  details,
}: ContentStateProps) => {
  const Heading = headingLevel === 3 ? 'h3' : 'h2';
  const icon = variant === 'error' ? faTriangleExclamation : faFolderOpen;

  return (
    <div
      className={`content-state content-state--${variant}${
        compact ? ' content-state--compact' : ''
      }`}
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
    >
      <span className="content-state-icon" aria-hidden="true">
        <Icon icon={icon} />
      </span>
      <div className="content-state-body">
        <Heading className="content-state-title">{title}</Heading>
        <p className="content-state-message">{message}</p>
        {details}
        {actionLabel && onAction && (
          <button
            type="button"
            className="content-state-action"
            onClick={onAction}
          >
            <Icon icon={faRotateRight} aria-hidden="true" />
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default ContentState;
