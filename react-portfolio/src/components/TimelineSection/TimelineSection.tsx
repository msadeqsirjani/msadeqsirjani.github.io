import { useState } from 'react';
import type { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

type ClassName = string | undefined | null | false;

type Accessor<T, R> = (item: T, index: number) => R;

export interface TimelineSectionProps<T> {
  id: string;
  title?: string;
  items: T[];
  listClassName?: string;
  itemClassName?: string;
  dateWrapperClassName?: string;
  dateClassName?: string;
  contentWrapperClassName?: string;
  descriptionClassName?: string;
  renderDate?: Accessor<T, ReactNode>;
  renderContent?: Accessor<T, ReactNode>;
  getItemClassName?: Accessor<T, ClassName>;
  getItemKey?: Accessor<T, string | number>;
  children?: ReactNode;
  initialLimit?: number;
  showMoreEnabled?: boolean;
}

const joinClassNames = (...classNames: ClassName[]) =>
  classNames.filter(Boolean).join(' ');

const TimelineSection = <T,>({
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
  initialLimit = 5,
  showMoreEnabled = false,
}: TimelineSectionProps<T>) => {
  const [showAll, setShowAll] = useState(false);
  const displayItems = showMoreEnabled && !showAll ? items.slice(0, initialLimit) : items;
  const hasMore = showMoreEnabled && items.length > initialLimit;

  return (
    <section id={id} className="section">
      <div className="container">
        {title && <h2 className="section-title">{title}</h2>}
        <div className={joinClassNames('timeline-list', listClassName)} role="list">
          {displayItems.map((item, index) => {
            const candidate = item as Record<string, unknown>;
            const defaultDate = candidate['date'] as ReactNode | undefined;
            const defaultDescription = candidate['description'] as ReactNode | undefined;
            const itemKey = getItemKey
              ? getItemKey(item, index)
              : `${String(
                  typeof defaultDate === 'string' ? defaultDate : index,
                )}-${index}`;
            const dateContent = renderDate ? renderDate(item, index) : defaultDate;
            const descriptionContent = renderContent
              ? renderContent(item, index)
              : defaultDescription;
            const hasDateContent =
              dateContent !== undefined && dateContent !== null && dateContent !== '';
            const hasDescriptionContent =
              descriptionContent !== undefined && descriptionContent !== null;

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
                  {hasDateContent
                    ? typeof dateContent === 'string'
                      ? (
                        <span className={joinClassNames('timeline-date', dateClassName)}>
                          {dateContent}
                        </span>
                      )
                      : dateContent
                    : null}
                </div>
                <div
                  className={joinClassNames(
                    'timeline-content',
                    contentWrapperClassName,
                  )}
                >
                  {hasDescriptionContent
                    ? typeof descriptionContent === 'string'
                      ? (
                        <span
                          className={joinClassNames(
                            'timeline-description',
                            descriptionClassName,
                          )}
                        >
                          {descriptionContent}
                        </span>
                      )
                      : descriptionContent
                    : null}
                </div>
              </div>
            );
          })}
        </div>
        {hasMore && (
          <div className="show-more-container">
            <button
              id="showMoreBtn"
              className={showAll ? 'expanded' : ''}
              onClick={() => setShowAll(!showAll)}
              aria-label={showAll ? 'Show fewer items' : `Show all ${items.length} items`}
            >
              {showAll ? 'Show Less' : 'Show More'} <FontAwesomeIcon icon={showAll ? faChevronUp : faChevronDown} />
            </button>
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default TimelineSection;
