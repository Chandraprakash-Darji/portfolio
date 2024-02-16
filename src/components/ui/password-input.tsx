import get from 'lodash.get';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

export type PasswordInputProps = {
  /**
   * id to be initialized with React Hook Form,
   * must be the same with the pre-defined types.
   */
  id: string;
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
} & React.ComponentPropsWithoutRef<'input'>;

export function PasswordInput({
  id,
  readOnly = false,
  ...rest
}: PasswordInputProps) {
  const {
    formState: { errors },
  } = useFormContext();

  const error = get(errors, id);
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className='relative '>
      <input
        {...rest}
        type={showPassword ? 'text' : 'password'}
        readOnly={readOnly}
        className={cn(
          'border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors',
          readOnly
            ? 'cursor-not-allowed focus:ring-0'
            : error
            ? 'focus:ring-destructive border-destructive focus:border-destructive'
            : 'placeholder:text-muted-foreground focus-visible:ring-ring file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50'
        )}
        aria-describedby={id}
      />

      <Button
        onClick={togglePassword}
        size='icon'
        variant='ghost'
        type='button'
        className='absolute inset-y-0 right-0 hover:bg-transparent'
      >
        {showPassword ? (
          <EyeOff className='text-muted-foreground hover:text-muted-foreground/80 h-4 w-4 cursor-pointer' />
        ) : (
          <Eye className='text-muted-foreground hover:text-muted-foreground/80 h-4 w-4 cursor-pointer' />
        )}
      </Button>
    </div>
  );
}
