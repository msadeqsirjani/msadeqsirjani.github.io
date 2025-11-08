import { fetchNews, news } from '../../data/content';
import TimelineSection from '../common/TimelineSection';
import useContentData from '../../hooks/useContentData';

const News = () => {
  const { data: newsItems } = useContentData(fetchNews, news, {
    logLabel: 'news data',
  });

  return (
    <TimelineSection
      id="news"
      title="News"
      items={newsItems}
    />
  );
};

export default News;
