import { awards } from '../../data/content';
import TimelineSection from '../common/TimelineSection';

const Awards = () => (
  <TimelineSection
    id="awards"
    title="Awards and Honors"
    items={awards}
  />
);

export default Awards;
