import { useEffect, useCallback, useState } from 'react';
import type { ImageProps } from '../lib/blob-images';

interface Props {
  images: ImageProps[];
}

export default function FramesLightbox({ images }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openAt = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);
  const prev = useCallback(() => setIndex((i) => (i > 0 ? i - 1 : images.length - 1)), [images.length]);
  const next = useCallback(() => setIndex((i) => (i + 1 < images.length ? i + 1 : 0)), [images.length]);

  const download = useCallback(async () => {
    const img = images[index];
    if (!img) return;
    try {
      const res = await fetch(img.url, { mode: 'cors' });
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.download = img.pathname.split('/').pop() ?? `${index}.jpg`;
      a.href = blobUrl;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(img.url, '_blank');
    }
  }, [images, index]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, close, prev, next]);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Expose openAt globally so the Astro page can trigger it
  useEffect(() => {
    (window as any).__openFramesLightbox = openAt;
    return () => { delete (window as any).__openFramesLightbox; };
  }, [openAt]);

  if (!open) return null;

  const current = images[index];
  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90"
      onClick={close}
    >
      {/* Close button */}
      <button
        onClick={close}
        className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
        aria-label="Close"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 1l12 12M13 1L1 13"/></svg>
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-4 z-10 flex h-10 w-10 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
        aria-label="Previous"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 2L4 8l6 6"/></svg>
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-4 z-10 flex h-10 w-10 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
        aria-label="Next"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2l6 6-6 6"/></svg>
      </button>

      {/* Download */}
      <button
        onClick={(e) => { e.stopPropagation(); download(); }}
        className="absolute bottom-4 right-4 z-10 flex h-9 items-center gap-1.5 border border-border px-3 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
        aria-label="Download"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 1v8M2 6l4 4 4-4M1 11h10"/></svg>
        download
      </button>

      {/* Counter + subtitle */}
      <div className="absolute bottom-4 left-4 z-10 font-mono text-xs text-muted-foreground">
        <span>{index + 1} / {images.length}</span>
        {current.alt && (
          <span className="ml-3 italic text-muted-foreground/70">{current.alt}</span>
        )}
      </div>

      {/* Image */}
      <img
        src={current.url}
        alt={current.alt ?? ''}
        className="max-h-[90vh] max-w-[90vw] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
