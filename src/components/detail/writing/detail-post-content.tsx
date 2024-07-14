'use client';

import React from 'react';

import '@/styles/prosemirror.css';

const DetailPostContent = ({ content }: { content: string }) => {
  // const json = useMemo(
  //   () => (isValidJson(content) ? JSON.parse(content) : []),
  //   [content]
  // );

  // const output = useMemo(() => {
  //   return generateHTML(json, defaultExtensions);
  // }, [json]);

  // React.useEffect(() => {
  //   hljs.highlightAll();
  // }, []);

  return (
    <div
      className="lg:prose-md prose prose-invert relative w-full max-w-none py-4 prose-pre:whitespace-pre-wrap xl:rounded-2xl xl:border-r-2 xl:pr-4"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default DetailPostContent;
