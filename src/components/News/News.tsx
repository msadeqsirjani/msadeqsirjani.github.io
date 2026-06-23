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

  const items = newsItems;

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
      </div>
    </section>
  );
};

export default News;
