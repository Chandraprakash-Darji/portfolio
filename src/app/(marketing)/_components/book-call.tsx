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
      <Cal
        namespace="15min"
        calLink="chandra-prakash/15min"
        style={{ width: '100%', height: '100%', overflow: 'scroll' }}
        config={{ layout: 'month_view' }}
      />
    </section>
  );
};

export default BookCall;
