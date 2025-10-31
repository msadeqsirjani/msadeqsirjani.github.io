import { education } from '../../data/content';
import type { EducationItem } from '../../types';
import TimelineSection from '../common/TimelineSection';

const Education = () => {
  return (
    <TimelineSection<EducationItem>
      id="education"
      title="Education"
      items={education}
      listClassName="education-timeline"
      itemClassName="education-item"
      dateWrapperClassName="education-dates"
      dateClassName="duration"
      contentWrapperClassName="education-content"
      getItemKey={(item, index) => `${item.degree}-${item.university}-${index}`}
      getItemClassName={(item) => (item.current ? 'current' : undefined)}
      renderDate={(item) => item.duration}
      renderContent={(item) => (
        <>
          <span className="education-degree">{item.degree}</span>
          <span className="education-university">{item.university}</span>
          {item.gpa && <span className="education-gpa">{item.gpa}</span>}
        </>
      )}
    />
  );
};

export default Education;
