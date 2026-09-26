import type {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon/Icon';
import {faArrowUpRightFromSquare} from '@fortawesome/free-solid-svg-icons';
import {navLinkProps} from '../../utils/router';

type PubLinkVariant = 'github' | 'doi' | 'paper' | 'bibtex';

interface PubLinkProps {
  label: string;
  href?: string | undefined;
  onClick?: () => void;
  icon?: IconDefinition;
  variant?: PubLinkVariant;
  ariaExpanded?: boolean;
  internal?: boolean;
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
  internal = false,
}: PubLinkProps) => {
  const className = `pub-text-link doi-link${
    variant ? ` ${VARIANT_CLASS[variant]}` : ''
  }`;

  const content = (
    <>
      <Icon icon={icon ?? faArrowUpRightFromSquare} size="lg" />
      <span className="pub-link-label">{label}</span>
    </>
  );

  if (href) {
    if (internal) {
      return (
        <a
          className={className}
          aria-label={label}
          title={label}
          {...navLinkProps(href)}
        >
          {content}
        </a>
      );
    }

    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener"
        aria-label={label}
        title={label}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      aria-label={label}
      title={label}
      {...(ariaExpanded !== undefined && {'aria-expanded': ariaExpanded})}
    >
      {content}
    </button>
  );
};

export default PubLink;
