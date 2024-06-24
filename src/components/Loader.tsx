import { cn } from '@/lib/utils';
import { Loader2, LucideProps } from 'lucide-react';

const Loader = ({ className, ...props }: LucideProps) => {
  return <Loader2 {...props} className={cn('animate-spin', className)} />;
};

export default Loader;
