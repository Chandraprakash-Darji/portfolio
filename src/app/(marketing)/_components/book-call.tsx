'use client';

import React from 'react';
import { useEffect } from 'react';

import Cal, { getCalApi } from '@calcom/embed-react';

const BookCall = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: '15min' });
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' });
    })();
  }, []);
  return (
    <section className="pt-28 layout">
      <h2 className="h0 mt-2 mx-auto text-center text-3xl sm:text-4xl md:text-5xl font-bold leading-tight lg:text-5xl">
        Let’s discuss your project! Book a free 15-minute consultation below
      </h2>
      <Cal
        namespace="15min"
        calLink="chandra-prakash/15min"
        style={{ width: '100%', height: '100%', overflow: 'scroll' }}
        config={{ layout: 'month_view' }}
        className="mt-10"
      />
    </section>
  );
};

export default BookCall;
