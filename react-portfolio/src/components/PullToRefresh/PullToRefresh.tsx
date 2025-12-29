import { useEffect, useRef, useState } from 'react';

const PULL_THRESHOLD = 80;
const MAX_PULL_DISTANCE = 150;
const REFRESH_DELAY = 500;

const PullToRefresh = () => {
  const [pullState, setPullState] = useState<'idle' | 'pulling' | 'ready' | 'refreshing'>('idle');
  const pullToRefreshRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const isPulling = useRef(false);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0 && e.touches[0]) {
        startY.current = e.touches[0].clientY;
        isPulling.current = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling.current || !e.touches[0]) return;

      currentY.current = e.touches[0].clientY;
      const pullDistance = Math.min(currentY.current - startY.current, MAX_PULL_DISTANCE);

      if (pullDistance > 0) {
        if (window.scrollY === 0) {
          e.preventDefault();
        }
        setPullState(pullDistance < PULL_THRESHOLD ? 'pulling' : 'ready');
      }
    };

    const handleTouchEnd = () => {
      if (!isPulling.current) return;

      const pullDistance = currentY.current - startY.current;

      if (pullDistance >= PULL_THRESHOLD) {
        setPullState('refreshing');
        setTimeout(() => window.location.reload(), REFRESH_DELAY);
      } else {
        setPullState('idle');
      }

      isPulling.current = false;
      startY.current = 0;
      currentY.current = 0;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div
      className={`pull-to-refresh ${pullState !== 'idle' ? pullState : ''}`}
      id="pullToRefresh"
      ref={pullToRefreshRef}
    >
      <div className="pull-to-refresh-icon-wrapper">
        <svg className="pull-to-refresh-progress" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="22" strokeDasharray="138.2" strokeDashoffset="138.2"></circle>
        </svg>
        <div className="pull-to-refresh-icon"></div>
      </div>
    </div>
  );
};

export default PullToRefresh;
