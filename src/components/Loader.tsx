import { Loader2, LucideProps } from 'lucide-react';

import { cn } from '@/lib/utils';

const Loader = ({ className, ...props }: LucideProps) => {
  return <Loader2 {...props} className={cn('animate-spin', className)} />;
};

export default Loader;
