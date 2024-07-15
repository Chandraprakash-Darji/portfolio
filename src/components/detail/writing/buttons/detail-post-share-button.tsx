'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { sharePost } from '@/actions/writing/count-share';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { detailShareConfig } from '@/config/detail';
import { useAction } from '@/hooks/use-action';
import { ShareType } from '@/lib/enums';
import {
  Check,
  Copy,
  Envelope,
  FacebookLogo,
  LinkedinLogo,
  ShareNetwork,
  XLogo,
} from '@phosphor-icons/react/dist/ssr';
import { useRouter } from 'next-nprogress-bar';

interface DetailPostShareButtonProps {
  title: string;
  text: string;
  url: string;
  id: string;
  shares: number;
}

const CopyButton = ({ url, onClick }: { url: string; onClick: () => void }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const id = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(id);
    }
  }, [copied]);

  const copy = () => {
    setCopied(true);
    onClick();
    typeof window !== 'undefined' && window.navigator.clipboard.writeText(url);
  };

  return (
    <button
      type="button"
      title="Copy url to clipboard"
      onClick={copy}
      className="focus-me rounded-lg border-[1.75px] border-border bg-muted  p-5 shadow-sm transition-all hover:-translate-y-1 hover:bg-transparent hover:shadow-md"
    >
      {copied ? (
        <Check className="h-8 w-8 stroke-[1.5px] text-muted-foreground" />
      ) : (
        <Copy className="h-8 w-8 stroke-[1.5px] text-muted-foreground" />
      )}
    </button>
  );
};

const DetailPostShareButton: React.FC<DetailPostShareButtonProps> = ({
  title = '',
  text = '',
  url,
  id,
  shares,
}) => {
  const router = useRouter();
  const { execute } = useAction(sharePost, {
    onSuccess: () => {
      router.refresh();
    },
  });

  const share = useCallback(
    (type: ShareType, href: string) => {
      execute({ postId: id, type });
      const anchor = document.createElement('a');
      anchor.style.display = 'none';
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.href = href;
      anchor.click();
    },
    [execute, id]
  );

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="w-full relative"
            size="lg"
          >
            <ShareNetwork className="mr-2 h-5 w-5" />
            {detailShareConfig.title}
            <span className="absolute -right-[5px] -top-[10px] rounded-full bg-foreground px-[4px] text-xs font-semibold text-background shadow-sm ring-1">
              {shares}
            </span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto max-w-md">
            <DrawerTitle className="mx-auto my-4 text-center font-sans text-lg font-semibold text-foreground">
              {detailShareConfig.title}
            </DrawerTitle>
            <div className="mx-auto my-6 grid grid-cols-3 justify-center gap-8">
              <div className="mx-auto flex ">
                <button
                  title={title}
                  className="focus-me rounded-lg border-[1.75px] border-border bg-muted p-5 shadow-sm transition-all hover:-translate-y-1 hover:bg-transparent hover:shadow-md"
                  onClick={() =>
                    share(
                      'X',
                      `https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(
                        title
                      )}`
                    )
                  }
                >
                  <XLogo className="h-8 w-8 stroke-[1.5px] text-muted-foreground" />
                </button>
              </div>
              <div className="mx-auto flex ">
                <button
                  title={title}
                  className="focus-me rounded-lg border-[1.75px] border-border bg-muted p-5 shadow-sm transition-all hover:-translate-y-1 hover:bg-transparent hover:shadow-md"
                  onClick={() =>
                    share(
                      'FACEBOOK',
                      `https://www.facebook.com/sharer/sharer.php?u=${url}`
                    )
                  }
                >
                  <FacebookLogo className="h-8 w-8 stroke-[1.5px] text-muted-foreground" />
                </button>
              </div>
              <div className="mx-auto flex ">
                <button
                  title={title}
                  className="focus-me rounded-lg border-[1.75px] border-border bg-muted p-5 shadow-sm transition-all hover:-translate-y-1 hover:bg-transparent hover:shadow-md"
                  onClick={() =>
                    share(
                      'LINKEDIN',
                      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
                    )
                  }
                >
                  <LinkedinLogo className="h-8 w-8 stroke-[1.5px] text-muted-foreground" />
                </button>
              </div>

              <div className="mx-auto flex ">
                <button
                  title={title}
                  className="focus-me rounded-lg border-[1.75px] border-border bg-muted p-5 shadow-sm transition-all hover:-translate-y-1 hover:bg-transparent hover:shadow-md"
                  onClick={() =>
                    share(
                      'EMAIL',
                      `mailto:?subject=${encodeURIComponent(title)}&body=${
                        text ? encodeURIComponent(text + '\n\n') : ''
                      }${url}`
                    )
                  }
                >
                  <Envelope className="h-8 w-8 stroke-[1.5px] text-muted-foreground" />
                </button>
              </div>

              <div className="mx-auto flex ">
                <CopyButton
                  url={url}
                  onClick={() => execute({ postId: id, type: 'COPY' })}
                />
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DetailPostShareButton;
