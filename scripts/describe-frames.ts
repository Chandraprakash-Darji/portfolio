import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const MANIFEST_PATH = join(
  import.meta.dirname,
  '..',
  'src',
  'constant',
  'frames.ts',
);
const LM_STUDIO = 'http://localhost:1234/api/v1/chat';
const VISION_MODEL = 'qwen/qwen3.5-9b';

async function describeImage(url: string): Promise<string> {
  // Fetch the original image from blob
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());

  // Resize to 512px max for the vision model
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
            'Write in lowercase. No technical terms. No prefixes like "this photo shows".',
        },
        {
          type: 'image',
          data_url: `data:image/jpeg;base64,${previewBuf.toString('base64')}`,
        },
      ],
    }),
  });

  if (!response.ok) throw new Error(`vision api: ${response.status}`);
  const data = await response.json();
  const desc = data.output
    ?.find((o: { type: string }) => o.type === 'message')
    ?.content?.trim();

  if (!desc || desc.length < 3) throw new Error('empty description');
  return desc
    .replace(/^["']|["']$/g, '')
    .replace(/\.$/, '')
    .toLowerCase()
    .trim();
}

function isFallback(alt: string): boolean {
  // Fallbacks are filename-derived: timestamps, "Frame NNN", partial numbers
  return (
    /^\d{8}_\d{6}$/.test(alt) || /^\d+$/.test(alt) || alt.startsWith('Frame ')
  );
}

async function main() {
  // Dynamic import the current manifest
  const mod = await import(`file://${MANIFEST_PATH}`);
  const frames: typeof mod.frames = mod.frames;

  const pending = frames.filter((f) => isFallback(f.alt));

  if (pending.length === 0) {
    console.log('All frames already have descriptions.');
    return;
  }

  console.log(
    `${pending.length} of ${frames.length} frames need descriptions.\n`,
  );

  for (const [i, frame] of pending.entries()) {
    const name = frame.pathname;
    process.stdout.write(`  [${i + 1}/${pending.length}] ${name}... `);

    try {
      frame.alt = await describeImage(frame.url);
      console.log(`"${frame.alt}"`);
    } catch (err) {
      console.log(`failed (${err}), keeping "${frame.alt}"`);
    }
  }

  // Write back updated manifest
  const source = readFileSync(MANIFEST_PATH, 'utf-8');
  const updated = source.replace(
    /export const frames: FrameEntry\[\] = \[[\s\S]*?\n\];/,
    `export const frames: FrameEntry[] = ${JSON.stringify(frames, null, 2)};`,
  );

  writeFileSync(MANIFEST_PATH, updated);
  console.log(`\nUpdated manifest at src/constant/frames.ts`);
}

main().catch((err) => {
  console.error('Failed:', err);
  process.exit(1);
});
