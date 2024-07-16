'use client';

import { Pre } from '@/components/detail/writing/content/pre';
import CustomLink from '@/components/links/CustomLink';
import { TGetMdxSource } from '@/lib/query/writing/get-post';
import '@/styles/prosemirror.css';
import { MDXRemote } from 'remote-mdx';

export default function MDX({ source }: { source: TGetMdxSource }) {
  const components = {
    pre: Pre,
    a: CustomLink,
  };

  return (
    <article
      className="lg:prose-md prose prose-invert relative w-full max-w-none py-4 prose-pre:whitespace-pre-wrap xl:rounded-2xl xl:border-r-2 xl:pr-4"
      suppressHydrationWarning={true}
    >
      {/* @ts-expect-error component type is not required */}
      <MDXRemote {...source} components={components} />
    </article>
  );
}
