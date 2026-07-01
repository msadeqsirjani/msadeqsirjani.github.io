import {fetchNews, news} from '../../data/content';
import useContentData from '../../hooks/useContentData';
import {sanitizeHtml} from '../../utils/sanitizeHtml';

interface NewsProps {
  scrollable?: boolean;
}

const News = ({scrollable = false}: NewsProps) => {
  const {data: newsItems} = useContentData(fetchNews, news, {
    logLabel: 'news data',
  });

  if (scrollable) {
    return (
      <section id="news" className="section">
        <div className="container">
          <h2 className="section-title">News</h2>
          <ul className="news-scroll">
            {newsItems.map((item, index) => (
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
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="section news-section">
      <div className="container">
        <h2 className="section-title">News</h2>
        <ul className="news-card-list">
          {newsItems.map((item, index) => (
            <li key={`${item.date}-${index}`} className="news-card">
              <span className="news-card-date">{item.date}</span>
              <span
                className="news-card-text"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(item.description),
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default News;
