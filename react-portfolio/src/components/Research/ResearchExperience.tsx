import { researchExperience } from '../../data/content';
import TimelineSection from '../common/TimelineSection';

const ResearchExperience = () => {
  const researchItems = researchExperience.map(item => ({
    ...item,
    date: item.duration,
  }));

  return (
    <TimelineSection
      id="research"
      title="Research Experience"
      items={researchItems}
      listClassName="research-timeline"
      itemClassName="research-item"
      dateWrapperClassName="research-dates"
      dateClassName="timeline"
      contentWrapperClassName="research-content"
      getItemClassName={(item) => (item.current ? 'current' : '')}
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
    />
  );
};

export default ResearchExperience;
