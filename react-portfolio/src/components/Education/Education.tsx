import { education } from '../../data/content';

const Education = () => {
  return (
    <section id="education" className="section">
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className="education-timeline">
          {education.map((item, index) => (
            <div key={index} className={`education-item ${item.current ? 'current' : ''}`}>
              <div className="education-dates">
                <span className="duration">{item.duration}</span>
              </div>
              <div className="education-content">
                <span className="education-degree">{item.degree}</span>
                <span className="education-university">{item.university}</span>
                <span className="education-gpa">{item.gpa}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
