import {useMemo, useState} from 'react';
import {fetchPublications, publications as pubData} from '../../data/content';
import useContentData from '../../hooks/useContentData';
import type {Publication} from '../../types';
import PublicationItem from './PublicationItem';

const pubKey = (pub: Publication) => pub.bibtexId ?? `${pub.year}-${pub.title}`;

const STATUS_FILTERS: {value: Publication['status']; label: string}[] = [
  {value: 'published', label: 'Published'},
  {value: 'accepted', label: 'Accepted'},
  {value: 'review', label: 'Under Review'},
  {value: 'arxiv', label: 'Preprint'},
];

const PublicationsPage = () => {
  const {data: publications} = useContentData(fetchPublications, pubData, {
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

  return (
    <section id="publications" className="section publications-page">
      <div className="container">
        <header className="pub-page-header">
          <h1 className="pub-page-title">Publications</h1>
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

        {filtered.length > 0 ? (
          <div className="pub-card-list" role="list">
            {filtered.map(pub => (
              <PublicationItem key={pubKey(pub)} pub={pub} />
            ))}
          </div>
        ) : (
          <p className="pub-empty">No publications match your filters.</p>
        )}
      </div>
    </section>
  );
};

export default PublicationsPage;
