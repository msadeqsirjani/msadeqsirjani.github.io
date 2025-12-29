import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faBook, faGraduationCap, faMicroscope, faChalkboardTeacher, faNewspaper, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { useGlobalSearch } from '../../hooks/useGlobalSearch';
import './GlobalSearch.css';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  {
    key: 'publications' as const,
    icon: faBook,
    label: 'Publications',
    getTitle: (item: any) => item.title,
    getMeta: (item: any) => `${item.venue} • ${item.year}`
  },
  {
    key: 'research' as const,
    icon: faMicroscope,
    label: 'Research',
    getTitle: (item: any) => item.position,
    getMeta: (item: any) => `${item.lab} • ${item.duration}`
  },
  {
    key: 'teaching' as const,
    icon: faChalkboardTeacher,
    label: 'Teaching',
    getTitle: (item: any) => item.course,
    getMeta: (item: any) => `${item.university} • ${item.date}`
  },
  {
    key: 'education' as const,
    icon: faGraduationCap,
    label: 'Education',
    getTitle: (item: any) => item.degree,
    getMeta: (item: any) => `${item.university} • ${item.duration}`
  },
  {
    key: 'news' as const,
    icon: faNewspaper,
    label: 'News',
    getTitle: (item: any) => item.description,
    getMeta: (item: any) => item.date
  },
  {
    key: 'awards' as const,
    icon: faTrophy,
    label: 'Awards',
    getTitle: (item: any) => item.description,
    getMeta: (item: any) => item.date
  }
];

const GlobalSearch = ({ isOpen, onClose }: GlobalSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { results, isSearching } = useGlobalSearch(searchQuery);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleResultClick = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onClose();
      setSearchQuery('');
    }
  }, [onClose]);

  const allResults = useMemo(() =>
    categories.flatMap(cat =>
      results[cat.key].map(item => ({ type: cat.key, item }))
    ), [results]
  );

  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchQuery, results]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => prev < allResults.length - 1 ? prev + 1 : prev);
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

  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current[selectedIndex]) {
      resultsRef.current[selectedIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedIndex]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

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
              <button className="clear-search-btn" onClick={() => setSearchQuery('')} aria-label="Clear search">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </div>
          <button className="close-search-btn" onClick={onClose} aria-label="Close search">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="global-search-body">
          {!searchQuery && (
            <div className="search-empty-state">
              <FontAwesomeIcon icon={faSearch} className="empty-icon" />
              <p>Start typing to search across all content</p>
              <div className="search-shortcuts">
                <span className="shortcut-hint">Press <kbd>ESC</kbd> to close</span>
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

              {categories.map(category => {
                const categoryResults = results[category.key];
                if (categoryResults.length === 0) return null;

                return (
                  <div key={category.key} className="result-category">
                    <div className="category-header">
                      <FontAwesomeIcon icon={category.icon} />
                      <h3>{category.label}</h3>
                      <span className="result-count">{categoryResults.length}</span>
                    </div>
                    <div className="result-list">
                      {categoryResults.map((item, index) => {
                        const globalIndex = allResults.findIndex(
                          r => r.type === category.key && r.item === item
                        );
                        return (
                          <div
                            key={index}
                            ref={el => { resultsRef.current[globalIndex] = el; }}
                            className={`result-item ${selectedIndex === globalIndex ? 'selected' : ''}`}
                            onClick={() => handleResultClick(category.key)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleResultClick(category.key);
                              }
                            }}
                          >
                            <div className="result-title">{category.getTitle(item)}</div>
                            <div className="result-meta">{category.getMeta(item)}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="global-search-footer">
          <div className="search-tips">
            <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
            <span><kbd>↵</kbd> to select</span>
            <span><kbd>ESC</kbd> to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;
