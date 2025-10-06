import { awards } from '../../data/content';

const Awards = () => {
  return (
    <section id="awards" className="section">
      <div className="container">
        <h2 className="section-title">Awards and Honors</h2>
        <div className="awards-list">
          {awards.map((item, index) => (
            <div key={index} className="award-item">
              <div className="award-dates">
                <span className="award-date">{item.date}</span>
              </div>
              <div className="award-content">
                <span className="award-description">{item.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;
