import {fetchNews, news} from '../../data/content';
import useContentData from '../../hooks/useContentData';
import {sanitizeHtml} from '../../utils/sanitizeHtml';
import {ROUTE_PATHS} from '../../constants/siteNav';
import {navLinkProps} from '../../utils/router';

const HOME_NEWS_LIMIT = 10;

interface NewsProps {
  /**
   * Home renders the 10 most recent items in a scrollable box with a "view all"
   * link; the dedicated /news page (default) renders the full list, no scroll.
   */
  scrollable?: boolean;
}

const News = ({scrollable = false}: NewsProps) => {
  const {data: newsItems} = useContentData(fetchNews, news, {
    logLabel: 'news data',
  });

  // News data is ordered newest-first, so the head is the most recent.
  const items = scrollable ? newsItems.slice(0, HOME_NEWS_LIMIT) : newsItems;

  return (
    <section id="news" className="section">
      <div className="container">
        <h2 className="section-title">News</h2>
        <ul className={scrollable ? 'news-scroll' : 'news-list'}>
          {items.map((item, index) => (
            <li key={`${item.date}-${index}`} className="news-row">
              <span className="news-row-date">{item.date}</span>
              <span
                className="news-row-text"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(item.description),
                }}
              />
            </li>
          ))}
        </ul>
        {scrollable && (
          <div className="pub-view-more-row">
            <a className="pub-view-more" {...navLinkProps(ROUTE_PATHS.news)}>
              View all news →
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default News;
