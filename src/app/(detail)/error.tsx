'use client';

import React from 'react';

import SharedError from '@/components/shared/shared-error';

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

  return <SharedError />;
}
