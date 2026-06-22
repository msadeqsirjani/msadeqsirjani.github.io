import Icon from '../Icon/Icon';
import {faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons';

interface PubLinkProps {
  label: string;
  href?: string;
  onClick?: () => void;
}

// External-style publication link: renders an anchor when href is given,
// otherwise an action button (e.g. copy BibTeX).
const PubLink = ({label, href, onClick}: PubLinkProps) => {
  const content = (
    <>
      {label} <Icon icon={faExternalLinkAlt} size="xs" />
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="pub-text-link doi-link"
        target="_blank"
        rel="noopener"
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className="pub-text-link doi-link" onClick={onClick}>
      {content}
    </button>
  );
};

export default PubLink;
