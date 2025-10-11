import { useState, useMemo, useEffect, useRef } from 'react';
import { publications } from '../../data/content';
import { toast } from 'sonner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faRedo, faChevronDown, faQuoteLeft, faExternalLinkAlt, faFilePdf, faSpinner, faQuoteRight, faShareAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { trackCitationCopy } from '../../utils/analytics';
import type { Publication } from '../../types';
import { useFocusTrap } from '../../hooks/useFocusTrap';

const Publications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [bibtexData, setBibtexData] = useState<Record<string, { bibtex: string }>>({});
  const [bibtexLoading, setBibtexLoading] = useState(true);
  const [bibtexError, setBibtexError] = useState<string | null>(null);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [openShareDropdown, setOpenShareDropdown] = useState<number | null>(null);
  const [hoveredPub, setHoveredPub] = useState<number | null>(null);
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

      const matchesStatus = statusFilter === 'all' || pub.status === statusFilter;
      const matchesYear = yearFilter === 'all' || pub.year === yearFilter;

      return matchesSearch && matchesStatus && matchesYear;
    });
  }, [searchTerm, statusFilter, yearFilter]);

  const handleReset = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setYearFilter('all');
  };

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
          <div className="filter-controls" role="group" aria-label="Publication filters">
            <div className="custom-select" ref={statusDropdownRef}>
              <button
                className="select-selected"
                onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                aria-haspopup="listbox"
                aria-expanded={statusDropdownOpen}
                aria-label="Filter by publication status"
              >
                {statusFilter === 'all' ? 'All Status' :
                 statusFilter === 'published' ? 'Published' :
                 statusFilter === 'accepted' ? 'Accepted' : 'Under Revision'}
              </button>
              {statusDropdownOpen && (
                <div className="select-items" role="listbox" aria-label="Publication status options" ref={statusItemsRef}>
                  <div
                    role="option"
                    onClick={() => { setStatusFilter('all'); setStatusDropdownOpen(false); }}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStatusFilter('all'); setStatusDropdownOpen(false); }}}
                    tabIndex={0}
                  >All Status</div>
                  <div
                    role="option"
                    onClick={() => { setStatusFilter('published'); setStatusDropdownOpen(false); }}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStatusFilter('published'); setStatusDropdownOpen(false); }}}
                    tabIndex={0}
                  >Published</div>
                  <div
                    role="option"
                    onClick={() => { setStatusFilter('accepted'); setStatusDropdownOpen(false); }}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStatusFilter('accepted'); setStatusDropdownOpen(false); }}}
                    tabIndex={0}
                  >Accepted</div>
                  <div
                    role="option"
                    onClick={() => { setStatusFilter('review'); setStatusDropdownOpen(false); }}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStatusFilter('review'); setStatusDropdownOpen(false); }}}
                    tabIndex={0}
                  >Under Revision</div>
                </div>
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
                <div className="select-items" role="listbox" aria-label="Publication year options">
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
            <button id="resetFilters" onClick={handleReset} className="btn-secondary" aria-label="Reset all filters">
              <FontAwesomeIcon icon={faRedo} aria-hidden="true" /> Reset
            </button>
          </div>
        </div>

        <div className="publications-container">
          <div className="publication-list" role="list" aria-label="Publications">
            {filteredPublications.length === 0 ? (
              <p className="no-results" role="status" aria-live="polite">No publications found matching your criteria.</p>
            ) : (
              filteredPublications.map((pub, index) => {
                const actualIndex = index;
                const isHidden = !showAll && index >= 5;
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
                            <div
                              className="pdf-btn-wrapper"
                              onMouseEnter={() => {
                                // Only show preview on desktop (wider than 1024px)
                                if (window.innerWidth > 1024) {
                                  // Add small delay before showing preview to avoid loading on quick hover
                                  setTimeout(() => {
                                    if (hoveredPub === actualIndex) {
                                      setHoveredPub(actualIndex);
                                    }
                                  }, 300);
                                  setHoveredPub(actualIndex);
                                }
                              }}
                              onMouseLeave={() => setHoveredPub(null)}
                            >
                              <a href={pub.pdfLink} className="publication-btn" download data-tooltip="Download PDF">
                                <FontAwesomeIcon icon={faFilePdf} />
                              </a>

                              {/* PDF Preview Tooltip - Desktop only with lazy loading */}
                              {hoveredPub === actualIndex && window.innerWidth > 1024 && (
                                <div className="pdf-preview-tooltip">
                                  <div className="pdf-preview-content">
                                    <iframe
                                      src={`${pub.pdfLink}#view=FitH`}
                                      title={`Preview of ${pub.title}`}
                                      className="pdf-preview-iframe"
                                      loading="lazy"
                                    />
                                    <div className="pdf-preview-footer">
                                      <span>Click to download PDF</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
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

                      {pub.authors && (
                        <div className="abstract-section">
                          <p>
                            <strong style={{ display: 'inline' }}>Authors: </strong>
                            {pub.authors.split(', ').map((author, idx, arr) => (
                              <>
                                {author.includes('Sirjani') ? <strong style={{ display: 'inline' }} key={idx}>{author}</strong> : author}
                                {idx < arr.length - 1 && ', '}
                              </>
                            ))}
                          </p>
                        </div>
                      )}

                      {pub.abstract && (
                        <div className="abstract-section">
                          <strong>Abstract:</strong>
                          <p>{pub.abstract}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
              })
            )}
          </div>
          {filteredPublications.length > 5 && (
            <div className="show-more-container">
              <button id="showMoreBtn" onClick={() => setShowAll(!showAll)} className={showAll ? 'expanded' : ''}>
                {showAll ? 'Show Less' : 'Show More'} <FontAwesomeIcon icon={faChevronDown} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Publications;
