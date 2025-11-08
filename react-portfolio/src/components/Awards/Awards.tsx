import { awards, fetchAwards } from '../../data/content';
import TimelineSection from '../common/TimelineSection';
import useContentData from '../../hooks/useContentData';

const Awards = () => {
  const { data: awardItems } = useContentData(fetchAwards, awards, {
    logLabel: 'awards data',
  });

  return (
    <TimelineSection
      id="awards"
      title="Awards and Honors"
      items={awardItems}
    />
  );
};

export default Awards;
