import {useId, useState} from 'react';
import toast from 'react-hot-toast';
import type {Publication} from '../../types';
import PubLink from './PubLink';
import Icon from '../Icon/Icon';
import {
  faChevronDown,
  faLink,
  faFilePdf,
  faQuoteRight,
} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import bibtexData from '../../data/bibtex.json';

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    published: 'Published',
    accepted: 'Accepted',
    review: 'Under review',
    arxiv: 'Preprint',
  };
  return labels[status] || status;
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
  headingLevel?: 2 | 3;
}

const PublicationItem = ({pub, headingLevel = 3}: PublicationItemProps) => {
  const [abstractOpen, setAbstractOpen] = useState(false);
  const abstractId = useId();
  const hasKeywords = !!pub.keywords && pub.keywords.length > 0;
  const hasActions = Boolean(
    pub.abstract || pub.link || pub.pdfLink || pub.bibtexId || pub.github,
  );
  const TitleTag = headingLevel === 2 ? 'h2' : 'h3';

  return (
    <article className="pub-card" role="listitem">
      <div className="pub-card-body">
        <TitleTag className="pub-card-title">{pub.title}</TitleTag>

        {pub.authors && (
          <p className="pub-card-authors">{renderAuthors(pub.authors)}</p>
        )}
        {pub.venue && !/preprint/i.test(pub.venue) && (
          <p className="pub-card-venue">{pub.venue}</p>
        )}

        <div className="pub-card-meta">
          <span className={`pub-status-badge pub-status-${pub.status}`}>
            {getStatusLabel(pub.status)}
          </span>
          <span className="pub-card-metaitem">{pub.year}</span>
          {!!pub.citations && (
            <span className="pub-card-metaitem">
              {pub.citations} {pub.citations === 1 ? 'citation' : 'citations'}
            </span>
          )}
        </div>

        {hasKeywords && (
          <div
            className="pub-card-keywords pub-card-keywords-inline"
            aria-label="Keywords"
          >
            {pub.keywords!.map(kw => (
              <span key={kw} className="pub-keyword-tag">
                {kw}
              </span>
            ))}
          </div>
        )}

        {hasActions && (
          <div className="pub-card-actions">
            {pub.abstract && (
              <button
                type="button"
                className="pub-text-link pub-abstract-toggle"
                onClick={() => setAbstractOpen(v => !v)}
                aria-expanded={abstractOpen}
                aria-controls={abstractId}
              >
                <span>Abstract</span>
                <Icon
                  icon={faChevronDown}
                  className="pub-abstract-chevron"
                  size="sm"
                />
              </button>
            )}
            {pub.link && (
              <PubLink label="DOI" href={pub.link} icon={faLink} variant="doi" />
            )}
            {(pub.pdfLink || pub.link) && (
              <PubLink
                label="Paper"
                href={pub.pdfLink ? `/${pub.pdfLink}` : pub.link}
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
        )}

        {pub.abstract && abstractOpen && (
          <div className="pub-abstract-panel" id={abstractId}>
            <p className="pub-card-abstract">{pub.abstract}</p>
          </div>
        )}
      </div>
    </article>
  );
};

export default PublicationItem;
