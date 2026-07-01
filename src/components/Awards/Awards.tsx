import Icon from '../Icon/Icon';
import {faAward} from '@fortawesome/free-solid-svg-icons';
import {awards, fetchAwards} from '../../data/content';
import useContentData from '../../hooks/useContentData';
import {sanitizeHtml} from '../../utils/sanitizeHtml';

const Awards = () => {
  const {data: awardItems} = useContentData(fetchAwards, awards, {
    logLabel: 'awards data',
  });

  return (
    <section id="awards" className="section awards-section">
      <div className="container">
        <h2 className="section-title">Awards &amp; Honors</h2>
        <ul className="awards-list">
          {awardItems.map((item, index) => (
            <li key={`${item.date}-${index}`} className="award-row">
              <span className="award-icon" aria-hidden="true">
                <Icon icon={faAward} />
              </span>
              <div className="award-body">
                <span className="award-date">{item.date}</span>
                <span
                  className="award-text"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(item.description),
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Awards;
