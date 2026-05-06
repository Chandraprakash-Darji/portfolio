'use client';

import { useReadingProgress } from '@/hooks/use-reading-progress';

const ReadingProgress: React.FC = () => {
  const completion = useReadingProgress();
  return (
    <div
      style={{ transform: `translateX(${completion - 100}%)` }}
      className="sticky top-0 z-50 h-1 w-full bg-primary/80"
    />
  );
};

export default ReadingProgress;
