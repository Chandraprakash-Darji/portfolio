'use client';

import { cn } from '@/lib/utils';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { AnimatePresence, motion } from 'framer-motion';

interface FormErrorProps {
  message?: string;
  className?: string;
}

export const FormError = ({ message, className }: FormErrorProps) => {
  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
          y: -10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 10,
        }}
        className={cn(
          'flex items-center gap-x-2 rounded-md bg-destructive/20 p-3 text-sm text-destructive dark:bg-destructive/70 dark:text-foreground/70',
          className
        )}
      >
        <ExclamationTriangleIcon className="h-4 w-4" />
        <p>{message}</p>
      </motion.div>
    </AnimatePresence>
  );
};
