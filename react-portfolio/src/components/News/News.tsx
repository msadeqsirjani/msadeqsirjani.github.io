import { news } from '../../data/content';

const News = () => {
  return (
    <section id="news" className="section">
      <div className="container">
        <h2 className="section-title">News</h2>
        <div className="news-list">
          {news.map((item, index) => (
            <div key={index} className="news-item">
              <div className="news-dates">
                <span className="news-date">{item.date}</span>
              </div>
              <div className="news-content">
                <span className="news-description">{item.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
