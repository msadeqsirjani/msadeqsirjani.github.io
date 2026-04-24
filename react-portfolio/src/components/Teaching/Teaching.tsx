import { fetchTeaching, teaching } from '../../data/content';
import type { TeachingItem } from '../../types';
import TimelineSection from '../TimelineSection/TimelineSection';
import useContentData from '../../hooks/useContentData';
import useSettings from '../../hooks/useSettings';

const Teaching = () => {
  const { data: teachingItems } = useContentData(fetchTeaching, teaching, {
    logLabel: 'teaching data',
  });
  const { settings } = useSettings();

  return (
    <TimelineSection<TeachingItem>
      id="teaching"
      title="Teaching Experience"
      items={teachingItems}
      listClassName="teaching-list"
      itemClassName="teaching-item"
      dateWrapperClassName="teaching-dates"
      dateClassName="teaching-date"
      contentWrapperClassName="teaching-content"
      getItemKey={(item, index) => `${item.course}-${item.date}-${index}`}
      renderDate={(item) => item.date}
      renderContent={(item) => (
        <>
          <span className="teaching-course">{item.course}</span>
          <span className="teaching-meta">
            <span className="teaching-instructor-name">{item.instructor.replace(/^Instructor:\s*/, '')}</span>
            <span className="teaching-sep"> · </span>
            {item.university === 'University of Texas at San Antonio'
              ? <a href="https://www.utsa.edu/" target="_blank" rel="noopener">{item.university}</a>
              : item.university}
          </span>
        </>
      )}
      initialLimit={settings.displayLimits.teaching.initial}
      showMoreEnabled={settings.displayLimits.teaching.showMoreEnabled}
    />
  );
};

export default Teaching;
