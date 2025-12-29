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
  const [bibtexError, setBibtexError] = useState<string | null>(null);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [openShareDropdown, setOpenShareDropdown] = useState<number | null>(null);
  const [expandedPub, setExpandedPub] = useState<number | null>(null);
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const yearDropdownRef = useRef<HTMLDivElement>(null);
  const statusItemsRef = useRef<HTMLDivElement | null>(null);
  const yearItemsRef = useRef<HTMLDivElement | null>(null);
  // Use Map instead of array to prevent memory leaks
  const shareDropdownRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());

  // Add focus traps for filter dropdowns
  useFocusTrap(statusItemsRef, statusDropdownOpen);
  useFocusTrap(yearItemsRef, yearDropdownOpen);

  useEffect(() => {
    // Load publications data
    setLoading(true);
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

    // Load BibTeX data
    setBibtexLoading(true);
    setBibtexError(null);

    fetch('/assets/data/bibtex.json')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setBibtexData(data);
        setBibtexLoading(false);
      })
      .catch(err => {
        const errorMessage = 'Failed to load citation data';
        setBibtexError(errorMessage);
        setBibtexLoading(false);

        // Only log in development
        if (import.meta.env.DEV) {
          console.error('Failed to load BibTeX data:', err);
        }

        // Show user-friendly error notification
        toast.error(errorMessage + '. Citation features may be limited.');
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
        setStatusDropdownOpen(false);
      }
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target as Node)) {
        setYearDropdownOpen(false);
      }

      // Check share dropdowns
      if (openShareDropdown !== null) {
        const shareRef = shareDropdownRefs.current.get(openShareDropdown);
        if (shareRef && !shareRef.contains(event.target as Node)) {
          setOpenShareDropdown(null);
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      // Escape key closes dropdowns
      if (event.key === 'Escape') {
        setStatusDropdownOpen(false);
        setYearDropdownOpen(false);
        setOpenShareDropdown(null);
      }
    };

    if (statusDropdownOpen || yearDropdownOpen || openShareDropdown !== null) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [statusDropdownOpen, yearDropdownOpen, openShareDropdown]);

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
    switch (status) {
      case 'published': return 'PUBLISHED';
      case 'accepted': return 'ACCEPTED';
      case 'review': return 'UNDER REVISION';
      default: return status.toUpperCase();
    }
  };

  const copyBibtex = (pubId: string, pub: Publication) => {
    const citation = bibtexData[pubId]?.bibtex || '';

    if (citation) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(citation).then(() => {
          trackCitationCopy('bibtex', pub.title);
          toast.success('BibTeX citation copied!');
        }).catch(err => {
          console.error('Failed to copy:', err);
          fallbackCopyBibtex(citation, pub.title);
        });
      } else {
        fallbackCopyBibtex(citation, pub.title);
      }
    }
  };

  const fallbackCopyBibtex = (text: string, pubTitle: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      trackCitationCopy('bibtex', pubTitle);
      toast.success('BibTeX citation copied!');
    } catch (err) {
      console.error('Fallback copy failed:', err);
      toast.error('Failed to copy citation');
    }

    document.body.removeChild(textArea);
  };

  const sharePublication = (platform: string, pub: Publication) => {
    const title = pub.title;
    const venue = pub.venue;
    const year = pub.year;
    const abstract = pub.abstract || '';
    const doi = pub.link || '';
    const url = doi || window.location.href;

    // Create share text - only email includes abstract
    const doiText = doi ? `\n\nRead More: ${doi}` : '';

    // Simple text for social media (no abstract)
    const simpleShareText = `${title}\n\n${venue} (${year})${doiText}`;

    // Email gets complete abstract
    const emailText = `${title}\n\n${venue} (${year})\n\nAbstract:\n${abstract}${doiText}`;

    let shareUrl = '';

    switch(platform) {
      case 'twitter':
        // Twitter: Title, venue, year, and link only
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(simpleShareText)}`;
        break;
      case 'linkedin':
        // LinkedIn: Title, venue, year, and link only
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(`${title} - ${venue} (${year})`)}`;
        break;
      case 'facebook':
        // Facebook: Simple URL sharing
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'email':
        // Email: Include complete information with full abstract
        shareUrl = `mailto:?subject=${encodeURIComponent(`${title} - ${venue} (${year})`)}&body=${encodeURIComponent(emailText)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      setOpenShareDropdown(null);
    }
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
              id="publicationSearch"
              placeholder="Search by title, venue, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search publications"
              aria-describedby="search-hint"
            />
            <span id="search-hint" className="visually-hidden">
              Type to filter publications by title, venue, or keywords
            </span>
            {searchTerm && (
              <button
                className="clear-search"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                <FontAwesomeIcon icon={faTimes} aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="custom-select" ref={yearDropdownRef}>
            <button
              className="select-selected"
              onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
              aria-haspopup="listbox"
              aria-expanded={yearDropdownOpen}
              aria-label="Filter by publication year"
            >
              {yearFilter === 'all' ? 'All Years' : yearFilter}
            </button>
            {yearDropdownOpen && (
              <div className="select-items" role="listbox" aria-label="Publication year options" ref={yearItemsRef}>
                <div
                  role="option"
                  onClick={() => { setYearFilter('all'); setYearDropdownOpen(false); }}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setYearFilter('all'); setYearDropdownOpen(false); }}}
                  tabIndex={0}
                >All Years</div>
                <div
                  role="option"
                  onClick={() => { setYearFilter('2025'); setYearDropdownOpen(false); }}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setYearFilter('2025'); setYearDropdownOpen(false); }}}
                  tabIndex={0}
                >2025</div>
                <div
                  role="option"
                  onClick={() => { setYearFilter('2024'); setYearDropdownOpen(false); }}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setYearFilter('2024'); setYearDropdownOpen(false); }}}
                  tabIndex={0}
                >2024</div>
                <div
                  role="option"
                  onClick={() => { setYearFilter('2023'); setYearDropdownOpen(false); }}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setYearFilter('2023'); setYearDropdownOpen(false); }}}
                  tabIndex={0}
                >2023</div>
              </div>
            )}
          </div>
        </div>

        <div className="publications-container">
          <div className="publication-list" role="list" aria-label="Publications">
            {filteredPublications.length === 0 ? (
              <p className="no-results" role="status" aria-live="polite">No publications found matching your criteria.</p>
            ) : (
              filteredPublications.map((pub, index) => {
                const actualIndex = index;
                const isHidden = !showAll && index >= initialLimit;
                return (
                <div
                  key={actualIndex}
                  className={`publication-item ${isHidden ? 'hidden-for-show-more' : ''}`}
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
                        onClick={() => setExpandedPub(expandedPub === actualIndex ? null : actualIndex)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setExpandedPub(expandedPub === actualIndex ? null : actualIndex);
                          }
                        }}
                        aria-label={expandedPub === actualIndex ? 'Collapse details' : 'Expand details'}
                        aria-expanded={expandedPub === actualIndex}
                      >
                        <FontAwesomeIcon icon={faChevronDown} className={expandedPub === actualIndex ? 'rotated' : ''} />
                      </span>
                    ) : (
                      <span className="expand-arrow disabled">
                        <FontAwesomeIcon icon={faChevronDown} />
                      </span>
                    )}
                  </div>

                  {expandedPub === actualIndex && pub.status !== 'review' && (
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
                                if (!bibtexLoading) {
                                  copyBibtex(pub.bibtexId!, pub);
                                }
                              }}
                              data-tooltip={bibtexLoading ? "Loading citations..." : bibtexError ? "Citation data unavailable" : "Copy BibTeX"}
                              disabled={bibtexLoading}
                              style={{ opacity: bibtexLoading ? 0.5 : 1, cursor: bibtexLoading ? 'wait' : 'pointer' }}
                            >
                              {bibtexLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faQuoteRight} />}
                            </button>
                          )}
                          <div className="citation-dropdown" ref={el => { shareDropdownRefs.current.set(actualIndex, el); }}>
                            <button
                              className="publication-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenShareDropdown(openShareDropdown === actualIndex ? null : actualIndex);
                              }}
                              data-tooltip="Share"
                            >
                              <FontAwesomeIcon icon={faShareAlt} />
                            </button>
                            {openShareDropdown === actualIndex && (
                              <div className="citation-format-menu">
                                <div onClick={() => sharePublication('twitter', pub)}>
                                  <FontAwesomeIcon icon={faTwitter} style={{ marginRight: '0.5rem' }} />Twitter
                                </div>
                                <div onClick={() => sharePublication('linkedin', pub)}>
                                  <FontAwesomeIcon icon={faLinkedin} style={{ marginRight: '0.5rem' }} />LinkedIn
                                </div>
                                <div onClick={() => sharePublication('facebook', pub)}>
                                  <FontAwesomeIcon icon={faFacebook} style={{ marginRight: '0.5rem' }} />Facebook
                                </div>
                                <div onClick={() => sharePublication('email', pub)}>
                                  <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '0.5rem' }} />Email
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {pub.keywords && pub.keywords.length > 0 && (
                        <div className="abstract-section">
                          <p>
                            <strong style={{ display: 'inline' }}>Keywords: </strong>
                            {pub.keywords.map((keyword, idx, arr) => (
                              <span key={idx}>
                                {keyword}
                                {idx < arr.length - 1 && ', '}
                              </span>
                            ))}
                          </p>
                        </div>
                      )}

                      {pub.authors && (
                        <div className="abstract-section">
                          <p>
                            <strong style={{ display: 'inline' }}>Authors: </strong>
                            {pub.authors.split(', ').map((author, idx, arr) => (
                              <span key={idx}>
                                {author.includes('Sirjani') ? <strong style={{ display: 'inline' }}>{author}</strong> : author}
                                {idx < arr.length - 1 && ', '}
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
              );
              })
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
