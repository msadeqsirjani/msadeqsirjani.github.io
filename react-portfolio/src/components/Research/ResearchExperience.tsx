import { fetchResearchExperience, researchExperience } from '../../data/content';
import type { ResearchItem } from '../../types';
import TimelineSection from '../TimelineSection/TimelineSection';
import useContentData from '../../hooks/useContentData';
import useSettings from '../../hooks/useSettings';

const getLabInitials = (lab: string) =>
  lab
    .split(' ')
    .filter(w => w.length > 2)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('');

const ResearchExperience = () => {
  const { data: researchItems } = useContentData(fetchResearchExperience, researchExperience, {
    logLabel: 'research experience data',
  });
  const { settings } = useSettings();

  return (
    <TimelineSection<ResearchItem>
      id="research"
      title="Research Experience"
      items={researchItems}
      listClassName="research-timeline"
      itemClassName="research-item"
      dateWrapperClassName="research-dates"
      dateClassName="timeline"
      contentWrapperClassName="research-content"
      getItemKey={(item, index) => `${item.position}-${item.lab}-${index}`}
      getItemClassName={(item) => (item.current ? 'current' : undefined)}
      renderDate={(item) => (
        <>
          <span className="timeline research-date-text">{item.duration}</span>
          {item.current && <span className="research-current-badge">Current</span>}
        </>
      )}
      renderContent={(item) => (
        <>
          <div className="research-main">
            <div className="research-main__logo">
              {item.logo ? (
                <img
                  src={item.logo}
                  alt=""
                  className="research-lab-logo"
                  width={64}
                  height={64}
                  decoding="async"
                />
              ) : (
                <div className="research-lab-logo research-lab-logo--placeholder">
                  {getLabInitials(item.lab)}
                </div>
              )}
            </div>
            <div className="research-main__body">
              <div className="research-title-row">
                {item.labUrl ? (
                  <a href={item.labUrl} className="research-lab" target="_blank" rel="noopener">{item.lab}</a>
                ) : (
                  <span className="research-lab">{item.lab}</span>
                )}
                {item.university ? <span className="research-sep">,&nbsp;</span> : null}
                {item.university ? <span className="research-university">{item.university}</span> : null}
              </div>
              <div className="research-date-mobile">
                <span className="timeline research-date-text">{item.duration}</span>
                {item.current && <span className="research-current-badge">Current</span>}
              </div>
              <div className="research-description">
                <ul>
                  {item.description.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
      initialLimit={settings.displayLimits.research.initial}
      showMoreEnabled={settings.displayLimits.research.showMoreEnabled}
    />
  );
};

export default ResearchExperience;
