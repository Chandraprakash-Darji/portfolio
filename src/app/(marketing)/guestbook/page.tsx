import React, { Suspense } from 'react';

import Comment from '@/components/comment';
import Heading from '@/components/heading';

export const metadata = {
  title: 'Guestbook',
  description: 'Leave whatever you like to say',
};

const GuestBookPage = () => {
  return (
    <section className='relative flex flex-col pt-32'>
      <div className='layout relative z-10'>
        <Heading>Guestbook</Heading>
        <h1 className='h0 text-muted-foreground mt-2 max-w-4xl font-medium leading-tight'>
          Leave whatever you like to say—message, appreciation, suggestions.
        </h1>
        <div className='mt-4'>
          <Suspense fallback={<div>loading...</div>}>
            <Comment />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default GuestBookPage;
