import type {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon/Icon';
import {faArrowUpRightFromSquare} from '@fortawesome/free-solid-svg-icons';

type PubLinkVariant = 'github' | 'doi' | 'paper' | 'bibtex';

interface PubLinkProps {
  label: string;
  href?: string | undefined;
  onClick?: () => void;
  icon?: IconDefinition;
  variant?: PubLinkVariant;
  ariaExpanded?: boolean;
}

const VARIANT_CLASS: Record<PubLinkVariant, string> = {
  github: 'pub-github-link',
  doi: 'pub-doi-link',
  paper: 'pub-paper-link',
  bibtex: 'pub-bibtex-link',
};

const PubLink = ({
  label,
  href,
  onClick,
  icon,
  variant,
  ariaExpanded,
}: PubLinkProps) => {
  const className = `pub-text-link doi-link${
    variant ? ` ${VARIANT_CLASS[variant]}` : ''
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
    <button
      type="button"
      className={className}
      onClick={onClick}
      {...(ariaExpanded !== undefined && {'aria-expanded': ariaExpanded})}
    >
      {content}
    </button>
  );
};

export default PubLink;
