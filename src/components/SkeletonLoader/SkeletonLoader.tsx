import './SkeletonLoader.css';

export type SkeletonType =
  'text' | 'title' | 'avatar' | 'card' | 'record' | 'tile' | 'publication';

interface SkeletonLoaderProps {
  type?: SkeletonType;
  count?: number;
  label?: string;
}

const SkeletonLoader = ({
  type = 'card',
  count = 1,
  label = 'Loading content',
}: SkeletonLoaderProps) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'text':
        return <div className="skeleton skeleton-text" />;
      case 'title':
        return <div className="skeleton skeleton-title" />;
      case 'avatar':
        return <div className="skeleton skeleton-avatar" />;
      case 'publication':
        return (
          <div className="skeleton-publication">
            <div className="skeleton skeleton-title skeleton-width-80" />
            <div className="skeleton skeleton-text skeleton-width-60" />
            <div className="skeleton skeleton-text skeleton-width-90" />
            <div className="skeleton-actions">
              <div className="skeleton skeleton-badge" />
              <div className="skeleton skeleton-button" />
              <div className="skeleton skeleton-button" />
            </div>
          </div>
        );
      case 'record':
        return (
          <div className="skeleton-record">
            <div className="skeleton skeleton-record-marker" />
            <div className="skeleton-record-copy">
              <div className="skeleton skeleton-title skeleton-width-60" />
              <div className="skeleton skeleton-text skeleton-width-80" />
              <div className="skeleton skeleton-text skeleton-width-50" />
            </div>
            <div className="skeleton skeleton-record-meta" />
          </div>
        );
      case 'tile':
        return (
          <div className="skeleton-tile">
            <div className="skeleton skeleton-tile-icon" />
            <div className="skeleton skeleton-text skeleton-width-70" />
          </div>
        );
      case 'card':
      default:
        return (
          <div className="skeleton-card">
            <div className="skeleton skeleton-title skeleton-width-70" />
            <div className="skeleton skeleton-text skeleton-width-90" />
            <div className="skeleton skeleton-text skeleton-width-60" />
          </div>
        );
    }
  };

  return (
    <div
      className={`skeleton-container skeleton-container--${type}`}
      role="status"
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
      {Array.from({length: count}).map((_, index) => (
        <div className="skeleton-item" key={index} aria-hidden="true">
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
