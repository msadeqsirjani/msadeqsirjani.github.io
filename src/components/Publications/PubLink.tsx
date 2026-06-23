import type {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon/Icon';
import {faArrowUpRightFromSquare} from '@fortawesome/free-solid-svg-icons';

interface PubLinkProps {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: IconDefinition;
  variant?: 'github' | 'doi' | 'paper' | 'bibtex';
}

const PubLink = ({label, href, onClick, icon, variant}: PubLinkProps) => {
  const className = `pub-text-link doi-link${
    variant ? ` pub-${variant}-link` : ''
  }`;

  const content = (
    <>
      <Icon icon={icon ?? faArrowUpRightFromSquare} size="lg" />
      {label}
    </>
  );

  if (href) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener">
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {content}
    </button>
  );
};

export default PubLink;
