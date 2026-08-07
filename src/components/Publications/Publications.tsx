import {useMemo} from 'react';
import {fetchPublications, publications as pubData} from '../../data/content';
import useContentData from '../../hooks/useContentData';
import type {Publication} from '../../types';
import {ROUTE_PATHS} from '../../constants/siteNav';
import {navLinkProps} from '../../utils/router';
import ContentState from '../ContentState/ContentState';
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader';

const MAX_PREVIEW = 5;

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    published: 'Published',
    accepted: 'Accepted',
    review: 'Under review',
    arxiv: 'Preprint',
  };
  return labels[status] || status;
};

const renderAuthors = (authors: string) =>
  authors.split(', ').map((author, idx, arr) => (
    <span key={idx}>
      {author.includes('Sirjani') ? <strong>{author}</strong> : author}
      {idx < arr.length - 1 && ', '}
    </span>
  ));

const pubKey = (pub: Publication) => pub.bibtexId ?? `${pub.year}-${pub.title}`;

const Publications = () => {
  const {
    data: publications,
    loading,
    error,
    retry,
  } = useContentData(fetchPublications, pubData, {
    logLabel: 'publications data',
  });

  const preview = useMemo(
    () =>
      [...publications]
        .sort((a, b) => Number(b.year) - Number(a.year))
        .slice(0, MAX_PREVIEW),
    [publications],
  );

  return (
    <section id="publications" className="section">
      <div className="container">
        <div className="section-heading-row">
          <h2 className="section-title">Publications</h2>
          <a
            className="section-view-all"
            aria-label="View all publications"
            {...navLinkProps(ROUTE_PATHS.publications)}
          >
            View all
            <span className="section-view-all-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
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
            headingLevel={3}
            compact
          />
        ) : preview.length === 0 ? (
          <ContentState
            variant="empty"
            title="No publications yet"
            message="Publication records will appear here when they are available."
            headingLevel={3}
            compact
          />
        ) : (
          <div className="publications-container">
            <div className="publication-list" role="list">
              {preview.map(pub => (
                <div
                  key={pubKey(pub)}
                  className="publication-item"
                  role="listitem"
                >
                  <h3 className="publication-title">{pub.title}</h3>
                  {(pub.authors ||
                    (pub.venue && !/preprint/i.test(pub.venue))) && (
                    <div className="publication-citation">
                      {pub.authors && (
                        <p className="publication-authors">
                          {renderAuthors(pub.authors)}
                        </p>
                      )}
                      {pub.venue && !/preprint/i.test(pub.venue) && (
                        <p className="publication-venue">
                          <span className="pub-venue-label">Venue</span>
                          <cite>{pub.venue}</cite>
                        </p>
                      )}
                    </div>
                  )}
                  <div className="pub-card-meta">
                    <span
                      className={`pub-status-badge pub-status-${pub.status}`}
                    >
                      {getStatusLabel(pub.status)}
                    </span>
                    <span className="pub-card-metaitem">{pub.year}</span>
                    {!!pub.citations && (
                      <span className="pub-card-metaitem">
                        {pub.citations}{' '}
                        {pub.citations === 1 ? 'citation' : 'citations'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Publications;
