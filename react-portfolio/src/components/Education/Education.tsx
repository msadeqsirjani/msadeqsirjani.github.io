import { education, fetchEducation } from '../../data/content';
import type { EducationItem } from '../../types';
import TimelineSection from '../TimelineSection/TimelineSection';
import useContentData from '../../hooks/useContentData';
import EducationLogo from './EducationLogo';
import EducationDetails from './EducationDetails';

const Education = () => {
  const { data: educationItems } = useContentData(fetchEducation, education, {
    logLabel: 'education data',
  });

  return (
    <TimelineSection<EducationItem>
      id="education"
      title="Education"
      items={educationItems}
      listClassName="education-timeline"
      itemClassName="education-item"
      dateWrapperClassName="education-dates"
      dateClassName="duration"
      contentWrapperClassName="education-content"
      getItemKey={(item, index) => `${item.degree}-${item.university}-${index}`}
      getItemClassName={(item) => (item.current ? 'current' : undefined)}
      renderDate={(item) => (
        <>
          <span className="duration">{item.duration}</span>
          {item.current && <span className="education-current-badge">Current</span>}
        </>
      )}
      renderContent={(item) => (
        <div className="education-main">
          <EducationLogo item={item} />
          <EducationDetails item={item} />
        </div>
      )}
    />
  );
};

export default Education;
