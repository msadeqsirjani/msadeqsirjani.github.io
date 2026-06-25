import {useState} from 'react';
import toast from 'react-hot-toast';
import type {Publication} from '../../types';
import PubLink from './PubLink';
import Icon from '../Icon/Icon';
import {
  faPlus,
  faMinus,
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
  const [abstractOpen, setAbstractOpen] = useState(false);
  const [keywordsOpen, setKeywordsOpen] = useState(false);
  const hasKeywords = !!pub.keywords && pub.keywords.length > 0;

  return (
    <article className="pub-card" role="listitem">
      <div className="pub-card-body">
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

        <h3 className="pub-card-title">{pub.title}</h3>

        {pub.authors && (
          <p className="pub-card-authors">{renderAuthors(pub.authors)}</p>
        )}
        {pub.venue && !/preprint/i.test(pub.venue) && (
          <p className="pub-card-venue">{pub.venue}</p>
        )}

        <div className="pub-card-actions">
          <PubLink
            label="DOI"
            href={pub.link}
            icon={faLink}
            variant="doi"
            disabled={!pub.link}
          />
          <PubLink
            label="Paper"
            href={pub.pdfLink ? `/${pub.pdfLink}` : undefined}
            icon={faFilePdf}
            variant="paper"
            disabled={!pub.pdfLink}
          />
          <PubLink
            label="BibTeX"
            onClick={() => void copyBibtex(pub)}
            icon={faQuoteRight}
            variant="bibtex"
            disabled={!pub.bibtexId}
          />
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

      {(pub.abstract || hasKeywords) && (
        <div className="pub-card-accordion">
          {pub.abstract && (
            <div className="pub-accordion-item">
              <button
                type="button"
                className="pub-accordion-header"
                onClick={() => setAbstractOpen(v => !v)}
                aria-expanded={abstractOpen}
              >
                <span>Abstract</span>
                <Icon icon={abstractOpen ? faMinus : faPlus} size="sm" />
              </button>
              {abstractOpen && (
                <div className="pub-accordion-panel">
                  <p className="pub-card-abstract">{pub.abstract}</p>
                </div>
              )}
            </div>
          )}
          {hasKeywords && (
            <div className="pub-accordion-item">
              <button
                type="button"
                className="pub-accordion-header"
                onClick={() => setKeywordsOpen(v => !v)}
                aria-expanded={keywordsOpen}
              >
                <span>Keywords</span>
                <Icon icon={keywordsOpen ? faMinus : faPlus} size="sm" />
              </button>
              {keywordsOpen && (
                <div className="pub-accordion-panel">
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
        </div>
      )}
    </article>
  );
};

export default PublicationItem;
