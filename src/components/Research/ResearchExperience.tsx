import {fetchResearchExperience, researchExperience} from '../../data/content';
import type {ResearchItem} from '../../types';
import useContentData from '../../hooks/useContentData';
import ContentState from '../ContentState/ContentState';
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader';

const getLabInitials = (lab: string) =>
  lab
    .split(' ')
    .filter(w => w.length > 2)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('');

const ResearchExperience = () => {
  const {
    data: researchItems,
    loading,
    error,
    retry,
  } = useContentData(fetchResearchExperience, researchExperience, {
    logLabel: 'research experience data',
  });

  return (
    <section id="research" className="section">
      <div className="container">
        <h2 className="section-title">Research Experience</h2>
        {loading ? (
          <SkeletonLoader
            type="record"
            count={2}
            label="Loading research experience"
          />
        ) : error ? (
          <ContentState
            variant="error"
            title="Research experience unavailable"
            message={error}
            actionLabel="Try again"
            onAction={retry}
            headingLevel={3}
          />
        ) : researchItems.length === 0 ? (
          <ContentState
            variant="empty"
            title="No research experience yet"
            message="Research appointments will appear here when they are available."
            headingLevel={3}
          />
        ) : (
          <ul className="research-list">
            {researchItems.map((item: ResearchItem, index) => (
              <li
                key={`${item.position}-${item.lab}-${index}`}
                className="research-row"
              >
                <div className="research-head">
                  <span
                    className={`research-logo ${
                      item.logo ? 'research-logo--img' : 'research-logo--ph'
                    }`}
                  >
                    {item.logo ? (
                      <img
                        src={item.logo}
                        alt={`${item.lab} logo`}
                        width={40}
                        height={40}
                        decoding="async"
                      />
                    ) : (
                      <span className="research-logo--placeholder">
                        {getLabInitials(item.lab)}
                      </span>
                    )}
                  </span>
                  <div className="research-headtext">
                    <div className="research-title-row">
                      <h3 className="research-title">
                        {item.position}
                        <span className="research-sep"> · </span>
                        {item.labUrl ? (
                          <a
                            href={item.labUrl}
                            className="research-lab"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.lab}
                          </a>
                        ) : (
                          <span className="research-lab">{item.lab}</span>
                        )}
                      </h3>
                      {item.current && (
                        <span className="research-current">Current</span>
                      )}
                    </div>
                    <p className="research-meta">
                      {item.university}
                      {item.university && item.duration && (
                        <span className="research-sep"> · </span>
                      )}
                      {item.duration}
                    </p>
                    {item.advisor && (
                      <p className="research-advisor">
                        Advisor:{' '}
                        {item.advisorUrl ? (
                          <a
                            href={item.advisorUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.advisor}
                          </a>
                        ) : (
                          item.advisor
                        )}
                      </p>
                    )}
                  </div>
                </div>
                <ul className="research-points">
                  {item.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default ResearchExperience;
