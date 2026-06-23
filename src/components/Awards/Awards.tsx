import {awards, fetchAwards} from '../../data/content';
import useContentData from '../../hooks/useContentData';
import {sanitizeHtml} from '../../utils/sanitizeHtml';

interface AwardsProps {
  scrollable?: boolean;
}

const Awards = ({scrollable = false}: AwardsProps) => {
  const {data: awardItems} = useContentData(fetchAwards, awards, {
    logLabel: 'awards data',
  });

  return (
    <section id="awards" className="section">
      <div className="container">
        <h2 className="section-title">Awards & Honors</h2>
        <ul className={scrollable ? 'news-scroll' : 'news-list'}>
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
