import get from 'lodash.get';
import { useFormContext } from 'react-hook-form';
import { HiExclamationCircle } from 'react-icons/hi';

import { cn } from '@/lib/utils';

export type TextAreaProps = {
  id: string;
  readOnly?: boolean;
  hideError?: boolean;
  wrapperClassName?: string;
} & React.ComponentPropsWithoutRef<'textarea'>;

export function TextArea({
  id,
  readOnly = false,
  hideError = false,
  wrapperClassName,
  ...rest
}: TextAreaProps) {
  const {
    formState: { errors },
  } = useFormContext();
  const error = get(errors, id);

  return (
    <div className={cn('relative', wrapperClassName)}>
      <textarea
        {...rest}
        readOnly={readOnly}
        className={cn(
          'border-input flex min-h-[80px] w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors',
          readOnly
            ? 'cursor-not-allowed focus:ring-0'
            : errors[id]
            ? 'focus:ring-destructive border-destructive focus:border-destructive'
            : 'placeholder:text-muted-foreground focus-visible:ring-ring file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50'
        )}
        aria-describedby={id}
      />
      {!hideError && error && (
        <div className='pointer-events-none absolute right-0 top-0 flex items-center pr-3 pt-3'>
          <HiExclamationCircle className='text-destructive text-xl' />
        </div>
      )}
    </div>
  );
}
