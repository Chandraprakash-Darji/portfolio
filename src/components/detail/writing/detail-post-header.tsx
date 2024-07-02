'use client';

import { useReadingProgress } from '@/hooks/use-reading-progress';

const DetailPostHeader: React.FC = () => {
  const completion = useReadingProgress();
  return (
    <div
      style={{ transform: `translateX(${completion - 100}%)` }}
      className="sticky top-14 z-50 h-1 w-full bg-primary/80"
    />
  );
};

export default DetailPostHeader;
