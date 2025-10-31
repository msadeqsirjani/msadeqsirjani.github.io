import type { ReactNode } from 'react';

type ClassName = string | undefined | null | false;

export interface TimelineItem {
  date: string;
  description?: ReactNode;
}

export interface TimelineSectionProps<T extends TimelineItem> {
  id: string;
  title?: string;
  items: T[];
  listClassName?: string;
  itemClassName?: string;
  dateWrapperClassName?: string;
  dateClassName?: string;
  contentWrapperClassName?: string;
  descriptionClassName?: string;
  renderDate?: (item: T, index: number) => ReactNode;
  renderContent?: (item: T, index: number) => ReactNode;
  getItemClassName?: (item: T, index: number) => ClassName;
  getItemKey?: (item: T, index: number) => string | number;
  children?: ReactNode;
}

const joinClassNames = (...classNames: ClassName[]) =>
  classNames.filter(Boolean).join(' ');

const TimelineSection = <T extends TimelineItem>({
  id,
  title,
  items,
  listClassName,
  itemClassName,
  dateWrapperClassName,
  dateClassName,
  contentWrapperClassName,
  descriptionClassName,
  renderDate,
  renderContent,
  getItemClassName,
  getItemKey,
  children,
}: TimelineSectionProps<T>) => {
  return (
    <section id={id} className="section">
      <div className="container">
        {title && <h2 className="section-title">{title}</h2>}
        <div className={joinClassNames('timeline-list', listClassName)} role="list">
          {items.map((item, index) => {
            const itemKey = getItemKey ? getItemKey(item, index) : `${item.date}-${index}`;
            const dateContent = renderDate ? renderDate(item, index) : item.date;
            const descriptionContent = renderContent
              ? renderContent(item, index)
              : item.description;

            return (
              <div
                key={itemKey}
                className={joinClassNames(
                  'timeline-item',
                  itemClassName,
                  getItemClassName?.(item, index),
                )}
                role="listitem"
              >
                <div
                  className={joinClassNames('timeline-dates', dateWrapperClassName)}
                >
                  {typeof dateContent === 'string' ? (
                    <span className={joinClassNames('timeline-date', dateClassName)}>
                      {dateContent}
                    </span>
                  ) : (
                    dateContent
                  )}
                </div>
                <div
                  className={joinClassNames(
                    'timeline-content',
                    contentWrapperClassName,
                  )}
                >
                  {typeof descriptionContent === 'string' ? (
                    <span
                      className={joinClassNames(
                        'timeline-description',
                        descriptionClassName,
                      )}
                    >
                      {descriptionContent}
                    </span>
                  ) : (
                    descriptionContent
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {children}
      </div>
    </section>
  );
};

export default TimelineSection;
