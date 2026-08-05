import {fetchNews, news} from '../../data/content';
import useContentData from '../../hooks/useContentData';
import {sanitizeHtml} from '../../utils/sanitizeHtml';
import {ROUTE_PATHS} from '../../constants/siteNav';
import {navLinkProps} from '../../utils/router';
import ContentState from '../ContentState/ContentState';
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader';

interface NewsProps {
  scrollable?: boolean;
}

const News = ({scrollable = false}: NewsProps) => {
  const {
    data: newsItems,
    loading,
    error,
    retry,
  } = useContentData(fetchNews, news, {
    logLabel: 'news data',
  });

  const contentState = loading ? (
    <SkeletonLoader type="card" count={3} label="Loading news" />
  ) : error ? (
    <ContentState
      variant="error"
      title="News unavailable"
      message={error}
      actionLabel="Try again"
      onAction={retry}
      headingLevel={scrollable ? 3 : 2}
      compact={scrollable}
    />
  ) : newsItems.length === 0 ? (
    <ContentState
      variant="empty"
      title="No news yet"
      message="News and recent updates will appear here when they are available."
      headingLevel={scrollable ? 3 : 2}
      compact={scrollable}
    />
  ) : null;

  if (scrollable) {
    return (
      <section id="news" className="section">
        <div className="container">
          <div className="section-heading-row">
            <h2 className="section-title">News</h2>
            <a
              className="section-view-all"
              aria-label="View all news"
              {...navLinkProps(ROUTE_PATHS.news)}
            >
              View all
              <span className="section-view-all-arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
          {contentState ?? (
            <ul className="news-scroll">
              {newsItems.map((item, index) => (
                <li key={`${item.date}-${index}`} className="news-row">
                  <time className="item-date news-row-date">{item.date}</time>
                  <span
                    className="news-row-text"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(item.description),
                    }}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="section news-section">
      <div className="container">
        <h1 className="section-title page-title">News</h1>
        {contentState ?? (
          <ul className="news-card-list">
            {newsItems.map((item, index) => (
              <li key={`${item.date}-${index}`} className="news-card">
                <time className="item-date news-card-date">{item.date}</time>
                <span
                  className="news-card-text"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(item.description),
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default News;
