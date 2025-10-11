import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faBook, faGraduationCap, faMicroscope, faChalkboardTeacher, faNewspaper, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { useGlobalSearch } from '../../hooks/useGlobalSearch';
import './GlobalSearch.css';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlobalSearch = ({ isOpen, onClose }: GlobalSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { results, isSearching } = useGlobalSearch(searchQuery);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Handle result click
  const handleResultClick = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onClose();
      setSearchQuery('');
    }
  }, [onClose]);

  // Flatten all results into a single array for navigation
  const allResults = useMemo(() => [
    ...results.publications.map(item => ({ type: 'publications' as const, item })),
    ...results.research.map(item => ({ type: 'research' as const, item })),
    ...results.teaching.map(item => ({ type: 'teaching' as const, item })),
    ...results.education.map(item => ({ type: 'education' as const, item })),
    ...results.news.map(item => ({ type: 'news' as const, item })),
    ...results.awards.map(item => ({ type: 'awards' as const, item })),
  ], [results]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchQuery, results]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < allResults.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        const selected = allResults[selectedIndex];
        if (selected) {
          handleResultClick(selected.type);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, selectedIndex, allResults, handleResultClick]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current[selectedIndex]) {
      resultsRef.current[selectedIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedIndex]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'publications':
        return faBook;
      case 'education':
        return faGraduationCap;
      case 'research':
        return faMicroscope;
      case 'teaching':
        return faChalkboardTeacher;
      case 'news':
        return faNewspaper;
      case 'awards':
        return faTrophy;
      default:
        return faSearch;
    }
  };

  const getCategoryLabel = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  if (!isOpen) return null;

  const totalResults = Object.values(results).reduce((sum, items) => sum + items.length, 0);

  return (
    <div className="global-search-overlay">
      <div className="global-search-modal" ref={modalRef}>
        <div className="global-search-header">
          <div className="search-input-wrapper">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              className="global-search-input"
              placeholder="Search publications, research, teaching, news, and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Global search"
            />
            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </div>
          <button
            className="close-search-btn"
            onClick={onClose}
            aria-label="Close search"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="global-search-body">
          {!searchQuery && (
            <div className="search-empty-state">
              <FontAwesomeIcon icon={faSearch} className="empty-icon" />
              <p>Start typing to search across all content</p>
              <div className="search-shortcuts">
                <span className="shortcut-hint">
                  Press <kbd>ESC</kbd> to close
                </span>
              </div>
            </div>
          )}

          {searchQuery && isSearching && (
            <div className="search-loading">
              <div className="loading-spinner"></div>
              <p>Searching...</p>
            </div>
          )}

          {searchQuery && !isSearching && totalResults === 0 && (
            <div className="search-no-results">
              <p>No results found for "{searchQuery}"</p>
              <p className="suggestion">Try different keywords or check your spelling</p>
            </div>
          )}

          {searchQuery && !isSearching && totalResults > 0 && (
            <div className="search-results">
              <div className="results-summary">
                Found {totalResults} result{totalResults !== 1 ? 's' : ''}
              </div>

              {results.publications.length > 0 && (
                <div className="result-category">
                  <div className="category-header">
                    <FontAwesomeIcon icon={getCategoryIcon('publications')} />
                    <h3>{getCategoryLabel('publications')}</h3>
                    <span className="result-count">{results.publications.length}</span>
                  </div>
                  <div className="result-list">
                    {results.publications.map((pub, index) => {
                      const globalIndex = allResults.findIndex(
                        r => r.type === 'publications' && r.item === pub
                      );
                      return (
                        <div
                          key={index}
                          ref={el => { resultsRef.current[globalIndex] = el; }}
                          className={`result-item ${selectedIndex === globalIndex ? 'selected' : ''}`}
                          onClick={() => handleResultClick('publications')}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleResultClick('publications');
                            }
                          }}
                        >
                          <div className="result-title">{pub.title}</div>
                          <div className="result-meta">
                            {pub.venue} • {pub.year}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {results.research.length > 0 && (
                <div className="result-category">
                  <div className="category-header">
                    <FontAwesomeIcon icon={getCategoryIcon('research')} />
                    <h3>{getCategoryLabel('research')}</h3>
                    <span className="result-count">{results.research.length}</span>
                  </div>
                  <div className="result-list">
                    {results.research.map((item, index) => {
                      const globalIndex = allResults.findIndex(
                        r => r.type === 'research' && r.item === item
                      );
                      return (
                        <div
                          key={index}
                          ref={el => { resultsRef.current[globalIndex] = el; }}
                          className={`result-item ${selectedIndex === globalIndex ? 'selected' : ''}`}
                          onClick={() => handleResultClick('research')}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleResultClick('research');
                            }
                          }}
                        >
                          <div className="result-title">{item.position}</div>
                          <div className="result-meta">
                            {item.lab} • {item.duration}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {results.teaching.length > 0 && (
                <div className="result-category">
                  <div className="category-header">
                    <FontAwesomeIcon icon={getCategoryIcon('teaching')} />
                    <h3>{getCategoryLabel('teaching')}</h3>
                    <span className="result-count">{results.teaching.length}</span>
                  </div>
                  <div className="result-list">
                    {results.teaching.map((item, index) => {
                      const globalIndex = allResults.findIndex(
                        r => r.type === 'teaching' && r.item === item
                      );
                      return (
                        <div
                          key={index}
                          ref={el => { resultsRef.current[globalIndex] = el; }}
                          className={`result-item ${selectedIndex === globalIndex ? 'selected' : ''}`}
                          onClick={() => handleResultClick('teaching')}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleResultClick('teaching');
                            }
                          }}
                        >
                          <div className="result-title">{item.course}</div>
                          <div className="result-meta">
                            {item.university} • {item.date}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {results.education.length > 0 && (
                <div className="result-category">
                  <div className="category-header">
                    <FontAwesomeIcon icon={getCategoryIcon('education')} />
                    <h3>{getCategoryLabel('education')}</h3>
                    <span className="result-count">{results.education.length}</span>
                  </div>
                  <div className="result-list">
                    {results.education.map((item, index) => {
                      const globalIndex = allResults.findIndex(
                        r => r.type === 'education' && r.item === item
                      );
                      return (
                        <div
                          key={index}
                          ref={el => { resultsRef.current[globalIndex] = el; }}
                          className={`result-item ${selectedIndex === globalIndex ? 'selected' : ''}`}
                          onClick={() => handleResultClick('education')}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleResultClick('education');
                            }
                          }}
                        >
                          <div className="result-title">{item.degree}</div>
                          <div className="result-meta">
                            {item.university} • {item.duration}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {results.news.length > 0 && (
                <div className="result-category">
                  <div className="category-header">
                    <FontAwesomeIcon icon={getCategoryIcon('news')} />
                    <h3>{getCategoryLabel('news')}</h3>
                    <span className="result-count">{results.news.length}</span>
                  </div>
                  <div className="result-list">
                    {results.news.map((item, index) => {
                      const globalIndex = allResults.findIndex(
                        r => r.type === 'news' && r.item === item
                      );
                      return (
                        <div
                          key={index}
                          ref={el => { resultsRef.current[globalIndex] = el; }}
                          className={`result-item ${selectedIndex === globalIndex ? 'selected' : ''}`}
                          onClick={() => handleResultClick('news')}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleResultClick('news');
                            }
                          }}
                        >
                          <div className="result-title">{item.description}</div>
                          <div className="result-meta">{item.date}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {results.awards.length > 0 && (
                <div className="result-category">
                  <div className="category-header">
                    <FontAwesomeIcon icon={getCategoryIcon('awards')} />
                    <h3>{getCategoryLabel('awards')}</h3>
                    <span className="result-count">{results.awards.length}</span>
                  </div>
                  <div className="result-list">
                    {results.awards.map((item, index) => {
                      const globalIndex = allResults.findIndex(
                        r => r.type === 'awards' && r.item === item
                      );
                      return (
                        <div
                          key={index}
                          ref={el => { resultsRef.current[globalIndex] = el; }}
                          className={`result-item ${selectedIndex === globalIndex ? 'selected' : ''}`}
                          onClick={() => handleResultClick('awards')}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleResultClick('awards');
                            }
                          }}
                        >
                          <div className="result-title">{item.description}</div>
                          <div className="result-meta">{item.date}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="global-search-footer">
          <div className="search-tips">
            <span>
              <kbd>↑</kbd> <kbd>↓</kbd> to navigate
            </span>
            <span>
              <kbd>↵</kbd> to select
            </span>
            <span>
              <kbd>ESC</kbd> to close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;
