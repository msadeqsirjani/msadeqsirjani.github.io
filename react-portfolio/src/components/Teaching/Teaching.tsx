import { useState } from 'react';
import { teaching } from '../../data/content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Teaching = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="teaching" className="section">
      <div className="container">
        <h2 className="section-title">Teaching Experience</h2>
        <div className="teaching-list">
          {teaching.map((item, index) => {
            const isHidden = !showAll && index >= 5;
            return (
              <div key={index} className={`teaching-item ${isHidden ? 'hidden-for-show-more' : ''}`}>
                <div className="teaching-dates">
                  <span className="teaching-date">{item.date}</span>
                </div>
                <div className="teaching-content">
                  <span className="teaching-course">{item.course}</span>
                  <span className="teaching-instructor">{item.instructor}</span>
                  <span className="teaching-university">{item.university}</span>
                </div>
              </div>
            );
          })}
        </div>
        {teaching.length > 5 && (
          <div className="show-more-container">
            <button id="showMoreBtn" onClick={() => setShowAll(!showAll)} className={showAll ? 'expanded' : ''}>
              {showAll ? 'Show Less' : 'Show More'} <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Teaching;
