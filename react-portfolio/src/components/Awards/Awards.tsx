import { awards, fetchAwards } from '../../data/content';
import TimelineSection from '../common/TimelineSection';
import useContentData from '../../hooks/useContentData';
import useSettings from '../../hooks/useSettings';

const Awards = () => {
  const { data: awardItems } = useContentData(fetchAwards, awards, {
    logLabel: 'awards data',
  });
  const { settings } = useSettings();

  return (
    <TimelineSection
      id="awards"
      title="Awards and Honors"
      items={awardItems}
      initialLimit={settings.displayLimits.awards.initial}
      showMoreEnabled={settings.displayLimits.awards.showMoreEnabled}
    />
  );
};

export default Awards;
