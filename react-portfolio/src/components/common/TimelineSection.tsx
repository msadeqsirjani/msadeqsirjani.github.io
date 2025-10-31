import type { ReactNode } from 'react';

type ClassName = string | undefined | null | false;

interface TimelineItem {
  date: string;
  description: ReactNode;
}

interface TimelineSectionProps<T extends TimelineItem> {
  id: string;
  title: string;
  items: T[];
  listClassName?: string;
  itemClassName?: string;
  dateClassName?: string;
  descriptionClassName?: string;
  renderDescription?: (item: T) => ReactNode;
}

const joinClassNames = (...classNames: ClassName[]) =>
  classNames.filter(Boolean).join(' ');

const TimelineSection = <T extends TimelineItem>({
  id,
  title,
  items,
  listClassName,
  itemClassName,
  dateClassName,
  descriptionClassName,
  renderDescription,
}: TimelineSectionProps<T>) => {
  return (
    <section id={id} className="section">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <div className={joinClassNames('timeline-list', listClassName)} role="list">
          {items.map((item, index) => (
            <div
              key={`${item.date}-${index}`}
              className={joinClassNames('timeline-item', itemClassName)}
              role="listitem"
            >
              <div className="timeline-dates">
                <span className={joinClassNames('timeline-date', dateClassName)}>
                  {item.date}
                </span>
              </div>
              <div className="timeline-content">
                <span
                  className={joinClassNames(
                    'timeline-description',
                    descriptionClassName,
                  )}
                >
                  {renderDescription ? renderDescription(item) : item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
