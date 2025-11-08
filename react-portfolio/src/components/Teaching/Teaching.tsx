import { useState } from 'react';
import { fetchTeaching, teaching } from '../../data/content';
import type { TeachingItem } from '../../types';
import TimelineSection from '../common/TimelineSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import useContentData from '../../hooks/useContentData';

const Teaching = () => {
  const [showAll, setShowAll] = useState(false);
  const { data: teachingItems } = useContentData(fetchTeaching, teaching, {
    logLabel: 'teaching data',
  });

  const visibleTeaching = showAll ? teachingItems : teachingItems.slice(0, 5);

  return (
    <TimelineSection<TeachingItem>
      id="teaching"
      title="Teaching Experience"
      items={visibleTeaching}
      listClassName="teaching-list"
      itemClassName="teaching-item"
      dateWrapperClassName="teaching-dates"
      dateClassName="teaching-date"
      contentWrapperClassName="teaching-content"
      getItemKey={(item, index) => `${item.course}-${item.date}-${index}`}
      renderContent={(item) => (
        <>
          <span className="teaching-course">{item.course}</span>
          <span className="teaching-instructor">{item.instructor}</span>
          <span className="teaching-university">{item.university}</span>
        </>
      )}
    >
      {teachingItems.length > 5 && (
        <div className="show-more-container">
          <button
            id="showMoreBtn"
            onClick={() => setShowAll(!showAll)}
            className={showAll ? 'expanded' : ''}
          >
            {showAll ? 'Show Less' : 'Show More'} <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </div>
      )}
    </TimelineSection>
  );
};

export default Teaching;
