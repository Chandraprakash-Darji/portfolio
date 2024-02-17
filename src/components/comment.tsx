'use client';
import Giscus, { Repo } from '@giscus/react';

import { commentFlag } from '@/constant/env';

export default function Comment() {
  return commentFlag ? (
    <Giscus
      repo={(process.env.NEXT_PUBLIC_GISCUS_REPO as Repo) || ''}
      repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID || ''}
      mapping='pathname'
      reactionsEnabled='0'
      emitMetadata='0'
      theme='dark'
    />
  ) : null;
}
