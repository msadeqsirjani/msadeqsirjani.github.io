import {fetchResearchInterests, researchInterests} from '../../data/content';
import Icon from '../Icon/Icon';
import useContentData from '../../hooks/useContentData';
import ContentState from '../ContentState/ContentState';
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader';

const ResearchInterests = () => {
  const {
    data: interests,
    loading,
    error,
    retry,
  } = useContentData(fetchResearchInterests, researchInterests, {
    logLabel: 'research interests data',
  });

  return (
    <section id="research-interests" className="section">
      <div className="container">
        <h1 className="section-title page-title">Research Interests</h1>
        {loading ? (
          <SkeletonLoader
            type="record"
            count={6}
            label="Loading research interests"
          />
        ) : error ? (
          <ContentState
            variant="error"
            title="Research interests unavailable"
            message={error}
            actionLabel="Try again"
            onAction={retry}
          />
        ) : interests.length === 0 ? (
          <ContentState
            variant="empty"
            title="No research interests yet"
            message="Research areas will appear here when they are available."
          />
        ) : (
          <ul className="interests-list">
            {interests.map(interest => (
              <li key={interest.name} className="interest-row">
                <span className="interest-mark" aria-hidden="true">
                  <Icon icon={interest.icon} className="interest-icon" />
                </span>
                <span className="interest-name">
                  {interest.name.replace(/<br\s*\/?>/gi, ' ')}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default ResearchInterests;
