import Icon from '../Icon/Icon';
import PubLink from '../Publications/PubLink';
import {
  faArrowLeft,
  faFilePdf,
  faLink,
  faQuoteRight,
} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {ROUTE_PATHS} from '../../constants/siteNav';
import {navLinkProps} from '../../utils/router';
import {copyBibtex} from './copyBibtex';

const SELF = 'Mohammad Sadegh Sirjani';

type Author = string | {name: string; marks: string};

export interface ProjectMeta {
  title: string;
  authors: Author[];
  affiliation: string | string[];
  venue: string;
  award?: string;
  pdf: string;
  link: {label: string; href: string};
  code?: string;
  codeSoon?: boolean;
  bibtex: string;
}

const ProjectHero = ({
  title,
  authors,
  affiliation,
  venue,
  award,
  pdf,
  link,
  code,
  codeSoon,
  bibtex,
}: ProjectMeta) => (
  <header className="project-hero" id="top">
    <div className="project-inner">
      <a
        className="page-back-link project-back"
        {...navLinkProps(ROUTE_PATHS.publications)}
      >
        <Icon icon={faArrowLeft} size="sm" />
        All publications
      </a>

      <h1 className="project-title">{title}</h1>

      <p className="project-authors">
        {authors.map((author, index) => {
          const {name, marks} =
            typeof author === 'string' ? {name: author, marks: '1'} : author;
          return (
            <span key={name}>
              {name === SELF ? <strong>{name}</strong> : name}
              <sup>{marks}</sup>
              {index < authors.length - 1 && ', '}
            </span>
          );
        })}
      </p>
      {[affiliation].flat().map((line, index) => (
        <p className="project-meta" key={line}>
          <sup>{index + 1}</sup>
          {line}
        </p>
      ))}
      <p className="project-meta is-venue">
        {venue}
        {award && <strong className="project-award">{award}</strong>}
      </p>

      <div className="pub-card-actions project-links">
        <PubLink label="Paper" href={pdf} icon={faFilePdf} variant="paper" />
        <PubLink
          label={link.label}
          href={link.href}
          icon={faLink}
          variant="doi"
        />
        <PubLink
          label="BibTeX"
          onClick={() => void copyBibtex(bibtex)}
          icon={faQuoteRight}
          variant="bibtex"
        />
        {code ? (
          <PubLink label="Code" href={code} icon={faGithub} variant="github" />
        ) : (
          codeSoon && (
            <span
              className="pub-text-link pub-github-link is-disabled"
              aria-disabled="true"
              title="Code coming soon"
            >
              <Icon icon={faGithub} size="lg" />
              <span className="pub-link-label">Code</span>
            </span>
          )
        )}
      </div>
    </div>
  </header>
);

export default ProjectHero;
