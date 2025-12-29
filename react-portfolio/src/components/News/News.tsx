import { fetchNews, news } from '../../data/content';
import TimelineSection from '../TimelineSection/TimelineSection';
import useContentData from '../../hooks/useContentData';
import useSettings from '../../hooks/useSettings';

const News = () => {
  const { data: newsItems } = useContentData(fetchNews, news, {
    logLabel: 'news data',
  });
  const { settings } = useSettings();

  return (
    <TimelineSection
      id="news"
      title="News"
      items={newsItems}
      initialLimit={settings.displayLimits.news.initial}
      showMoreEnabled={settings.displayLimits.news.showMoreEnabled}
    />
  );
};

export default News;
