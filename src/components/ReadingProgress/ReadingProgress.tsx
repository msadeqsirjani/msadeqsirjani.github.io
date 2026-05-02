import { useState } from 'react';
import { useScrollManager } from '../../hooks/useScrollManager';

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useScrollManager((_scrollY, scrollPercent) => {
    setProgress(Math.min(scrollPercent, 100));
  });

  return (
    <div
      className="reading-progress"
      id="readingProgress"
      aria-label="Reading progress"
      style={{ width: `${progress}%` }}
    />
  );
};

export default ReadingProgress;
