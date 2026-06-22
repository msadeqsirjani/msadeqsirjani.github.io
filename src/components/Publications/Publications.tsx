import {useMemo} from 'react';
import {fetchPublications, publications as pubData} from '../../data/content';
import useContentData from '../../hooks/useContentData';
import type {Publication} from '../../types';

const MAX_PREVIEW = 5;

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    published: 'PUBLISHED',
    accepted: 'ACCEPTED',
    review: 'UNDER REVIEW',
    arxiv: 'PREPRINT',
  };
  return labels[status] || status.toUpperCase();
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
  const {data: publications} = useContentData(fetchPublications, pubData, {
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
        <h2 className="section-title">Publications</h2>
        <div className="publications-container">
          <div className="publication-list" role="list">
            {preview.map(pub => (
              <div
                key={pubKey(pub)}
                className="publication-item"
                role="listitem"
              >
                <div className="pub-card-meta">
                  <span className={`pub-status-badge pub-status-${pub.status}`}>
                    {getStatusLabel(pub.status)}
                  </span>
                  <span className="pub-card-metaitem">{pub.year}</span>
                </div>
                <h3 className="publication-title">{pub.title}</h3>
                {pub.authors && (
                  <p className="publication-authors">
                    {renderAuthors(pub.authors)}
                  </p>
                )}
                {pub.venue && !/preprint/i.test(pub.venue) && (
                  <p className="publication-venue">{pub.venue}</p>
                )}
              </div>
            ))}
          </div>
          <div className="pub-view-more-row">
            <a className="pub-view-more" href="#publications-all">
              View all publications →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;
