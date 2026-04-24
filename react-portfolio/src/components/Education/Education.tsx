import { education, fetchEducation } from '../../data/content';
import type { EducationItem } from '../../types';
import TimelineSection from '../TimelineSection/TimelineSection';
import useContentData from '../../hooks/useContentData';

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
        <>
          <span className="education-degree">{item.degree}</span>
          <div className="education-university-row">
            <span className="education-university">{item.university}</span>
            {item.gpa && <span className="education-gpa">{item.gpa}</span>}
          </div>
        </>
      )}
    />
  );
};

export default Education;
