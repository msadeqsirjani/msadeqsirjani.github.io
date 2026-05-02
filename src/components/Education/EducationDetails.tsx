import type { EducationItem } from '../../types';

type EducationDetailsProps = {
  item: EducationItem;
};

const EducationDetails = ({ item }: EducationDetailsProps) => (
  <div className="education-main__body">
    <span className="education-degree">{item.degree}</span>
    <div className="education-university-row">
      <span className="education-university">
        {item.universityUrl ? (
          <a href={item.universityUrl} target="_blank" rel="noopener noreferrer">
            {item.university}
          </a>
        ) : (
          item.university
        )}
      </span>
      {item.gpa ? <span className="education-gpa">{item.gpa}</span> : null}
    </div>
    <div className="education-date-mobile">
      <span className="duration">{item.duration}</span>
      {item.current ? <span className="education-current-badge">Current</span> : null}
    </div>
  </div>
);

export default EducationDetails;
