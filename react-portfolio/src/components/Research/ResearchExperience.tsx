import { researchExperience } from '../../data/content';

const ResearchExperience = () => {
  return (
    <section id="research" className="section">
      <div className="container">
        <h2 className="section-title">Research Experience</h2>
        <div className="research-timeline">
          {researchExperience.map((item, index) => (
            <div key={index} className={`research-item ${item.current ? 'current' : ''}`}>
              <div className="research-dates">
                <span className="timeline">{item.duration}</span>
              </div>
              <div className="research-content">
                <span className="research-position">{item.position}</span>
                <span className="research-lab">{item.lab}</span>
                <div className="research-description">
                  <ul>
                    {item.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchExperience;
