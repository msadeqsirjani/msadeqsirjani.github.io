import './SkeletonLoader.css';

interface SkeletonLoaderProps {
  type?: 'text' | 'title' | 'avatar' | 'card' | 'publication';
  count?: number;
}

const SkeletonLoader = ({ type = 'card', count = 1 }: SkeletonLoaderProps) => {
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
            <div className="skeleton skeleton-title" style={{ width: '80%' }} />
            <div className="skeleton skeleton-text" style={{ width: '60%', marginTop: '0.5rem' }} />
            <div className="skeleton-actions">
              <div className="skeleton skeleton-badge" />
              <div className="skeleton skeleton-button" />
              <div className="skeleton skeleton-button" />
            </div>
          </div>
        );
      case 'card':
      default:
        return (
          <div className="skeleton-card">
            <div className="skeleton skeleton-avatar" />
            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-text" style={{ width: '80%' }} />
          </div>
        );
    }
  };

  return (
    <div className="skeleton-container">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
