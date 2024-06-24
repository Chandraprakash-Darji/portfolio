import { ImageResponse } from 'next/og';

import { SharedOgImage } from '@/components/shared';
import { z } from 'zod';

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

const ogImageSchema = z.object({
  title: z.string(),
  subTitle: z.string(),
  tags: z.string().array(),
  slug: z.string(),
});

export const runtime = 'edge';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(`${req.url}`);

    const { title, subTitle, tags, slug } = ogImageSchema.parse({
      title: searchParams.get('title'),
      subTitle: searchParams.get('subTitle'),
      tags: searchParams.getAll('tags'),
      slug: searchParams.get('slug'),
    });

    return new ImageResponse(
      (
        <SharedOgImage
          title={title}
          subTitle={subTitle}
          tags={tags}
          slug={slug}
        />
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
