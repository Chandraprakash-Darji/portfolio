'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import type { MarkdownHeading } from 'astro';

const getDashWidth = (level: number) => {
  const widths: Record<number, string> = { 1: 'w-10', 2: 'w-6', 3: 'w-3' };
  return widths[level] ?? 'w-3';
};

export default function TableOfContents({
  headings,
}: {
  headings: MarkdownHeading[];
}) {
  const [activeId, setActiveId] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string>('');
  const [visible, setVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      }
    },
    [],
  );

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.slug))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0,
    });

    for (const el of elements) {
      observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, [headings, handleIntersect]);

  // Staggered entrance animation
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  const show = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const hide = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
      setHoveredId('');
    }, 150);
  };

  if (headings.length === 0) return null;

  return (
    <div
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {/* Trigger: stacked dashes */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex flex-col items-end gap-[5px] py-0.5"
        aria-label="Table of contents"
      >
        {headings.map((h, i) => {
          const isActive = activeId === h.slug;
          const isHovered = hoveredId === h.slug;

          return (
            <span
              key={h.slug}
              onClick={(e) => {
                e.stopPropagation();
                document
                  .getElementById(h.slug)
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={() => setHoveredId(h.slug)}
              className={`block h-px rounded-full cursor-pointer ${
                isActive || isHovered
                  ? 'h-[2px] bg-primary'
                  : 'bg-muted-foreground/50 hover:bg-foreground'
              } transition-[opacity,transform] duration-300 ${getDashWidth(
                h.depth,
              )} ${
                visible
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-4 opacity-0'
              }`}
              style={{
                transitionDelay: `${i * 50}ms`,
              }}
            />
          );
        })}
      </button>

      {/* Full TOC popover */}
      {open && (
        <div
          ref={popoverRef}
          className="absolute right-full mr-3 top-1/2 -translate-y-1/2 min-w-48 max-w-64 rounded border border-border bg-background py-2 shadow-lg"
        >
          <nav>
            <ul>
              {headings.map((h) => (
                <li key={h.slug}>
                  <a
                    href={`#${h.slug}`}
                    onClick={() => setOpen(false)}
                    className={`block border-l-2 py-1 pr-4 text-xs transition-colors ${
                      activeId === h.slug
                        ? 'border-primary text-foreground font-medium'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                    }`}
                    style={{ paddingLeft: `${12 + (h.depth - 1) * 12}px` }}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
