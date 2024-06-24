import Search from '@/app/(detail)/_components/search';
import Topics from '@/app/(detail)/_components/topics';
import Writings from '@/app/(detail)/_components/writings';
import { WritingLoading } from '@/app/(marketing)/_components/section/writing';
import Footer from '@/components/footer';
import { Navbar } from '@/components/navbar';
import Skeleton from '@/components/ui/skeleton';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'My Writings',
  description:
    'When I am not building software, I write about my experiences and thoughts.',
};

const WritingPage = () => {
  return (
    <>
      <Navbar />
      <div className="layout pt-28">
        <h1 className="h0 mt-2 max-w-4xl font-medium leading-tight">
          My Writings
        </h1>
        <p className="h4 mt-2 text-muted-foreground">
          When I am not building software, I write about my experiences and
          thoughts.
        </p>
        <Suspense fallback={<Skeleton className="mt-8 h-9 w-full" />}>
          <Search />
        </Suspense>
        <Suspense
          fallback={
            <>
              <Skeleton className="mt-8 h-9 w-20" />
              <div className="mt-2 flex gap-2">
                <Skeleton className="h-7 w-28 rounded-full" />
                <Skeleton className="h-7 w-32 rounded-full" />
                <Skeleton className="h-7 w-24 rounded-full" />
                <Skeleton className="h-7 w-36 rounded-full" />
                <Skeleton className="h-7 w-16 rounded-full" />
                <Skeleton className="h-7 w-20 rounded-full" />
              </div>
            </>
          }
        >
          <Topics />
        </Suspense>
        <div className="mt-4 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Suspense fallback={<WritingLoading />}>
            <Writings />
          </Suspense>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WritingPage;
