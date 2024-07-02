'use client';
import { Input } from '@/components/ui/input';
import { useSearchParams } from 'next/navigation';
import React from 'react';

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
        window && window?.history.pushState(null, '', `?${params.toString()}`);
      }}
    />
  );
};

export default Search;
