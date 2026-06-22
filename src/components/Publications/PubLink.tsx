import type {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon/Icon';
import {faArrowUpRightFromSquare} from '@fortawesome/free-solid-svg-icons';

interface PubLinkProps {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: IconDefinition;
}

// External-style publication link: renders an anchor when href is given,
// otherwise an action button (e.g. copy BibTeX).
const PubLink = ({label, href, onClick, icon}: PubLinkProps) => {
  const content = (
    <>
      <Icon icon={icon ?? faArrowUpRightFromSquare} size="xs" />
      {label}
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
