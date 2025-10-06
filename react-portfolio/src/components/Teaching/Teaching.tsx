import { teaching } from '../../data/content';

const Teaching = () => {
  return (
    <section id="teaching" className="section">
      <div className="container">
        <h2 className="section-title">Teaching Experience</h2>
        <div className="teaching-list">
          {teaching.map((item, index) => (
            <div key={index} className="teaching-item">
              <div className="teaching-dates">
                <span className="teaching-date">{item.date}</span>
              </div>
              <div className="teaching-content">
                <span className="teaching-course">{item.course}</span>
                <span className="teaching-instructor">{item.instructor}</span>
                <span className="teaching-university">{item.university}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teaching;
