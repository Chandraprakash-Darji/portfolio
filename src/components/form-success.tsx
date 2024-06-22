'use client';

import { cn } from '@/lib/utils';
import { CheckCircledIcon } from '@radix-ui/react-icons';
import { AnimatePresence, motion } from 'framer-motion';

interface FormSuccessProps {
  message?: string;
  className?: string;
}

export const FormSuccess = ({ message, className }: FormSuccessProps) => {
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
          'flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500',
          className
        )}
      >
        <CheckCircledIcon className="h-4 w-4" />
        <p>{message}</p>
      </motion.div>
    </AnimatePresence>
  );
};
