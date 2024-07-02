'use client';

import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { detailShareConfig } from '@/config/detail';
import {
  CheckIcon,
  CopyIcon,
  FacebookIcon,
  LinkedinIcon,
  MailIcon,
  Share2,
  X,
} from 'lucide-react';

interface DetailPostShareButtonProps {
  title: string;
  text: string;
  url: string;
}

const CopyButton = ({ url }: { url: string }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const id = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(id);
    }
  }, [copied]);

  const copy = () => {
    setCopied(true);
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
        <CheckIcon className="h-8 w-8 stroke-[1.5px] text-muted-foreground" />
      ) : (
        <CopyIcon className="h-8 w-8 stroke-[1.5px] text-muted-foreground" />
      )}
    </button>
  );
};

const DetailPostShareButton: React.FC<DetailPostShareButtonProps> = ({
  title = '',
  text = '',
  url,
}) => {
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button type="button" variant="outline" className="w-full" size="lg">
            <Share2 className="mr-2 h-4 w-4" />
            {detailShareConfig.title}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto max-w-md">
            <DrawerTitle className="mx-auto my-4 text-center font-sans text-lg font-semibold text-foreground">
              {detailShareConfig.title}
            </DrawerTitle>
            <div className="mx-auto my-6 grid grid-cols-3 justify-center gap-8">
              <div className="mx-auto flex ">
                <a
                  title={title}
                  target="_blank"
                  href={`https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(
                    title
                  )}`}
                  rel="noopener noreferrer"
                  className="focus-me rounded-lg border-[1.75px] border-border bg-muted p-5 shadow-sm transition-all hover:-translate-y-1 hover:bg-transparent hover:shadow-md"
                >
                  <X className="h-8 w-8 stroke-[1.5px] text-muted-foreground" />
                </a>
              </div>
              <div className="mx-auto flex ">
                <a
                  title={title}
                  target="_blank"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                  rel="noopener noreferrer"
                  className="focus-me rounded-lg border-[1.75px] border-border bg-muted p-5 shadow-sm transition-all hover:-translate-y-1 hover:bg-transparent hover:shadow-md"
                >
                  <FacebookIcon className="h-8 w-8 stroke-[1.5px] text-muted-foreground" />
                </a>
              </div>
              <div className="mx-auto flex ">
                <a
                  title={title}
                  target="_blank"
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
                  rel="noopener noreferrer"
                  className="focus-me rounded-lg border-[1.75px] border-border bg-muted p-5 shadow-sm transition-all hover:-translate-y-1 hover:bg-transparent hover:shadow-md"
                >
                  <LinkedinIcon className="h-8 w-8 stroke-[1.5px] text-muted-foreground" />
                </a>
              </div>

              <div className="mx-auto flex ">
                <a
                  title={title}
                  target="_blank"
                  href={`mailto:?subject=${encodeURIComponent(
                    title
                  )}&body=${encodeURIComponent(text + '\n\n')}${url}`}
                  rel="noopener noreferrer"
                  className="focus-me rounded-lg border-[1.75px] border-border bg-muted p-5 shadow-sm transition-all hover:-translate-y-1 hover:bg-transparent hover:shadow-md"
                >
                  <MailIcon className="h-8 w-8 stroke-[1.5px] text-muted-foreground" />
                </a>
              </div>

              <div className="mx-auto flex ">
                <CopyButton url={url} />
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DetailPostShareButton;
