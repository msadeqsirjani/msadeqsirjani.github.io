import Icon from '../Icon/Icon';
import {faAward} from '@fortawesome/free-solid-svg-icons';
import {awards, fetchAwards} from '../../data/content';
import useContentData from '../../hooks/useContentData';
import {sanitizeHtml} from '../../utils/sanitizeHtml';
import ContentState from '../ContentState/ContentState';
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader';

const Awards = () => {
  const {
    data: awardItems,
    loading,
    error,
    retry,
  } = useContentData(fetchAwards, awards, {
    logLabel: 'awards data',
  });

  return (
    <section id="awards" className="section awards-section">
      <div className="container">
        <h1 className="section-title page-title">Awards &amp; Honors</h1>
        {loading ? (
          <SkeletonLoader
            type="record"
            count={3}
            label="Loading awards and honors"
          />
        ) : error ? (
          <ContentState
            variant="error"
            title="Awards and honors unavailable"
            message={error}
            actionLabel="Try again"
            onAction={retry}
          />
        ) : awardItems.length === 0 ? (
          <ContentState
            variant="empty"
            title="No awards listed yet"
            message="Awards and honors will appear here when they are available."
          />
        ) : (
          <ul className="awards-list">
            {awardItems.map((item, index) => (
              <li key={`${item.date}-${index}`} className="award-row">
                <span className="award-icon" aria-hidden="true">
                  <Icon icon={faAward} />
                </span>
                <div className="award-body">
                  <time className="item-date award-date">{item.date}</time>
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
        )}
      </div>
    </section>
  );
};

export default Awards;
