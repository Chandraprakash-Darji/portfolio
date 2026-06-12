import { put } from '@vercel/blob';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const FRAMES_DIR = join(import.meta.dirname, '..', 'public', 'frames');
const MANIFEST_PATH = join(import.meta.dirname, '..', 'src', 'constant', 'frames.ts');
const LM_STUDIO = 'http://localhost:1234/api/v1/chat';
const VISION_MODEL = 'qwen/qwen3.5-9b';

const GRID_WIDTH = 660; // 2x for retina, displayed at 330px

interface FrameEntry {
  pathname: string;
  url: string;
  thumbUrl: string;
  gridUrl: string;
  gridWidth: number;
  gridHeight: number;
  width: number;
  height: number;
  alt: string;
  blurDataUrl: string;
}

async function describeImage(buf: Buffer, mimeType: string, filename: string): Promise<string> {
  // Generate a cleaned fallback from the filename
  const fallback = filename
    .replace(/^\d{8}_\d{6}[_-]?/, '')  // strip timestamp prefix
    .replace(/^IMG_\d{8}_\d{6}[_-]?/, '') // strip IMG_ prefix
    .replace(/[-_]/g, ' ')
    .replace(/\.[^.]+$/, '')
    .trim();

  if (fallback.length === 0) return filename.replace(/\.[^.]+$/, '');

  try {
    // Resize to max 512px for the vision model — full res is wasteful
    const previewBuf = await sharp(buf)
      .resize(512, 512, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toBuffer();

    const response = await fetch(LM_STUDIO, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: VISION_MODEL,
        reasoning: 'off',
        input: [
          {
            type: 'text',
            content:
              'Describe this photo in one short sentence under 12 words. ' +
              'Focus on the subject, scene, lighting, and mood. ' +
              'Write in lowercase. No technical terms. No prefixes like "this photo shows" — just the description.',
          },
          {
            type: 'image',
            data_url: `data:image/jpeg;base64,${previewBuf.toString('base64')}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      console.log(`  vision api error ${response.status}, using fallback`);
      return fallback;
    }

    const data = await response.json();
    const desc = data.output
      ?.find((o: { type: string }) => o.type === 'message')
      ?.content?.trim();
    if (!desc || desc.length < 3) {
      console.log(`  empty response, using fallback`);
      return fallback;
    }

    // Clean up common LLM artifacts
    return desc
      .replace(/^["']|["']$/g, '')
      .replace(/^this (photo|image|picture) (shows|depicts|captures)\s*/i, '')
      .replace(/\.$/, '')
      .toLowerCase()
      .trim();
  } catch (err) {
    console.log(`  vision api unreachable, using fallback`);
    return fallback;
  }
}

async function main() {
  const files = readdirSync(FRAMES_DIR).filter((f) =>
    /\.(jpg|jpeg|png|webp|avif)$/i.test(f),
  );

  if (files.length === 0) {
    console.log('No images found in public/frames/');
    return;
  }

  console.log(`Uploading ${files.length} frame${files.length > 1 ? 's' : ''}...`);

  const frames: FrameEntry[] = [];

  for (const [idx, file] of files.toSorted().entries()) {
    const filePath = join(FRAMES_DIR, file);
    const buf = readFileSync(filePath);
    const ext = file.split('.').pop()?.toLowerCase() ?? 'jpg';
    const name = file.replace(/\.[^.]+$/, '');
    const mimeType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : ext === 'avif' ? 'image/avif' : 'image/jpeg';

    process.stdout.write(`  [${idx + 1}/${files.length}] ${file} (${(buf.length / 1024 / 1024).toFixed(1)}MB)... `);

    // Generate description via local vision model
    const alt = await describeImage(buf, mimeType, file);
    process.stdout.write(`"${alt}" ... `);

    // 1. Upload original (full quality, untouched)
    const { url, pathname } = await put(file, buf, {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    // 2. Generate and upload 96×72 thumbnail (2x for command bar)
    const thumbBuf = await sharp(buf)
      .resize(96, 72, { fit: 'cover' })
      .jpeg({ quality: 80 })
      .toBuffer();
    const { url: thumbUrl } = await put(`${name}-thumb.jpg`, thumbBuf, {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    // 3. Generate grid variant — 660px wide, auto height
    const gridBuf = await sharp(buf)
      .resize(GRID_WIDTH, undefined, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toBuffer();
    const gridMeta = await sharp(gridBuf).metadata();
    const { url: gridUrl } = await put(`${name}-grid.jpg`, gridBuf, {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    // 4. Generate blur hash
    const meta = await sharp(buf).metadata();
    const placeholder = await sharp(buf)
      .resize(10)
      .jpeg({ quality: 70 })
      .toBuffer();

    frames.push({
      pathname,
      url,
      thumbUrl,
      gridUrl,
      gridWidth: gridMeta.width ?? GRID_WIDTH,
      gridHeight: gridMeta.height ?? 0,
      width: meta.width ?? 0,
      height: meta.height ?? 0,
      alt,
      blurDataUrl: `data:image/jpeg;base64,${placeholder.toString('base64')}`,
    });

    console.log('done');
  }

  const manifest = `// Auto-generated by scripts/upload-frames.ts — do not edit by hand
// Run: bun run scripts/upload-frames.ts

export interface FrameEntry {
  pathname: string;
  url: string;           // original, full quality
  thumbUrl: string;      // 96×72 (2x of 48×36) for command bar
  gridUrl: string;       // 660w auto-height (2x of 330w) for frames page
  gridWidth: number;     // actual width of grid variant
  gridHeight: number;    // actual height of grid variant
  width: number;         // original width
  height: number;        // original height
  alt: string;           // AI-generated description
  blurDataUrl: string;   // 10px hash placeholder
}

export const frames: FrameEntry[] = ${JSON.stringify(frames, null, 2)};
`;

  writeFileSync(MANIFEST_PATH, manifest);
  console.log(`\nWrote ${frames.length} entries to src/constant/frames.ts`);
}

main().catch((err) => {
  console.error('Upload failed:', err);
  process.exit(1);
});
