import React from 'react';

import Comment from '@/components/comment';
import Heading from '@/components/heading';

const GuestBookPage = () => {
  return (
    <section className='relative flex flex-col pt-32'>
      <div className='layout relative z-10'>
        <Heading>Guestbook</Heading>
        <p className='text-muted-foreground mt-1'>
          Leave whatever you like to say—message, appreciation, suggestions.
        </p>
        <div className='mt-4'>
          <Comment />
        </div>
      </div>
    </section>
  );
};

export default GuestBookPage;
