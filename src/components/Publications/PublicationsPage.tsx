import {useMemo} from 'react';
import {fetchPublications, publications as pubData} from '../../data/content';
import useContentData from '../../hooks/useContentData';
import type {Publication} from '../../types';
import PublicationItem from './PublicationItem';

const pubKey = (pub: Publication) => pub.bibtexId ?? `${pub.year}-${pub.title}`;

const PublicationsPage = () => {
  const {data: publications} = useContentData(fetchPublications, pubData, {
    logLabel: 'publications data',
  });

  const sorted = useMemo(
    () => [...publications].sort((a, b) => Number(b.year) - Number(a.year)),
    [publications],
  );

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

        <div className="pub-card-list" role="list">
          {sorted.map(pub => (
            <PublicationItem key={pubKey(pub)} pub={pub} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicationsPage;
