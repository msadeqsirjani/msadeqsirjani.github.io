import Icon from '../Icon/Icon';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';

interface PubToggleProps {
  label: string;
  expanded: boolean;
  onToggle: () => void;
}

const PubToggle = ({label, expanded, onToggle}: PubToggleProps) => (
  <button
    type="button"
    className="pub-text-link pub-toggle"
    onClick={onToggle}
    aria-expanded={expanded}
  >
    {label} <Icon icon={expanded ? faChevronUp : faChevronDown} size="xs" />
  </button>
);

export default PubToggle;
