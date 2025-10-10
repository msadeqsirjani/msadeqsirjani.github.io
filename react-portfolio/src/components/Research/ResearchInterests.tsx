import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNetworkWired, faMicrochip, faServer, faCogs, faBolt, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { researchInterests } from '../../data/content';

// Map icon names to FontAwesome icons
const iconMap: Record<string, any> = {
  'fa-network-wired': faNetworkWired,
  'fa-microchip': faMicrochip,
  'fa-server': faServer,
  'fa-cogs': faCogs,
  'fa-bolt': faBolt,
  'fa-sync-alt': faSyncAlt
};

const ResearchInterests = () => {
  return (
    <section id="research-interests" className="section">
      <div className="container">
        <h2 className="section-title">Research Interests</h2>
        <div className="interests-container">
          {researchInterests.map((interest, index) => (
            <div key={index} className="interest-card">
              <FontAwesomeIcon icon={iconMap[interest.icon]} />
              <span dangerouslySetInnerHTML={{ __html: interest.name }}></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchInterests;
