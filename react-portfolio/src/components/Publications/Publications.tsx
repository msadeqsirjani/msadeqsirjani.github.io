import { useState, useMemo, useEffect, useRef } from 'react';
import { fetchPublications } from '../../data/content';
import { toast } from 'sonner';
import type { Publication } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faChevronDown, faChevronUp, faQuoteLeft, faExternalLinkAlt, faFilePdf, faSpinner, faQuoteRight, faShareAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { trackCitationCopy } from '../../utils/analytics';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import useSettings from '../../hooks/useSettings';

const Publications = () => {
  const { settings } = useSettings();
  const initialLimit = settings.displayLimits.publications.initial;

  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [bibtexData, setBibtexData] = useState<Record<string, { bibtex: string }>>({});
  const [bibtexLoading, setBibtexLoading] = useState(true);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [openShareDropdown, setOpenShareDropdown] = useState<number | null>(null);
  const [expandedPub, setExpandedPub] = useState<number | null>(null);
  const yearDropdownRef = useRef<HTMLDivElement>(null);
  const yearItemsRef = useRef<HTMLDivElement | null>(null);
  const shareDropdownRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());

  useFocusTrap(yearItemsRef, yearDropdownOpen);

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

    fetch('/assets/data/bibtex.json')
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        setBibtexData(data);
        setBibtexLoading(false);
      })
      .catch(() => {
        setBibtexLoading(false);
        if (import.meta.env.DEV) {
          console.error('Failed to load BibTeX data');
        }
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target as Node)) {
        setYearDropdownOpen(false);
      }

      if (openShareDropdown !== null) {
        const shareRef = shareDropdownRefs.current.get(openShareDropdown);
        if (shareRef && !shareRef.contains(event.target as Node)) {
          setOpenShareDropdown(null);
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setYearDropdownOpen(false);
        setOpenShareDropdown(null);
      }
    };

    if (yearDropdownOpen || openShareDropdown !== null) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [yearDropdownOpen, openShareDropdown]);

  const filteredPublications = useMemo(() => {
    return publications.filter(pub => {
      const matchesSearch = searchTerm === '' ||
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.venue.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesYear = yearFilter === 'all' || pub.year === yearFilter;
      return matchesSearch && matchesYear;
    });
  }, [publications, searchTerm, yearFilter]);

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      published: 'PUBLISHED',
      accepted: 'ACCEPTED',
      review: 'UNDER REVISION'
    };
    return labels[status] || status.toUpperCase();
  };

  const copyBibtex = async (pubId: string, pub: Publication) => {
    const citation = bibtexData[pubId]?.bibtex;
    if (!citation) return;

    try {
      await navigator.clipboard.writeText(citation);
      trackCitationCopy('bibtex', pub.title);
      toast.success('BibTeX citation copied!');
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy citation');
    }
  };

  const sharePublication = (platform: string, pub: Publication) => {
    const url = pub.link || window.location.href;
    const text = `${pub.title}\n\n${pub.venue} (${pub.year})${pub.link ? `\n\nRead More: ${pub.link}` : ''}`;
    const emailText = `${pub.title}\n\n${pub.venue} (${pub.year})\n\nAbstract:\n${pub.abstract || ''}${pub.link ? `\n\nRead More: ${pub.link}` : ''}`;

    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(`${pub.title} - ${pub.venue} (${pub.year})`)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      email: `mailto:?subject=${encodeURIComponent(`${pub.title} - ${pub.venue} (${pub.year})`)}&body=${encodeURIComponent(emailText)}`
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
      setOpenShareDropdown(null);
    }
  };

  const handleYearSelect = (year: string) => {
    setYearFilter(year);
    setYearDropdownOpen(false);
  };

  if (loading) {
    return (
      <section id="publications" className="section">
        <div className="container">
          <h2 className="section-title">Publications</h2>
          <p style={{ textAlign: 'center', padding: '2rem' }}>Loading publications...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="publications" className="section">
      <div className="container">
        <h2 className="section-title">Publications</h2>

        <div className="publication-controls">
          <div className="search-box" role="search">
            <FontAwesomeIcon icon={faSearch} aria-hidden="true" />
            <input
              type="text"
              placeholder="Search by title, venue, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search publications"
            />
          </div>

          <div className="custom-select" ref={yearDropdownRef}>
            <button
              className="select-selected"
              onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
              aria-haspopup="listbox"
              aria-expanded={yearDropdownOpen}
            >
              {yearFilter === 'all' ? 'All Years' : yearFilter}
            </button>
            {yearDropdownOpen && (
              <div className="select-items" role="listbox" ref={yearItemsRef}>
                {['all', '2025', '2024', '2023'].map(year => (
                  <div
                    key={year}
                    role="option"
                    onClick={() => handleYearSelect(year)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleYearSelect(year)}
                    tabIndex={0}
                  >
                    {year === 'all' ? 'All Years' : year}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="publications-container">
          <div className="publication-list" role="list">
            {filteredPublications.length === 0 ? (
              <p className="no-results">No publications found matching your criteria.</p>
            ) : (
              filteredPublications.map((pub, index) => (
                <div
                  key={index}
                  className={`publication-item ${!showAll && index >= initialLimit ? 'hidden-for-show-more' : ''}`}
                  role="listitem"
                >
                  <div className="publication-header">
                    <div className="publication-header-content">
                      <h3 className="publication-title">
                        {pub.title}
                        <span className="venue-inline">{pub.venue}, {pub.year}</span>
                      </h3>
                    </div>
                    {pub.status !== 'review' ? (
                      <span
                        className="expand-arrow"
                        onClick={() => setExpandedPub(expandedPub === index ? null : index)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setExpandedPub(expandedPub === index ? null : index);
                          }
                        }}
                        aria-label={expandedPub === index ? 'Collapse details' : 'Expand details'}
                        aria-expanded={expandedPub === index}
                      >
                        <FontAwesomeIcon icon={faChevronDown} className={expandedPub === index ? 'rotated' : ''} />
                      </span>
                    ) : (
                      <span className="expand-arrow disabled">
                        <FontAwesomeIcon icon={faChevronDown} />
                      </span>
                    )}
                  </div>

                  {expandedPub === index && pub.status !== 'review' && (
                    <div className="publication-details">
                      <div className="details-grid">
                        <div className="detail-left">
                          <span className={`status-inline ${pub.status}`}>{getStatusLabel(pub.status)}</span>
                          {pub.citations !== undefined && (
                            <span className="citations-badge">
                              <FontAwesomeIcon icon={faQuoteLeft} /> {pub.citations} {pub.citations === 1 ? 'Citation' : 'Citations'}
                            </span>
                          )}
                        </div>
                        <div className="detail-actions">
                          {pub.link && (
                            <a href={pub.link} className="publication-btn" target="_blank" rel="noopener" data-tooltip="View Paper">
                              <FontAwesomeIcon icon={faExternalLinkAlt} />
                            </a>
                          )}
                          {pub.pdfLink && (
                            <a href={pub.pdfLink} className="publication-btn" download data-tooltip="Download PDF">
                              <FontAwesomeIcon icon={faFilePdf} />
                            </a>
                          )}
                          {pub.bibtexId && (
                            <button
                              className="publication-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!bibtexLoading) copyBibtex(pub.bibtexId!, pub);
                              }}
                              data-tooltip={bibtexLoading ? "Loading citations..." : "Copy BibTeX"}
                              disabled={bibtexLoading}
                            >
                              <FontAwesomeIcon icon={bibtexLoading ? faSpinner : faQuoteRight} spin={bibtexLoading} />
                            </button>
                          )}
                          <div className="citation-dropdown" ref={el => { shareDropdownRefs.current.set(index, el); }}>
                            <button
                              className="publication-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenShareDropdown(openShareDropdown === index ? null : index);
                              }}
                              data-tooltip="Share"
                            >
                              <FontAwesomeIcon icon={faShareAlt} />
                            </button>
                            {openShareDropdown === index && (
                              <div className="citation-format-menu">
                                {[
                                  { platform: 'twitter', icon: faTwitter, label: 'Twitter' },
                                  { platform: 'linkedin', icon: faLinkedin, label: 'LinkedIn' },
                                  { platform: 'facebook', icon: faFacebook, label: 'Facebook' },
                                  { platform: 'email', icon: faEnvelope, label: 'Email' }
                                ].map(({ platform, icon, label }) => (
                                  <div key={platform} onClick={() => sharePublication(platform, pub)}>
                                    <FontAwesomeIcon icon={icon} style={{ marginRight: '0.5rem' }} />{label}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {pub.keywords && pub.keywords.length > 0 && (
                        <div className="abstract-section">
                          <p>
                            <strong style={{ display: 'inline' }}>Keywords: </strong>
                            {pub.keywords.join(', ')}
                          </p>
                        </div>
                      )}

                      {pub.authors && (
                        <div className="abstract-section">
                          <p>
                            <strong style={{ display: 'inline' }}>Authors: </strong>
                            {pub.authors.split(', ').map((author, idx) => (
                              <span key={idx}>
                                {author.includes('Sirjani') ? <strong style={{ display: 'inline' }}>{author}</strong> : author}
                                {idx < pub.authors!.split(', ').length - 1 && ', '}
                              </span>
                            ))}
                          </p>
                        </div>
                      )}

                      {pub.abstract && (
                        <div className="abstract-section">
                          <p>
                            <strong style={{ display: 'inline' }}>Abstract: </strong>
                            {pub.abstract}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          {filteredPublications.length > initialLimit && settings.displayLimits.publications.showMoreEnabled && (
            <div className="show-more-container">
              <button id="showMoreBtn" onClick={() => setShowAll(!showAll)} className={showAll ? 'expanded' : ''}>
                {showAll ? 'Show Less' : 'Show More'} <FontAwesomeIcon icon={showAll ? faChevronUp : faChevronDown} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Publications;
