import * as React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import clsx from 'clsx';
import { BiCheck, BiCopy } from 'react-icons/bi';
import { BsTextWrap } from 'react-icons/bs';
import { useCopyToClipboard, useLocalStorage } from 'usehooks-ts';

export function Pre({
  className,
  children,
  ...rest
}: React.ComponentPropsWithRef<'pre'>) {
  const preRef = React.useRef<HTMLPreElement>(null);

  const [isCopied, setIsCopied] = React.useState<boolean>(false);
  const [shouldWrap, setShouldWrap] = useLocalStorage('text-wrap', true);

  const [_, copy] = useCopyToClipboard();

  return (
    <pre
      {...rest}
      ref={preRef}
      className={cn([
        'group relative',
        shouldWrap ? '!whitespace-pre-wrap' : '!whitespace-pre',
        className,
      ])}
      data-word-wrap={shouldWrap}
    >
      {children}
      <div
        className={clsx(
          'absolute right-0 top-0 z-10 m-[11px] flex gap-1',
          'md:opacity-0 group-hover:opacity-100'
        )}
      >
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => setShouldWrap((prev) => !prev)}
          title="Wrap code"
          className={clsx(['md:hidden'])}
        >
          <BsTextWrap className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => {
            copy(preRef?.current?.textContent ?? '').then(() => {
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 1500);
            });
          }}
          title="Copy code"
        >
          {isCopied ? <BiCheck className="text-primary" /> : <BiCopy />}
        </Button>
      </div>
    </pre>
  );
}
