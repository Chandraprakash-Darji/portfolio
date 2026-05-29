// Thanks @fumadocs — adapted from fumadocs doc-page-actions & doc-share-menu
// https://github.com/ncdai/chanhdai.com
'use client';

import { useCallback, useMemo, useRef, useState } from 'react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { IconCheck, IconCopy, IconX } from '@tabler/icons-react';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  EllipsisIcon,
  LinkIcon,
  ShareIcon,
} from 'lucide-react';
import { toast } from 'sonner';

type CopyState = 'idle' | 'loading' | 'done' | 'error';

const cache = new Map<string, string>();

function CopyStateIcon({ state }: { state: CopyState }) {
  if (state === 'done') return <IconCheck className="size-3.5" />;
  if (state === 'error') return <IconX className="size-3.5" />;
  return <IconCopy className="size-3.5" />;
}

function getPrompt(url: string) {
  return `Read ${url}, I want to ask questions about it.`;
}

function copyText(text: string) {
  return navigator.clipboard.writeText(text);
}

interface Neighbor {
  slug: string;
  title: string;
}

interface Props {
  markdownUrl: string;
  githubUrl: string;
  postUrl: string;
  postTitle: string;
  backHref: string;
  backLabel: string;
  previous?: Neighbor | null;
  next?: Neighbor | null;
}

function LLMCopyButton({ markdownUrl }: { markdownUrl: string }) {
  const [state, setState] = useState<CopyState>('idle');
  const operationRef = useRef(false);

  const handleCopy = useCallback(async () => {
    if (operationRef.current) return;
    operationRef.current = true;
    setState('loading');

    try {
      const cached = cache.get(markdownUrl);
      if (cached) {
        await navigator.clipboard.writeText(cached);
      } else {
        const res = await fetch(markdownUrl);
        const content = await res.text();
        cache.set(markdownUrl, content);
        await navigator.clipboard.writeText(content);
      }
      setState('done');
    } catch {
      setState('error');
    } finally {
      await new Promise((r) => setTimeout(r, 1500));
      operationRef.current = false;
      setState('idle');
    }
  }, [markdownUrl]);

  return (
    <Button
      className="h-7 gap-1.5 border-none px-2 text-[0.8125rem] active:scale-none"
      variant="secondary"
      size="sm"
      disabled={state === 'loading'}
      onClick={handleCopy}
    >
      <CopyStateIcon state={state} />
      <span className="max-[28rem]:hidden">Copy Page</span>
    </Button>
  );
}

