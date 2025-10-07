import { useState, useMemo, useEffect, useRef } from 'react';
import { publications } from '../../data/content';
import Toastify from 'toastify-js';
import { trackCitationCopy } from '../../utils/analytics';
import type { Publication } from '../../types';

const Publications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [bibtexData, setBibtexData] = useState<Record<string, { bibtex: string }>>({});
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [openCitationDropdown, setOpenCitationDropdown] = useState<number | null>(null);
  const [openShareDropdown, setOpenShareDropdown] = useState<number | null>(null);
  const [hoveredPub, setHoveredPub] = useState<number | null>(null);
  const [expandedPub, setExpandedPub] = useState<number | null>(null);
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const yearDropdownRef = useRef<HTMLDivElement>(null);
  const citationDropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shareDropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Load BibTeX data
    fetch('/assets/data/bibtex.json')
      .then(res => res.json())
      .then(data => setBibtexData(data))
      .catch(err => console.error('Failed to load BibTeX data:', err));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
        setStatusDropdownOpen(false);
      }
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target as Node)) {
        setYearDropdownOpen(false);
      }

      // Check citation dropdowns
      if (openCitationDropdown !== null) {
        const citationRef = citationDropdownRefs.current[openCitationDropdown];
        if (citationRef && !citationRef.contains(event.target as Node)) {
          setOpenCitationDropdown(null);
        }
      }

      // Check share dropdowns
      if (openShareDropdown !== null) {
        const shareRef = shareDropdownRefs.current[openShareDropdown];
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
        setOpenCitationDropdown(null);
        setOpenShareDropdown(null);
      }
    };

    if (statusDropdownOpen || yearDropdownOpen || openCitationDropdown !== null || openShareDropdown !== null) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [statusDropdownOpen, yearDropdownOpen, openCitationDropdown, openShareDropdown]);

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

  const copyCitation = (pubId: string, format: string, pub: Publication) => {
    let citation = '';

    if (format === 'bibtex') {
      citation = bibtexData[pubId]?.bibtex || '';
    } else if (format === 'apa') {
      citation = `${pub.title}. (${pub.year}). ${pub.venue}.`;
    } else if (format === 'mla') {
      citation = `"${pub.title}." ${pub.venue}, ${pub.year}.`;
    } else if (format === 'chicago') {
      citation = `"${pub.title}." ${pub.venue} (${pub.year}).`;
    } else if (format === 'ieee') {
      citation = `"${pub.title}," ${pub.venue}, ${pub.year}.`;
    }

    if (citation) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(citation).then(() => {
          trackCitationCopy(format, pub.title);
          Toastify({
            text: `${format.toUpperCase()} citation copied!`,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "left",
            style: {
              background: "var(--accent-color)",
            }
          }).showToast();
        }).catch(err => {
          console.error('Failed to copy:', err);
          fallbackCopyCitation(citation, format, pub.title);
        });
      } else {
        fallbackCopyCitation(citation, format, pub.title);
      }
    }
    setOpenCitationDropdown(null);
  };

  const fallbackCopyCitation = (text: string, format: string, pubTitle: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      trackCitationCopy(format, pubTitle);
      Toastify({
        text: `${format.toUpperCase()} citation copied!`,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "left",
        style: {
          background: "var(--accent-color)",
        }
      }).showToast();
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }

    document.body.removeChild(textArea);
  };

  const sharePublication = (platform: string, pub: Publication) => {
    const title = pub.title;
    const venue = pub.venue;
    const year = pub.year;
    const abstract = pub.abstract || '';
    const url = pub.link || window.location.href;

    // Create share text with title, venue, year, and abstract
    const shareText = `${title}\n\n${venue} (${year})\n\n${abstract.substring(0, 200)}${abstract.length > 200 ? '...' : ''}`;

    let shareUrl = '';

    switch(platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title}\n${venue} (${year})`)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText + '\n\nRead more: ' + url)}`;
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
            <i className="fas fa-search" aria-hidden="true"></i>
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
                <i className="fas fa-times" aria-hidden="true"></i>
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
                <div className="select-items" role="listbox" aria-label="Publication status options">
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
              <i className="fas fa-redo" aria-hidden="true"></i> Reset
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
                        <i className={`fas fa-chevron-down ${expandedPub === actualIndex ? 'rotated' : ''}`}></i>
                      </span>
                    ) : (
                      <span className="expand-arrow disabled">
                        <i className="fas fa-chevron-down"></i>
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
                              <i className="fas fa-quote-left"></i> {pub.citations} {pub.citations === 1 ? 'Citation' : 'Citations'}
                            </span>
                          )}
                        </div>
                        <div className="detail-actions">
                          {pub.link && (
                            <a href={pub.link} className="publication-btn" target="_blank" rel="noopener" data-tooltip="View Paper">
                              <i className="fas fa-external-link-alt"></i>
                            </a>
                          )}
                          {pub.pdfLink && (
                            <div
                              className="pdf-btn-wrapper"
                              onMouseEnter={() => setHoveredPub(actualIndex)}
                              onMouseLeave={() => setHoveredPub(null)}
                            >
                              <a href={pub.pdfLink} className="publication-btn" download data-tooltip="Download PDF">
                                <i className="fas fa-file-pdf"></i>
                              </a>

                              {/* PDF Preview Tooltip - Desktop only */}
                              {hoveredPub === actualIndex && (
                                <div className="pdf-preview-tooltip">
                                  <div className="pdf-preview-content">
                                    <iframe
                                      src={`${pub.pdfLink}#view=FitH`}
                                      title={`Preview of ${pub.title}`}
                                      className="pdf-preview-iframe"
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
                            <div className="citation-dropdown" ref={el => { citationDropdownRefs.current[actualIndex] = el; }}>
                              <button
                                className="publication-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenCitationDropdown(openCitationDropdown === actualIndex ? null : actualIndex);
                                }}
                                data-tooltip="Copy Citation"
                              >
                                <i className="fas fa-quote-right"></i>
                              </button>
                              {openCitationDropdown === actualIndex && (
                                <div className="citation-format-menu">
                                  <div onClick={() => copyCitation(pub.bibtexId!, 'bibtex', pub)}>BibTeX</div>
                                  <div onClick={() => copyCitation(pub.bibtexId!, 'apa', pub)}>APA</div>
                                  <div onClick={() => copyCitation(pub.bibtexId!, 'mla', pub)}>MLA</div>
                                  <div onClick={() => copyCitation(pub.bibtexId!, 'chicago', pub)}>Chicago</div>
                                  <div onClick={() => copyCitation(pub.bibtexId!, 'ieee', pub)}>IEEE</div>
                                </div>
                              )}
                            </div>
                          )}
                          <div className="citation-dropdown" ref={el => { shareDropdownRefs.current[actualIndex] = el; }}>
                            <button
                              className="publication-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenShareDropdown(openShareDropdown === actualIndex ? null : actualIndex);
                              }}
                              data-tooltip="Share"
                            >
                              <i className="fas fa-share-alt"></i>
                            </button>
                            {openShareDropdown === actualIndex && (
                              <div className="citation-format-menu">
                                <div onClick={() => sharePublication('twitter', pub)}>
                                  <i className="fab fa-twitter" style={{ marginRight: '0.5rem' }}></i>Twitter
                                </div>
                                <div onClick={() => sharePublication('linkedin', pub)}>
                                  <i className="fab fa-linkedin" style={{ marginRight: '0.5rem' }}></i>LinkedIn
                                </div>
                                <div onClick={() => sharePublication('facebook', pub)}>
                                  <i className="fab fa-facebook" style={{ marginRight: '0.5rem' }}></i>Facebook
                                </div>
                                <div onClick={() => sharePublication('email', pub)}>
                                  <i className="fas fa-envelope" style={{ marginRight: '0.5rem' }}></i>Email
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

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
                {showAll ? 'Show Less' : 'Show More'} <i className={`fas fa-chevron-down`}></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Publications;
