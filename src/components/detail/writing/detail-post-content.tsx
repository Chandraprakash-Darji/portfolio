'use client';

import React, { useMemo } from 'react';

import '@/styles/prosemirror.css';
import { defaultExtensions } from '@/components/protected/editor/wysiwyg/extensions';
import { isValidJson } from '@/lib/utils';
import { generateHTML } from '@tiptap/core';
import hljs from 'highlight.js';
const DetailPostContent = ({ content }: { content: string }) => {
  const json = useMemo(
    () => (isValidJson(content) ? JSON.parse(content) : []),
    [content]
  );

  const output = useMemo(() => {
    const html = generateHTML(json, defaultExtensions);
    return html;
  }, [json]);

  React.useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div
      className="lg:prose-md prose prose-invert relative w-full max-w-none py-4 prose-pre:whitespace-pre-wrap xl:rounded-2xl xl:border-r-2 xl:pr-4"
      dangerouslySetInnerHTML={{ __html: output }}
    />
  );
};

export default DetailPostContent;