function ViewOptions({
  markdownUrl,
  githubUrl,
}: {
  markdownUrl: string;
  githubUrl: string;
}) {
  const [open, setOpen] = useState(false);

  const items = useMemo(() => {
    const fullUrl =
      typeof window !== 'undefined'
        ? new URL(markdownUrl, window.location.origin).toString()
        : markdownUrl;

    const q = getPrompt(fullUrl);

    return [
      { title: 'View as Markdown', href: fullUrl, icon: Icons.markdown },
      { title: 'Open in GitHub', href: githubUrl, icon: Icons.github },
      {
        title: 'Open in ChatGPT',
        href: `https://chatgpt.com/?${new URLSearchParams({
          hints: 'search',
          q,
        })}`,
        icon: Icons.openai,
      },
      {
        title: 'Open in Claude',
        href: `https://claude.ai/new?${new URLSearchParams({ q })}`,
        icon: Icons.claude,
      },
      {
        title: 'Open in Cursor',
        href: `https://cursor.com/link/prompt?${new URLSearchParams({
          text: q,
        })}`,
        icon: Icons.cursor,
      },
      {
        title: 'Open in Grok',
        href: `https://grok.com/?${new URLSearchParams({ q })}`,
        icon: Icons.grok,
      },
      {
        title: 'Open in Scira AI',
        href: `https://scira.ai/?${new URLSearchParams({ q })}`,
        icon: Icons.scira,
      },
    ];
  }, [markdownUrl, githubUrl]);

  return (
    <div className="relative">
      <Button
        className="size-7 border-none active:scale-none"
        variant="secondary"
        size="icon-xs"
        aria-label="View Options"
        onClick={() => setOpen(!open)}
      >
        <ChevronDownIcon className="mt-0.5 size-4" />
      </Button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-1 w-fit rounded-md border border-border bg-popover py-1 shadow-lg">
            {items.map(({ title, href, icon: Icon }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors whitespace-nowrap"
                onClick={() => setOpen(false)}
              >
                <Icon className="size-3.5" />
                {title}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function LLMCopyButtonWithViewOptions({
  markdownUrl,
  githubUrl,
}: {
  markdownUrl: string;
  githubUrl: string;
}) {
  return (
    <ButtonGroup>
      <LLMCopyButton markdownUrl={markdownUrl} />
      <div className="h-7 w-px self-center bg-border" />
      <ViewOptions markdownUrl={markdownUrl} githubUrl={githubUrl} />
    </ButtonGroup>
  );
}

function DocShareMenu({ title, url }: { title: string; url: string }) {
  const [open, setOpen] = useState(false);

  const absoluteUrl =
    typeof window !== 'undefined'
      ? new URL(url, window.location.origin).toString()
      : url;

  const urlEncoded = encodeURIComponent(absoluteUrl);

  return (
    <div className="relative">
      <Button
        className="size-7 border-none active:scale-none"
        variant="secondary"
        size="icon-xs"
        aria-label="Share"
        onClick={() => setOpen(!open)}
      >
        <ShareIcon className="size-3.5" />
      </Button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-1 w-fit rounded-md border border-border bg-popover py-1 shadow-lg">
            <button
              className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors whitespace-nowrap"
              onClick={() => {
                copyText(absoluteUrl);
                toast.success('Link copied');
                setOpen(false);
              }}
            >
              <LinkIcon className="size-3.5" />
              Copy link
            </button>

            <a
              href={`https://x.com/intent/tweet?url=${urlEncoded}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors whitespace-nowrap"
              onClick={() => setOpen(false)}
            >
              <Icons.x className="size-3.5" />
              Share on X
            </a>

            <a
              href={`https://www.linkedin.com/sharing/share-offsite?url=${urlEncoded}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors whitespace-nowrap"
              onClick={() => setOpen(false)}
            >
              <Icons.linkedin className="size-3.5" />
              Share on LinkedIn
            </a>

            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors whitespace-nowrap"
                onClick={(e) => {
                  e.preventDefault();
                  navigator.share({ title, url: absoluteUrl }).catch(() => {});
                }}
              >
                <EllipsisIcon className="size-3.5" />
                Other app
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export function PostHeader({
  markdownUrl,
  githubUrl,
  postUrl,
  postTitle,
  backHref,
  backLabel,
  previous,
  next,
}: Props) {
  return (
    <div className="flex items-center justify-between border-b border-border py-2 pl-1">
      <Button
        className="h-7 gap-1.5 border-none px-0 text-xs text-muted-foreground hover:text-foreground hover:no-underline"
        variant="link"
        size="sm"
        asChild
      >
        <a href={backHref}>
          <ArrowLeftIcon className="size-3.5" />
          {backLabel}
        </a>
      </Button>

      <div className="flex items-center gap-2">
        <LLMCopyButtonWithViewOptions
          markdownUrl={markdownUrl}
          githubUrl={githubUrl}
        />

        <DocShareMenu title={postTitle} url={postUrl} />

        {previous && (
          <div className="relative group">
            <Button
              className="size-7 border-none active:scale-none"
              variant="secondary"
              size="icon-xs"
              asChild
              aria-label="Previous Post"
            >
              <a href={`/writing/${previous.slug}`}>
                <ArrowLeftIcon className="size-3.5" />
              </a>
            </Button>
            <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center gap-1.5 whitespace-nowrap rounded border border-border bg-popover px-2 py-1 text-[10px] text-muted-foreground shadow-lg z-50">
              Previous Post
            </div>
          </div>
        )}

        {next && (
          <div className="relative group">
            <Button
              className="size-7 border-none active:scale-none"
              variant="secondary"
              size="icon-xs"
              asChild
              aria-label="Next Post"
            >
              <a href={`/writing/${next.slug}`}>
                <ArrowRightIcon className="size-3.5" />
              </a>
            </Button>
            <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center gap-1.5 whitespace-nowrap rounded border border-border bg-popover px-2 py-1 text-[10px] text-muted-foreground shadow-lg z-50">
              Next Post
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
