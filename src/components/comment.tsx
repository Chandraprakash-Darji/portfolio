'use client';

import { commentFlag } from '@/constant/env';
import Giscus, { Repo } from '@giscus/react';

export default function Comment() {
  return commentFlag ? (
    <Giscus
      repo={(process.env.NEXT_PUBLIC_GISCUS_REPO as Repo) || ''}
      repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID || ''}
      mapping="pathname"
      reactionsEnabled="0"
      emitMetadata="0"
      theme="dark"
    />
  ) : null;
}
