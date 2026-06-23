import {useState} from 'react';
import toast from 'react-hot-toast';
import type {Publication} from '../../types';
import PubLink from './PubLink';
import Icon from '../Icon/Icon';
import {
  faChevronDown,
  faChevronUp,
  faLink,
  faFilePdf,
  faQuoteRight,
} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import bibtexData from '../../data/bibtex.json';

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    published: 'PUBLISHED',
    accepted: 'ACCEPTED',
    review: 'UNDER REVIEW',
    arxiv: 'PREPRINT',
  };
  return labels[status] || status.toUpperCase();
};

const copyBibtex = async (pub: Publication) => {
  if (!pub.bibtexId) return;
  const entry = (bibtexData as Record<string, {bibtex?: string}>)[pub.bibtexId];
  const bibtex = entry?.bibtex;
  if (!bibtex) {
    toast.error('BibTeX entry not found for this publication');
    return;
  }
  try {
    await navigator.clipboard.writeText(bibtex);
    toast.success('BibTeX copied to clipboard');
  } catch {
    toast.error('Unable to copy BibTeX automatically');
  }
};

const renderAuthors = (authors: string) =>
  authors.split(', ').map((author, idx, arr) => (
    <span key={idx}>
      {author.includes('Sirjani') ? <strong>{author}</strong> : author}
      {idx < arr.length - 1 && ', '}
    </span>
  ));

interface PublicationItemProps {
  pub: Publication;
}

const PublicationItem = ({pub}: PublicationItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const hasKeywords = !!pub.keywords && pub.keywords.length > 0;
  const hasDetails = !!pub.abstract || hasKeywords;

  return (
    <article className="pub-card" role="listitem">
      <div className="pub-card-body">
        <div className="pub-card-meta">
          <span className={`pub-status-badge pub-status-${pub.status}`}>
            {getStatusLabel(pub.status)}
          </span>
          <span className="pub-card-metaitem">{pub.year}</span>
        </div>

        <h3 className="pub-card-title">{pub.title}</h3>

        {pub.authors && (
          <p className="pub-card-authors">{renderAuthors(pub.authors)}</p>
        )}
        {pub.venue && !/preprint/i.test(pub.venue) && (
          <p className="pub-card-venue">{pub.venue}</p>
        )}

        <div className="pub-card-actions">
          {pub.link && (
            <PubLink label="DOI" href={pub.link} icon={faLink} variant="doi" />
          )}
          {pub.pdfLink && (
            <PubLink
              label="Paper"
              href={`/${pub.pdfLink}`}
              icon={faFilePdf}
              variant="paper"
            />
          )}
          {pub.bibtexId && (
            <PubLink
              label="BibTeX"
              onClick={() => void copyBibtex(pub)}
              icon={faQuoteRight}
              variant="bibtex"
            />
          )}
          {pub.github && (
            <PubLink
              label="Code"
              href={pub.github}
              icon={faGithub}
              variant="github"
            />
          )}
        </div>
      </div>

      {hasDetails && (
        <button
          type="button"
          className="pub-card-toggle"
          onClick={() => setExpanded(v => !v)}
          aria-expanded={expanded}
          aria-label={expanded ? 'Hide details' : 'Show abstract and keywords'}
        >
          <Icon icon={expanded ? faChevronUp : faChevronDown} size="sm" />
        </button>
      )}

      {expanded && hasDetails && (
        <div className="pub-card-details">
          {pub.abstract && (
            <div className="pub-card-section">
              <h4 className="pub-card-section-title">Abstract</h4>
              <div className="pub-card-abstract">
                <p>{pub.abstract}</p>
              </div>
            </div>
          )}
          {hasKeywords && (
            <div className="pub-card-section">
              <h4 className="pub-card-section-title">Keywords</h4>
              <div className="pub-card-keywords">
                {pub.keywords!.map(kw => (
                  <span key={kw} className="pub-keyword-tag">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
};

export default PublicationItem;
