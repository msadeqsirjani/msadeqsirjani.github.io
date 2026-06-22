import {useState, useMemo, useEffect} from 'react';
import {fetchPublications} from '../../data/content';
import toast from 'react-hot-toast';
import type {Publication} from '../../types';
import Icon from '../Icon/Icon';
import {
  faChevronDown,
  faChevronUp,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';
import useSettings from '../../hooks/useSettings';
import bibtexData from '../../data/bibtex.json';

const Publications = () => {
  const {settings} = useSettings();
  const initialLimit = settings.displayLimits.publications.initial;

  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (key: string, section: string) => {
    const id = `${key}:${section}`;
    setExpandedSection(prev => (prev === id ? null : id));
  };

  const pubKey = (pub: Publication) =>
    pub.bibtexId ?? `${pub.year}-${pub.title}`;

  useEffect(() => {
    fetchPublications()
      .then(data => {
        setPublications(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load publications:', err);
        toast.error('Failed to load publications data');
        setLoading(false);
      });
  }, []);

  const filteredPublications = useMemo(() => {
    return [...publications].sort((a, b) => Number(b.year) - Number(a.year));
  }, [publications]);

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      published: 'PUBLISHED',
      accepted: 'ACCEPTED',
      review: 'UNDER REVISION',
    };
    return labels[status] || status.toUpperCase();
  };

  const handleCopyBibtex = async (pub: Publication) => {
    const bibtexId = pub.bibtexId;
    if (!bibtexId) return;

    const entry = (bibtexData as Record<string, {bibtex?: string}>)[bibtexId];
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

  if (loading) {
    return (
      <section id="publications" className="section">
        <div className="container">
          <h2 className="section-title">Publications</h2>
          <p style={{textAlign: 'center', padding: '2rem'}}>
            Loading publications...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="publications" className="section">
      <div className="container">
        <h2 className="section-title">Publications</h2>
        <div className="publications-container">
          <div className="publication-list" role="list">
            {filteredPublications.length === 0 ? (
              <p className="no-results">
                No publications found matching your criteria.
              </p>
            ) : (
              filteredPublications.map((pub, index) => {
                const key = pubKey(pub);
                const isExpanded = expandedSection === `${key}:abstract`;
                const isKeywordsExpanded =
                  expandedSection === `${key}:keywords`;
                const isInfoExpanded = expandedSection === `${key}:info`;
                return (
                  <div
                    key={key}
                    className={`publication-item ${!showAll && index >= initialLimit ? 'hidden-for-show-more' : ''}`}
                    role="listitem"
                  >
                    <div className="publication-header">
                      <div className="publication-header-content">
                        <h3 className="publication-title">{pub.title}</h3>
                        {pub.authors && (
                          <p className="publication-authors">
                            {pub.authors.split(', ').map((author, idx, arr) => (
                              <span key={idx}>
                                {author.includes('Sirjani') ? (
                                  <strong>{author}</strong>
                                ) : (
                                  author
                                )}
                                {idx < arr.length - 1 && ', '}
                              </span>
                            ))}
                          </p>
                        )}
                        <p className="publication-venue">{pub.venue}</p>
                        <div className="publication-links">
                          {pub.link && (
                            <a
                              href={pub.link}
                              className="pub-text-link doi-link"
                              target="_blank"
                              rel="noopener"
                            >
                              DOI <Icon icon={faExternalLinkAlt} size="xs" />
                            </a>
                          )}
                          {pub.pdfLink && (
                            <a
                              href={`/${pub.pdfLink}`}
                              className="pub-text-link doi-link"
                              target="_blank"
                              rel="noopener"
                            >
                              PDF <Icon icon={faExternalLinkAlt} size="xs" />
                            </a>
                          )}
                          {pub.bibtexId && (
                            <button
                              type="button"
                              className="pub-text-link doi-link"
                              onClick={() => void handleCopyBibtex(pub)}
                            >
                              BibTeX <Icon icon={faExternalLinkAlt} size="xs" />
                            </button>
                          )}
                          {pub.abstract && (
                            <button
                              type="button"
                              className="pub-text-link pub-toggle"
                              onClick={() => toggleSection(key, 'abstract')}
                              aria-expanded={isExpanded}
                            >
                              Abstract{' '}
                              <Icon
                                icon={isExpanded ? faChevronUp : faChevronDown}
                                size="xs"
                              />
                            </button>
                          )}
                          {pub.keywords && pub.keywords.length > 0 && (
                            <button
                              type="button"
                              className="pub-text-link pub-toggle"
                              onClick={() => toggleSection(key, 'keywords')}
                              aria-expanded={isKeywordsExpanded}
                            >
                              Keywords{' '}
                              <Icon
                                icon={
                                  isKeywordsExpanded
                                    ? faChevronUp
                                    : faChevronDown
                                }
                                size="xs"
                              />
                            </button>
                          )}
                          <button
                            type="button"
                            className="pub-text-link pub-toggle"
                            onClick={() => toggleSection(key, 'info')}
                            aria-expanded={isInfoExpanded}
                          >
                            Info{' '}
                            <Icon
                              icon={
                                isInfoExpanded ? faChevronUp : faChevronDown
                              }
                              size="xs"
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    {isExpanded && pub.abstract && (
                      <div className="publication-abstract">
                        <p>{pub.abstract}</p>
                      </div>
                    )}
                    {isKeywordsExpanded &&
                      pub.keywords &&
                      pub.keywords.length > 0 && (
                        <div className="pub-keywords pub-keywords-expanded">
                          {pub.keywords.map(kw => (
                            <span key={kw} className="pub-keyword-tag">
                              {kw}
                            </span>
                          ))}
                        </div>
                      )}
                    {isInfoExpanded && (
                      <div className="publication-info">
                        <span className="info-chip">
                          <span className="info-label">Status</span>
                          <span className="info-value">
                            {getStatusLabel(pub.status)}
                          </span>
                        </span>
                        <span className="info-chip">
                          <span className="info-label">Year</span>
                          <span className="info-value">{pub.year}</span>
                        </span>
                        {pub.citations !== undefined && (
                          <span className="info-chip">
                            <span className="info-label">Citations</span>
                            <span className="info-value">{pub.citations}×</span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
          {filteredPublications.length > initialLimit &&
            settings.displayLimits.publications.showMoreEnabled && (
              <div className="show-more-container">
                <button
                  type="button"
                  onClick={() => setShowAll(!showAll)}
                  className={`show-more-btn${showAll ? ' expanded' : ''}`}
                  aria-expanded={showAll}
                >
                  {showAll ? 'Show Less' : 'Show More'}{' '}
                  <Icon icon={showAll ? faChevronUp : faChevronDown} />
                </button>
              </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default Publications;
