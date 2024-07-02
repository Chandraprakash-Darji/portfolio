'use client';

import React from 'react';

import SharedError from '@/components/shared/shared-error';
import Footer from '@/components/footer';
import { Navbar } from '@/components/navbar';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <>
      <Navbar />
      <div className="layout-wide min-h-full bg-background py-3">
        <SharedError />;
        <Footer />
      </div>
    </>
  );
}
