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
                <div className="education-header">
                  {item.logo && (
                    item.universityUrl ? (
                      <a 
                        href={item.universityUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        title={item.universityName || item.university}
                        className="education-logo-link"
                      >
                        <img 
                          src={item.logo} 
                          alt={`${item.university} logo`}
                          className="education-logo"
                        />
                      </a>
                    ) : (
                      <img 
                        src={item.logo} 
                        alt={`${item.university} logo`}
                        className="education-logo"
                        title={item.universityName || item.university}
                      />
                    )
                  )}
                  <div className="education-details">
                    <span className="education-degree">{item.degree}</span>
                    <span className="education-university">{item.university}</span>
                    <span className="education-gpa">{item.gpa}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
