import { education } from '../../data/content';
import TimelineSection from '../common/TimelineSection';

const Education = () => {
  const educationItems = education.map(item => ({
    ...item,
    date: item.duration,
  }));

  return (
    <TimelineSection
      id="education"
      title="Education"
      items={educationItems}
      listClassName="education-timeline"
      itemClassName="education-item"
      dateWrapperClassName="education-dates"
      dateClassName="duration"
      contentWrapperClassName="education-content"
      getItemClassName={(item) => (item.current ? 'current' : '')}
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
