import { list } from '@vercel/blob';
import sharp from 'sharp';

export interface ImageProps {
  id: number;
  url: string;
  width: number;
  height: number;
  blurDataUrl: string;
  pathname: string;
}

let cached: ImageProps[] | null = null;

async function describe(
  blobUrl: string,
): Promise<{ width: number; height: number; blurDataUrl: string }> {
  const res = await fetch(blobUrl);
  if (!res.ok) throw new Error(`${res.status} fetching ${blobUrl}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const meta = await sharp(buf).metadata();
  const placeholder = await sharp(buf)
    .resize(10)
    .jpeg({ quality: 70 })
    .toBuffer();
  return {
    width: meta.width ?? 0,
    height: meta.height ?? 0,
    blurDataUrl: `data:image/jpeg;base64,${placeholder.toString('base64')}`,
  };
}

export async function getBlobImages(): Promise<ImageProps[]> {
  if (cached) return cached;

  try {
    const { blobs } = await list();
    const sorted = blobs.sort((a, b) =>
      a.pathname < b.pathname ? 1 : -1,
    );

    cached = await Promise.all(
      sorted.map(async (blob, id) => ({
        id,
        url: blob.url,
        pathname: blob.pathname,
        ...(await describe(blob.url)),
      })),
    );
    return cached;
  } catch {
    // BLOB_READ_WRITE_TOKEN not set or blob store empty — return empty
    cached = [];
    return cached;
  }
}
