'use client';

import { SharedBackButton } from '@/components/shared';
import { useReadingProgress } from '@/hooks/use-reading-progress';

interface DetailPostHeaderProps {
  title: string;
}

const DetailPostHeader: React.FC<DetailPostHeaderProps> = ({ title }) => {
  const completion = useReadingProgress();
  return (
    <header className="border-y-1 sticky top-0 z-40 bg-muted-foreground/60 shadow-sm shadow-foreground backdrop-blur-lg">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-6 py-4"
        aria-label="Global"
      >
        <div className="flex flex-none items-center justify-start">
          <SharedBackButton />
        </div>
        <div className="flex w-full max-w-3xl">
          <h1 className="text-md justify-start px-4 font-semibold tracking-tight text-foreground sm:px-0 sm:text-xl">
            {title || 'Post'}
          </h1>
        </div>
      </nav>
      <span
        style={{ transform: `translateX(${completion - 100}%)` }}
        className="absolute bottom-0 h-1 w-full bg-foreground"
      />
    </header>
  );
};

export default DetailPostHeader;
