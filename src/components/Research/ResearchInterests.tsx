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
            type="tile"
            count={3}
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
          <div className="interests-container">
            {interests.map((interest, index) => (
              <div key={index} className="interest-card">
                <Icon icon={interest.icon} className="interest-icon" />
                <span dangerouslySetInnerHTML={{__html: interest.name}}></span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ResearchInterests;
