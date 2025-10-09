import { useEffect, useRef, useState } from 'react';

const PullToRefresh = () => {
  const [pullState, setPullState] = useState<'idle' | 'pulling' | 'ready' | 'refreshing'>('idle');
  const pullToRefreshRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const isPulling = useRef(false);

  useEffect(() => {
    const threshold = 80; // Pixels to pull before triggering refresh
    const maxPull = 150; // Maximum pull distance

    const handleTouchStart = (e: TouchEvent) => {
      // Only trigger if at the top of the page
      if (window.scrollY === 0 && e.touches[0]) {
        startY.current = e.touches[0].clientY;
        isPulling.current = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling.current || !e.touches[0]) return;

      currentY.current = e.touches[0].clientY;
      const pullDistance = Math.min(currentY.current - startY.current, maxPull);

      if (pullDistance > 0) {
        // Prevent default scrolling when pulling down
        if (window.scrollY === 0) {
          e.preventDefault();
        }

        if (pullDistance < threshold) {
          setPullState('pulling');
        } else {
          setPullState('ready');
        }
      }
    };

    const handleTouchEnd = () => {
      if (!isPulling.current) return;

      const pullDistance = currentY.current - startY.current;

      if (pullDistance >= threshold) {
        setPullState('refreshing');
        
        // Trigger page refresh after animation
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        setPullState('idle');
      }

      isPulling.current = false;
      startY.current = 0;
      currentY.current = 0;
    };

    // Add touch event listeners
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
