import {useMemo, useState} from 'react';
import {fetchPublications, publications as pubData} from '../../data/content';
import useContentData from '../../hooks/useContentData';
import type {Publication} from '../../types';
import Icon from '../Icon/Icon';
import PublicationItem from './PublicationItem';
import {faRotateLeft} from '@fortawesome/free-solid-svg-icons';
import ContentState from '../ContentState/ContentState';
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader';

const pubKey = (pub: Publication) => pub.bibtexId ?? `${pub.year}-${pub.title}`;

const STATUS_FILTERS: {value: Publication['status']; label: string}[] = [
  {value: 'published', label: 'Published'},
  {value: 'accepted', label: 'Accepted'},
  {value: 'review', label: 'Under Review'},
  {value: 'arxiv', label: 'Preprint'},
];

const PublicationsPage = () => {
  const {
    data: publications,
    loading,
    error,
    retry,
  } = useContentData(fetchPublications, pubData, {
    logLabel: 'publications data',
  });

  const [query, setQuery] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const sorted = useMemo(
    () => [...publications].sort((a, b) => Number(b.year) - Number(a.year)),
    [publications],
  );

  const years = useMemo(
    () => [...new Set(sorted.map(pub => pub.year))],
    [sorted],
  );

  const statuses = useMemo(
    () =>
      STATUS_FILTERS.filter(status =>
        sorted.some(pub => pub.status === status.value),
      ),
    [sorted],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sorted.filter(pub => {
      if (yearFilter !== 'all' && pub.year !== yearFilter) return false;
      if (statusFilter !== 'all' && pub.status !== statusFilter) return false;
      if (!q) return true;
      return [pub.title, pub.venue, pub.authors, ...(pub.keywords ?? [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [sorted, query, yearFilter, statusFilter]);

  const hasActiveFilters =
    query.trim() !== '' || yearFilter !== 'all' || statusFilter !== 'all';
  const resultLabel = `${filtered.length} ${
    filtered.length === 1 ? 'publication' : 'publications'
  }`;
  const resetFilters = () => {
    setQuery('');
    setYearFilter('all');
    setStatusFilter('all');
  };

  return (
    <section id="publications" className="section publications-page">
      <div className="container">
        <header className="pub-page-header">
          <h1 className="section-title page-title pub-page-title">
            Publications
          </h1>
          <p className="pub-scholar-note">
            For complete and updated citation metrics, please visit my{' '}
            <a
              href="https://scholar.google.com/citations?user=EI5DizMAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Scholar profile
            </a>
            .
          </p>
        </header>

        {loading ? (
          <SkeletonLoader
            type="publication"
            count={3}
            label="Loading publications"
          />
        ) : error ? (
          <ContentState
            variant="error"
            title="Publications unavailable"
            message={error}
            actionLabel="Try again"
            onAction={retry}
          />
        ) : publications.length === 0 ? (
          <ContentState
            variant="empty"
            title="No publications yet"
            message="Publication records will appear here when they are available."
          />
        ) : (
          <>
            <div className="pub-filter-bar">
              <input
                type="search"
                className="pub-search"
                placeholder="Search by title, venue, author, or keyword..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                aria-label="Search publications"
              />
              <span className="pub-select-wrap">
                <select
                  className="pub-filter-select"
                  value={yearFilter}
                  onChange={e => setYearFilter(e.target.value)}
                  aria-label="Filter by year"
                >
                  <option value="all">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </span>
              <span className="pub-select-wrap">
                <select
                  className="pub-filter-select"
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  aria-label="Filter by status"
                >
                  <option value="all">All Statuses</option>
                  {statuses.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </span>
            </div>

            <div
              className="pub-filter-summary"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              <span>{resultLabel}</span>
              {hasActiveFilters && filtered.length > 0 && (
                <button
                  type="button"
                  className="pub-filter-reset"
                  onClick={resetFilters}
                >
                  <Icon icon={faRotateLeft} size="sm" />
                  Reset filters
                </button>
              )}
            </div>

            {filtered.length > 0 ? (
              <div className="pub-card-list" role="list">
                {filtered.map(pub => (
                  <PublicationItem
                    key={pubKey(pub)}
                    pub={pub}
                    headingLevel={2}
                  />
                ))}
              </div>
            ) : (
              <ContentState
                variant="empty"
                title="No matching publications"
                message="Try another search term or reset the current filters."
                actionLabel="Reset filters"
                onAction={resetFilters}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default PublicationsPage;
