import React from 'react';

import Skeleton from '@/components/ui/skeleton';

const DetailPostLoading = () => {
  return (
    <div className="rounded-xl p-5">
      <Skeleton className="mt-5 h-5 max-w-[640px] rounded-full"></Skeleton>
      <Skeleton className="mt-2 h-5 max-w-[540px] rounded-full "></Skeleton>
      <div className="mt-4 flex max-w-2xl gap-2">
        <Skeleton className="h-5 w-full max-w-[540px] rounded-full "></Skeleton>
        <Skeleton className="h-5 w-full max-w-[540px] rounded-full "></Skeleton>
        <Skeleton className="h-5 w-full max-w-[540px] rounded-full "></Skeleton>
        <Skeleton className="h-5 w-full max-w-[540px] rounded-full "></Skeleton>
      </div>
      <div
        role="status"
        className="mt-4 w-full space-y-8 md:flex md:items-center md:space-x-8 md:space-y-0"
      >
        <Skeleton className="flex aspect-[1060/400] w-full flex-1 items-center justify-center rounded ">
          <svg
            className="h-10 w-10 text-primary/10"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </Skeleton>
        <span className="sr-only">Loading...</span>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_1fr] xl:gap-10">
        <div>
          <Skeleton className="mb-2.5 mt-5 h-2.5 max-w-[640px] rounded-full   "></Skeleton>
          <Skeleton className="h-2.5 max-w-[540px] rounded-full "></Skeleton>
          <Skeleton className="mb-2.5 mt-5 h-2.5 max-w-[640px] rounded-full"></Skeleton>
          <Skeleton className="h-2.5 max-w-[540px] rounded-full "></Skeleton>
          <div className="mt-5 flex gap-5">
            <Skeleton className="h-10 w-full rounded-md "></Skeleton>
            <Skeleton className="h-10 w-full rounded-md "></Skeleton>
          </div>
        </div>
        <div className="w-full max-w-7xl">
          <Skeleton className="mb-2.5 mt-5 h-2.5 max-w-[640px] rounded-full   "></Skeleton>
          <Skeleton className="h-2.5 max-w-[540px] rounded-full "></Skeleton>
          <Skeleton className="mb-2.5 mt-5 h-2.5 max-w-[640px] rounded-full"></Skeleton>
          <Skeleton className="h-2.5 max-w-[540px] rounded-full "></Skeleton>
          <Skeleton className="mb-2.5 mt-5 h-2.5 max-w-[640px] rounded-full "></Skeleton>
          <Skeleton className="h-2.5 max-w-[540px] rounded-full "></Skeleton>
          <Skeleton className="mb-2.5 mt-5 h-2.5 max-w-[640px] rounded-full "></Skeleton>
          <Skeleton className="h-2.5 max-w-[540px] rounded-full "></Skeleton>
          <Skeleton className="mb-2.5 mt-5 h-2.5 max-w-[640px] rounded-full "></Skeleton>
          <Skeleton className="h-2.5 max-w-[540px] rounded-full "></Skeleton>
          <Skeleton className="mb-2.5 mt-5 h-2.5 max-w-[640px] rounded-full "></Skeleton>
          <Skeleton className="h-2.5 max-w-[540px] rounded-full "></Skeleton>
          <Skeleton className="mb-2.5 mt-5 h-2.5 max-w-[640px] rounded-full "></Skeleton>
          <Skeleton className="h-2.5 max-w-[540px] rounded-full "></Skeleton>
          <Skeleton className="mb-2.5 mt-5 h-2.5 max-w-[640px] rounded-full "></Skeleton>
          <Skeleton className="h-2.5 max-w-[540px] rounded-full "></Skeleton>
          <Skeleton className="mb-2.5 mt-5 h-2.5 max-w-[640px] rounded-full "></Skeleton>
          <Skeleton className="h-2.5 max-w-[540px] rounded-full "></Skeleton>
        </div>
      </div>
    </div>
  );
};

export default DetailPostLoading;
