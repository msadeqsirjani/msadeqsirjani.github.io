import {awards, fetchAwards} from '../../data/content';
import useContentData from '../../hooks/useContentData';
import {sanitizeHtml} from '../../utils/sanitizeHtml';

const Awards = () => {
  const {data: awardItems} = useContentData(fetchAwards, awards, {
    logLabel: 'awards data',
  });

  return (
    <section id="awards" className="section">
      <div className="container">
        <h2 className="section-title">Awards & Honors</h2>
        <ul className="news-scroll">
          {awardItems.map((item, index) => (
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

export default Awards;
