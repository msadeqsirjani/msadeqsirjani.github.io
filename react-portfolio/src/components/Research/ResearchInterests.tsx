import { fetchResearchInterests, researchInterests } from '../../data/content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useContentData from '../../hooks/useContentData';
import { sectionHref } from '../../constants/siteNav';

const ResearchInterests = () => {
  const { data: interests } = useContentData(fetchResearchInterests, researchInterests, {
    logLabel: 'research interests data',
  });

  return (
    <section id="research-interests" className="section">
      <div className="container">
        <h2 className="section-title">Research Interests</h2>
        <div className="interests-container">
          {interests.map((interest, index) => (
            <div key={index} className="interest-card">
              <FontAwesomeIcon icon={interest.icon} className="interest-icon" />
              <span dangerouslySetInnerHTML={{ __html: interest.name }}></span>
            </div>
          ))}
        </div>
        <p className="interests-crossnav">
          Related on this site:{' '}
          <a href={sectionHref('publications')}>publications</a> ·{' '}
          <a href={sectionHref('research')}>research experience</a>
        </p>
      </div>
    </section>
  );
};

export default ResearchInterests;
