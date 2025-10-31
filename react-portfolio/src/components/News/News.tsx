import { news } from '../../data/content';
import TimelineSection from '../common/TimelineSection';

const News = () => (
  <TimelineSection
    id="news"
    title="News"
    items={news}
  />
);

export default News;
