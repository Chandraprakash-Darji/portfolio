'use client';

import React from 'react';

import { useSearchParams } from 'next/navigation';

import { Input } from '@/components/ui/input';

const Search = () => {
  const searchParams = useSearchParams();
  const search = searchParams?.get('q') || '';

  return (
    <Input
      value={search}
      placeholder="Search..."
      className="mt-4"
      onChange={(e) => {
        const value = e.target.value;
        const params = new URLSearchParams(searchParams.toString());
        params.set('q', value);
        typeof window !== 'undefined' &&
          window?.history.pushState(null, '', `?${params.toString()}`);
      }}
    />
  );
};

export default Search;
