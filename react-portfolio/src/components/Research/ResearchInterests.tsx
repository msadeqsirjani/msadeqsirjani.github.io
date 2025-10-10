import { researchInterests } from '../../data/content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ResearchInterests = () => {
  return (
    <section id="research-interests" className="section">
      <div className="container">
        <h2 className="section-title">Research Interests</h2>
        <div className="interests-container">
          {researchInterests.map((interest, index) => (
            <div key={index} className="interest-card">
              <FontAwesomeIcon icon={interest.icon} className="interest-icon" />
              <span dangerouslySetInnerHTML={{ __html: interest.name }}></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchInterests;
