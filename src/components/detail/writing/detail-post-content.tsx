'use client';

import React, { useMemo } from 'react';

import { defaultExtensions } from '@/components/protected/editor/wysiwyg/extensions';
import { isValidJson } from '@/lib/utils';
import { generateHTML } from '@tiptap/core';

const DetailPostContent = ({ content }: { content: string }) => {
  const json = useMemo(
    () => (isValidJson(content) ? JSON.parse(content) : []),
    [content]
  );

  const output = useMemo(() => {
    return generateHTML(json, defaultExtensions);
  }, [json]);

  return (
    <div
      className="lg:prose-md prose prose-invert relative w-full max-w-none py-4 prose-pre:whitespace-pre-wrap xl:rounded-2xl xl:border-r-2 xl:pr-4"
      dangerouslySetInnerHTML={{ __html: output }}
    />
  );
};

export default DetailPostContent;
