import { fetchResearchExperience, researchExperience } from '../../data/content';
import type { ResearchItem } from '../../types';
import TimelineSection from '../common/TimelineSection';
import useContentData from '../../hooks/useContentData';
import useSettings from '../../hooks/useSettings';

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
      renderDate={(item) => item.duration}
      renderContent={(item) => (
        <>
          <span className="research-position">{item.position}</span>
          <span className="research-lab">{item.lab}</span>
          <div className="research-description">
            <ul>
              {item.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div>
        </>
      )}
      initialLimit={settings.displayLimits.research.initial}
      showMoreEnabled={settings.displayLimits.research.showMoreEnabled}
    />
  );
};

export default ResearchExperience;
