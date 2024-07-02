import React from 'react';

import Link from 'next/link';

import { sharedNotFoundConfig } from '@/config/shared';
import { ChevronRightIcon } from 'lucide-react';
import { nanoid } from 'nanoid';
import Footer from '@/components/footer';
import { Navbar } from '@/components/navbar';
import getCategories from '@/lib/query/writing/get-categories';
import { CaretRightIcon } from '@radix-ui/react-icons';

const NotFound = async () => {
  const topics = await getCategories();
  return (
    <>
      <Navbar />
      <div className="bg-background">
        <main className="mx-auto w-full max-w-7xl px-6 pb-16 pt-10 sm:pb-24 lg:px-8">
          <div className="mx-auto mt-10 max-w-2xl text-center">
            <p className="text-xl font-semibold leading-8 text-foreground">
              404
            </p>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {sharedNotFoundConfig.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:mt-6 sm:text-lg sm:leading-8">
              {sharedNotFoundConfig.description}
            </p>
          </div>
          <div className="mx-auto mt-5 flow-root max-w-lg sm:mt-10">
            <h2 className="sr-only">{sharedNotFoundConfig.menu}</h2>
            <ul role="list" className="divide-y divide-border">
              {topics.map((category) => (
                <Link key={nanoid()} href={category.slug || ''}>
                  <li className="relative flex gap-x-6 border-b py-6">
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg shadow-sm ring-1 ring-border">
                      <CaretRightIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="my-auto flex-auto items-center text-sm font-semibold leading-6 text-foreground">
                      {category.name}
                    </div>
                    <div className="flex-none self-center">
                      <ChevronRightIcon
                        className="h-5 w-5 text-foreground"
                        aria-hidden="true"
                      />
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
            <div className="mt-10 flex justify-center">
              <Link
                href="/"
                className="rounded-md bg-gray-100 px-10 py-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-200"
              >
                {sharedNotFoundConfig.back}
              </Link>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
