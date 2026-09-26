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

export interface ProjectMeta {
  title: string;
  authors: string[];
  affiliation: string;
  venue: string;
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
        {authors.map((author, index) => (
          <span key={author}>
            {author === SELF ? <strong>{author}</strong> : author}
            <sup>1</sup>
            {index < authors.length - 1 && ', '}
          </span>
        ))}
      </p>
      <p className="project-meta">
        <sup>1</sup>
        {affiliation}
      </p>
      <p className="project-meta is-venue">{venue}</p>

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
              <span className="pub-link-label">Code (Soon)</span>
            </span>
          )
        )}
      </div>
    </div>
  </header>
);

export default ProjectHero;
